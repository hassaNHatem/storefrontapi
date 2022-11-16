import { User } from '../user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../../index';
import { response } from 'express';
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
    expect(result).toEqual(jasmine.anything());
  });

  it('should display all users', async () => {
    const result = await store.index();
    expect(result).toEqual(jasmine.anything());
  });
});

const request = supertest(app);
describe('testing user endpoints', () => {
  it('should return 200 on using /register', async () => {
    const response = await request
      .post('/register')
      .set('Content-type', 'application/json')
      .send({ firstname: 'test2', lastname: 'test', password: 'test' });
    expect(response.status).toBe(200);
  });
  it('should return 200 on using /login', async () => {
    const response = await request
      .post('/login')
      .set('Content-type', 'application/json')
      .send({ firstname: 'test2', lastname: 'test', password: 'test' });
    expect(response.status).toBe(200);
  });
  it('should return 200 on using /users', async () => {
    const response = await request
      .get('/users')
      .set('Content-type', 'application/json')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQxMCQwL0dYQ3BCSzBSeDVGc3VzZUdaLm51NmwzQnFYMTkzT0tNY0hDWWM4b1d4RzVjZGQuL1FKLiJ9LCJpYXQiOjE2NjgyODA3MzF9.-6gest7HQiCSEkgCqFAhu-X5A8DmDt1VIyusV9roYAc'
      );
    expect(response.status).toBe(200);
  });
  it('should return 200 on using //users/get/1', async () => {
    const response = await request
      .get('/users/get?id=1')
      .set('Content-type', 'application/json')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQxMCQwL0dYQ3BCSzBSeDVGc3VzZUdaLm51NmwzQnFYMTkzT0tNY0hDWWM4b1d4RzVjZGQuL1FKLiJ9LCJpYXQiOjE2NjgyODA3MzF9.-6gest7HQiCSEkgCqFAhu-X5A8DmDt1VIyusV9roYAc'
      );
    expect(response.status).toBe(200);
  });
});
