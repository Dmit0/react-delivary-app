import React from 'react';
import './paging.css'
export const Paging = () => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link example" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li className="page-item"><a className="page-link example" href="#">1</a></li>
        <li className="page-item"><a className="page-link example" href="#">2</a></li>
        <li className="page-item"><a className="page-link example" href="#">3</a></li>
        <li className="page-item example">
          <a className="page-link example" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};