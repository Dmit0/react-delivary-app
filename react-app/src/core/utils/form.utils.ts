export const validateFormData = (data: any) => {
  return Object.keys(data).reduce((acc, item) => {
    if (data[item]) {
      return { ...acc, [item]: data[item] };
    }
    return acc;
  }, {});
}