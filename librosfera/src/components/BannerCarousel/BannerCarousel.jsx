import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Importación de los estilos de Swiper
import { Autoplay } from "swiper/modules"; // Importación del módulo Autoplay de Swiper
import "./BannerCarousel.css"; 

const BannerCarousel = () => (
  <section className="banner">
    <Swiper
      modules={[Autoplay]} // Módulo de Autoplay para reproducción automática del carrusel
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      slidesPerView={1}
      spaceBetween={0}
    >
      <SwiperSlide>
        <img src="/images/Banners/banner1.jpg" alt="Banner 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/Banners/banner2.jpg" alt="Banner 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/Banners/banner3.jpg" alt="Banner 3" />
      </SwiperSlide>
    </Swiper>
  </section>
);

export default BannerCarousel;
