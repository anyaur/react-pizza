import React from 'react';
import styles from './search.module.scss';
import searchIcon from '../../assets/img/searchIcon.svg';
import clearIcon from '../../assets/img/clearIcon.svg';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';

const Search = () => {
  const { setSearchValue } = React.useContext(SearchContext);
  const [value, setValue] = React.useState('');
  const ref = React.useRef();

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    ref.current.focus();
  };
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 350),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <input
        ref={ref}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск"
      />
      <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg">
        <image href={searchIcon} width="24" height="24" />
      </svg>
      {value && (
        <svg onClick={onClickClear} className={styles.clearIcon} xmlns="http://www.w3.org/2000/svg">
          <image href={clearIcon} width="20" height="20" />
        </svg>
      )}
    </div>
  );
};

export default Search;
