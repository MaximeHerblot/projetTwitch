const tmi = require('tmi.js');
const config = require('config');
const quotes = require('popular-movie-quotes');
const channelName = config.get('channelName');
const request = require('postman-request');
const Express = require('express');
const app = Express();
const username = (config.get('username'));
const password = (config.get('password'));



// request('https://imsdb.com/scripts/Star-Wars-Revenge-of-the-Sith.html', function (error, response, body) {
//    // Print the HTML for the Google homepage.
//    index = body.indexOf("<body")
//   console.log( body.slice(index,index+300));
// });

// Define configuration options
const opts = {
  identity: {
    username: username,
    password: password
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

const numberReapet = config.get('numberRepeatedMessage');



function repeateSendMessage(){
  const quoteList = (quotes.getSomeRandom(numberReapet+1));
  
  for (let i = 0; i <= numberReapet ; i++) {
    setTimeout(()=>{
      
      quote = quoteList[i].quote;
      movie = quoteList[i].movie;
      console.log('Envoie message ',i, ` ${quote} ${movie} `);
      client.say(channelName,` ${quote} - ${movie} `);
    },config.get('timer')*i*1000);
    
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
