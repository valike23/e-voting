"use strict";
const request = require('request');
var generator = require('generate-password');
const fs = require('fs');
const path = require('path');
let settings = JSON.parse(fs.readFileSync(path.join('C:\\e-voting','settings.json'))) ;
let students = {
getAllCandidates: function(resolve, reject){
 
    request(settings.url + "/candidates", { json: true }, (err, res, body) => {

  if (err) { return console.log(err);
reject(err);
 }

  console.log(res);
 resolve(res);
 return;
});
},
setCandidate: function(resolve, reject, args){
    console.log(args);
    let formData = {
        image: fs.createReadStream(args.image),
        firstname: args.firstname,
        lastname: args.lastname,
        matNo: args.matNo,
        position: args.position
    };
    console.log(args);
    request.post(settings.url + "/candidates", {formData: formData},function(err, res, body){
        if (err) {  console.log(err);
            reject(err);
            console.log("cut2")
 return;
             }
             resolve(res);
             console.log(res.body)
 return;
    })
}
}
module.exports= students;