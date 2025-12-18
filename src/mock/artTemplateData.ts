export const artTemplateTemplates: any = [
	{
		filename: 'src',
		value: '',
		path: 'src',
		kind: 'directory',
		children: [
			{
				filename: 'index.html',
				value: `<div class="header">
	<div class="header-text">
		<span class="header-text-words">A</span>
		<span class="header-text-words">R</span>
		<span class="header-text-words">T</span>
		<span class="header-text-words">T</span>
		<span class="header-text-words">E</span>
		<span class="header-text-words">M</span>
		<span class="header-text-words">P</span>
    <span class="header-text-words">L</span>
    <span class="header-text-words">A</span>
    <span class="header-text-words">T</span>
    <span class="header-text-words">E</span>
	</div>
</div>
<h2>original syntax</h2>
<div id="content"></div>`,
				path: 'src/index.html'
			},
			{
				filename: 'index.js',
				value: `var source =
    \`<div class="container my-12 mx-auto px-4 md:px-12">
    <div class="flex flex-wrap -mx-1 lg:-mx-4">\` +
    '<% for (var i = 0; i < list.length; i ++) { %>' +
    \`<div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <article class="overflow-hidden rounded-lg shadow-lg">
                <a href="mailto:m.bluth@example.com">
                    <img alt="Placeholder" class="block h-auto w-full" src="https://picsum.photos/600/400/?random">
                </a>
                <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                    <h1 class="text-lg">
                        <a class="no-underline hover:underline text-black" href="mailto:m.bluth@example.com">
                           主题——<%= list[i]['name'] %>
                        </a>
                    </h1>
                    <p class="text-grey-darker text-sm">
                        11/1/19
                    </p>
                </header>
                <footer class="flex items-center justify-between leading-none p-2 md:p-4">
                    <a class="flex items-center no-underline hover:underline text-black" href="mailto:m.bluth@example.com">
                        <img alt="Placeholder" class="block rounded-full" src="https://picsum.photos/32/32/?random">
                        <p class="ml-2 text-sm">
                            博主：<%= list[i]['name'] %> 
                        </p>
                    </a>
                    <a class="no-underline text-grey-darker hover:text-red-dark" href="mailto:m.bluth@example.com">
                        <span class="hidden">Like</span>
                        <i class="fa fa-heart"></i>
                    </a>
                </footer>
            </article>
        </div>\` +
    '<% } %>' +
    '</div></div>';

var render = template.compile(source);
var html = render({
    list: [
        { name: '摄影' },
        { name: '电影' },
        { name: '民谣' },
        { name: '旅行' },
        { name: '吉他' }
    ]
});

document.getElementById('content').innerHTML = html;
`,
				path: 'src/index.js'
			},
			{
				filename: 'index.scss',
				value: `@import url(https://fonts.googleapis.com/css?family=Quattrocento+Sans);
html {
    background-color: #000;
}
:root {
    --card-backgroud: #fff;
}
h1,
h2 {
    width: 100%;
    text-align: center;
    color: #fff;
    margin-top: 120px;
}
.container {
    article {
        background-color: var(--card-backgroud);
    }
}

@mixin position-center($text-align: center) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    text-align: $text-align;
}

.header {
    position: absolute;
    width: 100%;
    height: 120px;
    top: 0;
    left: 0;
    background: #000;
    z-index: 9999;
}

.header-text {
    @include position-center;
    width: 100%;
    height: 100px;
    line-height: 100px;
    span {
        display: inline-block;
        margin: 0 5px;
        color: #fff;
        font-size: 32px;
        font-family: 'Quattrocento Sans', sans-serif;
        @for $i from 0 through 10 {
            &:nth-child(#{$i + 1}) {
                filter: blur(0px);
                animation: blur-text 2.5s (#{$i/5}) + s infinite linear
                    alternate;
            }
        }
    }
}

@keyframes blur-text {
    0% {
        filter: blur(0px);
    }
    100% {
        filter: blur(4px);
    }
}
`,
				path: 'src/index.scss'
			}
		]
	}
];
