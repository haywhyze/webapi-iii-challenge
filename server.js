const express = require('express');
const postsRouter = require('./posts/postRouter');
const usersRouter = require('./users/userRouter');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(logger);

server.get('/', (req, res) => {
  res.send('<h2>Let\'s write some middleware!</h2>');
});

server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

server.all('*', (req, res) => {
  res.status(404).send({
    status: 404,
    message: 'The resource you are looking for does not exist',
  });
});

// custom middleware

function logger(req, res, next) {
  console.log('\nRequest Method ===> ', req.method);
  console.log('Request URL ===> ', req.url);
  console.log('Time Request was made ===> ', (new Date()).toUTCString(), '\n');
  return next();
}

module.exports = server;
