import express from 'express'
import db from '../db.js'

const router = express.Router();

//** Definicion del Metodo GET : properties */
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