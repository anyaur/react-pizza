import '../scss/app.scss';
import React from 'react';
import Categories from '../components/Categories.jsx';
import Sort from '../components/Sort.jsx';
import PizzaBlock from '../components/Pizza';
import Skeleton from '../components/Pizza/Skeleton.jsx';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../redux/slices/filterSlice';

function Home() {
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const { activeSortType, activeCategory } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const category = activeCategory > -1 ? `category=${activeCategory}` : '';
  const order = activeSortType.sortProperty.includes('-') ? 'desc' : 'asc';
  const pizzas = items
    .filter((obj) => obj.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const search = searchValue ? searchValue : '';
  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://64dda5f0825d19d9bfb15369.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${activeSortType.sortProperty.replace(
        '-',
        '',
      )}&order=${order}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activeCategory, activeSortType, currentPage]);

  const onClickCategory = (i) => {
    dispatch(setCategory(i));
    setCurrentPage(1);
  };
  return (
    <>
      <div className="content__top">
        <Categories activeCategory={activeCategory} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? [...new Array(4)].map((_, index) => <Skeleton key={index} />) : pizzas}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={(number) => setCurrentPage(number)} />
    </>
  );
}

export default Home;
