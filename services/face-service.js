// The exported functions in this module makes a call to Microsoft Cognitive Service Computer Vision API and return caption
// description if found. Note: you can do more advanced functionalities like checking
// the confidence score of the caption. For more info checkout the API documentation:
// https://www.microsoft.com/cognitive-services/en-us/Computer-Vision-API/documentation/AnalyzeImage

var request = require('request').defaults({ encoding: null });

var faceUrlService = require('./face/url/face-url');
var faceStreamService = require('./face/stream/face-stream');

exports.getFaceDetect = function (url) {
    return faceUrlService.getFaceDetect(url);
};
exports.getFaceDetectStream = function (stream) {
    return faceStreamService.getFaceDetect(stream);
};
exports.getFaceVerify = function (faceId, faceId2) {
    console.log(faceId)
    console.log(faceId2)
    return faceUrlService.getFaceVerify(faceId, faceId2);
};


