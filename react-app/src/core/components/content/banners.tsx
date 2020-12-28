import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { banner } from '../../types';
import 'swiper/swiper.scss';
import '../../css/content.css';

interface BannersProps {
  banners: banner[]
}

export const Banners: React.FC<BannersProps> = ({ banners }) => {

  return (

    <div className="App__content-Banners">
      <Swiper tag='section'>
        { banners.map(banner => {
          return <SwiperSlide key={ banner._id }><img src={ banner.picture } width="1600px" height='450px' className="App__content-banner"
                                                      alt=""/></SwiperSlide>;
        }) }
      </Swiper>
    </div>
  );
};

