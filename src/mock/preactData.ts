export const preactTemplates: any = [
	{
		filename: 'src',
		value: '',
		path: 'src',
		kind: 'directory',
		children: [
			{
				filename: 'index.html',
				value: `<h1>This is Preact page</h1>
<img src="https://preactjs.com/branding/logo-text.svg" />
<div id='app'></div>
`,
				path: 'src/index.html'
			},
			{
				filename: 'index.js',
				value: `import {
    html,
    render,
    useReducer,
    useState
} from '//unpkg.com/htm/preact/standalone.mjs';

function Toggle(props) {
    const [count, setCount] = useState(0);
    const [on, toggle] = useReducer((x) => !x, props.on);
    const [list, setList] = useState([
        { text: 'Write my first post', completed: true },
        { text: 'Buy new groceries', completed: false },
        { text: 'Walk the dog', completed: false }
    ]);
    return html\`
        <div class="counter-container">
            <button onClick=\${() => setCount(count + 1)}>Increment</button>
            <input readonly value=\${count} />
            <button onClick=\${() => setCount(count - 1)}>Decrement</button>
        </div>
        <label>
            <input type="checkbox" value=\${on} onClick=\${toggle} />
            Check Me
        </label>
        <output>\${on && 'check'}mate</output>
        <div class="counter-list">
            \${list.map(
                (item) => html\`
                    <li key="\${item.text}">content: \${item.text}</li>
                \`
            )}
        </div>
    \`;
}

render(html\`<\${Toggle} />\`, document.querySelector('#app'));
`,
				path: 'src/index.js'
			},
			{
				filename: 'index.css',
				value: `body {
  font: 16px system-ui;
  padding: 20px;
  background-color: #38235c;
  color: #fff
}
h1{
  font-size: 34px;
  font-weight: 500;
  width: 100%;
  text-align: center;
}
#app{
  margin-top: 30px;
}
label {
  display: inline-flex;
  padding: 5px;
  background: #ddd;
  border: 1px solid #bbb;
  border-radius: 5px;
  user-select: none;
}
output {
  display: inline-flex;
  margin-left: 10px;
  border: 1px solid #abc;
  padding: 5px 10px;
  background: #ace;
}
.counter-container {
  margin-bottom: 40px;
    input, button {
        margin: 0.5rem;
        text-align: center;
    }
}
.counter-list{
  margin-top: 40px;
  li{
    margin: 10px 0;
  }
}`,
				path: 'src/index.css'
			}
		]
	}
];
