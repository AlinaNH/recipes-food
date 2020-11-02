import * as React from 'react';
import './Filter.css';

import FilterBean from './FilterBeans/FilterBean';

export const Filter: React.FunctionComponent = () => (
  <div className="filter-container">
    <div className="filter-name">Filter Recipes:</div>
    <div className="filter-description">
      Check multiple beans below to narrow recipe search results
    </div>
    <div className="filter-type">Filter by Ingestion</div>
    <FilterBean name="breakfast" />
    <FilterBean name="lunch" />
    <FilterBean name="dinner" />
    <div className="filter-type">Filter by Cooking Time</div>
    <FilterBean name="25 minutes" />
    <FilterBean name="40 minutes" />
    <FilterBean name="60 minutes" />
    <FilterBean name="120 minutes" />
    <div className="filter-type">Filter by Spicy</div>
    <FilterBean name="not spicy" />
    <FilterBean name="spicy" />
    <FilterBean name="very spicy" />
    <div className="filter-type">Filter by Type</div>
    <FilterBean name="daily recipes" />
    <FilterBean name="desserts" />
    <FilterBean name="soups" />
    <FilterBean name="snacks" />
    <FilterBean name="meat" />
    <FilterBean name="salads" />
    <FilterBean name="pizza" />
    <FilterBean name="fast to make" />
    <FilterBean name="popular" />
  </div>
);
