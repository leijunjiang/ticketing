import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    });

  expect(response.status).toBe(201);
});


it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'asdfasdfdff',
      password: 'password'
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'asdfasdfdff',
      password: 'passd'
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'asdf'
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'asdf'
    })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'asdf@test.com',
      password: 'passd'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'asdf@test.com',
      password: 'passd'
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () =>{
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'asdf@test.com',
      password: 'passd'
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});