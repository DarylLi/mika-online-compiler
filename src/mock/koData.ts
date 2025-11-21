export const koTemplates: any = [
	{
		filename: 'src',
		value: '',
		path: 'src',
		kind: 'directory',
		children: [
			{
				filename: 'index.html',
				value: `<div class="liveExample">
    <img class="head-img" src="https://knockoutjs.com/img/ko-logo.png" />
    <h1>This is KnockOut page !</h1>
    <p>First name: <input data-bind="value: firstName" /></p>
    <p>Last name: <input data-bind="value: lastName" /></p>
    <h2>Hello,</h2>
    <span class="bindName" data-bind="text: fullName">!</span>
    <p />
    You've clicked <span data-bind="text: numberOfClicks"></span> times
    <button data-bind="click: incrementClickCounter">Click me</button>
</div>

`,
				path: 'src/index.html'
			},
			{
				filename: 'index.js',
				value: `// Here's my data model
var ViewModel = function (first, last) {
    this.firstName = ko.observable(first);
    this.lastName = ko.observable(last);
    this.numberOfClicks = ko.observable(0);
    this.incrementClickCounter = function () {
        var previousCount = this.numberOfClicks();
        this.numberOfClicks(previousCount + 1);
    };
    this.fullName = ko.computed(function () {
        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
        return this.firstName() + ' ' + this.lastName();
    }, this);
};
console.log('start ko!')
ko.applyBindings(new ViewModel('KnockOut', 'Page')); // This makes Knockout get to work
`,
				path: 'src/index.js'
			},
			{
				filename: 'index.css',
				value: `html,
body {
    font-family: arial;
    font-size: 14px;
    height: 100%;
    margin: 0;
}
.bindName{
  font-size: 16px;
  color: #dedede;
  font-weight: bold;
}
.liveExample {
    box-sizing: border-box;
    width: auto;
    padding: 10px;
    background-color: #CF5300;
    height: 100%;
}
h1 {
    text-align: center;
    color: #fff;
}
.liveExample input {
    font-family: Arial;
}
.liveExample b {
    font-weight: bold;
}
.liveExample p {
    margin-top: 0.9em;
    margin-bottom: 0.9em;
}
.liveExample select[multiple] {
    width: 100%;
    height: 8em;
}
.liveExample h2 {
    margin-top: 0.4em;
    font-weight: bold;
    font-size: 1.2em;
}
`,
				path: 'src/index.css'
			}
		]
	}
];
