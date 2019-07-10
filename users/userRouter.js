const usersDB = require('./userDb');
const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', async (req, res) => {
  try {
    const getAll = await usersDB.get();
    if (getAll.length) {
      return res.status(200).send(getAll);
    }
    return res.status(200).send({
      data: 'No users to display',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'There was an error while getting the user from the database',
    });
  }
});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
