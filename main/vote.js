"use strict";
const request = require('request');
const fs = require('fs');
const path = require('path');
let settings = JSON.parse(fs.readFileSync(path.join('C:\\e-voting','settings.json')));


let vote = {

}

module.exports = vote;