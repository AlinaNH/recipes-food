import * as React from 'react';
import './DescriptionSite.css';

export const DescriptionSite: React.FunctionComponent = () => (
  <div className="description-site">
    <div className="description-site__content">
      <img src='https://i.ibb.co/sFWQ4YW/image.png' />
      <p>
        Here you can find any recipe with the ingredients
        you currently have in your refrigerator or by recipe title or by meal type.
        Simply choose ingredients name, recipe titles or a mealtype you needed
        in the field below and we will the most suitable recipes.
      </p>
    </div>
  </div>
);
