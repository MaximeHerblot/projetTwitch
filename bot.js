const tmi = require('tmi.js');
const config = require('config');
const quotes = require('popular-movie-quotes');
const channelName = config.get('channelName');
const request = require('postman-request');
const Express = require('express');
const app = Express();

const quoteList = (quotes.getSomeRandom(1));
const quote = quoteList[0].quote;
const movie = quoteList[0].movie;

// request('https://imsdb.com/scripts/Star-Wars-Revenge-of-the-Sith.html', function (error, response, body) {
//    // Print the HTML for the Google homepage.
//    index = body.indexOf("<body")
//   console.log( body.slice(index,index+300));
// });

// Define configuration options
const opts = {
  identity: {
    username: "NekagCitation",
    password: "oauth:25hi6o304wr562m66r5ebhwhfzzgyk"
  },
  channels: [
    channelName
  ]
};

// Create a client with our options
// Connect to Twitch:

const client = new tmi.client(opts);
async function connectionTwitch (){
    await client.connect();
}

connectionTwitch();


app.get("/", (req,res)=>{
    client.say(channelName,`${quote} - ${movie}`);
    console.log(`${quote} - ${movie}`, `Envoyé sur le channel ${channelName}`)
    res.send(`${quote} - ${movie}`);
})

app.listen(3000);
