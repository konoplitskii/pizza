import React, { useCallback, useRef } from 'react';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import qs from 'qs';
import ReactPaginate from 'react-paginate';

import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import SortPopup from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { searchContext } from '../App';
import { useSelector } from 'react-redux';
import { FilterSliceState, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { sortList } from '../components/Sort';
import { fetchPizzas, SearchPizzaParams } from '../redux/slices/pizzasSlice';
import { RootState, useAppDispatch } from '../redux/store';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categoryID, sort, currentPage } = useSelector((state:RootState) => state.filter);
  const { items, status } = useSelector((state:RootState) => state.pizzas);

  const { searchValue } = useContext(searchContext);

  const isMounted = useRef(false);

  const onClickCategory = useCallback((id:number) => {
    dispatch(setCategoryId(id));
  },[])

  const onChangePage = (number:number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryID > 0 ? `category=${categoryID}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage:String(currentPage),
      }),
    );
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isMounted.current) {
      const params = {
        categoryID: categoryID > 0 ? categoryID : null,
        sortProperty: sort.sortProperty,
        searchValue,
        currentPage,
      };

      const querySrting = qs.stringify(params, { skipNulls: true });
      navigate(`/?${querySrting}`);
    }
  }, [categoryID, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      getPizzas();
    }
  }, [categoryID, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
      if (sort) {
        params.sortBy = String(sort);
      }
      dispatch(setFilters({
        categoryID:Number(params.category),
        currentPage:Number(params.currentPage),
        sort: sort || sortList[0]
      }));
    }

    isMounted.current = true;
  }, []);

  useEffect(() => {
    if (!window.location.search) {
      getPizzas();
    }
  }, []);

  const pizzas = Array.isArray(items)
    ? items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
    : [];
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      
      <div className="content__top">
        <Categories value={categoryID} onClickCategory={onClickCategory} />
        <SortPopup value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>Не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      {
        pizzas.length > 0 ? <Pagination currentPage={currentPage} totalPage={ pizzas.length / 4} onChangePage={onChangePage} /> : null
      }
    </div>
  );
};

export default Home;
