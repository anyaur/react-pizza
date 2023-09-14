import React from 'react';
import classes from './NotFoundBlock.module.scss';
const NotFoundBlock = () => {
  const a = 'lala';
  const b = 7;
  return (
    <h1 className={classes.root}>
      <span>😔</span>
      <br />
      Пиццы не найдены
    </h1>
  );
};

export default NotFoundBlock;
