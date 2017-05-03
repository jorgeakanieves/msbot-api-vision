exports.handleDetectResponse = function (session, caption) {
    if (caption) {
        session.send('I think it\'s ' + caption);
    }
    else {
        session.send('Couldn\'t find a caption for this one');
    }

}

exports.handleDetectResponse = function (session, error) {
    session.send('Oops! Something went wrong. Try again later.');
    console.error(error);
}