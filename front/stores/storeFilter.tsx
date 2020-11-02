/* eslint-disable no-invalid-this */
import { observable, toJS } from 'mobx';

export const storeFilter = observable({
  selectedFilterBeans: [],

  getSelectedFilterBeans() {
    return toJS(this.selectedFilterBeans);
  },

  addSelectedFilterBean(filterBean) {
    this.selectedFilterBeans.push(filterBean);
  },

  removeSelectedFilterBean(filterBean) {
    const indexToDelete = this.selectedFilterBeans.findIndex(
      bean => bean.name === filterBean.name,
    );
    if (indexToDelete !== -1) {
      this.selectedFilterBeans.splice(indexToDelete, 1);
    }
  },
});
