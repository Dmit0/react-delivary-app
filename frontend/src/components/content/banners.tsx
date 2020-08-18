import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import '../../css/content.css';
import {bunner} from '../../interfaces/bunner'



interface BunnersProps{
    bunners:bunner[]
}

export const Banners:React.FC<BunnersProps>=({bunners})=>{
  
  return (
        
        <div className="App__content-Banners">
            <Swiper
                spaceBetween={50}
                slidesPerView={3}
            >
                {bunners.map(item=>(<SwiperSlide key ={item._id}><img src={item.picture} width="1200px"  className="App__content-banner" alt=""/></SwiperSlide>))}
            </Swiper>
        </div>
    )
}