import React, { useCallback, useMemo, useState } from 'react';
import { Action } from '../../enums';
import { createArrayFromNumbers } from '../../utils/array.utils';
import { PaginationBlock } from './components/paginationIBlock';
import './components/paging.css';

interface PaginationProps {
  pageCount: number,
  pagingItemCounts?: number,
  currentPage: number,
  onPageChange(currentPage: number): void
}

export const Paging = ({pageCount, onPageChange, pagingItemCounts = 3, currentPage}: PaginationProps) => {

  const [currentStartItem, setCurrentStartItem] = useState<number>(1)

  const investigateStepAdd = useCallback((choosePage: number, pagingItemArray: any[]) => {
    if (choosePage === currentStartItem) {
      return 0;
    }
    if (choosePage - (Math.ceil(pagingItemCounts - pagingItemCounts/2)) < currentStartItem) {
      return 0
    }
    else return 1
  },[currentStartItem, pagingItemCounts])

  const getLastIndex = useMemo(() => {
    return currentStartItem + pagingItemCounts - 1
  }, [currentStartItem, pagingItemCounts])
  
  const countActionArrow = useCallback((action: Action) => {
    if (action.includes(Action.INCREMENT) && currentPage === getLastIndex) {
      return 1
    } else if (action.includes(Action.DECREMENT) && currentPage === currentStartItem && currentPage !== 1) {
      return -1
    } else return 0
  },[currentPage, currentStartItem, pagingItemCounts])

  const onArrowClick = useCallback((action: Action) => {
    const value = countActionArrow(action)
     setCurrentStartItem((prev) => prev + value)
    const newPage = (action.includes(Action.DECREMENT) && currentPage - 1) || (action.includes(Action.INCREMENT) && currentPage + 1) || currentPage
    onPageChange(newPage)
  }, [countActionArrow, currentPage, onPageChange])

  const onPageClick = useCallback((pageNumber: number) => {
    const investigateStep = investigateStepAdd(pageNumber, createArrayFromNumbers(pagingItemCounts, currentStartItem))
    setCurrentStartItem((prev) => {
      return prev + investigateStep;
    })
    onPageChange(pageNumber)
  }, [currentStartItem, investigateStepAdd, onPageChange, pagingItemCounts])

  const paginationItems = useCallback(() => {
    return createArrayFromNumbers(pagingItemCounts, currentStartItem)
  }, [currentStartItem, pagingItemCounts])

  return (
    <PaginationBlock pagingItems={paginationItems} onClick={onPageClick} onArrowClick={onArrowClick} currentPage={currentPage}/>
  );
};