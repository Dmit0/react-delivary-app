export const createArrayFromNumbers = (pagingItemCounts: number, startItem = 1, extend = false ) => {
  const itemsArray: any = [];
  for (let i = startItem; i <= pagingItemCounts + startItem - 1; i++) {
    if (extend && i < 10) {
      itemsArray.push(`0${i}`);
    } else itemsArray.push(i.toString());
  }
  return itemsArray
};

export const commonArrayFromNumbers = (num: number) => {
  return Array.from({ length: num }, (_, i) => {
    if (i < 9) {
      return `0${ i + 1 }`;
    }
    return i + 1
  })
}