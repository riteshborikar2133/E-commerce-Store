import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Zoom, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';




export default function ImageSwiper() {
    return (
        <Swiper
            // install Swiper modules
            modules={[Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            style={{ height: "auto", padding: "2rem" }}>
            <SwiperSlide><img src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/33e436051e877120.jpeg?q=20" alt="" style={{ width: "100%", height: "50vh" }} /></SwiperSlide>
            <SwiperSlide><img src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/ec5339b6299d2196.jpeg?q=20" alt="" style={{ width: "100%", height: "50vh" }} /></SwiperSlide>
            <SwiperSlide><img src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/39862e8c51aa7246.jpg?q=20" alt="" style={{ width: "100%", height: "50vh" }} /></SwiperSlide>
        </Swiper>
    )
}
