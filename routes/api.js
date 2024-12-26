const express = require('express');
const router = express.Router();
const { executeQuery, TYPES } = require('../config/db');

// Отримати інформацію про медикаменти
router.get('/medications/:id', async (req, res) => {
    try {
        const query = `
            SELECT m.medication_id, m.name, m.price, s.quantity, s.sale_date
            FROM Medications m
            LEFT JOIN Sales s ON m.medication_id = s.medication_id
            WHERE m.medication_id = @id
        `;
        const parameters = [
            { name: 'id', type: TYPES.Int, value: parseInt(req.params.id, 10) }
        ];

        const result = await executeQuery(query, parameters);

        if (result.length === 0) {
            return res.status(404).json({ message: 'Medication not found' });
        }

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Додати продаж
router.post('/sales', async (req, res) => {
    try {
        const { medicationId, checkNumber, quantity, saleDate } = req.body;
        const query = `
            INSERT INTO Sales (medication_id, check_number, quantity, sale_date)
            VALUES (@medicationId, @checkNumber, @quantity, @saleDate)
        `;
        const parameters = [
            { name: 'medicationId', type: TYPES.Int, value: medicationId },
            { name: 'checkNumber', type: TYPES.Int, value: checkNumber },
            { name: 'quantity', type: TYPES.Int, value: quantity },
            { name: 'saleDate', type: TYPES.Date, value: saleDate }
        ];

        await executeQuery(query, parameters);

        res.json({ message: 'Sale added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/medications', async (req, res) => {
    try {
        const query = `
            SELECT * FROM Medications
        `;
        const result = await executeQuery(query);
        res.json(result); // Return the medications as an array
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Отримати продажі для медикаменту
router.get('/medications/:id/sales', async (req, res) => {
    try {
        const query = `
            SELECT sale_id, check_number, quantity, sale_date
            FROM Sales
            WHERE medication_id = @id
        `;
        const parameters = [
            { name: 'id', type: TYPES.Int, value: parseInt(req.params.id, 10) }
        ];

        const result = await executeQuery(query, parameters);

        // Always return an array
        res.json(result || []);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new medication
router.post('/medications', async (req, res) => {
    try {
        const { name, visit_id, dosage, price, manufacturer_id } = req.body;
        const query = `
            INSERT INTO Medications (name, visit_id, dosage, price, manufacturer_id)
            VALUES (@name, @visit_id, @dosage, @price, @manufacturer_id)
        `;
        const parameters = [
            { name: 'name', type: TYPES.NVarChar, value: name },
            { name: 'visit_id', type: TYPES.Int, value: visit_id },
            { name: 'dosage', type: TYPES.NVarChar, value: dosage || null },
            { name: 'price', type: TYPES.Decimal, value: price || null },
            { name: 'manufacturer_id', type: TYPES.Int, value: manufacturer_id || null },
        ];

        await executeQuery(query, parameters);
        res.json({ message: 'Medication added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Add a new patient
router.post('/patients', async (req, res) => {
    try {
        const { name, birth_date, phone, address } = req.body;
        const query = `
            INSERT INTO Patients (name, birth_date, phone, address)
            VALUES (@name, @birth_date, @phone, @address)
        `;
        const parameters = [
            { name: 'name', type: TYPES.NVarChar, value: name },
            { name: 'birth_date', type: TYPES.Date, value: birth_date },
            { name: 'phone', type: TYPES.NVarChar, value: phone || null },
            { name: 'address', type: TYPES.NVarChar, value: address || null },
        ];

        await executeQuery(query, parameters);
        res.json({ message: 'Patient added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new sale
router.post('/sales', async (req, res) => {
    try {
        const { medication_id, check_number, quantity, sale_date } = req.body;
        const query = `
            INSERT INTO Sales (medication_id, check_number, quantity, sale_date)
            VALUES (@medication_id, @check_number, @quantity, @sale_date)
        `;
        const parameters = [
            { name: 'medication_id', type: TYPES.Int, value: medication_id },
            { name: 'check_number', type: TYPES.Int, value: check_number },
            { name: 'quantity', type: TYPES.Int, value: quantity },
            { name: 'sale_date', type: TYPES.Date, value: sale_date },
        ];

        await executeQuery(query, parameters);
        res.json({ message: 'Sale added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;
