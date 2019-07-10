const app = require('./server');
const postsRouter = require('./posts/postRouter');
const usersRouter = require('./users/userRouter');

// app.use('/api/users', usersRouter);
// app.use('/api/posts', postsRouter);

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
