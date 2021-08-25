
const express = require("express");
const bodyParser = require("body-parser")
const request1 = require("request");
const app = express();

app.use(bodyParser.json());

const merchantId = '7820cfca887c4ed28d8c185c1ded7ec3';
const urlKushki = 'https://api-uat.kushkipagos.com';

app.post('/subscriptions', async function(request, response){
  console.log(request.body);  
  var options = {
      method: 'POST',
      headers: {
        'Private-Merchant-Id': merchantId, // Replace with your Private merchant id
        'Content-Type': 'application/json'
      },
      url: urlKushki + '/subscriptions/v1/card', // Test environment
      body: request.body,
    json: true
  };
  await request1(options, function (error, response1, body) {
    if (error) throw new Error(error);
    console.log(body);
    //console.log(response1);
    response.send(body);
  });

});

app.post('/preAuthorization', async function(request, response){
  console.log(request.body);  
  
  var options = {
      method: 'POST',
      headers: {
        'Private-Merchant-Id': merchantId, // Replace with your Private merchant id
        'Content-Type': 'application/json'
      },
      url: 'https://api-uat.kushkipagos.com/card/v1/preAuthorization', // Test environment
      body: request.body,
    json: true
  };
  await request1(options, function (error, response1, body) {
    if (error) throw new Error(error);
    console.log(body);
    response.send(body);
  });

});

app.post('/capture', async function(request, response){
  console.log(request.body);  
  
  var options = {
      method: 'POST',
      headers: {
        'Private-Merchant-Id': merchantId, // Replace with your Private merchant id
        'Content-Type': 'application/json'
      },
      url: urlKushki + '/card/v1/capture', // Test environment
      body: request.body,
    json: true
  };
  await request1(options, function (error, response1, body) {
    if (error) throw new Error(error);
    console.log(body);
    response.send(body);
  });

});
 
app.get("/", function(req, res) {
    res.send("PRUEBA TEST");
});

app.post('/preAuthorization/:subscriptionId', async function(request, response){
  console.log(request.params.subscriptionId);
  const subscriptionId = request.params.subscriptionId;
  console.log(subscriptionId);
  console.log(request.body);  
  
  var options = {
    method: 'POST',
    headers: {
      'Private-Merchant-Id': merchantId, // Replace with your Private merchant id
      'Content-Type': 'application/json'
    },
    url: urlKushki + '/subscriptions/v1/card/' + subscriptionId + '/authorize', // Test environment
    body: request.body,
    json: true
  };
  await request1(options, function (error, response1, body) {
    if (error) throw new Error(error);
    console.log(body);
    response.send(body);
  });
});

app.post('/capture/:subscriptionId', async function(request, response){
  console.log(request.params.subscriptionId);
  const subscriptionId = request.params.subscriptionId;
  console.log(subscriptionId);
  console.log(request.body);  
  
  var options = {
    method: 'POST',
    headers: {
      'Private-Merchant-Id': merchantId, // Replace with your Private merchant id
      'Content-Type': 'application/json'
    },
    url: urlKushki + '/subscriptions/v1/card/' + subscriptionId + '/capture', // Test environment
    body: request.body,
    json: true
  };
  await request1(options, function (error, response1, body) {
    if (error) throw new Error(error);
    console.log(body);
    response.send(body);
  });
});

app.get("/info/:subscriptionId", async function(request, response){
  console.log(request.params.subscriptionId);
  const subscriptionId = request.params.subscriptionId;
  console.log(subscriptionId); 
  
  var options = {
    method: 'GET',
    headers: {
      'Private-Merchant-Id': merchantId, // Replace with your Private merchant id
      'Content-Type': 'application/json'
    },
    url: urlKushki + '/subscriptions/v1/card/search/' + subscriptionId, // Test environment
    //body: request.body,
    json: true
  };
  await request1(options, function (error, response1, body) {
    if (error) throw new Error(error);
    console.log(body);
    response.send(body);
  });
});


app.delete("/void/:ticketNumber", async function(request, response){
  //res.send("PRUEBA TEST");
  console.log(request.params.ticketNumber);
  const ticketNumber = request.params.ticketNumber;
  console.log(ticketNumber);
  console.log(request.body);  
  
  var options = {
    method: 'DELETE',
    headers: {
      'Private-Merchant-Id': merchantId, // Replace with your Private merchant id
      'Content-Type': 'application/json'
    },
    url: urlKushki + '/v1/charges/' + ticketNumber, // Test environment
    body: request.body,
    json: true
  };
  await request1(options, function (error, response1, body) {
    if (error) throw new Error(error);
    console.log(body);
    response.send(body);
  });
});

app.post("/transactions", async function(request, response){
  var queryObject = request.body;
  console.log(queryObject);
  var options = {
    method: 'GET',
    headers: {
      'Private-Merchant-Id': merchantId, 
      'Content-Type': 'application/json'
    },
    url: urlKushki + '/analytics/v1/transactions-list', // Test environment
    qs: queryObject
    //body: request.body,
    //json: true
  };
  await request1(options, function (error, response1, body) {
    if (error) throw new Error(error);
    console.log(body);
    response.send(body);
  });
});


app.listen(3000, function(){
  console.log("server is running on port 3000");
})