// import { weapon, MythicalWeaponStore } from '../product';
import { product, productStore } from '../product';

const store = new productStore();
describe('product modal', () => {
  it('should have an index', () => {
    expect(store.index).toBeDefined();
  });

  it('index should return a list', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });

  it('should have create method', () => {
    expect(store.create).toBeDefined();
  });

  it('creates a new product', async () => {
    type productresult = {
      id: Number;
      product_name: string;
      price: string;
    };
    const result: unknown = await store.create({
      name: 'testproduct',
      price: 20,
    });

    expect(result as productresult).toEqual({
      id: 1,
      product_name: 'testproduct',
      price: '20',
    });
  });
  it('has a show method', async () => {
    expect(store.show).toBeDefined();
  });
  it('shows specific product with id', async () => {
    type productresult = {
      id: Number;
      product_name: string;
      price: string;
    };
    const proeduct: unknown = await store.create({
      id: 1,
      name: 'testproduct',
      price: 20,
    });
    const result: unknown = await store.show(1);
    expect(result as productresult).toEqual({
      id: 1,
      product_name: 'testproduct',
      price: '20',
    });
  });
});
