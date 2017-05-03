var faceService = require('../../../services/face-service'),
    handle = require('../../../handles/handle'),
    faceHandle = require('../../../handles/face-handle');

// 1. use case detect attached image
exports.faceDetect = function(stream, session){
    faceService
        .getFaceDetectStream(stream)
        .then(function (response) { faceHandle.handleDetectResponse(session, response); })
        .catch(function (error) { handle.handleErrorResponse(session, error); });
};

// 2. use case verify attached image elon musk
exports.getFaceDetectStream = function(stream, session){
    var faceId = '';
    faceService
        .getFaceDetectStream(stream)
        .then(function (response) { 
            faceId = faceHandle.getFaceId(response); 
            faceId2 = faceService
                .getFaceDetect(process.env.IMG_VERIFY_URL)
                .then(function (response) { 
                    var faceId2 = faceHandle.getFaceId(response); 

                    console.log("verify")
                    if(faceId != '' && faceId2 != ''){
                        faceService
                            .getFaceVerify(faceId, faceId2)
                            .then(function (response) { faceHandle.handleVerifyResponse(session, response); })
                            .catch(function (error) { handle.handleErrorResponse(session, error); });
                    }                            
                })
                .catch(function (error) { handle.handleErrorResponse(session, error); });
        })
        .catch(function (error) { handle.handleErrorResponse(session, error); });
};