import '../scss/app.scss';
import React from 'react';
import Categories from '../components/Categories.jsx';
import Sort, { sortList } from '../components/Sort.jsx';
import PizzaBlock from '../components/Pizza';
import Skeleton from '../components/Pizza/Skeleton.jsx';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const { activeSortType, activeCategory, currentPage } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const category = activeCategory > -1 ? `category=${activeCategory}` : '';
  const order = activeSortType.sortProperty.includes('-') ? 'desc' : 'asc';
  const pizzas = items
    .filter((obj) => obj.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const search = searchValue ? searchValue : '';

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const fetchPizzas = () => {
    setIsLoading(true);
    axios
      .get(
        `https://64dda5f0825d19d9bfb15369.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${activeSortType.sortProperty.replace(
          '-',
          '',
        )}&order=${order}`,
      )

      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [activeCategory, activeSortType, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: activeSortType.sortProperty,
        category: activeCategory,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeSortType, activeCategory, currentPage]);

  const onClickCategory = (i) => {
    dispatch(setCategory(i));
    dispatch(setCurrentPage(1));
  };

  const onChangePage = (i) => {
    dispatch(setCurrentPage(i));
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
      <Pagination currentPage={currentPage} setCurrentPage={onChangePage} />
    </>
  );
}

export default Home;
