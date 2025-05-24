const request = require('supertest');
const app = require('../../server'); // Adjust the path to your server file

describe('GET /hello', () => {
    it('should respond with a message', async () => {
        const response = await request(app).get('/hello');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Hello, World!');
    });
});

describe('POST /hello', () => {
    it('should respond with a greeting message', async () => {
        const response = await request(app).post('/hello').send({ name: 'Alice' });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Hello, Alice!');
    });
});