export const litTemplates: any = [
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
    <div class="litHead">
        <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MjUgMjAwIiBpZD0iZnVsbCI+Cjx2aWV3IGlkPSJmbGFtZSIgdmlld0JveD0iLTEzMi41IDAgMTYwIDIwMCIvPgo8dmlldyBpZD0ibmFtZSIgdmlld0JveD0iMzMyLjUgMTI3LjUgMTg1IDEyMiIgLz4KPHN5bWJvbCBpZD0ibmFtZS1zeW1ib2wiIHZpZXdCb3g9IjI0MCA3OCAxODUgMTIyIj4KPHBhdGggZmlsbD0idmFyKC0tbGl0LWxvZ28tdGV4dC1jb2xvciwgYmxhY2spIiBkPSJNMzk0LjUgNzh2MjguOEg0MjV2MTUuNmgtMzAuNVYxNThjMCAzLjYuMSA3LjIuNSAxMC4zLjggNS4zIDQgMTAuNSA4LjQgMTIuNSA1LjcgMi42IDkuNyAyLjEgMjEuNiAxLjdsLTIuOSAxNy4yYy0uOC40LTQgLjMtNyAuMy03IDAtMzMuNCAyLjUtMzguOC0yNC43LS45LTQuNy0uNy05LjUtLjctMTYuOXYtMzUuOEgzNjJsLjItMTUuOWgxMy40Vjc4em0tNTEuNyAyOC43djkxLjVIMzI0di05MS41em0wLTI4Ljd2MTYuM2gtMTlWNzh6bS04My42IDEwMi4yaDQ4LjJsLTE4IDE4SDI0MFY3OGgxOS4yeiIvPgo8L3N5bWJvbD4KPHN5bWJvbCBpZD0iZmxhbWUtc3ltYm9sIiB2aWV3Qm94PSIwIDAgMTYwIDIwMCI+CjxwYXRoIGZpbGw9InZhcigtLWxpdC1sb2dvLWRhcmstY3lhbiwgIzAwZThmZikiIGQ9Ik00MCAxMjBsMjAtNjBsOTAgOTBsLTMwIDUwbC00MC00MGgtMjAiLz4KPHBhdGggZmlsbD0idmFyKC0tbGl0LWxvZ28tZGFyay1ibHVlLCAjMjgzMTk4KSIgZD0iTTgwIDE2MCBMODAgODAgTDEyMCA0MCBMIDEyMCAxMjAgTTAgMTYwIEw0MCAyMDAgTDQwIDEyMCBMMjAgMTIwIi8+CjxwYXRoIGZpbGw9InZhcigtLWxpdC1sb2dvLWJsdWUsICMzMjRmZmYpIiBkPSJNNDAgMTIwdi04MGw0MC00MHY4ME0xMjAgMjAwdi04MGw0MC00MHY4ME0wIDE2MHYtODBsNDAgNDAiLz4KPHBhdGggZmlsbD0idmFyKC0tbGl0LWxvZ28tY3lhbiwgIzBmZikiIGQ9Ik00MCAyMDB2LTgwbDQwIDQwIi8+Cjwvc3ltYm9sPgo8dXNlIGhyZWY9IiNuYW1lLXN5bWJvbCIgeD0iMzMyLjUiIHk9IjEyNy41IiB0cmFuc2Zvcm09InNjYWxlKDAuNjEpIj48L3VzZT4KPHVzZSBocmVmPSIjZmxhbWUtc3ltYm9sIiB4PSItMTMyLjUiPjwvdXNlPgo8L3N2Zz4K"
        />
    </div>
    <simple-greeting name="Lit Page"></simple-greeting>
</body>
`,
				path: 'src/index.html'
			},
			{
				filename: 'index.js',
				value: `export function isSameDate(date1, date2) {
    return date1?.toLocaleDateString() === date2?.toLocaleDateString();
}

/**
 * Returns a Date object that displays the correct year, month, and day
 * in the local time zone, given a UTC Date object as returned by input type="date".
 */
export function localDateFromUTC(utcDate) {
    return new Date(
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate()
    );
}

export class SimpleGreeting extends LitElement {
    static styles = css\`
        p {
            color: blue;
            font-size: 38px;
            width: 100%;
            text-align: center;
        }
        div {
            color: #000;
            font-size: 18px;
            padding: 20px;
        }
    \`;

    static properties = {
        date: {
            // For wrapper types like Date, simple comparison won't work, because
            // each Date is a new object
            hasChanged: (value, oldValue) => {
                return !isSameDate(value, oldValue);
            }
        },
        name: { type: String }
    };
    constructor() {
        super();
        this.name = 'Somebody';
        this.list = ['Peas', 'Carrots', 'Tomatoes'];
    }
    get datefield() {
        return this.renderRoot?.querySelector('#datefield') ?? null;
    }
    updated(changed) {
        if (changed.has('date')) {
            this.datefield.animate(this.frames, 1000);
        }
    }

    _dateChanged(e) {
        const utcDate = e.target.valueAsDate;
        if (utcDate) {
            this.date = localDateFromUTC(utcDate);
        }
    }

    _chooseToday() {
        this.date = new Date();
    }
    render() {
        return html\`<p>Hello, \${this.name}!</p>
            <div>
                Render a list:
                <ul>
                    \${this.list.map(
                        (item, index) => html\` <li>\${index}: \${item}</li> \`
                    )}
                </ul>
            </div>
            <div class="lit-date">
                Choose a date:
                <input type="date" @change=\${this._dateChanged} />
                <button @click=\${this._chooseToday}>Choose Today</button>
                <div class="date-result">
                    Date chosen:
                    <span id="datefield">
                        \${this.date?.toLocaleDateString()}</span
                    >
                </div>
            </div> \`;
    }
}
customElements.define('simple-greeting', SimpleGreeting);
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
.litHead {
    width: 100%;
    text-align: center;
}
img {
    width: 80%;
    margin: auto;
}
.lit-date{
  display: flex;
  align-items: flex-start;
}
.date-result{
  margin-top: 20px;
}
`,
				path: 'src/index.css'
			}
		]
	}
];
