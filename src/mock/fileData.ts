export const templates: any = [
	{
		filename: 'src',
		value: '',
		path: 'src',
		kind: 'directory',
		children: [
			// {
			//   filename:'utils.js',
			//   path:'src/utils.js',
			//   value:`
			//       export const getA = () => {};
			//       const getB = () => {};
			//       const getC = () => {};
			//       export default { getA, getB, getC };
			//   `,
			// },
			{
				filename: 'app.jsx',
				value: `    import Cmpt1 from './component1.jsx';
    import Cmpt2 from './component2.jsx';
  
    function App() {
        const [txt,setTxt] = useState(0)
        const getCall = ()=>{alert('changwe text!');setTxt(txt+1)}
        let style ='important!';
        return (
          <>
          <h2 style={{'textAlign':'center'}}>This is React Page</h2>
          <div className="box">
            <div className="inner-box"></div>
          </div>
          <h3>Ant Design components below:</h3>
            <div style={{"padding":"10px"}}>
              <Button type='primary'>hello</Button>
            </div>
            <div style={{"padding":"10px"}}>
              <Card title="Card" size="small">
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </div>
            <div style={{"padding":"10px"}}>
              <Pagination defaultCurrent={1} total={50} />
            </div>
              <h3>Other components:</h3>
              <Cmpt1/>
              <Cmpt2 />
          </>
        );
      }
    export default App;`,
				path: 'src/app.jsx'
			},
			{
				filename: 'component1.jsx',
				value: `     function ExtraA() {
      const [txt,setTxt] = useState(0)
      const getCall = ()=>{alert('change text!');setTxt(txt+1)}
      return (
        <div className="App-inner">
        <header className="App-header">
          <button>click</button>
          <p>
            Edit <code>src App.js</code> and save to reload.
          </p>
          <a
            className="App-link" 
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>this component is loaded by ExtraA</p>
      </div>
      );
    }
  export default ExtraA`,
				path: 'src/component1.jsx'
			},
			{
				filename: 'component2.jsx',
				value: `   function ExtraB() {
        const [txt,setTxt] = useState(0)
        const getCall = ()=>{alert('wasai');setTxt(txt+1)}
        return (
          <div>this is loaded by ExtraB </div>
        );
      }
    export default ExtraB`,
				path: 'component2.jsx'
			}
		]
	}
];
