 import React from 'react'
 import { SwiperSlide } from 'swiper/react';
 import { banner } from '../../../core/types';

 export const rerender = {
   banner(banners: banner[]) {
     if (banners.length !== 0) return banners.map(banner => (
         <SwiperSlide key={ banner._id }>
           <img src={ banner.picture } width="1600px" height='450px' className="App__content-banner" alt=""/>
         </SwiperSlide>
       ))
   }
 }