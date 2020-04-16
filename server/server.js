require('newrelic');
const express = require('express');
const app = express();
const rp = require('request-promise');
const DOMAIN = require('../config/configServer')
const path = require('path');

app.use('/:id([0-9]*)', express.static(path.resolve(__dirname, '..', 'public')));

/*
 app.get('/content/:id', (req, res) => {
  const  gameId  = req.params.id
   rp(`http://34.221.201.10:3002/content/${gameId}`)
   .then((gameData)=> res.send(JSON.parse(gameData)))
   .catch((err)=>console.err('err:', err));
   });
*/

 app.get('/:service/:id', (req, res) => {
    const  service  = req.params.service;
    const  gameId  = req.params.id
     rp(`${DOMAIN[service]}/${service}/${gameId}`)
     .then((gameData)=> res.send(JSON.parse(gameData)))
     .catch((err)=>console.log('err:', err));
     });

app.listen(3000, () => 
  console.log('listening to port 3000...'));
