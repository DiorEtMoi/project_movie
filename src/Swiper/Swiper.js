// import Swiper core and required modules
import { Pagination, A11y, Autoplay } from "swiper";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import MovieCard from "../card/MovieCard/MovieCard";

export default ({ item }) => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Pagination, A11y, Autoplay]}
      spaceBetween={30}
      breakpoints={{
        375: {
          slidesPerView: 1,
        },
        750: {
          slidesPerView: 5,
        },
      }}
      pagination
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
    >
      {item?.map((ite, index) => {
        return (
          <SwiperSlide>
            <MovieCard ite={ite} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
