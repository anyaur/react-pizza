import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';

const PizzaBlock = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
  calories,
  proteins,
  fats,
  carbohydrates,
}) => {
  const pizzaTypes = ['Тонкое', 'Традиционное'];

  const [activeType, setActiveType] = React.useState(0);

  const [activeSize, setActiveSize] = React.useState(0);

  const dispatch = useDispatch();
  const addedItems = useSelector((state) =>
    state.cart.items.find(
      (obj) =>
        id === obj.id && pizzaTypes[activeType] === obj.type && sizes[activeSize] === obj.size,
    ),
  );
  const addedCount = addedItems ? addedItems.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      size: sizes[activeSize],
      type: pizzaTypes[activeType],
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <div className="tooltip">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              fill="#464646"
            />
            <path
              d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
              fill="#464646"
            />
          </svg>
          <div className="tooltiptext">
            <table>
              <thead>
                <tr>
                  <th>Калории</th>
                  <th>Белки</th>
                  <th>Белки</th>
                  <th>Углеводы</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{calories} Ккал</td>
                  <td>{proteins} г</td>
                  <td>{fats} г</td>
                  <td>{carbohydrates} г</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId, index) => (
              <li
                key={typeId}
                onClick={() => setActiveType(index)}
                className={activeType === index ? 'active' : undefined}>
                {pizzaTypes[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={size}
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? 'active' : undefined}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button onClick={onClickAdd} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
