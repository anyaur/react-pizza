import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSortType } from '../redux/slices/filterSlice';

function useOutsideClick(initialIsVisible) {
  const [isShow, setIsShow] = React.useState(initialIsVisible);
  const ref = React.useRef(null);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsShow(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref, isShow, setIsShow };
}

export const sortList = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'возрастанию цены', sortProperty: 'price' },
  { name: 'убыванию цены', sortProperty: '-price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

function Sort() {
  const activeSortType = useSelector((state) => state.filter.activeSortType);
  const dispatch = useDispatch();
  const { ref, isShow, setIsShow } = useOutsideClick(false);

  const onClickListItem = (obj) => {
    dispatch(setActiveSortType(obj));
    setIsShow(false);
  };

  return (
    <div ref={ref} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsShow(!isShow)}>{activeSortType.name}</span>
      </div>
      <div>
        {isShow && (
          <div className="sort__popup">
            <ul>
              {sortList.map((value, index) => (
                <li
                  key={index}
                  onClick={() => onClickListItem(value)}
                  className={
                    activeSortType.sortProperty === value.sortProperty ? 'active' : undefined
                  }>
                  {value.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sort;

/*import React from 'react';

function useLatest(value) {
  const valueRef = React.useRef(value);

  React.useLayoutEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef;
}

function useOutsideClick(elementRef, handler, attached = true) {
  const latestHandler = useLatest(handler);

  React.useEffect(() => {
    if (!attached) return;

    const handleClick = (e) => {
      if (!elementRef.current) return;

      if (!elementRef.current.contains(e.target)) {
        latestHandler.current();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [elementRef, latestHandler, attached]);
}

function Tooltip({ open, onClose, activeSortType, onClickListItem, sortList }) {
  const tooltipRef = React.useRef(null);

  useOutsideClick(tooltipRef, onClose, open);

  if (!open) return null;

  return (
    <div ref={tooltipRef} className="tooltip">
      <div>Some Text</div>
    </div>
  );
}

function Sort() {
  const [open, setOpen] = React.useState(false);
  const sortList = ['популярности', 'цене', 'алфавиту'];
  const [activeSortType, setActiveSortType] = React.useState(0);

  const onClose = () => {
    setOpen(false);
  };

  const onClickListItem = (index) => {
    setActiveSortType(index);
    setOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sortList[activeSortType]}</span>
      </div>
      <Tooltip
        open={open}
        onClose={onClose}
        activeSortType={activeSortType}
        onClickListItem={onClickListItem}
        sortList={sortList}
      />
    </div>
  );
}

export default Sort;
*/
