import React, { useMemo } from 'react';
import './components/paging.css';
import { PaginationBlock } from './components/paginationIBlock';

interface PaginationProps {
  pageCount?: number,
  currentPage?: number,
  itemsPerPage?: number,
  onPageChange?(currentPage: number): void
}

const PAGINATION_ITEM_COUNTS = 3

export const Paging = ({pageCount, currentPage, onPageChange, itemsPerPage}: PaginationProps) => {

  const startItem = useMemo(() => {
    return 1;
  }, []);

  const lastItem = useMemo(() => {
    return 3;
  }, []);

  const VisibleItems = useMemo(() => {
    const itemsArray: any = [];
    for (let i = 1; i <= lastItem; i++) {
      itemsArray.push(i);
    }
    return itemsArray
  }, [ lastItem ]);

  return (
    <PaginationBlock pagingItems={VisibleItems}/>
  );
};