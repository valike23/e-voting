"use strict";
const request = require('request');
const fs = require('fs');
const path = require('path');
let settings = JSON.parse(fs.readFileSync(path.join('C:\\e-voting','settings.json'))) ;
let admin = {
 login: function(resolve, reject, args){
    request.post(settings.url + "/adminLogin", {json:true, body:args},function(err, res, body){
        if (err) {  console.log(err);
            reject(err);
    return;
             }
             resolve(res);
    return;
    })
 }
}

module.exports = admin;