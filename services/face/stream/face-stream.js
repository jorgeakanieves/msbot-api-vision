var request = require('request').defaults({ encoding: null });

var FACE_URL = process.env.FACE_URL;

exports.getFaceDetect = function (stream) {
    return new Promise(
        function (resolve, reject) {
            var requestData = {
                url: FACE_URL+'detect?returnFaceId=true&returnFaceLandmarks=false',
                qs: {
                    returnFaceAttributes: "age,gender,headPose,smile,facialHair,glasses,emotion" // -> uri + '?access_token=xxxxx%20xxxxx'
                },      
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.FACE_KEY,
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