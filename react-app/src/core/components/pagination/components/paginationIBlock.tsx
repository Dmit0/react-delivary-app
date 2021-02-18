import React from 'react';
import './paging.css';
import { Action } from '../../../enums';

interface PaginationBlockProps {
  disableArrows: { disabledLeftArrow: boolean, disabledRightArrow: boolean }
  currentPage: number,
  onPageClick(pageNumber: number): void,
  onArrowClick(action: Action): void,
  pagingItems(): any[],
}

export const PaginationBlock = ({ pagingItems, onPageClick, onArrowClick, currentPage, disableArrows }: PaginationBlockProps) => {
  const { disabledRightArrow, disabledLeftArrow } = disableArrows;
  const arrowClick = (action: Action) => {
    if (action.includes(Action.INCREMENT) && !disabledRightArrow) onArrowClick(action);
    if (action.includes(Action.DECREMENT) && !disabledLeftArrow) onArrowClick(action);
  }
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className="page-item"><span className={`page-link page-paging-item ${disabledLeftArrow && 'page-paging-disable-item'}` } onClick={() => arrowClick(Action.DECREMENT)}>&laquo;</span></li>
        {pagingItems().map((item: any) => {
          return <li key={ item } className="page-item"><span className={ `page-link page-paging-item ${item === currentPage && 'activeItem'}` } onClick={() => onPageClick(item)}>{item}</span></li>;
        })}
        <li className="page-item"><span className={`page-link page-paging-item ${disabledRightArrow && 'page-paging-disable-item'}` } onClick={() => arrowClick(Action.INCREMENT)}>&raquo;</span></li>
      </ul>
    </nav>
  );
};