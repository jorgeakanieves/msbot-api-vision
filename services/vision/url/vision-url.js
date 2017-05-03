
var request = require('request').defaults({ encoding: null });

var VISION_URL = 'https://api.projectoxford.ai/vision/v1.0/analyze/?visualFeatures=Description&form=BCSIMG&subscription-key=' + process.env.MICROSOFT_VISION_API_KEY;
var VISION_NEW_URL = 'https://westus.api.cognitive.microsoft.com/vision/v1.0/describe';
var VISION_OCR_URL = 'https://westus.api.cognitive.microsoft.com/vision/v1.0/recognizeText';
var VISION_OCR2_URL = 'https://westus.api.cognitive.microsoft.com/vision/v1.0/textOperations/';

/** 
 * Gets the caption of the image from an image URL
 * @param {string} url The URL to an image.
 * @return {Promise} Promise with caption string if succeeded, error otherwise
 */
exports.getCaptionFromUrl = function (url) {
    return new Promise(
        function (resolve, reject) {
            var requestData = {
                url: VISION_URL,
                json: { 'url': url }
            };

            request.post(requestData, function (error, response, body) {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(body);
                }
                else {
                    console.log(body)
                    resolve(extractCaption(body));
                }
            });
        }
    );
};



/** 
 * Gets the caption of the image from an image URL
 * @param {string} url The URL to an image.
 * @return {Promise} Promise with caption string if succeeded, error otherwise
 */
exports.getDescriptionFromImage = function (url) {
    return new Promise(
        function (resolve, reject) {
            var requestData = {
                url: VISION_NEW_URL+'?maxCandidates=1',
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.MICROSOFT_VISION_API_KEY,
                    "content-type": "application/json",
                },                
                json: { 'url': url }
            };
        console.log("asas1")
        console.log(VISION_NEW_URL+'?maxCandidates=1')
        console.log(process.env.MICROSOFT_VISION_API_KEY)

            request.post(requestData, function (error, response, body) {
                        console.log("asas2")
                console.log(error)
                console.log(body)
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(body);
                }
                else {
                    console.log(body)
                    resolve(body);
                }
            });
        }
    );
};


/** 
 * Gets the caption of the image from an image URL
 * @param {string} url The URL to an image.
 * @return {Promise} Promise with caption string if succeeded, error otherwise
 */
exports.getTextFromImage = function (url) {
    return new Promise(
        function (resolve, reject) {
            var requestData = {
                url: VISION_OCR_URL+'?handwriting=false',
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.MICROSOFT_VISION_API_KEY,
                    "content-type": "application/json",
                },                
                json: { 'url': url }
            };

            request.post(requestData, function (error, response, body) {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(body);
                }
                else {
                    //console.log(body)
                    resolve(body);
                }
            });
        }
    );
};


/** 
 * Gets the caption of the image from an image URL
 * @param {string} url The URL to an image.
 * @return {Promise} Promise with caption string if succeeded, error otherwise
 */
exports.getHandWrittenFromImage = function (url) {
    return new Promise(
        function (resolve, reject) {
            var requestData = {
                url: VISION_OCR_URL+'?handwriting=true',
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.MICROSOFT_VISION_API_KEY,
                    "content-type": "application/json",
                },                
                json: { 'url': url }
            };

            request.post(requestData, function (error, response, body) {
                //console.log(response.headers['operation-location'])
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 202) {
                    reject(body);
                }
                else {
                    //console.log(response);
                    resolve(response.headers['operation-location']);
                }
            });
        }
    );
};


/** 
 * Gets the caption of the image from an image URL
 * @param {string} url The URL to an image.
 * @return {Promise} Promise with caption string if succeeded, error otherwise
 */
exports.getHandWrittenOperation = function (id) {

    return new Promise(
        function (resolve, reject) {
            var requestData = {
                url: VISION_OCR2_URL+id,
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.MICROSOFT_VISION_API_KEY,
                    "operationId": id, 
                    "content-type": "application/json",
                }
            };

            //console.log(VISION_OCR2_URL+id);

            request.get(requestData, function (error, response, body) {
                //console.log(body.status)
              //  console.log(body)
               // console.log(response.statusCode)
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(body);
                }
                else {
                    resolve(body);                    
                }
            });
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