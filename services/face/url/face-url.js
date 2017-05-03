var request = require('request').defaults({ encoding: null });

var FACE_URL = process.env.FACE_URL;

/** 
 * Gets the caption of the image from an image URL
 * @param {string} url The URL to an image.
 * @return {Promise} Promise with caption string if succeeded, error otherwise
 */
exports.getFaceDetect = function (url) {
    return new Promise(
        function (resolve, reject) {
            var requestData = {
                url: FACE_URL+'detect?returnFaceId=true&returnFaceLandmarks=false',
                qs: {
                    returnFaceAttributes: "age,gender,headPose,smile,facialHair,glasses,emotion" // -> uri + '?access_token=xxxxx%20xxxxx'
                },
                //returnFaceAttributes: "age,gender,headPose,smile,facialHair,glasses,emotion",
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.FACE_KEY,
                    "content-type": "application/json",
                },
                json: { 'url': url }
            };

            request.post(requestData, function (error, response, body) {
                if (error) {
                    console.log("------------error")
                    console.log(error)
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    console.log("------------error2")
                    console.log(body)
                    
                    reject(body);
                }
                else {
                    console.log("------------face detect service")
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
exports.getFaceVerify = function (faceId, faceId2) {
    console.log("img 1 : " + faceId + ", img2 : " + faceId2);

    return new Promise(
        function (resolve, reject) {
            var requestData = {
                url: FACE_URL+'verify',
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.FACE_KEY,
                    "content-type": "application/json",
                },
                json: { 'faceId1': faceId, 'faceId2': faceId2 }
            };

            request.post(requestData, function (error, response, body) {
                console.log(body)
                if (error) {
                    console.log("------------error")
                    console.log(error)
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    console.log("------------error2")
                    console.log(body)
                    
                    reject(body);
                }
                else {
                    console.log("------------face verify")
                    console.log(body)
                    resolve(body);
                }
            });
        }
    );
};