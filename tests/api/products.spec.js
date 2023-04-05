const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

const Producto = require('../../models/product.model');

describe('Api de products', () => {

    beforeAll(async () => {
        // Conecto a la BD
        await mongoose.connect('mongodb://127.0.0.1:27017/tienda_online');
    });

    afterAll(async () => {
        // Desconecto de la BD
        await mongoose.disconnect();
    });

    describe('Pruebas de GET /api/products', () => {

        let response;
        beforeAll(async () => {
            response = await request(app).get('/api/products').send();
        });

        test('debería funcionar la Petición', () => {
            expect(response.statusCode).toBe(200);
        });

        test('debería responder con un JSON', () => {
            expect(response.headers['content-type']).toContain('application/json');
        });

        test('debería responder con un array', () => {
            expect(response.body).toBeInstanceOf(Array);
        });

    });

    describe('Pruebas de POST /api/products', () => {

        let response;
        const body = { name: 'Test', description: 'This is for tests', price: 98, department: 'test', available: true, stock: 21 };
        beforeAll(async () => {
            response = await request(app).post('/api/products').send(body);
        });

        afterAll(async () => {
            await Producto.deleteMany({ department: 'test' });
        });

        test('la url debería funcionar', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        // En la respuesta debería venir definido el campo _id
        test('debería devolver el campo _id', () => {
            expect(response.body._id).toBeDefined();
        });

        test('la respuesta debería tener los mismos valores que el objeto que inserto', () => {
            expect(response.body.name).toBe(body.name);
        });

    });

    describe('Pruebas de PUT /api/products', () => {

        let response;
        let newProduct;
        const body = { name: 'Test', description: 'This is for tests', price: 98, department: 'test', available: true, stock: 21 };
        beforeAll(async () => {
            // Creo un nuevo producto específico para las pruebas
            newProduct = await Producto.create(body);
            // Lanzo la petición
            response = await request(app)
                .put(`/api/products/${newProduct._id}`)
                .send({ name: 'Producto Nuevo', stock: 338 });
        });

        afterAll(async () => {
            await Producto.findByIdAndDelete(newProduct._id);
        });

        test('La url debe existir y devolve un JSON', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        test('Deberíamos recibir el producto con los datos modificados', () => {
            expect(response.body.name).toBe('Producto Nuevo');
            expect(response.body.stock).toBe(338);
        });

    });


    describe('Pruebas de DELETE  /api/products', () => {
        let response;
        let newProduct;
        const body = { name: 'Test', description: 'This is for tests', price: 98, department: 'test', available: true, stock: 21 };
        beforeAll(async () => {
            // Creo un nuevo producto específico para las pruebas
            newProduct = await Producto.create(body);
            // Lanzo la petición
            response = await request(app)
                .delete(`/api/products/${newProduct._id}`)
                .send();//Envia los datos 
        });

        test('debería existir la URL y nos devuelve un JSON', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        test('debería borrar el producto de la BD', async () => {
            //buscar el producto por
            const productFound = await Producto.findById(newProduct._id);
            //Prueba si ese producto esta null/borrado
            expect(productFound).toBeNull();

        });

    });

});