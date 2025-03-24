const request = require('supertest');
const mongoose = require('mongoose');
const { connectDB } = require('../config/database');
const app = require('../config/app'); // Adjust this based on your app structure
const User = require('../models/User');

describe('User Authentication Tests', () => {
    beforeAll(async () => {
        await connectDB();
    });

    afterEach(async () => {
        await User.deleteMany(); // Clean DB after each test
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('✅ Should register a new user successfully', async () => {
        const res = await request(app).post('/api/auth/register').send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'SecurePass123'
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body.user).toHaveProperty('email', 'johndoe@example.com');
    });

    test('❌ Should not register with an existing email', async () => {
        await User.create({
            name: 'Existing User',
            email: 'existing@example.com',
            password: 'SecurePass123'
        });

        const res = await request(app).post('/api/auth/register').send({
            name: 'John Doe',
            email: 'existing@example.com',
            password: 'SecurePass123'
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('User already exists');
    });

    test('✅ Should login with correct credentials', async () => {
        const user = await User.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'SecurePass123'
        });

        const res = await request(app).post('/api/auth/login').send({
            email: 'johndoe@example.com',
            password: 'SecurePass123'
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body.user.email).toBe(user.email);
    });

    test('❌ Should not login with incorrect password', async () => {
        await User.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'SecurePass123'
        });

        const res = await request(app).post('/api/auth/login').send({
            email: 'johndoe@example.com',
            password: 'WrongPass123'
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Invalid credentials');
    });

    test('❌ Should not login with an unregistered email', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'nonexistent@example.com',
            password: 'AnyPass123'
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Invalid credentials');
    });

    test('✅ Password should be hashed before saving', async () => {
        const user = await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'PlainPassword123'
        });

        expect(user.password).not.toBe('PlainPassword123');
    });

    test('✅ Password verification should work', async () => {
        const user = new User({
            name: 'Test User',
            email: 'test@example.com',
            password: 'SecurePass123'
        });

        await user.save();

        const isMatch = await user.comparePassword('SecurePass123');
        expect(isMatch).toBe(true);
    });

    test('❌ Password verification should fail with wrong password', async () => {
        const user = new User({
            name: 'Test User',
            email: 'test@example.com',
            password: 'SecurePass123'
        });

        await user.save();

        const isMatch = await user.comparePassword('WrongPassword123');
        expect(isMatch).toBe(false);
    });
});