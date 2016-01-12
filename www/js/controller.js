angular.module('starter').controller('TodoCtrl', function($scope, $localForage){
   
    $scope.model = {};
    $scope.items = [];
    
      $localForage.getItem('myItems').then(function(data) {

          if(data){
            $scope.items = data;
          }
          
          getNumLeft();

        });
    
    $scope.$watch('items', function(newVal, oldVal){
    
        updateItems();
        
    }, true);
    
    function updateItems(){
        
        $localForage.setItem('myItems', $scope.items).then(function(){
               
        });
        
    }
    
    $scope.toggleDone = function(item){
      
        item.done = !item.done;
        getNumLeft();
        
    };
    
    $scope.onEnter = function(item){
        
        item.over = true;
        
    };
    
    $scope.removeItem = function(index){
      
        $scope.items.splice(index, 1);
        
        getNumLeft();
        
    };
    
    $scope.onLeave = function(item){
      
        item.over = false;
        
    };
    
    function getNumLeft(){
        
        var numLeft = 0;
        
        if($scope.items){

            for(var i=0;i<$scope.items.length;i++){

                var item = $scope.items[i];

                if(!item.done){

                    numLeft++;

                }

            }

            $scope.model.numLeft = numLeft;

        }
        
    }
    
    $scope.formSubmit = function(){
        
        addItem();
        
    }
    
    function addItem(){
        
        $scope.items.push({ title:$scope.model.newTodo });
            
        $scope.model.newTodo = '';

        getNumLeft();
        
    }
    
    getNumLeft();
    
});





