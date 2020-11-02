/* eslint-disable require-jsdoc */
import * as React from 'react';
import { FILTER_BEANS_COLORS } from './FilterBeansColors';
import { storeFilter } from '../../../stores/storeFilter';
import './FilterBean.css';

class FilterBean extends React.Component<{ name: string }> {
  constructor(props: Readonly<{ name: string }>) {
    super(props), (this.handleClick = this.handleClick.bind(this));
  }

  handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    const colors = Object.values(FILTER_BEANS_COLORS);
    const filterBeans = storeFilter.getSelectedFilterBeans();
    const selectedFilterBean = {
      name: this.props.name,
      path: event.target,
      index: 0,
    };

    if (!filterBeans.length) {
      (event.target as HTMLButtonElement).setAttribute(
        `style`,
        `background-color: ${colors[selectedFilterBean.index]}`,
      );
      storeFilter.addSelectedFilterBean(selectedFilterBean);
    } else if (
      filterBeans.findIndex(bean => bean.name === this.props.name) === -1
    ) {
      selectedFilterBean.index = filterBeans[filterBeans.length - 1].index + 1;
      (event.target as HTMLButtonElement).setAttribute(
        `style`,
        `background-color: ${colors[selectedFilterBean.index]}`,
      );
      storeFilter.addSelectedFilterBean(selectedFilterBean);
    } else {
      (event.target as HTMLButtonElement).setAttribute(
        `style`,
        `background-color: ${colors[colors.length - 1]}`,
      );
      storeFilter.removeSelectedFilterBean(selectedFilterBean);
    }
    console.log(storeFilter.getSelectedFilterBeans());
  }

  render(): any {
    return (
      <button
        className="filter-button"
        id={this.props.name}
        onClick={this.handleClick}
      >
        {this.props.name}
      </button>
    );
  }
}

export default FilterBean;
