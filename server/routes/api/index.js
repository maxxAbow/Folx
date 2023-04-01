const expressRouter = require('express').Router;

const postRouter = require('./postRoute');
const userRouter = require('./userRoute');

expressRouter.use('/postRoute',postRouter);
expressRouter.use('userRoute',userRouter);

module.exports = expressRouter;