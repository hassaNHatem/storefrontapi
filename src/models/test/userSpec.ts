import { User } from '../user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../../index';
const store = new User();
describe('user auth', async () => {
  it('should authenticate user login', async () => {
    const result = await store.authenticate('test', 'test', 'test');
    expect(result).toEqual(jasmine.anything());
  });
  it('should create a new user', async () => {
    const result = await store.create({
      firstname: 'test2',
      lastname: 'test',
      password: 'test',
    });
    expect(result.firstname).toEqual('test2');
  });

  it('should display all users', async () => {
    const result = await store.index();
    expect(result).toEqual(jasmine.anything());
  });
});
