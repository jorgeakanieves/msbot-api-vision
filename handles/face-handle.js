
//=========================================================
// Response Handling
//=========================================================

exports.handleDetectResponse = function (session, response) {
   console.log("datos") 

    try {
        var data = JSON.parse(response);   
        data = data[0].faceAttributes
    } catch (e) {
        var data = response;         
        data = data[0].faceAttributes  
    }

    if (data) {
        var faceAttr = '';
        if(data.gender == 'male')   faceAttr+='I think He´s a male'
        else faceAttr+='I think She´s a female';
        faceAttr+=' about '+ Math.round(data.age);

        if(data.gender == 'male'){
            if(data.facialHair){
                var dataBefore= false;
                if(data.facialHair.moustache > 0.5){
                    faceAttr+=' with moustache';
                    dataBefore = true;
                }
                if(data.facialHair.beard > 0.5){
                    if(dataBefore) faceAttr+=', beard';
                    else faceAttr+=' with beard';
                    dataBefore = true;
                }
                if(data.facialHair.sideburns > 0.5){
                    if(dataBefore) faceAttr+=', sideburns';
                    else faceAttr+=' with sideburns';
                }                                
            }
        }
        if(data.glasses == "Glasses"){
            faceAttr+=' and perhaps glasses?';
        }          

        var emotion = '';
        for (var item in data.emotion) {

            if(data.emotion[item] > 0.2) {
                if(item!='neutral'){
                    emotion+=item;
                }
            }
            console.log(item);
            console.log(data.emotion[item]);
        }
        if(emotion != '')  faceAttr+= ". May be "+ emotion;
        
        session.send(faceAttr);
    }
    else {
        session.send('Couldn\'t find a caption for this one');
    }
};


/*
function handleDetectResponse(session, response) {
    console.log("datos") 

    try {
        var data = JSON.parse(response);   
        data = data[0].faceAttributes
    } catch (e) {
        var data = response;         
        data = data[0].faceAttributes  
    }

    if (data) {
        var faceAttr = '';
        if(data.gender == 'male')   faceAttr+='I think He´s a male'
        else faceAttr+='I think She´s a female';
        faceAttr+=' about '+ Math.round(data.age);

        if(data.gender == 'male'){
            if(data.facialHair){
                var dataBefore= false;
                if(data.facialHair.moustache > 0.5){
                    faceAttr+=' with moustache';
                    dataBefore = true;
                }
                if(data.facialHair.beard > 0.5){
                    if(dataBefore) faceAttr+=', beard';
                    else faceAttr+=' with beard';
                    dataBefore = true;
                }
                if(data.facialHair.sideburns > 0.5){
                    if(dataBefore) faceAttr+=', sideburns';
                    else faceAttr+=' with sideburns';
                }                                
            }
        }
        if(data.glasses == "Glasses"){
            faceAttr+=' and perhaps glasses?';
        }          

        var emotion = '';
        for (var item in data.emotion) {

            if(data.emotion[item] > 0.2) {
                if(item!='neutral'){
                    emotion+=item;
                }
            }
            console.log(item);
            console.log(data.emotion[item]);
        }
        if(emotion != '')  faceAttr+= ". May be "+ emotion;
        
        session.send(faceAttr);
    }
    else {
        session.send('Couldn\'t find a caption for this one');
    }

}
*/
exports.getFaceId = function ( response) {
    try {
        var data = JSON.parse(response);   
        data = data[0].faceId
    } catch (e) {
        var data = response;         
        data = data[0].faceId  
    }
    console.log("img id:" + data)
    return data;
}

/*
function getFaceId(response) {
    var data = response[0].faceId;    
    console.log("img id:" + data)
    return data;
}
*/

exports.handleVerifyResponse = function ( session, response) {
    if(response.isIdentical == true){
        session.send('Hi Elon. You´re validated ;)');    
    } else {
        session.send('You´re not the person that I´ve stored on my database so You´re not validated...(Tip: Search an image from Elon Musk)');    
    }    
}
/*
function handleVerifyResponse(session, response) {
    if(response.isIdentical == true){
        session.send('Hi Elon. You´re validated ;)');    
    } else {
        session.send('You´re not the person that I´ve stored on my database so You´re not validated...(Tip: Search an image from Elon Musk)');    
    }
}
*/




