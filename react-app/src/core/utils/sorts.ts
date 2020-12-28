import { cuisine, restaurant, meals } from '../types';

export const Sorts = {
  Opened(restaurants: restaurant[]) {
    let date = new Date();
    let current_houres = date.getHours();
    let opened_restaurants: restaurant[] = [];
    restaurants.forEach(restaurant => {
      let time = restaurant.working_time.split(' - ');
      let time_work_start = time[0].split(':');//8 00
      let time_work_end = time[1].split(':');//20 00
      if ((current_houres > Number(time_work_start[0]))
        && (((Number(time_work_end[0]) > 12 && current_houres > Number(time_work_start[0])) && current_houres < Number(time_work_end[0]))
          || (Number(time_work_end[0]) > 12 && current_houres < Number(time_work_start[0]))
          || (Number(time_work_end[0]) < 12 && current_houres > Number(time_work_start[0]))
          || ((Number(time_work_end[0]) < 12 && current_houres < Number(time_work_start[0])) && current_houres < Number(time_work_end[0])))) {
        //setCurrentFilterRestaurants((prev)=>[...prev,restaurant])
        opened_restaurants.push(restaurant);
      }
    });
    return opened_restaurants;
  },
  ByCuisen(restaurants: restaurant[], Cuisentype: cuisine) {
    let sorted: restaurant[] = [];
    restaurants.forEach(restaurant => {
      if ((restaurant.selItems.find(item => item === Cuisentype._id) !== undefined)) {
        sorted.push(restaurant);
      }
    });
    //setCurrentFilterRestaurants([...sorted])

    return sorted;
  },
  ByInputStr(restaurants: restaurant[], filerStr: string) {
    if (filerStr === '') {
      return [];
    }
    let new_restaurants = restaurants.filter(restaurant => {
      return restaurant.name.toLowerCase().search(filerStr.toLowerCase()) !== -1;
    });
    return new_restaurants;
  },
  GetLovedRestaurants(loved: string[], all: restaurant[]) {
    return all.filter((item) => loved.includes(item._id));
  },

  getMealCount(meals: meals[]) {
    return meals.reduce((sum, current) => (
      sum + current.count
    ), 0);
  }
};