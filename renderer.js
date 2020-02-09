const ipc = require('electron').ipcRenderer;
const app = angular.module("myApp", []);
app.run(function($rootScope){
$rootScope.name = "Valentine Emmanuel";
let file = ipc.sendSync("load-run-data");
$rootScope.appSettings = file;
console.log(file);
})
