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

// * Definición de las rutas
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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

export default app;
