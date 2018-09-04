const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');
 
const config = {
  channelAccessToken: "XoQzgeXMaKY0NUGqMxmXoVy9pB57hge13lcBYNLUiLX5v4SPmmB7XcC9imxti9VFT3Ut7DF9Qt5TLDBrJqoO9TPL+lsxHNti3X1AgiLAt2sawBGJEdkyS9X3BUENI+okK2/qPdEfEtrwvczWNjafmAdB04t89/1O/w1cDnyilFU=",
  channelSecret: "182d385768d72dd4bee7d256e3ea5c5e",
};
 
// create LINE SDK client
const client = new line.Client(config);
const app = express();
 
// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((e)=>{
      console.log(e);
    });
 
});
 
function handleEvent(event) {
   var string = event.message.text
    if(string.includes("hai")){
      const echo = { type: 'text', text: "Halo juga :)·" };
      return client.replyMessage(event.replyToken, echo);
    }
 
    const echo = { type: 'text', text: "Saya tidak mengerti, saya simpan dulu" };
    return client.replyMessage(event.replyToken, echo);
}
 
// listen on port
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});