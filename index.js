const express = require('express');
const postsRouter = require('./posts/postRouter');
const usersRouter = require('./users/userRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to Lambda blogs',
  });
});

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

app.all('*', (req, res) => {
  res.status(404).send({
    status: 404,
    message: 'The resource you are looking for does not exist',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
