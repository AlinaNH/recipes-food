/* eslint-disable require-jsdoc */
import * as React from 'react';
import { FILTER_BEANS_COLORS } from './FilterBeansColors';
import { storeFilter } from '../../../stores/storeFilter';
import './FilterBean.css';

interface FilterBeanProps {
  name: string;
}

export const FilterBean: React.FunctionComponent<FilterBeanProps> = ({
  name,
}): any => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const colors = Object.values(FILTER_BEANS_COLORS);
    const filterBeans = storeFilter.getSelectedFilterBeans();
    const selectedFilterBean = {
      name: name,
      path: event.target,
      index: 0,
    };

    if (!filterBeans.length) {
      // change background color and save data for the first clicked filter bean
      (event.target as HTMLButtonElement).setAttribute(
        `style`,
        `background-color: ${colors[selectedFilterBean.index]}`,
      );
      storeFilter.addSelectedFilterBean(selectedFilterBean);
    } else if (
      filterBeans.findIndex(bean => bean.name === name) === -1 // change background color and save data for other filter beans clicked after the first one
    ) {
      filterBeans[filterBeans.length - 1].index < colors.length - 2 // set index for filter beans which quantity is less / more than quantity of backound color (needed for looping of backgound colors)
        ? (selectedFilterBean.index =
            filterBeans[filterBeans.length - 1].index + 1)
        : (selectedFilterBean.index = 0);
      (event.target as HTMLButtonElement).setAttribute(
        `style`,
        `background-color: ${colors[selectedFilterBean.index]}`,
      );
      storeFilter.addSelectedFilterBean(selectedFilterBean);
    } else {
      // change background color and remove data for the filter bean clicked the second time
      (event.target as HTMLButtonElement).setAttribute(
        `style`,
        `background-color: ${colors[colors.length - 1]}`,
      );
      storeFilter.removeSelectedFilterBean(selectedFilterBean);
    }
  };

  return (
    <button className="filter-button" id={name} onClick={handleClick}>
      {name}
    </button>
  );
};
