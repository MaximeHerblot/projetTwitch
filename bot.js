const tmi = require('tmi.js');
const config = require('config');
const quotes = require('popular-movie-quotes');
const channelName = config.get('channelName');
const request = require('postman-request');
const Express = require('express');
const app = Express();



// request('https://imsdb.com/scripts/Star-Wars-Revenge-of-the-Sith.html', function (error, response, body) {
//    // Print the HTML for the Google homepage.
//    index = body.indexOf("<body")
//   console.log( body.slice(index,index+300));
// });

// Define configuration options
const opts = {
  identity: {
    username: "nekagcitation",
    password: "oauth:1ju6g3a43p4cvzz93yx3b34ujbb28m"
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

connectionTwitch().then(()=>{
  repeateSendMessage();
});

const time = config.get('numberRepeatedMessage');

function repeateSendMessage(){
  const quoteList = (quotes.getSomeRandom(time+1));
  quote = quoteList[0].quote;
  movie = quoteList[0].movie;
  console.log('Envoie message ',0, ` ${quote} ${movie} `);
  // client.say(channelName,` ${quote} - ${movie} `);
  for (let i = 1; i <= time ; i++) {
    setTimeout(()=>{
      
      quote = quoteList[i].quote;
      movie = quoteList[i].movie;
      console.log('Envoie message ',i, ` ${quote} ${movie} `);
      // client.say(channelName,` ${quote} - ${movie} `);
    },config.get('timer')*i);
    
  }
}




app.get("/", (req,res)=>{
    const quoteList = (quotes.getSomeRandom(1));
    quote = quoteList[0].quote;
    movie = quoteList[0].movie;
    client.say(channelName,`${quote} - ${movie}`);
    console.log(`${quote} - ${movie}`, `Envoyé sur le channel ${channelName}`)
    res.send(`${quote} - ${movie}`);
})

app.listen(3000);
