import express from 'express';
import bodyParser from 'body-parser';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import db from './db.js';

const app = express();
app.use(bodyParser.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'RETS API',
            version: '1.0.0',
            description: 'Real Estate Transaction Standard API'
        }
    },
    apis: ['./src/app.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Definición de las rutas GET
/**
 * @swagger
 * /properties:
 *   get:
 *     summary: Get all properties
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   address:
 *                     type: string
 *                     example: "123 Main St, Anytown, USA"
 *                   price:
 *                     type: number
 *                     example: 250000.00
 *                   bedrooms:
 *                     type: integer
 *                     example: 3
 *                   bathrooms:
 *                     type: integer
 *                     example: 2
 *                   listing_date:
 *                     type: string
 *                     format: date
 *                     example: "2023-01-15"
 */
app.get('/properties', (req, res) => {
    db.query('SELECT * FROM properties', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching data from the database' });
        } else {
            res.json(results);
        }
    });
});

// Definición de las rutas POST
/**
 * @swagger
 * /properties:
 *   post:
 *     summary: Add a new property
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 example: "789 Pine St, Sometown, USA"
 *               price:
 *                 type: number
 *                 example: 275000.00
 *               bedrooms:
 *                 type: integer
 *                 example: 3
 *               bathrooms:
 *                 type: integer
 *                 example: 2
 *               listing_date:
 *                 type: string
 *                 format: date
 *                 example: "2023-03-10"
 *     responses:
 *       201:
 *         description: Property created
 */
app.post('/properties', (req, res) => {
    const { address, price, bedrooms, bathrooms, listing_date } = req.body;
    const query = 'INSERT INTO properties (address, price, bedrooms, bathrooms, listing_date) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [address, price, bedrooms, bathrooms, listing_date], (err, results) => {
        if (err) throw err;
        res.status(201).json({ id: results.insertId, ...req.body });
    });
});

/**
 * @swagger
 * /properties/{id}:
 *   put:
 *     summary: Update an existing property
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The property ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 example: "789 Pine St, Sometown, USA"
 *               price:
 *                 type: number
 *                 example: 275000.00
 *               bedrooms:
 *                 type: integer
 *                 example: 3
 *               bathrooms:
 *                 type: integer
 *                 example: 2
 *               listing_date:
 *                 type: string
 *                 format: date
 *                 example: "2023-03-10"
 *     responses:
 *       200:
 *         description: Property updated
 */
app.put('/properties/:id', (req, res) => {
    const { id } = req.params;
    const { address, price, bedrooms, bathrooms, listing_date } = req.body;
    const query = 'UPDATE properties SET address = ?, price = ?, bedrooms = ?, bathrooms = ?, listing_date = ? WHERE id = ?';
    db.query(query, [address, price, bedrooms, bathrooms, listing_date, id], (err, results) => {
        if (err) throw err;
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json({ id, address, price, bedrooms, bathrooms, listing_date });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

/**
 * @swagger
 * /properties/{id}:
 *   patch:
 *     summary: Update a property partially
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The property ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 example: "789 Pine St, Sometown, USA"
 *               price:
 *                 type: number
 *                 example: 275000.00
 *               bedrooms:
 *                 type: integer
 *                 example: 3
 *               bathrooms:
 *                 type: integer
 *                 example: 2
 *               listing_date:
 *                 type: string
 *                 format: date
 *                 example: "2023-03-10"
 *     responses:
 *       200:
 *         description: Property updated
 */

export default app;
