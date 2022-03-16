const express = require('express')
const app = express()
const port = 3000
const path = require('path');

const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
})

app.get('/translate', (req, res) => {
  
  // Add your `Subscription Key`  
  const subscriptionKey = "YOUR_SUBSCRIPTION_KEY";          

  // Add your `Location` (also known as region) e.g. `global` or `westeurope`
  const location = "YOUR_RESOURCE_LOCATION"; 

  axios({
    baseURL: 'https://api.cognitive.microsofttranslator.com',
    url: '/translate',
    method: 'post',
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Ocp-Apim-Subscription-Region': location,
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString(),
    },
    params: {
      'api-version': '3.0',
      'from': req.query.from,
      'to': req.query.to,
      "textType": "html",
    },
    data: [{
      'text': req.query.text
    }],
    responseType: 'json',
  }).then(function (response) {
    res.send(response.data[0])
  }).catch(function (error) {
    res.send(error)
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})