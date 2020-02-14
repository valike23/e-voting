"use strict";
const request = require('request');
var generator = require('generate-password');
const fs = require('fs');
const path = require('path');
let settings = JSON.parse(fs.readFileSync(path.join('C:\\e-voting','settings.json'))) ;
let students = {
getAllStudents: function(resolve, reject){
 
    request(settings.url + "/students", { json: true }, (err, res, body) => {

  if (err) { return console.log(err);
reject(err);
 }
  console.log(body.url);
  console.log(res);
 resolve(res);
 return;
});
},
setStudent: function(resolve, reject, args){
    var password = generator.generate({
        length: 10,
        numbers: true
    });
    args.password = password;
    console.log(args);
    request.post(settings.url + "/students", {json:true, body:args},function(err, res, body){
        if (err) {  console.log(err);
            reject(err);
 return;
             }
             resolve(res);
 return;
    })
}
}
module.exports= students;