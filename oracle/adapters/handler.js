'use strict';

const hello = require("./adapters/hello").default;
const cryptocompare = require("./adapters/cryptocompare").default;
const coinmarketcap = require("./adapters/coinmarketcap").default;
const slack = require("./adapters/slack").default;
const nodestats = require("./adapters/nodestats").default;
const jsonmask = require("./adapters/jsonmask").default;
const oauth = require("./adapters/oauth").default;
const youtube = require("./adapters/youtube").default;
const youtubeLikes = require("./adapters/youtube").likes;
const youtubeSubscriptions = require("./adapters/youtube").subscriptions;
const youtubeVideos = require("./adapters/youtube").videos;

const ecrrecover = require("./adapters/ecrrecover").default;
const ecrdecrypt = require("./adapters/ecrdecrypt").default;
const ethtx2 = require("./adapters/ethtx2").default;
const encodeFunctionCall = require("./adapters/encodeFunctionCall").default;

const randomAddressID = require("./adapters/medici").randomAddressID;
const randomAddressAddress = require("./adapters/medici").randomAddressAddress;
const twitch = require("./adapters/twitch");

const proxy = require("./adapters/proxy").default;

const parseHTTPEventResponse = ({statusCode,  body}) => {
    return { statusCode: statusCode, body: JSON.stringify(body) }
}

const wrappedHandler = (handler) => {
    return async req => {
        const event = JSON.parse(req.body)
        try {
            const response = await handler(event)
            return parseHTTPEventResponse(response)
        } catch (error) {
            console.error(error)
            const response = {
                statusCode: 400,
                body: {
                    jobRunID: event.id,
                    status: "errored",
                    error: error
                }
            }
            return parseHTTPEventResponse(response)
        }
    }
}

module.exports.cryptocompare = wrappedHandler(cryptocompare)
module.exports.coinmarketcap = wrappedHandler(coinmarketcap)
module.exports.slack = wrappedHandler(slack)
module.exports.nodestats = wrappedHandler(nodestats)
module.exports.jsonmask = wrappedHandler(jsonmask)
module.exports.hello = wrappedHandler(hello)
module.exports.oauth = wrappedHandler(oauth)
module.exports.youtube = wrappedHandler(youtube)
module.exports.youtubeLikes = wrappedHandler(youtubeLikes)
module.exports.youtubeSubscriptions = wrappedHandler(youtubeSubscriptions)
module.exports.youtubeVideos = wrappedHandler(youtubeVideos)
module.exports.ecrrecover = wrappedHandler(ecrrecover)
module.exports.ecrdecrypt = wrappedHandler(ecrdecrypt)
module.exports.ethtx2 = wrappedHandler(ethtx2)
module.exports.encodeFunctionCall = wrappedHandler(encodeFunctionCall)

module.exports.randomAddressID = wrappedHandler(randomAddressID)
module.exports.randomAddressAddress = wrappedHandler(randomAddressAddress)

module.exports.twitchOAuth = wrappedHandler(twitch.oauth)
module.exports.twitchViewReward = wrappedHandler(twitch.viewReward)
module.exports.proxy = wrappedHandler(proxy)
