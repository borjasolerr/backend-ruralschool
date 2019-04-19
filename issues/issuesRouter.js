const express = require('express');

const db = require('../database/dbConfig.js');
const restricted = require('../auth/restrictedMiddleware.js');

const router = express.Router();

// Get all issues
// router.get("/", async, restricted, (req, res) => {
router.get('/', async (req, res) => {
  try {
    const issues = await db('issues as i').select('i.id', 'i.name', 'i.category', 'i.username', 'i.notes', 'i.logDate', 'i.status');
    res.status(200).json(issues);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: 'Failed to retrieve issues'
    });
  }
});

// Get issue by id
// router.get("/:id", async, restricted, (req, res) => {
router.get('/:id', async (req, res) => {
  try {
    const issue = await db('issues as i')
      .select('i.name', 'i.category', 'i.username', 'i.notes', 'i.logDate', 'i.status')
      .where('i.id', req.params.id)
      .first();
    if (issue) {
      res.status(200).json(issue);
    } else {
      res.status(404).json({
        message: 'The issue with the specified ID does not exist.'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: 'Failed to retrieve issue data'
    });
  }
});

// Create new issue
// router.post("/", async, restricted, (req, res) => {
router.post('/', async (req, res) => {
  if (!req.body.name || !req.body.category || !req.body.username || !req.body.logDate || !req.body.status) {
    res.status(422).json({ message: 'Please fill in all fields.' });
  } else {
    try {
      const [id] = await db('issues').insert(req.body, 'id');
      const issue = await db('issues')
        .where({ id })
        .first();
      res.status(201).json({
        message: 'Successfully created new issue.'
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error,
        message: 'Failed to create new issue.'
      });
    }
  }
});

// Update existing issue
// router.put("/:id", async, restricted, (req, res) => {
router.put('/:id', async (req, res) => {
  try {
    const count = await db('issues')
      .where({ id: req.params.id })
      .update(req.body);
    if (count > 0) {
      const issue = await db('issues')
        .where({ id: req.params.id })
        .first();
      res.status(200).json({
        message: 'Successfully updated issue data'
      });
    } else {
      res.status(404).json({
        message: 'The issue with the specified ID does not exist.'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: 'Failed to update issue data'
    });
  }
});

// Delete existing issue
// router.delete("/:id", async, restricted, (req, res) => {
router.delete('/:id', async (req, res) => {
  try {
    const count = await db('issues')
      .where({ id: req.params.id })
      .del();
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({
        message: 'The issue with the specified ID does not exist.'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: 'Failed to delete issue.'
    });
  }
});

module.exports = router;
