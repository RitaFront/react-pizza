import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  setCategoryId,
  setSort,
  setCurrentPage,
} from '../reduxToolkit/slices/filterSlice';

import {
  Categories,
  Sort,
  PizzaBlock,
  Skeleton,
  Pagination,
  listCategories,
} from '../component';

import { fetchPizzas } from '../reduxToolkit/slices/pizzaSlice';
import { RootState, useAppDispatch } from '../reduxToolkit/store';
import { IPizzaItem } from '../reduxToolkit/types';

export const Home: React.FC = () => {
  const { categoryId, currentPage, valueSearch } = useSelector(
    (state: RootState) => state.filter
  );
  const activeSort = useSelector(
    (state: RootState) => state.filter.sort
  );
  const pizzas = useSelector((state: RootState) => state.pizza.items);
  const status = useSelector(
    (state: RootState) => state.pizza.status
  );
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);

  const getPizzas = async () => {
    const sortBy = activeSort.sortProperty.replace('-', '');
    const order = activeSort.sortProperty.includes('-')
      ? 'asc'
      : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = valueSearch ? `&search=${valueSearch}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );
  };

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, activeSort, valueSearch, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={onChangeCategory}
        />
        <Sort
          value={activeSort}
          onClickSort={(i) => dispatch(setSort(i))}
        />
      </div>
      <h2 className="content__title">{listCategories[categoryId]}</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка загрузки 🥲</h2>
          <p>Повторите запрос позже</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(6)].map((_, index) => (
                <Skeleton key={index} />
              ))
            : pizzas.map((obj: IPizzaItem) => (
                <PizzaBlock key={obj.id} {...obj} />
              ))}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        onChangePage={(num) => dispatch(setCurrentPage(num))}
      />
    </div>
  );
};
