/*-----------------------------------------------------------------------------
An image caption bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

// This loads the environment variables from the .env file
require('dotenv-extended').load();

var builder = require('botbuilder'),
    //needle = require('needle'),
    restify = require('restify'),
    url = require('url'),
    validUrl = require('valid-url'),
    utils = require('./utils');
    cognitiveController = require('./controllers/cognitive-controller');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.post('/api/messages', connector.listen());

// Gets the caption by checking the type of the image (stream vs URL) and calling the appropriate caption service method.
var bot = new builder.UniversalBot(connector, function (session) { 
    if (utils.hasImageAttachment(session)) {
        var stream = utils.getImageStreamFromMessage(session.message);

        cognitiveController.callStream(stream, session);

    } else {

        var imageUrl = utils.parseAnchorTag(session.message.text) || (validUrl.isUri(session.message.text) ? session.message.text : null);
        if (imageUrl) {
            cognitiveController.callUrl(imageUrl, session);
        } else {
            session.send('Did you upload an image? I\'m more of a visual person. Try sending me an image or an image URL');
        }
    }
});

//=========================================================
// Bots Events
//=========================================================

//Sends greeting message when the bot is first added to a conversation
bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                var reply = new builder.Message()
                    .address(message.address)
                    .text('Hi! I am ImageCaption Bot. I can understand the content of any image and try to describe it as well as any human. Try sending me an image or an image URL.');
                bot.send(reply);
            }
        });
    }
});

