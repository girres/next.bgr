'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PagComponent = {
  clickable: true,
  renderBullet: function (index, className) {
    return '<span class="gallery-bullet ' + className + '"></span>';
  },
};

export const Gallery = ({ images = [], name = '-' }) => (
  <Swiper
    modules={[Navigation, Pagination]}
    navigation={true}
    pagination={PagComponent}
    spaceBetween={0}
    slidesPerView={1}
  >
    {images.map((image, key) => (
      <SwiperSlide key={image}>
        <Image src={image} alt={`${name} ${key}`} width='2072' height='1166' />
      </SwiperSlide>
    ))}
  </Swiper>
);
