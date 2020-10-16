import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import '../../css/content.css';
import { bunner } from '../../interfaces/swiper/reactbunner';

interface BunnersProps {
  bunners: bunner[]
}

export const Banners: React.FC<BunnersProps> = ({ bunners }) => {

  return (

    <div className="App__content-Banners">
      <Swiper tag='section'>
        {bunners.map(bunner => {
          return <SwiperSlide key={bunner._id}><img src={bunner.picture} width="1600px" height='450px' className="App__content-banner"
                                                    alt=""/></SwiperSlide>;
        })}
      </Swiper>
    </div>
  );
};

