import React, { useCallback, useMemo, useState } from 'react';
import { Action } from '../../enums';
import { createArrayFromNumbers } from '../../utils/array.utils';
import { PaginationBlock } from './components/paginationIBlock';
import './components/paging.css';

interface PaginationProps {
  pageCount: number,
  maxPagingItemCounts?: number,
  currentPage: number,
  onPageChange(currentPage: number): void
}

export const Paging = ({pageCount, onPageChange, maxPagingItemCounts = 4, currentPage}: PaginationProps) => {

  const [currentStartItem, setCurrentStartItem] = useState<number>(1)

  const getCurrentVisibleLastIndex = useMemo(() => {
    if (currentStartItem === pageCount) {
      return currentStartItem
    } else if (maxPagingItemCounts >= pageCount){
      return pageCount
    }
    return currentStartItem + maxPagingItemCounts - 1
  }, [currentStartItem, maxPagingItemCounts, pageCount])

  const investigateStepAction = useCallback((choosePage: number) => {
    if (choosePage === getCurrentVisibleLastIndex && choosePage !== pageCount) {
      return 1;
    } if (choosePage > getCurrentVisibleLastIndex - Math.ceil(maxPagingItemCounts / 2) && choosePage + 1 < pageCount && choosePage !== pageCount) {
      return 1;
    } if (choosePage < currentStartItem + 1 && choosePage !== 1) {
      return -1;
    }
    return 0;
  },[currentStartItem, getCurrentVisibleLastIndex, maxPagingItemCounts, pageCount])

  const disableArrows = useMemo(() => {
    return {
      disabledLeftArrow: currentPage === 1,
      disabledRightArrow: currentPage === pageCount
    }
  }, [currentPage, pageCount])
  
  const countActionArrow = useCallback((action: Action) => {
    if (action.includes(Action.INCREMENT) && currentPage === getCurrentVisibleLastIndex) {
      return 1
    } else if (action.includes(Action.DECREMENT) && currentPage === currentStartItem && currentPage !== 1) {
      return -1
    } else return 0
  },[currentPage, currentStartItem, getCurrentVisibleLastIndex])

  const onArrowClick = useCallback((action: Action) => {
    const value = countActionArrow(action)
     setCurrentStartItem((prev) => prev + value)
    const newPage = (action.includes(Action.DECREMENT) && currentPage - 1) || (action.includes(Action.INCREMENT) && currentPage + 1) || currentPage
    onPageChange(newPage)
  }, [countActionArrow, currentPage, onPageChange])

  const onPageClick = useCallback((pageNumber: number) => {
    if (pageNumber === currentPage) return
    const investigateStep = investigateStepAction(pageNumber)
    setCurrentStartItem((prev) => {
      return prev + investigateStep;
    })
    onPageChange(pageNumber)
  }, [currentPage, investigateStepAction, onPageChange])

  const paginationItems = useMemo(() => {
    return createArrayFromNumbers(pageCount < maxPagingItemCounts ? pageCount : maxPagingItemCounts, currentStartItem)
  }, [currentStartItem, maxPagingItemCounts, pageCount])

  return (
    <PaginationBlock
      paginationItems={paginationItems}
      onPageClick={onPageClick}
      onArrowClick={onArrowClick}
      currentPage={currentPage}
      disableArrows={disableArrows}
    />
  );
};