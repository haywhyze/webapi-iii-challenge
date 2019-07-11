const express = require('express');
const usersDB = require('./userDb');
const postDB = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
  const newUser = {
    name: req.body.name,
  };
  try {
    const newUserId = await usersDB.insert(newUser);
    const newUserData = await usersDB.getById(newUserId.id);
    return res.status(201).json(newUserData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'There was an error while saving the user to the database',
    });
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  const { text } = req.body;
  const newPost = {
    text,
    user_id: req.user.id,
  };
  try {
    const newPostId = await postDB.insert(newPost);
    const newPostData = await postDB.getById(newPostId.id);
    return res.status(201).json(newPostData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'There was an error while saving the post to the database',
    });
  }
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

router.get('/:id', validateUserId, async (req, res) => {
  res.status(200).send(req.user);
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    const getPosts = await usersDB.getUserPosts(req.user.id);
    if (getPosts.length) {
      return res.status(200).send(getPosts);
    }
    return res.status(200).send({
      data: 'The user has to posts to display',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'There was an error while getting the posts from the database',
    });
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  try {
    const deleteResponse = await usersDB.remove(req.user.id);
    if (deleteResponse === 1) {
      return res.status(200).json({
        message: 'User deleted successfully',
      });
    }
    return res.status(500).json({
      message: 'Server Error',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'The user could not be removed',
    });
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  const updatedUser = {
    name: req.body.name,
  };
  try {
    const updateResponse = await usersDB.update(req.user.id, updatedUser);
    // const updatedUserData = await usersDB.getById(updatedUserId.id);
    if (updateResponse === 1) {
      const updatedUserData = await usersDB.getById(req.user.id);
      return res.status(200).json(updatedUserData);
    }
    throw new Error();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'There was an error while saving the user to the database',
    });
  }
});

// custom middleware

async function validateUserId(req, res, next) {
  const id = Number(req.params.id);
  if (Number.isNaN(id) || id % 1 !== 0 || id < 0) {
    return res.status(400).send({
      message: 'invalid user id',
    });
  }
  try {
    const user = await usersDB.getById(id);
    if (!user) {
      return res.status(400).send({
        message: 'invalid user id',
      });
    }
    req.user = user;
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: 'The user information could not be retrieved.',
    });
  }
  return next();
}

function validateUser(req, res, next) {
  if (!Object.keys(req.body).length) {
    return res.status(400).send({
      message: 'missing user data',
    });
  }
  if (!req.body.name) {
    return res.status(400).send({
      message: 'missing required name field',
    });
  }
  return next();
}

function validatePost(req, res, next) {
  if (!Object.keys(req.body).length) {
    return res.status(400).send({
      message: 'missing post data',
    });
  }
  if (!req.body.text) {
    return res.status(400).send({
      message: 'missing required text field',
    });
  }
  return next();
}

module.exports = router;
