export const createArrayFromNumbers = (pagingItemCounts: number, startItem = 1 ) => {
  const itemsArray: any = [];
  for (let i = startItem; i <= pagingItemCounts + startItem - 1; i++) {
    itemsArray.push(i);
  }
  return itemsArray
};