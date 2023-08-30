import React from 'react';
import styles from './search.module.scss';
import searchIcon from '../../assets/img/searchIcon.svg';
import clearIcon from '../../assets/img/clearIcon.svg';
import { SearchContext } from '../../App';

const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);
  return (
    <div className={styles.root}>
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.input}
        placeholder="Поиск"
      />
      <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg">
        <image href={searchIcon} width="24" height="24" />
      </svg>
      {searchValue && (
        <svg
          onClick={() => setSearchValue('')}
          className={styles.clearIcon}
          xmlns="http://www.w3.org/2000/svg">
          <image href={clearIcon} width="20" height="20" />
        </svg>
      )}
    </div>
  );
};

export default Search;
