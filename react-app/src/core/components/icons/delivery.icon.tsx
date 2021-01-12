import React from 'react';
import '../../css/meals-content.css';

interface DeliveryIconProps {
  height: string,
  width: string
}

export const DeliveryIcon: React.FC<DeliveryIconProps> = ({ height, width }) => {
  return (
    <>
      <img src="assets/leaf.svg" width={height} height={width} alt="DeliveryIcon" loading="lazy"/>
      Delivery
    </>
  );
}