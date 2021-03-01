const tmi = require('tmi.js');
const config = require('config');
const quotes = require('popular-movie-quotes');
const channelName = config.get('channelName');
const request = require('postman-request');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const username = (config.get('username'));
const password = (config.get('password'));



// request('https://imsdb.com/scripts/Star-Wars-Revenge-of-the-Sith.html', function (error, response, body) {
//    // Print the HTML for the Google homepage.
//    index = body.indexOf("<body")
//   console.log( body.slice(index,index+300));
// });

// Define configuration options

const listClient = {};
// Create a client with our options
// Connect to Twitch:


//Fonction pour retourné un client twitch

function tmiClient(username,password,channelName){
  const opts = {
    identity: {
      username: username,
      password: password
    },
    channels: channelName
  };
  return new tmi.client(opts);
}


async function connectionTwitchClient (username,password,channelName){
    const client = tmiClient(username,password,channelName);
    await client.connect();
    listClient[`${username}`] =client;

}

connectionTwitchClient(username,password,[channelName])
  .then(()=>{repeateSendMessage(channelName,username)})
  .catch(()=>{console.log("Le server n'a pas permit la connection")});


const numberReapet = config.get('numberRepeatedMessage');



function repeateSendMessage(channelName,namebot){
  

  const quoteList = (quotes.getSomeRandom(numberReapet+1));
  
  for (let i = 0; i <= numberReapet ; i++) {
    setTimeout(()=>{
      let client = listClient[namebot];
      quote = quoteList[i].quote;
      movie = quoteList[i].movie;
      console.log('Envoie message ',i, ` ${quote} ${movie} `);
      client.say(channelName,` ${quote} - ${movie} `);
    },config.get('timer')*i*1000);
    
  }
};




app.get("/", (req,res)=>{

})

http.listen(3000);
