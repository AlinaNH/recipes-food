import * as React from 'react';
import { MdTimer } from 'react-icons/md';
import { ImFire } from 'react-icons/im';
import { BsStar, BsStarFill, BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import './RecipesCard.css';

export const RecipesCard: React.FunctionComponent = () => {
  const [isFavorite, setFavorite] = React.useState(false);
  const ratingFromProps = 4;
  const displayedRating = [1, 2, 3, 4, 5].map((e, i) =>
    e <= ratingFromProps ? <BsStarFill key={i} /> : <BsStar key={i} />,
  );

  return (
    <div
      className="RecipesCard"
      style={{
        backgroundImage: `url("https://res.cloudinary.com/foodtactics/image/upload/f_auto,q_auto,w_500,dpr_3.0,c_scale/v1576848986/porridge-bowl-with-chia-pudding-01_al0agi.jpg")`,
      }}
    >
      <div className="RecipesCard_descriptions">
        <div className="RecipesCard_descriptions_rating">{displayedRating}</div>
        <div className="RecipesCard_descriptions_reviews">
          <p>10 reviews</p>
        </div>
        <div
          className="RecipesCard_descriptions_favoriteButton"
          onClick={() => {
            isFavorite ? setFavorite(false) : setFavorite(true);
          }}
        >
          {isFavorite ? (
            <BsBookmarkFill className="favoriteButton favoriteButton_fill" />
          ) : (
            <BsBookmark className="favoriteButton" />
          )}
        </div>
        <div className="RecipesCard_descriptions_titleTimeAndDifficult">
          <h2>Porridge</h2>
          <p>
            <MdTimer className="TimeIcon" />
            30 minutes
          </p>
          <p>
            <ImFire className="Difficult" /> Easy
          </p>
        </div>
        <div className="RecipesCard_descriptions_shortDescription">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
            quisquam veritatis dolor deleniti ratione earum aliquam nemo cum
            repudiandae laboriosam dolore, fugit, dolores reiciendis cumque
            nesciunt, doloremque officiis quam hic.
          </p>
        </div>
      </div>
    </div>
  );
};
