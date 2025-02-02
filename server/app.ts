import express, { Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { SectionModel, PressInfoInterface } from './schemas/index';
const uuid = require('uuid');
import fs from 'fs/promises';

dotenv.config();
mongoose.set('strictQuery', false);

const connectUrl = process.env.CONNECT_URL;
if (connectUrl) (async () => await mongoose.connect(connectUrl))();
const router = express.Router();

const app = express();
const port = 3001;

app.use(
  cors({
    origin: '*',
  })
);
app.use(bodyParser.json());

app.post('/section', async (req, res) => {
  const id = uuid.v4();
  try {
    const result = await SectionModel.create({
      id,
      ...req.body,
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});

app.get('/press', async (req, res) => {
  try {
    const press = await getPress();
    res.status(200).json(press);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

const getPress = async () => {
  try {
    const data = await fs.readFile('./mock/press.json', 'utf8');
    const press = JSON.parse(data) as PressInfoInterface[];
    return press;
  } catch (error) {
    throw error;
  }
};
const getPressInfo = (pressId: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const press: PressInfoInterface[] = await getPress();
      const result = press.filter((item: any) => item.pid === pressId);
      console.log(result);
      resolve(result[0]);
    } catch (error) {
      reject({ message: error });
    }
  });
};

app.get('/rolling-news', async (req, res) => {
  try {
    const data = await fs.readFile('./mock/rollingnews.json', 'utf8');
    const news: PressInfoInterface[] = JSON.parse(data);
    res.status(200).json(news);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

interface SectionInfoInterface {
  id: string;
  name: string;
  order: number;
  pressId: string;
  updatedAt?: Date;
  createdAt?: Date;
  press?: PressInfoInterface;
}

app.get('/section', async (req, res) => {
  const { pressId } = req.query;
  try {
    const [press, section] = await Promise.all([
      getPressInfo(String(pressId)),
      SectionModel.findOne({ pressId }),
    ]);
    if (section) {
      const data = section.toObject() as unknown extends SectionInfoInterface
        ? SectionInfoInterface
        : { press: unknown };
      data.press = press;
      res.status(200).json(data);
    }
    res.status(404).json({ message: '섹션을 찾을 수 없습니다.' });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default router;
