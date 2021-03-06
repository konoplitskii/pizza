import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';


type PaginationProps = {
  currentPage:number;
  totalPage:number;
  onChangePage:(selected:number)=> void;
}

export const Pagination:FC<PaginationProps> = ({ currentPage, onChangePage,totalPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=" >"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="< "
    />
  );
};
