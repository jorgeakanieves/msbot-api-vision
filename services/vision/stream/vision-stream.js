var request = require('request').defaults({ encoding: null });

var VISION_URL = 'https://api.projectoxford.ai/vision/v1.0/analyze/?visualFeatures=Description&form=BCSIMG&subscription-key=' + process.env.MICROSOFT_VISION_API_KEY;
var VISION_NEW_URL = 'https://westus.api.cognitive.microsoft.com/vision/v1.0/describe';
var VISION_OCR_URL = 'https://westus.api.cognitive.microsoft.com/vision/v1.0/recognizeText';
var VISION_OCR2_URL = 'https://westus.api.cognitive.microsoft.com/vision/v1.0/textOperations/';

/** 
 *  Gets the caption of the image from an image stream
 * @param {stream} stream The stream to an image.
 * @return {Promise} Promise with caption string if succeeded, error otherwise
 */
exports.getCaptionFromStream = function (stream) {
    return new Promise(
        function (resolve, reject) {
            var requestData = {
                url: VISION_URL,
                encoding: 'binary',
                headers: { 'content-type': 'application/octet-stream' }
            };

            stream.pipe(request.post(requestData, function (error, response, body) {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(body);
                }
                else {
                    resolve(extractCaption(JSON.parse(body)));
                }
            }));
        }
    );
};




/** 
 * Gets the caption of the image from an image URL
 * @param {string} url The URL to an image.
 * @return {Promise} Promise with caption string if succeeded, error otherwise
 */
exports.getDescriptionFromStream = function (stream) {
    return new Promise(
        function (resolve, reject) {
            var requestData = {
                url: VISION_NEW_URL+'?maxCandidates=1',
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.MICROSOFT_VISION_API_KEY,
                    'content-type': 'application/octet-stream'
                },                          
                encoding: 'binary'
            };

            stream.pipe(request.post(requestData, function (error, response, body) {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(body);
                }
                else {
                    resolve(body);
                }
            }));
        }
    );
};


/** 
 * Gets the caption of the image from an image URL
 * @param {string} url The URL to an image.
 * @return {Promise} Promise with caption string if succeeded, error otherwise
 */
exports.getTextFromStream = function (stream) {
    return new Promise(
        function (resolve, reject) {
            var requestData = {
                url: VISION_OCR_URL+'?handwriting=false',
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.MICROSOFT_VISION_API_KEY,
                    'content-type': 'application/octet-stream'
                },                          
                encoding: 'binary'
            };

            stream.pipe(request.post(requestData, function (error, response, body) {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(body);
                }
                else {
                    resolve(body);
                }
            }));
            
        }
    );
};


/** 
 * Gets the caption of the image from an image URL
 * @param {string} url The URL to an image.
 * @return {Promise} Promise with caption string if succeeded, error otherwise
 */
exports.getHandWrittenFromStream = function (stream) {
    return new Promise(
        function (resolve, reject) {
            var requestData = {
                url: VISION_OCR_URL+'?handwriting=true',
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.MICROSOFT_VISION_API_KEY,
                    'content-type': 'application/octet-stream'
                },                          
                encoding: 'binary'
                
            };


            stream.pipe(request.post(requestData, function (error, response, body) {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 202) {
                    reject(body);
                }
                else {
                    resolve(response.headers['operation-location']);
                }
            }));
        }
    );
};


/**
 * Extracts the caption description from the response of the Vision API
 * @param {Object} body Response of the Vision API
 * @return {string} Description if caption found, null otherwise.
 */
function extractCaption(body) {
    if (body && body.description && body.description.captions && body.description.captions.length) {
        return body.description.captions[0].text;
    }

    return null;
}