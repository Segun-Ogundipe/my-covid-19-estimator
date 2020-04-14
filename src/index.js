import '@babel/polyfill';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import X2JS from 'x2js';
import fs from 'fs';
import path from 'path';
import covid19ImpactEstimator from './estimator';

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
const accessLog = fs.createWriteStream(path.join(__dirname, '../access.log'), {
  flags: 'a'
});

app.use(
  morgan(':method\t\t:url\t\t:status :response-time seconds', {
    stream: accessLog
  })
);

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
