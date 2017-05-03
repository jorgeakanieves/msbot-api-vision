
exports.handleDescriptionResponse = function ( session, response) {

console.log(response)
    try {
        var data = JSON.parse(response);   
        data = data.description
    } catch (e) {
        var data = response;         
        data = data.description
    }

    var tags = '';
    if(data.tags){
        
        for (var item in data.tags) {
            tags+='"'+data.tags[item]+'"' + ' ';
        }
        tags = "These are the tags related to your image: " + tags + '....Enough?? :)';
    }
    var captions = '';
    if(data.captions){
        console.log(data.captions)
        for (var item in data.captions) {
            captions+=  data.captions[item].text + '.';
        }
        captions = "And this is the description about You: \"" + captions + '"';        
    }
    if ( tags != '' || captions != ''){
        session.send('I can say You something about your image...');    
        session.send(tags);    
        session.send(captions);    
    }    
}

/*
function handleDescriptionResponse(session, response) {

    var tags = '';
    if(response.description.tags){
        
        for (var item in response.description.tags) {
            tags+='"'+response.description.tags[item]+'"' + ' ';
        }
        tags = "These are the tags related to your image: " + tags + '....Enough?? :)';
    }
    var captions = '';
    if(response.description.captions){
        console.log(response.description.captions)
        for (var item in response.description.captions) {
            captions+=response.description.captions[item].text + '.';
        }
        captions = "And this is the description about You: \"" + captions + '"';        
    }
    if ( tags != '' || captions != ''){
        session.send('I can say You something about your image...');    
        session.send(tags);    
        session.send(captions);    
    }
}
*/



exports.handleTextResponse = function(session, response) {

    try {
        var data = JSON.parse(response);   
        data = data.regions
    } catch (e) {
        var data = response;         
        data = data.regions
    }

    var txt = '';
    if(data){
        
        for (var item in data) {
            for (var item2 in data[item].lines) {
                for (var item3 in data[item].lines[item2].words) {
                    var word = data[item].lines[item2].words[item3].text;
                    console.log(word);
                    var string = word,expr = /\d{8}[A-Z]{1}/;
                    console.log(expr.test(string));

                    if(expr.test(string) == true){
                        txt = "The dni is: " + expr.exec(word)[0];
                        console.log(txt)
                        break;
                    }
                }
            }
        }
    }
    console.log('DNI: ' + txt)
    if ( txt != '' ){
        session.send('I can recognize a dni in your image...');    
        session.send(txt);    
    }
};


exports.handleHandWrittenResponse = function (session, response) {

    try {
        var jsonResponse = JSON.parse(response);   
    } catch (e) {
        var jsonResponse = response;         
    }

    var words = '';
    if(jsonResponse.status == 'Succeeded'){
        var lines = jsonResponse.recognitionResult.lines;

        var linespos = [];
        for(var i = 0; i<lines.length; i++){
            words += '"' + lines[i].text+ '"' + '\n\n';
        }
       
    }
    console.log(words)
    if ( words != '' ){
        session.send('I can recognize some text inside the image...');    
        session.send(words);    
    }

    //session.send('You´ve to wait a few minutes and I can recognize some text inside the image...');    

};

