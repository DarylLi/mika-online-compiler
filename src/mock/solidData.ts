export const solidTemplates: any = [
	{
		filename: 'src',
		value: '',
		path: 'src',
		kind: 'directory',
		children: [
			{
				filename: 'index.html',
				value: `<!DOCTYPE html>
<head> </head>
<body>
    <div class="logo">
        <img
            src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20166%20155.3'%3e%3cpath%20d='M163%2035S110-4%2069%205l-3%201c-6%202-11%205-14%209l-2%203-15%2026%2026%205c11%207%2025%2010%2038%207l46%209%2018-30z'%20fill='%2376b3e1'/%3e%3clinearGradient%20id='a'%20gradientUnits='userSpaceOnUse'%20x1='27.5'%20y1='3'%20x2='152'%20y2='63.5'%3e%3cstop%20offset='.1'%20stop-color='%2376b3e1'/%3e%3cstop%20offset='.3'%20stop-color='%23dcf2fd'/%3e%3cstop%20offset='1'%20stop-color='%2376b3e1'/%3e%3c/linearGradient%3e%3cpath%20d='M163%2035S110-4%2069%205l-3%201c-6%202-11%205-14%209l-2%203-15%2026%2026%205c11%207%2025%2010%2038%207l46%209%2018-30z'%20opacity='.3'%20fill='url(%23a)'/%3e%3cpath%20d='M52%2035l-4%201c-17%205-22%2021-13%2035%2010%2013%2031%2020%2048%2015l62-21S92%2026%2052%2035z'%20fill='%23518ac8'/%3e%3clinearGradient%20id='b'%20gradientUnits='userSpaceOnUse'%20x1='95.8'%20y1='32.6'%20x2='74'%20y2='105.2'%3e%3cstop%20offset='0'%20stop-color='%2376b3e1'/%3e%3cstop%20offset='.5'%20stop-color='%234377bb'/%3e%3cstop%20offset='1'%20stop-color='%231f3b77'/%3e%3c/linearGradient%3e%3cpath%20d='M52%2035l-4%201c-17%205-22%2021-13%2035%2010%2013%2031%2020%2048%2015l62-21S92%2026%2052%2035z'%20opacity='.3'%20fill='url(%23b)'/%3e%3clinearGradient%20id='c'%20gradientUnits='userSpaceOnUse'%20x1='18.4'%20y1='64.2'%20x2='144.3'%20y2='149.8'%3e%3cstop%20offset='0'%20stop-color='%23315aa9'/%3e%3cstop%20offset='.5'%20stop-color='%23518ac8'/%3e%3cstop%20offset='1'%20stop-color='%23315aa9'/%3e%3c/linearGradient%3e%3cpath%20d='M134%2080a45%2045%200%2000-48-15L24%2085%204%20120l112%2019%2020-36c4-7%203-15-2-23z'%20fill='url(%23c)'/%3e%3clinearGradient%20id='d'%20gradientUnits='userSpaceOnUse'%20x1='75.2'%20y1='74.5'%20x2='24.4'%20y2='260.8'%3e%3cstop%20offset='0'%20stop-color='%234377bb'/%3e%3cstop%20offset='.5'%20stop-color='%231a336b'/%3e%3cstop%20offset='1'%20stop-color='%231a336b'/%3e%3c/linearGradient%3e%3cpath%20d='M114%20115a45%2045%200%2000-48-15L4%20120s53%2040%2094%2030l3-1c17-5%2023-21%2013-34z'%20fill='url(%23d)'/%3e%3c/svg%3e"
        />
    </div>
    <div id="solidRoot"></div>
</body>

`,
				path: 'src/index.html'
			},
			{
				filename: 'index.js',
				value: `// https://www.solidjs.com/guides/getting-started#buildless-options
import { createSignal } from 'https://esm.sh/solid-js@1.8.14';
import { render } from 'https://esm.sh/solid-js@1.8.14/web';

/* 
  https://github.com/solidjs/solid/tree/main/packages/solid/h
  
  This is the least efficient way to use Solid as it 
  requires a slightly larger runtime that isn't 
  treeshakeable, and cannot leverage anything in the 
  way of analysis, so it requires manual wrapping of 
  expressions and has a few other caveats
  */
import h from 'https://esm.sh/solid-js@1.8.14/h';

const App = () => {
  const [count, setCount] = createSignal(0);
  const increment = (v) => v + 1;
  const onClick = () => setCount(increment);
  const showCount = () => \`Clicks: \${count()}\`;

  return h(
    'main',
    undefined,
    h('h1', undefined, 'Solid Page Start !'),
    h('button.increment', { onClick }, showCount),
    h(
      'p',
      undefined,
      'Visit ',
      h(
        'a.docs',
        { href: 'https://docs.solidjs.com/', target: '_blank' },
        'docs.solidjs.com'
      ),
      ' to learn how to build SolidJS apps.'
    )
  );
};
render(App, document.body);`,
				path: 'src/index.js'
			},
			{
				filename: 'index.css',
				value: `body {
    font-family:
        Gordita, Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
        'Helvetica Neue', sans-serif;
}

a {
    margin-right: 1rem;
}
.logo{
  width: 100%;
  text-align: center;
}
.logo img{
  width: 200px;
}
main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
}

h1 {
    color: #335d92;
    text-transform: uppercase;
    font-size: 24px;
    font-weight: 100;
    line-height: 1.1;
    margin: 4rem auto;
    max-width: 14rem;
}

p {
    max-width: 14rem;
    margin: 2rem auto;
    line-height: 1.35;
}

@media (min-width: 480px) {
    h1 {
        max-width: none;
    }

    p {
        max-width: none;
    }
}

.increment {
    font-family: inherit;
    font-size: inherit;
    padding: 1em 2em;
    color: #335d92;
    background-color: rgba(68, 107, 158, 0.1);
    border-radius: 2em;
    border: 2px solid rgba(68, 107, 158, 0);
    outline: none;
    width: 200px;
    font-variant-numeric: tabular-nums;
}

.increment:focus {
    border: 2px solid #335d92;
}

.increment:active {
    background-color: rgba(68, 107, 158, 0.2);
}

.docs {
    margin: 0;
}
`,
				path: 'src/index.css'
			}
		]
	}
];
