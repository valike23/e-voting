"use strict";
const request = require('request');
const fs = require('fs');
const path = require('path');
let settings = JSON.parse(fs.readFileSync(path.join('C:\\e-voting','settings.json'))) ;
let positions = {
getAllPositions: function(resolve, reject){
 
    request(settings.url + "/positions", { json: true }, (err, res, body) => {

  if (err) { 
reject(err);
return;
 }
 
 resolve(res);
 return;
});
},
setPosition: function(resolve, reject, args){
   
   
    console.log(args);
    request.post(settings.url + "/positions", {json:true, body:args},function(err, res, body){
        if (err) {  ;
            reject(err);
 return;
             }
             resolve(res);
 return;
    })
}
}
module.exports= positions;