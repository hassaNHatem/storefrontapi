import { Order } from '../order';
import { productStore } from '../product';
import { User } from '../user';
import supertest from 'supertest';
import app from '../../index';
const user = new User();
const store = new Order();
const product = new productStore();
describe('orders modal', () => {
  it('should add order', async () => {
    const adduser = user.create({
      firstname: 'test',
      lastname: 'test',
      password: 'test',
    });
    const order = await store.addOrder(1);
    expect(order).toEqual({ id: 1, user_id: '1', status: 'active' });
  });
  it('shoul show specfic order', async () => {
    const adduser = user.create({
      firstname: 'test',
      lastname: 'test',
      password: 'test',
    });
    const order = await store.addOrder(1);
    const getorder = await store.getOrder(1);
    expect(getorder).toEqual({ id: 1, user_id: '1', status: 'active' });
  });
});

const request = supertest(app);
describe('testing order endpoints', () => {
  it('return 200 when using endpoint /orders', async () => {
    const response = await request
      .post('/orders')
      .set('Content-type', 'application/json')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQxMCQwL0dYQ3BCSzBSeDVGc3VzZUdaLm51NmwzQnFYMTkzT0tNY0hDWWM4b1d4RzVjZGQuL1FKLiJ9LCJpYXQiOjE2NjgyODA3MzF9.-6gest7HQiCSEkgCqFAhu-X5A8DmDt1VIyusV9roYAc'
      )
      .send({ userId: 1 });
    expect(response.status).toBe(200);
  });
  it('return 200 when using endpoint /orders/:id/products', async () => {
    const response = await request
      .post('/orders/1/products')
      .set('Content-type', 'application/json')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQxMCQwL0dYQ3BCSzBSeDVGc3VzZUdaLm51NmwzQnFYMTkzT0tNY0hDWWM4b1d4RzVjZGQuL1FKLiJ9LCJpYXQiOjE2NjgyODA3MzF9.-6gest7HQiCSEkgCqFAhu-X5A8DmDt1VIyusV9roYAc'
      )
      .send({ quantity: 250, product_id: '1' });
    expect(response.status).toBe(400);
  });
});
