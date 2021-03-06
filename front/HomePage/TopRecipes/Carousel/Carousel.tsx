import * as React from 'react';
import Slider from 'react-slick';
import RecipesCard from '../RecipesCard/RecipesCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';
import { inject, observer } from 'mobx-react';

type CarouselProps = {
  recipesStore?: any
}

const Carousel: React.FunctionComponent<CarouselProps> = ({ recipesStore }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const recipes = recipesStore.getRecipesData;
  if (recipes.length) {
    const recipesArr = [1, 2, 3, 4, 5, 6, 7, 8];
    const recipesCard = recipesArr.map((e, i) => {
      return <RecipesCard key={i} recipe={recipes[i]}/>;
    });
    return <Slider {...settings}>{recipesCard}</Slider>;
  }
};

export default inject('recipesStore')(observer(Carousel));
