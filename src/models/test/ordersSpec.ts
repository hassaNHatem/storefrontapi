import { Order } from '../order';
import { productStore } from '../product';
import { User } from '../user';
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
