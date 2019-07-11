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

router.get('/:id', validatePostId, async (req, res) => {
  res.status(200).send(req.post);
});

router.delete('/:id', validatePostId, async (req, res) => {
  try {
    const deleteResponse = await postDB.remove(req.post.id);
    if (deleteResponse === 1) {
      return res.status(200).json({
        message: 'Post deleted successfully',
      });
    }
    return res.status(500).json({
      message: 'Server Error',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'The post could not be removed',
    });
  }
});

router.put('/:id', (req, res) => {

});

// custom middleware

async function validatePostId(req, res, next) {
  const id = Number(req.params.id);
  if (Number.isNaN(id) || id % 1 !== 0 || id < 0) {
    return res.status(400).send({
      message: 'invalid post id',
    });
  }
  try {
    const post = await postDB.getById(id);
    if (!post) {
      return res.status(400).send({
        message: 'invalid post id',
      });
    }
    req.post = post;
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: 'The post information could not be retrieved.',
    });
  }
  return next();
}

module.exports = router;
