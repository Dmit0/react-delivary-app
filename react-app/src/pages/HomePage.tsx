import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthenticationAPI } from '../api/part_apis/authenticationApi';
import { restaurantAPI } from '../api/part_apis/ReastaurantApi';
import { NavBar } from '../components/navbar/navbar';
import { Banners } from '../components/content/banners';
import { Restaurant } from '../components/content/restaurant';
import { get_countries } from '../redux/actions/countriesActions';
import {
  set_restaurants,
  set_current_restaurant,
  set_filtered_restaurants,
  set_input_filter,
  del_current_restaurant_and_meals,
} from '../redux/actions/restaurants';
import { add_restaurant_to_loved, remove_restaurant_from_loved, set_loved_restaurant_from_localeStorage } from '../redux/actions/loveActions';
import { get_bunners } from '../redux/actions/appActions';
import { set_meal_from_localestorage_to_cart } from '../redux/actions/cartActions';
import { RootState } from '../redux/reducers/rootReducer';
import { restaurant as restaurantType } from '../interfaces/restaurant';
import { meals as Mealtype } from '../interfaces/meals';
import { SecondNavbar } from '../components/navbar/secondNavbar';
import '../css/content.css';
import '../css/styles.css';

export const HomePage: React.FC = () => {

  const dispatch = useDispatch();

  const { fetched_restaurants,
    loverestaurant,
    cart,
    bunners,
    cuisenTypes,
    restaurants_to_show,
    FilteredList,
    token
  } = useSelector((state: RootState) => {
    return {
      fetched_restaurants: state.restaurant.restaurants,
      restaurants_to_show: state.restaurant.filter_restaurants,
      loverestaurant: state.loved.loved_restaurants,
      cart: state.cart.cart,
      bunners: state.app.bunners,
      cuisenTypes: state.restaurant.cuisen,
      FilteredList: state.restaurant.inputFilter,
      token: state.authentication.token
    };
  });

  const [currentFilterText, setCurrentFilterText] = useState<string>('');
  const [currentSortType, setCurrentSortType] = useState<string>('All');
  const [currentCuisen, setCurrentCuisen] = useState<string>('');

  const sortTypeHeandler = useCallback((type: string) => {
    setCurrentSortType(type);
    setCurrentCuisen('');
    if (type !== 'All' && type !== 'Opened' && type !== 'Loved') {
      setCurrentCuisen(type);
      let cuisen = cuisenTypes.find(item => item.name === type);
      if (cuisen) {
        dispatch(set_filtered_restaurants(fetched_restaurants, cuisen));
      }
    } else if (type === 'Loved') {

      dispatch(set_filtered_restaurants(fetched_restaurants, type, loverestaurant));
    } else {
      dispatch(set_filtered_restaurants(fetched_restaurants, type));
    }

  },[cuisenTypes, fetched_restaurants, loverestaurant]);

  const handleFilterTextChange = useCallback((valyStr: string) => {
    setCurrentFilterText(valyStr);
    dispatch(set_input_filter(fetched_restaurants, valyStr));
  },[fetched_restaurants]);

  const restaurantHeandler = (restaurant: restaurantType) => {
    dispatch(set_current_restaurant(restaurant));//чанком добавить милы ?
  };

  const loveHeandler = (restaurant: restaurantType, value: boolean) => {
    if (value) {
      dispatch(add_restaurant_to_loved(restaurant));
    } else {
      dispatch(remove_restaurant_from_loved(restaurant));
    }
  };

  const check = useCallback((id: string) => {
    if (loverestaurant.length) {
      let checked = loverestaurant.find((item) => {
        return item._id === id;
      });
      return !!checked;
    } else {
      return false;
    }
  },[loverestaurant]);

  useEffect(() => {
    dispatch(set_restaurants());
  }, [dispatch]);

  useEffect(() => {
    if (loverestaurant.length > 0 && !token) {
      localStorage.setItem('loved', JSON.stringify(loverestaurant));
    }
  }, [loverestaurant, token]);

  useEffect(() => {
    dispatch(get_bunners());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(get_countries());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(del_current_restaurant_and_meals());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(token) {
      localStorage.setItem('token', JSON.stringify(token));
    }
  },[token])

  useEffect(() => {
      getRestaurant(token).then((response) => {
      dispatch(set_loved_restaurant_from_localeStorage(response));
    })
    //eslint-disable-next-line
  }, []);

  const getRestaurant = async(token: any) => {
      return token
        ? await AuthenticationAPI.getLoveUserRestaurants(token)
        : JSON.parse(localStorage.getItem('loved') || '[]') as restaurantType[];
  }

  useEffect(() => {
    const cart_items = JSON.parse(localStorage.getItem('cart') || '[]') as Mealtype[];
    dispatch(set_meal_from_localestorage_to_cart(cart_items));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <NavBar cart_length={cart}/>
      <div className="App__content">
        <Banners bunners={bunners}/>
        <div className="App_content_part">
          <SecondNavbar
            onFilterTextChange={handleFilterTextChange}
            filterType={currentSortType}
            value={currentFilterText}
            onSetSortType={sortTypeHeandler}
            cuisenTypes={cuisenTypes}
            currentCuisen={currentCuisen}
            FilteredList={FilteredList}
            fetched_restaurants={fetched_restaurants}
          />
          <div className="App_content_part_main">
            <div className="App__content-main">
              {
                restaurants_to_show.map(item => (
                  <Restaurant key={item._id} restaurant={item} onRestaurantClick={restaurantHeandler} toggleLoved={loveHeandler}
                              checked={check(item._id)}/>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className="App__footer"></div>
    </div>
  );
}


