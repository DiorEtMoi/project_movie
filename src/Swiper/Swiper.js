// import Swiper core and required modules
import { Pagination, A11y, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import MovieCard from "../card/MovieCard/MovieCard";

export default () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Pagination, A11y, Autoplay]}
      spaceBetween={30}
      slidesPerView={5}
      pagination
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide>
        <MovieCard />
      </SwiperSlide>
      <SwiperSlide>
        <MovieCard />
      </SwiperSlide>
      <SwiperSlide>
        <MovieCard />
      </SwiperSlide>
      <SwiperSlide>
        <MovieCard />
      </SwiperSlide>
      <SwiperSlide>
        <MovieCard />
      </SwiperSlide>
      <SwiperSlide>
        <MovieCard />
      </SwiperSlide>
      <SwiperSlide>
        <MovieCard />
      </SwiperSlide>
      <SwiperSlide>
        <MovieCard />
      </SwiperSlide>
    </Swiper>
  );
};
