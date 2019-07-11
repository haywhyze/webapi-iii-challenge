const express = require('express');
const postDB = require('./postDb');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const getAll = await postDB.get();
    if (getAll.length) {
      return res.status(200).send(getAll);
    }
    return res.status(200).send({
      data: 'No posts to display',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'There was an error while getting the posts from the database',
    });
  }
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;