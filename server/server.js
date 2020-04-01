const express = require('express');
const app = express();
const request = require('request');

app.use(express.static('public'));
/*port 3001*/
app.get('/game', (req, res) => {
  request("http://localhost:3002/game", (err, response, body) => {
    if(err) {
      res.status(400);
      res.send(err);
    } else {
      res.status(200);
      res.send(body);
    }
  });
});

/*port 3002*/
app.get('/games/:uid', (req, res) => {
  request("http://localhost:3002/games/"+ req.params.uid, (err, response, body) => {
    if(err) {
      res.status(400);
      res.send(err);
    } else {
      res.status(200);
      res.send(body);
    }
  });
});

app.get('/screenshots', (req, res) => {
  request("http://localhost:3002/screenshots", (err, response, body) => {
    if(err) {
      res.status(400);
      res.send(err);
    } else {
      res.status(200);
      res.send(body);
    }
  });
});

app.get('/videos', (req, res) => {
  request("http://localhost:3002/videos", (err, response, body) => {
    if(err) {
      res.status(400);
      res.send(err);
    } else {
      res.status(200);
      res.send(body);
    }
  });
});

// ERIC'S APIS
app.get('/reviews', (req, res) => {
  console.log('TRYING TO GET REVIEWS');
  let options = {
    url: 'http://localhost:3005/reviews',
    json: true,
    body: req.query
  };

  request(options, function(error, response, body) {
    if (error) { console.error('Could not get reviews data', error); }
    console.log('Type of reviews object is ' + typeof body);
    res.send(body);
  });
});

app.get('/recent', (req, res) => {
  console.log('TRYING TO GET RECENT');
  let options = {
    url: 'http://localhost:3005/recent',
    json: true,
    body: req.query
  };
  
  request(options, function(error, response, body) {
    if (error) { console.error('Could not get reviews data', error); }
    console.log('Type of reviews object is ' + typeof body);
    res.send(body);
  });
});

app.post('/review/vote', (req, res) => {
  const data = {
    post_id: req.body.post_id,
    helpfulness: req.body.helpfulness
  };

  const options = {
    url: 'http://localhost:3005/review/vote',
    method: 'POST',
    json: true,
    form: data
  };

  request(options , function(error, response, body) {
    if (error) { console.error('Could not get reviews data', error); }
    console.log('Type of reviews object is ' + typeof body);
    res.send(body);
  });
});

app.get('/reviews/filters', (req, res) => {
  request('http://localhost:3005/reviews/filters', function(error, response, body) {
    if (error) { console.error('Could not get languages', error); }
    res.send(JSON.parse(body));
  });
});

app.get('/reviews/comments', (req, res) => {
  console.log('TRYING TO GET COMMENTS');
  let options = {
    url: 'http://localhost:3005/reviews/comments',
    json: true,
    body: req.query
  };

  request(options, function(error, response, body) {
    if (error) { console.error('Could not get reviews data', error); }
    console.log('Type of reviews object is ' + typeof body);
    res.send(body);
  });
});

app.post('/reviews/comment', (req, res) => {
  const options = {
    url: 'http://localhost:3005/reviews/comment',
    method: 'POST',
    json: true,
    form: req.body.data
  };

  request(options , function(error, response, body) {
    if (error) { console.error('Could not get reviews data', error); }
    console.log('Type of reviews object is ' + typeof body);
    res.send(body);
  });
});

app.get('/graphOverall', (req, res) => {
  request('http://localhost:3005/graphOverall', function(error, response, body) {
    if (error) { console.error('Could not get graph data', error); }
    res.send(JSON.parse(body));
  });
})

app.get('/graphRecent', (req, res) => {
  console.log('ROUTE TO ERIC');
  request('http://localhost:3005/graphRecent', function(error, response, body) {
    if (error) { console.error('Could not get graph data', error); }
    res.send(JSON.parse(body));
  });
})


app.listen(3000, (req, res) => {
  console.log('listening to port 3000...');
})