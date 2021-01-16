import React from 'react';
import { Swiper } from 'swiper/react';
import { banner } from '../../core/types';
import 'swiper/swiper.scss';
import '../../core/css/content.css';
import { rerender } from './utils/banner.rerender';

interface BannersProps {
  banners: banner[]
}

export const Banners: React.FC<BannersProps> = ({ banners }) => {
  return (
    <div className="App__content-Banners">
      <Swiper tag='section'>
        { rerender.banner(banners) }
      </Swiper>
    </div>
  );
};

