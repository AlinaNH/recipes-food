import { decorate, observable, computed, action, toJS } from 'mobx';

type productsType = {
    id: string
    product: string,
    aisles: string
}

class ProductsStore {
  products = [];

  private async fulfillStore() {
    this.products = await fetch(window.location.href.split('#')[0] + 'products')
      .then((response) => response.json());
  }

  get getProducts(): productsType[] {
    this.fulfillStore();
    return toJS(this.products);
  }

  setProduct(product: productsType): void {
    product.id = this._generateId();
    this.products.push(product);
  }

  deleteProduct(name: string): void {
    const id = this._findProductByName(name);
    this.products.splice(id, 1);
  }

  hasProduct(name: string): boolean {
    return this._findProductByName(name) !== -1 ? true : false;
  }

  _generateId(): string {
    return (
      performance.now().toString(36) + Math.random().toString(36)
    ).replace(/\./g, '');
  }

  _findProductByName(name: string): number {
    return this.products.findIndex(
      (ingredient) => ingredient.name === name
    );
  }
}

decorate(ProductsStore, {
  products: observable,
  getProducts: computed,
  setProduct: action,
  deleteProduct: action,
  hasProduct: action
});

export default ProductsStore;
