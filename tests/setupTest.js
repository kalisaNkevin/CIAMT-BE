import moongose from 'mongoose';
import { config } from 'dotenv';
import blogModel from '../src/models/blogModels';
import userModel from '../src/models/userModels';

config({ path: '.env' });

const DB_TEST = process.env.DATABASE_TEST.replace(
  '<PASSWORD>'DATABASE_PASSWORD,
  process.env.
);

 moongose.connect(DB_TEST).then(() => console.log('Test DB connected successful !'));

beforeEach(done => {
  userModel.deleteMany({}, function(err) {});
  blogModel.deleteMany({}, function(err) {});
  done();
});

afterEach(done => {
  userModel.deleteMany({}, function(err) {});
  blogModel.deleteMany({}, function(err) {});
  done();
});