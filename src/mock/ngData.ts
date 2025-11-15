export const angularTemplates: any = [
	{
		filename: 'src',
		value: '',
		path: 'src',
		kind: 'directory',
		children: [
			{
				filename: 'index.html',
				value: ` <div ng-app="todoApp" ng-controller="TodoController">
      <h1>Angular page content </h1>
      <img src='https://angularjs.org/img/AngularJS-large.png'></img>
      <md-button class="md-raised md-primary">My Button</md-button>
      <div>
          <fieldset class="standard">
            <legend>Using <code>ng-model</code></legend>
            <div layout="column" layout-wrap layout-gt-sm="row" >
              <div flex-xs flex="50">
                <md-checkbox ng-model="data.cb1" aria-label="Checkbox 1">
                  Checkbox 1: {{ data.cb1 }}
                </md-checkbox>
              </div>
              <div flex-xs flex="50">
                <div layout-xs="column" flex-xs="100">
                  <md-checkbox
                    ng-model="data.cb2"
                    aria-label="Checkbox 2"
                    ng-true-value="'yup'"
                    ng-false-value="'nope'"
                    class="md-warn md-align-top-left" flex>
                  Checkbox 2 (md-warn)  <br/>
                  <span class="ipsum">
                    Duis placerat lectus et justo mollis, nec sodales orci congue. Vestibulum semper non urna ac suscipit.
                    Vestibulum tempor, ligula id laoreet hendrerit, massa augue iaculis magna,
                    sit amet dapibus tortor ligula non nibh.
                  </span>
                  <br/>
                  {{ data.cb2 }}
                </md-checkbox>
                </div>
              </div>
              <div flex-xs flex="50">
                <md-checkbox ng-disabled="true" aria-label="Disabled checkbox" ng-model="data.cb3">
                  Checkbox: Disabled
                </md-checkbox>
              </div>
              <div flex-xs flex="50">
                <md-checkbox ng-disabled="true" aria-label="Disabled checked checkbox" ng-model="data.cb4" ng-init="data.cb4=true">
                  Checkbox: Disabled, Checked
                </md-checkbox>
              </div>
              <div flex-xs flex="50">
                <md-checkbox md-no-ink aria-label="Checkbox No Ink" ng-model="data.cb5" class="md-primary">
                  Checkbox (md-primary): No Ink
                </md-checkbox>
              </div>
              <div flex-xs flex="50">
                <md-checkbox md-indeterminate
                    aria-label="Checkbox Indeterminate" class="md-primary">
                  Checkbox: Indeterminate
                </md-checkbox>
              </div>
              <div flex-xs flex="50">
                <md-checkbox md-indeterminate aria-label="Checkbox Disabled Indeterminate"
                    ng-disabled="true" class="md-primary">
                  Checkbox: Disabled, Indeterminate
                </md-checkbox>
              </div>
            </div>
          </fieldset>
        </div>
        <a href="https://material.angularjs.org/1.2.1/" target="_blank">see more angularjs material info</a>
        <div class="form-group">
          <label>添加新内容：</label>
          <input 
              type="text" 
              ng-model="newTask" 
              placeholder="输入名称..."
              ng-keypress="$event.keyCode == 13 && addItem()">
      </div>
      <div class="task-list">
      <md-button class="md-primary md-hue-2" ng-click="addItem()"> 添加</md-button>
          <div 
              class="task-item" 
              ng-repeat="task in tasks track by $index"
              ng-class="{completed: task.completed}">
              <span class="task-text" ng-click="toggleTask($index)">
                  {{task.text}}
              </span>
              <md-button class="md-accent md-hue-2" ng-click="deleteTask($index)">删除</md-button>
          </div>
      </div>
      
      <div class="stats">
          总数: {{tasks.length}}
      </div>
  </div>
</div>
<p/>
<h2>from extra :</h2>
<div id="second" ng-app="second" ng-controller="SecondController">
     <md-input-container class="md-icon-float md-block">
      <!-- Use floating label instead of placeholder -->
      <label>姓名</label>
      <input ng-model="user.name" type="text">
    </md-input-container>
  <div 
    class="task-item" 
    ng-repeat="task in lists track by $index"
    ng-class="{completed: task.completed}">
    <span class="task-text" ng-click="toggleTask($index)">
        {{task.text}}
    </span>
    <md-button class="md-primary md-hue-2" ng-click="deleteTask($index)">delete</md-button>
</div>
</div>
`,
				path: 'src/index.html'
			},
			{
				filename: 'index.js',
				value: `        var app = angular.module('todoApp', ['ngMaterial', 'ngAria', 'ngMessages']);
        
        // 创建控制器
        app.controller('TodoController', function($scope) {
            // 初始化数据
            $scope.tasks = [
                { text: 'item1', completed: true },
                { text: 'item2', completed: false }
            ];
            
            $scope.newTask = '';
            $scope.data = {};
            $scope.data.cb1 = true;
            $scope.data.cb2 = false;
            $scope.data.cb3 = false;
            $scope.data.cb4 = false;
            $scope.data.cb5 = false;
            $scope.addItem = function() {
                if ($scope.newTask.trim()) {
                    $scope.tasks.push({
                        text: $scope.newTask,
                        completed: false
                    });
                    $scope.newTask = '';
                }
            };
            
            // 切换任务状态
            $scope.toggleTask = function(index) {
                $scope.tasks[index].completed = !$scope.tasks[index].completed;
            };
            
            // 删除任务
            $scope.deleteTask = function(index) {
                $scope.tasks.splice(index, 1);
            };
            
            // 获取已完成任务数量
            $scope.getCompletedCount = function() {
                return $scope.tasks.filter(function(task) {
                    return task.completed;
                }).length;
            };
        });
      `,
				path: 'src/index.js'
			},
			{
				filename: 'index.css',
				value: `html{
  overflow: auto;
  background: #fff;
}
a{
  margin: 10px 0;
  color: rgb(170, 95, 107);
  display: block;
  text-decoration: none;
}
h1{
  text-align: center;
}
 body{
  height: 100%;
  font-size: 14px;
  background-color: #fff;
  border-radius: 10px;
  overflow: auto;
 }
 .ng-scope{
  padding: 10px;
 }html{
  overflow: auto;
  background: #fff;
}
a{
  margin: 10px 0;
  color: rgb(170, 95, 107);
  display: block;
  text-decoration: none;
}
h1{
  text-align: center;
}
 body{
  height: 100%;
  font-size: 14px;
  background-color: #fff;
  border-radius: 10px;
  overflow: auto;
 }
 .ng-scope{
  padding: 10px 0;
 }`,
				path: 'src/index.css'
			},
			{
				filename: 'extra.js',
				value: ` var app2 = angular.module('second', ['ngMaterial', 'ngAria', 'ngMessages']);

  // 创建控制器
  app2.controller('SecondController', function($scope) {
    // 初始化数据
    $scope.lists = [
        { text: '234', completed: true },
        { text: '343', completed: false }
    ];
    
    $scope.newTask = '';
    $scope.data = {};
    $scope.data.cb1 = true;
    $scope.data.cb2 = false;
    $scope.data.cb3 = false;
    $scope.data.cb4 = false;
    $scope.data.cb5 = false;
      // 删除任务
    $scope.deleteTask = function(index) {
        $scope.lists.splice(index, 1);
    };
    
  });
  angular.bootstrap(document.getElementById("second"), ['second']);
`,
				path: 'extra.js'
			}
		]
	}
];
