import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { FILTER_BEANS_COLORS } from './FilterBeansColors';
import './FilterBean.css';

interface FilterBeanProps {
  name: string;
  filterStore?: any;
}

const FilterBean: React.FunctionComponent<FilterBeanProps> = ({
  name,
  filterStore,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const colors = Object.values(FILTER_BEANS_COLORS);
    const filters = filterStore.getFilters;
    const target = event.target as HTMLButtonElement;
    const currentColor = colors[filters.length % colors.length];
    const basicColor = '#D3D3D3';

    if (!filters.includes(name)) {
      changeBackgroundColor(target, currentColor);
      filterStore.setFilter(name);
    } else {
      changeBackgroundColor(target, basicColor);
      filterStore.deleteFilter(name);
    }
  };

  const changeBackgroundColor = (element: HTMLButtonElement, color: string) => {
    element.setAttribute(`style`, `background-color: ${color}`);
  };

  return (
    <button className="filter-button" onClick={handleClick}>
      {name}
    </button>
  );
};

export default inject('filterStore')(observer(FilterBean));
