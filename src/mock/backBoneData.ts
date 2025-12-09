export const backboneTemplates: any = [
	{
		filename: 'src',
		value: '',
		path: 'src',
		kind: 'directory',
		children: [
			{
				filename: 'index.html',
				value: `<div id="app" class="app">
<div class="backbonejs"></div>
<h1>Backbone.js Page</h1>
  <div id="app-hd" class="app-hd">
    <div class="tabs">
      <ul>
        <li><span>Home</span></li>
        <li><span>Dashboard</span></li>
        <li class="selected"><span>Project</span></li>
      </ul>
    </div>
  </div>
  <div id="app-bd" class="app-bd">
      <div class="select-container">
        Animation Type : 
        <div class="select-wrap">
          <select name="" id="">
            <option value="slide">Slide</option>
            <option value="fade">Fade</option>
          </select>
        </div>        
      </div>
  </div>
</div>

`,
				path: 'src/index.html'
			},
			{
				filename: 'index.js',
				value: `var AppHeaderView = Backbone.View.extend({
  el: $("#app-hd")[0],

  events: function() {
    return {
      "click .tabs li": this._tabClickHandler
    };
  },

  initialize: function(opt) {
    this.onTabChanged = opt.onTabChanged;
    this.module = "project";
  },

  _tabClickHandler: function($e) {
    var index = $($e.currentTarget).index();
    var module = "";
    switch (index) {
      case 0:
        module = "home";
        break;
      case 1:
        module = "dashboard";
        break;
      case 2:
        module = "project";
    }
    if (this.module == module) {
      return;
    }
    this.module = module;
    this.$(".tabs li").removeClass("selected").eq(index).addClass("selected");
    _.isFunction(this.onTabChanged) && this.onTabChanged(module);
  },

  changeToTab: function(module) {
    var index = 0;
    switch (module) {
      case "home":
        index = 0;
        break;
      case "dashboard":
        index = 1;
        break;
      case "project":
        index = 2;
    }
    this.$(".tabs li").removeClass("selected").eq(index).addClass("selected");
  }
});

var AppPageView = Backbone.View.extend({
  aniTypes: {
    fade: {
      in: "fade-in",
      out: "fade-out"
    },
    slide: {
      in: "slide-in",
      out: "slide-out"
    }
  },

  template: _.template("<h1><%=module%></h1>"),

  className: function() {
    return "app-page";
  },

  initialize: function(opt) {
    opt = _.extend({}, opt);
    this.aniType = this.aniTypes[opt.type || "fade"];
    this.open();
    this.viewModel = {
      module: opt.module
    };
    this.render();
  },

  open: function() {
    var self = this;
    this.$el
      .on("animationend", function() {
        self.$el.removeClass(self.aniType.in);
      })
      .addClass(this.aniType.in);
  },

  setAniType: function(type) {
    this.aniType = this.aniTypes[type || "fade"];
  },

  destroy: function() {
    var self = this;
    this.$el
      .on("animationend", function() {
        self.remove();
      })
      .addClass(this.aniType.out);
  },

  render: function() {
    this.$el.html(this.template(this.viewModel));
  }
});

var AppDashboardView = AppPageView.extend({
  className: function() {
    var superCls = AppPageView.prototype.className.call(this);
    return superCls + " dashboard";
  }
});

var AppHomePageView = AppPageView.extend({
  className: function() {
    var superCls = AppPageView.prototype.className.call(this);
    return superCls + " home";
  }
});

var AppProjectPageView = AppPageView.extend({
  className: function() {
    var superCls = AppPageView.prototype.className.call(this);
    return superCls + " project";
  }
});

var AppBodyView = Backbone.View.extend({
  el: $("#app-bd")[0],
  events: function() {
    return {
      "change .select-wrap select": this.aniTypeChange
    };
  },
  initialize: function() {},

  aniTypeChange: function($e) {
    var $select = $($e.currentTarget);
    this.aniType = $select.val();
    if (this.currentPageView) {
      this.currentPageView.setAniType(this.aniType);
    }
  },

  changeToPage: function(module) {
    if (this.currentPageView) {
      this.currentPageView.destroy();
    }
    var aniType = this.aniType;
    var newView;
    switch (module) {
      case "home":
        newView = new AppHomePageView({
          module: "Home Page",
          type: aniType
        });
        break;
      case "dashboard":
        newView = new AppDashboardView({
          module: "Dashboard Page",
          type: aniType
        });
        break;
      case "project":
        newView = new AppProjectPageView({
          module: "Project Page",
          type: aniType
        });
    }
    this.$el.append(newView.el);
    this.currentPageView = newView;
  }
});

var ApplicationView = Backbone.View.extend({
  el: $("#app")[0],

  initialize: function() {
    var self = this;
    this.hdView = new AppHeaderView({
      onTabChanged: function(module) {
        self.onAppTabChanged(module);
      }
    });
    this.bdView = new AppBodyView();

    this.bdView.changeToPage("project", true);
  },

  onAppTabChanged: function(module) {
    this.hdView.changeToTab(module);
    this.bdView.changeToPage(module);
  }
});

app.application = new ApplicationView();
`,
				path: 'src/index.js'
			},
			{
				filename: 'index.scss',
				value: `*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  font-size: 10px;
  height: 100%;
}

body {
  font-size: 2em;
  line-height: 1.5372;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .app-hd,
  .app-bd {
    position: absolute;
    left: 0;
    right: 0;
  }
}

.app-hd {
  background-color: #f0f0f0;
  .tabs {
    ul {
      height: 76px;
      display: flex;
      list-style: none;
      align-items: center;
      justify-content: center;
      li {
        display: inline-block;
        padding: 10px 20px;
        cursor: pointer;
        font-size: 14px;
        &.selected {
          color: #d11b1b;
        }
      }
    }
  }
}
.app-hd{
  top:275px;
}
.app-bd {
  top: 345px;
  bottom: 0;
  overflow: hidden;
  .app-page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    padding-top: 100px;
    color: white;
    &.home {
      background-color: #1abc9c;
    }
    &.dashboard {
      background-color: #34495e;
    }
    &.project {
      background-color: #9b59b6;
    }
  }
  
  .select-container{
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 2;
    color: white;
    .select-wrap{
      display: inline-block;
      position: relative;
      margin-left: 10px;
      select{
        background-image: none;
        -webkit-appearance: none ;
        border: 1px solid white;
        padding: 10px 40px;
        padding-right: 44px;
        background-color: transparent;
        outline: none;
        border-radius: 0;
        color: white;
        border-radius: 2px;
      }
       &:before{
          content: "";
          position: absolute;
          right: 10px;
          top: 50%;
          height: 2px;
          margin-top: -2px;
          display: block;
          border: 5px solid transparent;
          border-top-color: white;
          z-index: 1000;
        }
    }
  }
}

.slide-in {
  animation: slide-in .4s linear;  
  z-index: 1 ;
}

.slide-out {
  animation: slide-out .4s linear;
}

@keyframes slide-in {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0%);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
}

.fade-in{
  animation: fade-in .4s linear;
}

.fade-out{
  animation: fade-out .4s linear;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.backbonejs{
	position: absolute;
	left: 50%;
	top: 145px;
  width: 190px;
  height: 140px;
	border: solid #002A41 2em;
	border-left-width: 1.5em;
	border-right-width: 1.5em;
	transform: translate3d(-50%, -50%, 0) skewY(30deg);
	transform-style: preserve-3d;
	&:before{
	content:"";
		position: absolute;
		left: -1.5em;
		top: .7em;
		width: 3em;
		height: 3em;
		border: solid #0071B5 2em;
		border-left-width: 1.5em;
		border-right: none;
		transform: skewY(-50deg) translate3d(0,0,0);
	}
		&:after{
		content:"";
		position: absolute;
		left: 3em;
		top: -4.65em;
		width: 3em;
		height: 3em;
		border: solid #0071B5 2em;
		border-right-width: 1.5em;
		border-left: none;
		transform: skewY(-50deg) translate3d(0,0,-1px);
	}
}
h1{
	text-align: center;
	font-size: 16px;
	font-family: 'Lato', sans-serif;
	color: gray;
}


input[type="range"]{
	position: absolute;
	width: 100px;
	height: 20px;
	bottom: 20px;
	left: 0;
	right: 0;
	margin: auto;
}
input[type=range]:focus {
  outline: none;
}

`,
				path: 'src/index.scss'
			}
		]
	}
];
