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
  ByCuisine(restaurants: restaurant[], Cuisine: cuisine) {
    return restaurants.reduce((acc: restaurant[], res) => {
      if (res.selItems.find(item => item === Cuisine._id)) {
        return [ ...acc, res ];
      }
      return acc;
    }, []);
  },

  ByInputStr(restaurants: restaurant[], filerStr: string) {
    if (filerStr === '') {
      return [];
    }
    return restaurants.filter(restaurant => {
      return restaurant.name.toLowerCase().search(filerStr.toLowerCase()) !== -1;
    });
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