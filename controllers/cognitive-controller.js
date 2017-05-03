var faceStreamController = require('./face/stream/face-controller'),
    visionStreamController = require('./vision/stream/vision-controller'),
    faceUrlController = require('./face/url/face-controller'),
    visionUrlController = require('./vision/url/vision-controller');


exports.callStream = function(stream, session){
    // 1. use case detect attached image
//    faceStreamController.faceDetect(stream, session);

    // 2. use case verify attached image elon musk
//    faceStreamController.getFaceDetectStream(stream, session);

    // 3. use case image description from attached image
//    visionStreamController.getDescriptionFromStream(stream, session);        

    // 4. use case orc dni from attached image
    visionStreamController.getTextFromStream (stream, session);

    // 5. use case for ocr handwritten text from url
//    visionStreamController.getHandWrittenFromStream (stream, session);
};


exports.callUrl = function(url, session){
    // 1. use case detect from url
//    faceUrlController.faceDetect(url, session);

    // 2. use case verify from url elon musk
//    faceUrlController.getFaceDetectImage(url, session);

    // 3. use case image description from url  image
//    visionUrlController.getDescriptionFromImage(url, session);        

    // 4. use case orc dni from url  image
//    visionUrlController.getTextFromImage (url, session);

    // 5. use case for ocr handwritten text from url
    visionUrlController.getHandWrittenFromImage (url, session);
};