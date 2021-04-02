// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path');
const process = require("process");
const settings = require("./main/fileWorks");
const students = require("./main/students");
const candidates = require("./main/candidates");
const admin = require("./main/admin");
const { session } = require('electron');
const dialog = require("electron").dialog;
let userData = {};

const positions = require("./main/positions");

const ipc = require("electron").ipcMain;
process.env.NODE_ENV = 'production';

let loginWindow;

ipc.on("load-run-data", function(event, arg){
  let file = settings.settings();
 
  
  event.returnValue = file;
  });
  ipc.on("loadDash", function(event, args){
    let myPromise = new Promise(function(resolve, reject){
      admin.login(resolve, reject,args)
     });
     myPromise.then(function(res){
console.log(res.body);
if(res.body[0]){
  userData = res.body[0];
  createDashbordWindow();
    loginWindow.close();
}else{
  event.returnValue = "login fail"
}
     }, function(err){
event.returnValue = "a server related error occured";
     })
  
    
    });
 ipc.on("loginStudent", function(event, args){
      console.log("mainjs line 46");
      let myPromise = new Promise(function(resolve, reject){
       students.login(resolve, reject,args)
       });
       myPromise.then(function(res){
  console.log(res.body);
  if(res.body[0]){
    userData = res.body[0];
    createVoteWindow();
      loginWindow.close();
  }else{
    event.returnValue = "login fail"
  }
       }, function(err){
  event.returnValue = "a server related error occured";
       })
    
      
      });
ipc.on("loadUser", function(event, args){
  event.returnValue = userData;
})
  ipc.on("loadStudents", function(event, args){
    let myPromise = new Promise(function(resolve, reject){
     students.getAllStudents(resolve, reject)
    })
  myPromise.then(function(res){
event.returnValue = res.body;
  })
  });
  ipc.on("loadPositions", function(event, args){
    let myPromise = new Promise(function(resolve, reject){
     positions.getAllPositions(resolve, reject)
    })
  myPromise.then(function(res){
event.returnValue = res.body;
  })
  });
  ipc.on("loadCandidates", function(event, args){
    let myPromise = new Promise(function(resolve, reject){
     candidates.getAllCandidates(resolve, reject)
    })
  myPromise.then(function(res){
event.returnValue = res.body;
  })
  });
  ipc.on("getPics", function(event){
dialog.showOpenDialog({
  title: "select Image",
  properties: ['openFile'],
  filters : [ {name: "Images", extensions:['jpg','png','gif']}]
}, function(files){
  if(files) event.returnValue = files;
})
  });
  ipc.on("uploadCanditates", function(events, args){
    let myPromise = new Promise(function(resolve, reject){
      candidates.setCandidate(resolve, reject,args)
     })
   myPromise.then(function(res){
 events.returnValue = res;
   }, function(err){
events.returnValue = err;
console.log(err);

   })
  })

  ipc.on("addStudent", function(event, args){
    let myPromise = new Promise(function(resolve, reject){
      students.setStudent(resolve, reject,args)
     })
   myPromise.then(function(res){
 event.returnValue = res;
   }, function(err){
event.returnValue = "error";
   })
  });
  ipc.on("addPosition", function(event, args){
    let myPromise = new Promise(function(resolve, reject){
      positions.setPosition(resolve, reject,args)
     })
   myPromise.then(function(res){
 event.returnValue = res;
   }, function(err){
event.returnValue = err;
   })
  })
function createWindow () {
  // Create the browser window.
   loginWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
     
      nodeIntegration: true
    }
  });
  loginWindow.loadFile('home.html');
 
  // mainWindow.webContents.openDevTools()
}
function createDashbordWindow(){
  
session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      ...details.responseHeaders,
      'Content-Security-Policy': ['default-src \'http://localhost:2020\'']
    }
  })
});
  const dashboardWindow = new BrowserWindow({
    width: 2000,
    height: 1000,
    webPreferences: {
      allowRunningInsecureContent: true,
      nodeIntegration: true
    }
  });
  dashboardWindow.loadFile('index.html');
}
function createVoteWindow(){
  
 
    const dashboardWindow = new BrowserWindow({
      width: 2000,
      height: 1000,
      webPreferences: {
        allowRunningInsecureContent: true,
        nodeIntegration: true
      }
    });
    dashboardWindow.loadFile('vote.html');
  }
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
