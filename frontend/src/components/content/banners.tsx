import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import '../../css/content.css';

interface BunnersProps{
    bunners:string[]
}

export const Banners:React.FC<BunnersProps>=({bunners})=>{
   return (
        
        <div className="App__content-Banners">
            <img src="./assets/g_1594744964_de932668ca704cecb07c38741a49887f.jpeg "  width="100%"  className="App__content-banner" alt=""/>
            {/* <Swiper
                spaceBetween={50}
                slidesPerView={3}
            >
                {bunners.map(item=>(<SwiperSlide><img src={item} width="100%"  className="App__content-banner" alt=""/></SwiperSlide>))}
            </Swiper> */}
        </div>
    )
}