import React from 'react';
import './paging.css';
//'&laquo;', '&raquo;'
export const PaginationBlock = ({ pagingItems }: any) => {
  console.log(pagingItems)
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className="page-item"><span className="page-link page-paging-item">&laquo;</span></li>
        {pagingItems.map((item: any) => {
          return <li key={ item } className="page-item"><span className="page-link page-paging-item">{item}</span></li>;
        })}
        <li className="page-item"><span className="page-link page-paging-item">&raquo;</span></li>
      </ul>
    </nav>
  );
};