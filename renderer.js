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
$scope.signIn = function(){
 ipc.sendSync("loadDash");
}
})
app.controller("studentCtrl", function($scope, $rootScope, $state, $http){
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
