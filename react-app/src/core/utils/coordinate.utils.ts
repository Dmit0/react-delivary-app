export const getCoordinatesString = (position: { lng: number, lat: number }) => {
  return Object.values(position).map(item => {
    const stringCoordinate = item.toString()
    return stringCoordinate.split('').slice(0, 10).join('');
  }).join(',')
}