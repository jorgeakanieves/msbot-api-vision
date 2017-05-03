var visionService = require('../../../services/vision-service'),
    handle = require('../../../handles/handle'),
    visionHandle = require('../../../handles/vision-handle');


// 3. use case image description from attached image
exports.getDescriptionFromStream = function(stream, session){

    visionService
        .getDescriptionFromStream(stream)
        .then(function (response) { visionHandle.handleDescriptionResponse(session, response); })
        .catch(function (error) { handle.handleErrorResponse(session, error); });
};

// 4. use case orc dni from attached image
exports.getTextFromStream = function(stream, session){

    session.send('Wait for a few seconds for DNI recognition...');            
    visionService
        .getTextFromStream(stream)
        .then(function (response) { visionHandle.handleTextResponse(session, response); })
        .catch(function (error) { handle.handleErrorResponse(session, error); });
};


// 5. use case for ocr handwritten text from url
exports.getHandWrittenFromStream = function(stream, session){

    session.send('Wait for a few seconds for image processing...');            
    visionService
        .getHandWrittenFromStream(stream)
        .then(function (response) { 

            // ugly blocking
            var waitTill = new Date(new Date().getTime() + 3 * 1000);
            while(waitTill > new Date()){}
            
            var url = response.replace(/.*\//, '') 
            visionService
                .getHandWrittenOperation(url)
                .then(function (response) {
                    
                    visionHandle.handleHandWrittenResponse(session, response); 
                })
                .catch(function (error) { handle.handleErrorResponse(session, error); });

        })
        .catch(function (error) { handle.handleErrorResponse(session, error); });
};