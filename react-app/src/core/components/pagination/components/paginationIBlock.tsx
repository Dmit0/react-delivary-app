import React from 'react';
import './paging.css';
import { Action } from '../../../enums';
export const PaginationBlock = ({ pagingItems, onClick, onArrowClick, currentPage }: any) => {
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className="page-item"><span className="page-link page-paging-item" onClick={() => onArrowClick(Action.DECREMENT)}>&laquo;</span></li>
        {pagingItems().map((item: any) => {
          return <li key={ item } className="page-item"><span className={ `page-link page-paging-item ${item === currentPage && 'activeItem'}` } onClick={() => onClick(item)}>{item}</span></li>;
        })}
        <li className="page-item"><span className="page-link page-paging-item" onClick={() => onArrowClick(Action.INCREMENT)}>&raquo;</span></li>
      </ul>
    </nav>
  );
};