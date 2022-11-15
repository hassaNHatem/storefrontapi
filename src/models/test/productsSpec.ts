// import { weapon, MythicalWeaponStore } from '../product';
import { product, productStore } from '../product';
import supertest from 'supertest';
import app from '../../index';
import { User } from '../user';
const user = new User();
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

const request = supertest(app);
describe('testing products endpoints', () => {
  const token = user.create({
    firstname: 'has',
    lastname: 'has',
    password: 'has',
  });
  it('return 200 when using endpoint /products', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });
  it('return 200 when using endpoint /products/add', async () => {
    const res = await request
      .post('/products/add')
      .set('Content-type', 'application/json')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQxMCQwL0dYQ3BCSzBSeDVGc3VzZUdaLm51NmwzQnFYMTkzT0tNY0hDWWM4b1d4RzVjZGQuL1FKLiJ9LCJpYXQiOjE2NjgyODA3MzF9.-6gest7HQiCSEkgCqFAhu-X5A8DmDt1VIyusV9roYAc'
      )
      .send({ name: 'producttest', price: '15' });

    // const response = await request
    //   .post('/products/add')
    //   .set({ name: 'producttest', price: '15' });
    expect(res.status).toBe(200);
  });

  it('return 200 when using endpoint /products/get', async () => {
    const res = await request.get('/products/get?id=1');
    expect(res.status).toBe(200);
  });
});
