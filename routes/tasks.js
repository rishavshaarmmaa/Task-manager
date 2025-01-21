const express = require('express');
const router = express.Router();
const db = require('../models/db'); // Database connection

// GET dashboard
router.get('/', async (req, res) => {
    try {
        // Fetch all tasks from the 'tasks1' table
        const [tasks] = await db.query('SELECT * FROM tasks1');
        res.render('dashboard', { tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send('Server Error');
    }
});

// POST create a new task
router.post('/tasks', async (req, res) => {
    const { title, description, status } = req.body;
    try {
        // Insert a new task into the 'tasks1' table
        await db.query(
            'INSERT INTO tasks1 (title, description, status) VALUES (?, ?, ?)', 
            [title, description, status || 'To-Do']
        );
        res.redirect('/');
    } catch (error) {
        console.error('Error creating a new task:', error);
        res.status(500).send('Server Error');
    }
});

// POST update a task's status
router.post('/tasks/:id/update', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    console.log(`Task ID: ${id}, New Status: ${status}`); // Debugging log

    try {
        await db.query('UPDATE tasks1 SET status = ? WHERE id = ?', [status, id]);
        res.redirect('/'); // Redirect to dashboard
    } catch (error) {
        console.error('Error updating task status:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;


