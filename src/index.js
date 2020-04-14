import '@babel/polyfill';
import express from 'express';
import cors from 'cors';
import X2JS from 'x2js';
import fs from 'fs';
import path from 'path';
import covid19ImpactEstimator from './estimator';

// Create global app object
const app = express();

const getTimeInMilliseconds = (startTime) => {
  const NS_PER_SEC = 1e9; // time in nano seconds
  const NS_TO_MS = 1e6; // time in milli seconds
  const timeDifference = process.hrtime(startTime);
  return (timeDifference[0] * NS_PER_SEC + timeDifference[1]) / NS_TO_MS;
};

const saveToFile = (data, filename) => {
  fs.appendFile(filename, `${data}\n`, (err) => {
    if (err) {
      throw new Error('The data could not be saved');
    }
  });
};

app.use(cors());

app.use((req, res, next) => {
  const { method, url } = req;
  const { statusCode } = res;
  const startTime = process.hrtime();
  const timeInMS = getTimeInMilliseconds(startTime).toLocaleString();
  const message = `${method}\t\t${url}\t\t${statusCode}\t\t${Math.floor(
    timeInMS
  )
    .toString()
    .padStart(2, '00')}ms`;
  const filePath = path.join(__dirname, 'request_logs.txt');

  saveToFile(message, filePath);
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/api/v1/on-covid-19', (req, res) => {
  const estimate = covid19ImpactEstimator(req.body);
  res.send(estimate);
});

app.post('/api/v1/on-covid-19/json', (req, res) => {
  const estimate = covid19ImpactEstimator(req.body);
  res.send(estimate);
});

app.post('/api/v1/on-covid-19/xml', (req, res) => {
  const xml = new X2JS();
  const estimate = xml.js2xml(covid19ImpactEstimator(req.body));

  res.set('Content-Type', 'application/xml');
  res.send(estimate);
});

app.get('/api/v1/on-covid-19/logs', (req, res) => {
  const log = fs.readFileSync(path.join(__dirname, '../access.log'), 'utf8');

  res.set('Content-Type', 'text/plain');
  res.send(log);
});

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${server.address().port}`);
});

export default app;
