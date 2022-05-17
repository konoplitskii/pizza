import React, { useRef } from 'react';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import qs from 'qs';
import ReactPaginate from 'react-paginate';

import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { searchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { sortList } from '../components/Sort';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryID, sort, currentPage } = useSelector((state) => state.filter);

  const { searchValue } = useContext(searchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isMounted = useRef(false);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
    setIsLoading(true);
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryID > 0 ? `category=${categoryID}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://627deaaeb75a25d3f3ae2170.mockapi.io/items?page=${currentPage}&limit=${4}&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });

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
      fetchPizzas();
    }
  }, [categoryID, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      if (sort) {
        params.sort = sort;
      }
      dispatch(setFilters(params));
    }

    isMounted.current = true;
  }, []);

  useEffect(() => {
    if (!window.location.search) {
      fetchPizzas();
    }
  }, []);

  const pizzas = Array.isArray(items)
    ? items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
    : [];
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryID} onClickCategory={(id) => onClickCategory(id)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
