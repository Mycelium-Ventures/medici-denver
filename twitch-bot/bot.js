if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const rewards = require('./rewards')

var moment = require('moment');
moment().format();

//oauth:k9pbuaxhjf47zcg95lz39dl8td5qx0
const tmi = require('tmi.js');

const BOT_USERNAME = process.env.BOT_USERNAME;
const CHANNEL_NAME = process.env.CHANNEL_NAME;

const SUB_REWARD = 10000; //10000x
const CHEER_REWARD = 10; //1000x
const PER_SECOND_DENOMINATOR = 1e3; //
const PER_SECOND_VIEW_REWARD = 1 / PER_SECOND_DENOMINATOR;

// Define configuration options
const opts = {
    options: { debug: true },
    identity: {
        username: process.env.BOT_USERNAME,
        password: "oauth:9zyfvbqp8vnexf2wltaczeocncwccw"//process.env.OAUTH_TOKEN
    },
    channels: [
        CHANNEL_NAME
    ],
    connection: {
		reconnect: true,
		secure: true
	}
};

const data = {}

// Create a client with our options
const client = new tmi.Client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

//client.emit = onEvent
// Connect to Twitch:
client.connect();

client.on("subscription", (channel, username, method, message, userstate) => {
    client.say(channel, `${username} subscribed! You've earned ${SUB_REWARD} MDI!`);
});


client.on("cheer", (channel, username, method, message, userstate) => {
    // Do your stuff.
    client.say(channel, `${username} cheered! You've earned ${CHEER_REWARD} MDI!`);
});

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    const username = context.username;
    //if (username === BOT_USERNAME) { return; }

    const channel = target;
    // Remove whitespace from chat message
    const commandName = msg.trim();
    //console.log(context);

    const roomId = context['room-id'];
    if (!data[roomId]) data[roomId] = {}

    const subscriber = context.subscriber;
    const userId = context['user-id'];
    const messageId = context.id;
    
    if (!data[roomId][userId]) data[roomId][userId] = {}

    const displayName = context['display-name'];
    console.log(`* command ${commandName}`);

    const medici = data[roomId][userId]['medici']
    const claim = data[roomId][userId]['claim']
    const notified = data[roomId]['notified']
    //http://google.com

    if (commandName === '!medici') {        
        if (!medici) { 
            const now = moment()
            data[roomId][userId]['medici'] = now;
            client.say(target, `${username} started MDI claim at ${now.format("h:mm:ss")}. End with !claim`);
        } else {
            client.say(target, `${username} already started MDI claim. End with !claim`);
            //client.deletemessage(channel, messageId);
        }
    } else if (commandName === '!claim') {
        if (medici) {
            //End claim
            const now = moment();
            const timespent = now.diff(medici, 'seconds');
            if (timespent < 1) {
                client.say(target, `${username} you must claim a minimum of 30s!`);
            } else {
                let reward = timespent * PER_SECOND_VIEW_REWARD;
                reward = Math.round(reward*PER_SECOND_DENOMINATOR)/PER_SECOND_DENOMINATOR;
                client.say(target, `${username} earned ${reward} nanoMDI for ${timespent}s!`);
                data[roomId][userId]['medici'] = false;
                data[roomId][userId]['claim'] = false;

                const rewardData = { 
                    "twitchId": userId, "videoId": roomId, 
                    "startTime": medici.valueOf(), "endTime": now.valueOf()
                }
                console.log(rewardData);
                rewards.rewardView(rewardData);
            }
        } else {
            client.say(target, `Hey ${username}, start claiming MDI with !medici`);
            //client.deletemessage(channel, messageId);
        }

    } else if (!notified || moment().diff(notified, 'seconds') > 5) {
        //Ignore
        client.say(target, `Start claiming MDI with !medici`);
        data[roomId]['notified'] = moment();
    }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
    //client.mod(CHANNEL_NAME, BOT_USERNAME)
}


/*
client.on('message', onMessageLogger)
client.on('roomstate', onMessageLogger)
client.on('join', onMessageLogger)
client.on('chat', onMessageLogger)

//raw_message
//_promiseJoin
//roomstate
//chat
//message
//raw_message
//connected
//logon
//pong
//join
*/