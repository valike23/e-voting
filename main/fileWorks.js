const fs = require('fs');
const path = require('path');
const ipcComm = {
settings : function(){
return JSON.parse(fs.readFileSync(path.join('C:\\e-voting','settings.json'))) ;
}
}
module.exports = ipcComm;