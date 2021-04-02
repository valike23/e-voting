const ipc = require('electron').ipcRenderer;
const app = angular.module("myApp", ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider){
$stateProvider.state({
  name: "dashboard",
  url: "/dashboard",
  templateUrl: "./templates/dash.htm",
  controller: "dashboardCtrl"
}).state({
   name: "student",
   url: "/student",
   templateUrl: "./templates/students.htm",
   controller: "studentCtrl"
 }).state({
   name: "position",
   url: "/position",
   templateUrl: "./templates/position.htm",
   controller: "positionCtrl"
 }).state({
   name: "candidate",
   url: "/candidate",
   templateUrl: "./templates/candidate.htm",
   controller: "candidateCtrl"
 }).state({
   name: "addCandidate",
   url: "/addcandidate",
   templateUrl: "./templates/addCandidate.htm",
   controller: "addCandidateCtrl"
 })
$urlRouterProvider.otherwise("/dashboard");

})
app.run(function($rootScope,$state){
   $rootScope.back ="dashboard";
   

   
   $rootScope.title = "";
   $rootScope.email = "ludike23@gmail.com";
$rootScope.name = "Valentine Emmanuel";
let file = ipc.sendSync("load-run-data");
$rootScope.appSettings = file;
console.log(file);
})
app.controller("loginCtrl", function($scope, $rootScope){
   $scope.user = {};
   $scope.admin = false;
$scope.signIn = function(){
   if($scope.admin){
      try{
         delete $scope.user.matNo;
      }
      catch(err){

      }
     
     ipc.sendSync("loadDash", $scope.user);
   }
   else{
      try{
         delete $scope.user.email;
      }
      catch(err){

      }
   ipc.sendSync("loginStudent", $scope.user);
   console.log("renderjs line 67");
   }
  
 
}
})
app.controller("studentCtrl", function($scope, $rootScope, $state){
   $scope.user;
   $scope.selected = [];
   $scope.toggle = function(student){
console.log(student);

if(student.checked){
   $scope.selected.push(student);
}
else{
 $scope.selected.splice( $scope.selected.indexOf(student),1);
}
console.log($scope.selected);
   }
   $scope.reload = function(){
      $scope.getAllStudents();
   }
   $scope.submitStudent = function(){
      $('#studentModal').modal('hide');
      console.log($scope.user);
   console.log(   ipc.sendSync("addStudent", $scope.user));
      $('#studentModal').modal('hide');
      $scope.getAllStudents();
   };
   
   $scope.getAllStudents = function(){
$scope.students = ipc.sendSync("loadStudents");
console.log($scope.students);
   }
   $scope.getAllStudents();
  $rootScope.title = "Students";
   })
app.controller("dashboardCtrl", function($scope, $rootScope, $state){
 
   $rootScope.title = "Dashboard";
  
$scope.addStudent = function(){
   console.log("trying...");

$rootScope.history.push("dashboard");
$state.go("student");

}
})
app.controller("positionCtrl", function($scope, $rootScope, $state, $http){
   console.log("position");
   $scope.position;
   $scope.selected = [];
   $scope.toggle = function(student){
console.log(student);

if(student.checked){
   $scope.selected.push(student);
}
else{
 $scope.selected.splice( $scope.selected.indexOf(student),1);
}
console.log($scope.selected);
   }
   $scope.reload = function(){
      $scope.getAllPositions();
   }
   $scope.submitPosition = function(){
      $('#positionModal').modal('hide');
      console.log($scope.position);
   console.log(   ipc.sendSync("addPosition", $scope.position));
      $('#positionModal').modal('hide');
   //   $scope.getAllPositions();
   };
   
   $scope.getAllPositions = function(){
$scope.positions = ipc.sendSync("loadPositions");
console.log($scope.positions);
   }
   $scope.getAllPositions();
  $rootScope.title = "Positions";
   })
   app.controller("candidateCtrl", function($scope, $rootScope, $state, $http){
    $scope.showImage = function(can){
       $scope.candidate = can;
       document.getElementById("candidateImage").src = can.image;
    }
      $scope.position;
      $scope.selected = [];
      $scope.toggle = function(student){
   console.log(student);
   
   if(student.checked){
      $scope.selected.push(student);
   }
   else{
    $scope.selected.splice( $scope.selected.indexOf(student),1);
   }
   console.log($scope.selected);
      }
      $scope.reload = function(){
         $scope.getAllCandidates();
      }
      $scope.submitPosition = function(){
         $('#positionModal').modal('hide');
         console.log($scope.position);
      console.log(   ipc.sendSync("addPosition", $scope.position));
         $('#positionModal').modal('hide');
      //   $scope.getAllPositions();
      };
      
      $scope.getAllCandidates = function(){
   $scope.candidates = ipc.sendSync("loadCandidates");
   console.log($scope.candidates);
      }
      $scope.getAllCandidates();
     $rootScope.title = "candidates";
      })
 
   app.controller("addCandidateCtrl", function($scope, $rootScope, $state){
$rootScope.title = "Add Candidate";
$scope.user = {};
$scope.positions = ipc.sendSync("loadPositions");
$scope.selectImage = function(){
 $scope.user.image =  ipc.sendSync("getPics")[0];
 console.log($scope.user.image);
};
$scope.upload = function(){
   ipc.sendSync("uploadCanditates", $scope.user);
}
   })

   var voteApp = angular.module("voteApp",['ui.router']);
   voteApp.run(function($rootScope){
      let file = ipc.sendSync("load-run-data");
       $rootScope.appSettings = file;
     //  $rootScope.vote = function(p, vp,pro,sg,sports,socials,finance, treasurer,)
     $rootScope.user = ipc.sendSync("loadUser");
      $rootScope.title = "Vote Dashboard"
   })
   voteApp.config(function($stateProvider, $urlRouterProvider){
      $stateProvider.state({
        name: "dashboard",
        url: "/dashboard",
        templateUrl: "./templates/vote/dash.htm",
        controller: "dashboardCtrl"
      }).state({
         name: "candidates",
          url: "/candidate",
         templateUrl: "./templates/vote/candidate.htm",
         controller: "candidateCtrl"
       })
      $urlRouterProvider.otherwise("/dashboard");
      
      })
voteApp.controller("dashboardCtrl", function($scope, $rootScope){
   $scope.getAllPositions = function(){
      $scope.positions = ipc.sendSync("loadPositions");
      console.log($scope.positions);
         }
         $scope.getAllPositions();
})
 
