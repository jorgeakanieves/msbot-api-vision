// The exported functions in this module makes a call to Microsoft Cognitive Service Computer Vision API and return caption
// description if found. Note: you can do more advanced functionalities like checking
// the confidence score of the caption. For more info checkout the API documentation:
// https://www.microsoft.com/cognitive-services/en-us/Computer-Vision-API/documentation/AnalyzeImage

//var request = require('request').defaults({ encoding: null });
var request = require('request');

var visionUrlService = require('./vision/url/vision-url');
var visionStreamService = require('./vision/stream/vision-stream');


exports.getCaptionFromUrl = function (url) {
        return visionUrlService.getCaptionFromUrl(url);
}

exports.getDescriptionFromImage = function (url) {
        return visionUrlService.getDescriptionFromImage(url);
}

exports.getTextFromImage = function (url) {
        return visionUrlService.getTextFromImage(url);
}

exports.getHandWrittenFromImage = function (url) {
        return visionUrlService.getHandWrittenFromImage(url);
}

exports.getHandWrittenOperation = function (id) {
        return visionUrlService.getHandWrittenOperation(id);
}

/** streams */

exports.getCaptionFromStream = function (stream) {
        return visionStreamService.getCaptionFromStream(stream);
}

exports.getDescriptionFromStream = function (stream) {
        return visionStreamService.getDescriptionFromStream(stream);
}

exports.getTextFromStream = function (stream) {
        return visionStreamService.getTextFromStream(stream);
}

exports.getHandWrittenFromStream = function (stream) {
        return visionStreamService.getHandWrittenFromStream(stream);
}
