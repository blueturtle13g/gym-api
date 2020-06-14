import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import routes from 'routes';
import mongoose from 'mongoose';
import cors from 'cors';

mongoose.connect(process.env.MONGO_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
});
mongoose.set('debug', 'development');

const app = express();
app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use('/api', routes);

app.listen('3000', () => {
  console.log('app is running on port 3000');
});
