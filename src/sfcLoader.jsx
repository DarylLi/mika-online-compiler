import React,{ useRef, useState, useEffect } from 'react'
import { transform, registerPlugin } from '@babel/standalone';
import * as Vue from 'vue';
        //import ex, {getA,getB} from 'utils.js';
const checkVueRely=()=>{
    window['vue3-sfc-loader'] ?? (()=>{
        let script = document.createElement('script');
        script.setAttribute('src','https://cdn.jsdelivr.net/npm/vue3-sfc-loader@0.9.5/dist/vue3-sfc-loader.js');
        document.body.appendChild(script);    
    })()
}
function App() {
    useEffect(()=>{
        checkVueRely();
    })
    var transferMap = new Map();
    let replaceMaps = new Map();
    let mapSolute = new Map();
    const [curVueApp,setCurVueApp] = useState(null);
    // const rust = import("@pkg");

    let fileList = [{
        name:'utils.js',
        value:`
            export const getA = () => {};
            const getB = () => {};
            const getC = () => {};
            export default { getA, getB, getC };
        `,
        path:'utils.js'
      },{
        name:'ef.jsx',
        value:`
        import D from './d.jsx';
        function Ef() {
          const [txt,setTxt] = useState(0)
          const getCall = ()=>{alert('wasai');setTxt(txt+1)}
          return (
          <>
            <div>this is B's EEEEE</div>
            <D/>
          </>
          );
        }
      export default Ef`,
        path:'ef.jsx'
      },{
        name:'b.jsx',
        value:`

        import D from './d.jsx';
        function B() {
          const [txt,setTxt] = useState(0)
          const getCall = ()=>{alert('wasai');setTxt(txt+1)}
          return (
          <>
            <div>this is B</div>
            <D/>
          </>
          );
        }
      export default B`,
        path:'b.jsx'
      },{
        name:'c.jsx',
        value:`function C() {
            const [txt,setTxt] = useState(0)
            const getCall = ()=>{alert('wasai');setTxt(txt+1)}
            return (
              <div>this is C </div>
            );
          }
        export default C`,
        path:'c.jsx'
      },
      {
        name:'d.jsx',
        value:`
        import BW from './e.jsx';
        function Bdd() {
          const [txt,setTxt] = useState(0)
          const getCall = ()=>{alert('wasai');setTxt(txt+1)}
          return (
          <>
            <div>I am D ddddd</div>
            <BW />
          </>

          );
        }
      export default Bdd`,
        path:'d.jsx'
      },
    {
        name:'e.jsx',
        value:`
      export default function() {
        const [txt,setTxt] = useState(0)
        const getCall = ()=>{alert('wasai');setTxt(txt+1)}
        return (
        <>
          <div style={{'fontSize':'24px'}}>eeee</div>
          <span style={{'color':'maroon'}}>wasai</span>
        </>

        );
      };
      `,
        path:'e.jsx'
    }];
  const textareaRef = useRef('');
  let code = `
  import B from './b.jsx';
  import C from './c.jsx';
  import E from './ef.jsx';
  import loadsh from 'loadash';

  function Dcp() {
      const [txt,setTxt] = useState(0)
      const getCall = ()=>{alert('wasai');setTxt(txt+1)}
      let style ='important!';
      return (
        <>
            <B />
            <div onClick={() => getCall()}>kukuji990{txt}</div>
            <C />
            <E />
        </>
      );
    }
  export default Dcp;`
    ;
    let [vueCode,setVueCode] = useState(`
   <script setup>
import { ref } from 'vue'
defineProps({
  msg: String,
})
const count = ref(0)
</script><template>
  <h1>{{ msg }}</h1>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template><style scoped>
.read-the-docs {
  color: #dedede;
}
</style>`);
    const options = {
      moduleCache: { vue: Vue },
      addStyle(styleStr) {
        console.log("addStyle", styleStr)
        const style = document.createElement('style');
        style.textContent = styleStr;
        const ref = document.head.getElementsByTagName('style')[0] || null;
        document.head.insertBefore(style, ref);
      },
      getFile: () => textareaRef.current.value,
    };
    const ddff = ()=>{
        let ButtonCmpt = `
    <template>
      <button @click="count++">
        You clicked ww {{ count }} times.
      </button>
    </template>
    `;
    const cmptOption = {
      moduleCache: { vue: Vue },
      addStyle(styleStr) {
        const style = document.createElement('style');
        style.textContent = styleStr;
        const ref = document.head.getElementsByTagName('style')[0] || null;
        document.head.insertBefore(style, ref);
      },
      getFile: () => ButtonCmpt,
      addStyle: () => {},
    }
    const AppCmpt = `<script>import ButtonCmpt from './ButtonCmpt.vue'; export default {components:{ButtonCmpt}} </script><template>
  <h1>okok</h1>
  <ButtonCmpt></ButtonCmpt>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template><style scoped>
.read-the-docs {
  color: #dedede;
}
</style>`;
    const totalComponents = {
            'ButtonCmpt.vue': ButtonCmpt,
            'App.vue': AppCmpt
        };
    const options = {
      moduleCache: { vue: Vue },
      addStyle(styleStr) {
        const style = document.createElement('style');
        style.textContent = styleStr;
        const ref = document.head.getElementsByTagName('style')[0] || null;
        document.head.insertBefore(style, ref);
      },
      getFile: (url) => {console.log(url);return Promise.resolve({getContentData:()=>totalComponents[url]})},
      addStyle: () => {},
    };
    
    let optionList = [{type:'root',op:options, name:''},{type:'component',op:cmptOption, name:'ButtonCmpt'}];
    let rootApp = null;
    if(!curVueApp){
      rootApp = Vue.createApp(Vue.defineAsyncComponent(() => window['vue3-sfc-loader'].loadModule('App.vue', options)));
      setCurVueApp(rootApp);
      rootApp.mount(document.getElementById('target'));
    }
    else{
      curVueApp.unmount();
      rootApp = Vue.createApp(Vue.defineAsyncComponent(() => window['vue3-sfc-loader'].loadModule('App.vue', options)));
      setCurVueApp(rootApp);
      rootApp.mount(document.getElementById('target'));
    }
    // for(const {type,op,name} of optionList){
    //   console.log(type,name,op);
    //   if(type === 'root'){
    //     rootApp = Vue.createApp(Vue.defineAsyncComponent(() => window['vue3-sfc-loader'].loadModule('App.vue', op)));
    //   }
    //   else{
    //     rootApp.component(name, Vue.defineAsyncComponent(() => window['vue3-sfc-loader'].loadModule('ButtonCmpt.vue', op)));
    //   }
    // }
    //   rootApp.mount(document.getElementById('target'));
    }
    const compileVue = (options)=>{
        console.log(options);
        if(!curVueApp){
            let curVueApp = Vue.createApp(Vue.defineAsyncComponent(() => window['vue3-sfc-loader'].loadModule('App.vue', options)));
            setCurVueApp(curVueApp);
            curVueApp.mount(document.getElementById('target'));
        }else{ 
            curVueApp.unmount();
            let nextVueApp = Vue.createApp(Vue.defineAsyncComponent(() => window['vue3-sfc-loader'].loadModule('child.vue', options)));
            setCurVueApp(nextVueApp);
            nextVueApp.mount(document.getElementById('target'));
            }
    };
    const doCheckImport = (str, nameprefix)=>{
        let result = str;
        transform(result, {
            presets: ['env'],
            plugins: [['transform-react-jsx'],['confound',{prefix :nameprefix}]],
        }).code;
        // 文件import 检索
        let resultArr = [...result.matchAll(/import.*from.*;/g)];
        // 替换import内容为相应代码段
        resultArr.length > 0 && resultArr.forEach((mr,index)=>{
            // 若引用文件存在则替换文件内容
            if(fileList.find(e=>mr[0].includes(e.path))){
                let fileInfo = fileList.find(e=>mr[0].includes(e.path));
                // 引用代码文件输出内容名称混淆处理
                let extraFile = fileInfo.value;
               
                // 对代码段内容进行同等替换检索
                let replaceCode = doCheckImport(extraFile,`${nameprefix}${fileInfo.name.split('.')[0]}_`);
                // 引用文件相应对象变量名替换
                let importTarget = mr[0].replace('import','').split('from')[0].trim()
                // 混淆引用名，防止单输出文件重名引用
                let replaceExportTarget = transferMap.get(importTarget) || importTarget;



                // 源文件export变量名
                const orginExportNameArr = replaceCode.split('export default');
                replaceCode = orginExportNameArr[1]?.trim() === replaceExportTarget
                    ? replaceCode.replace('export default',`//export default`)
                    : replaceCode.replace('export default',`let ${replaceExportTarget} =`);
                
                result = result.replace(mr[0],replaceCode)

            } 
            // 不存在则先注释处理
            else{
                result = result.replace(mr[0],`//${mr[0]}`)
            }
        })
        resultArr.forEach(mr=>{
            const curKey = `${mr[0].replace('import','').split('from')[0].trim()}`;
            replaceMaps.set(curKey,`${nameprefix}${curKey}`);
            mapSolute.set(`${nameprefix}${curKey}`,{init:false});
            // return {[curKey]:`${nameprefix}${curKey}`}
        })
            try {
                const output = transform(result,{
                    presets: ['env'],
                    plugins: [['transform-react-jsx']],
                }).code;
            
            
                transform(output, {
                        presets: ['env'],
                        plugins: ['transFileConfound'],
                }).code;
            } catch (error) {
                console.log( `引入文件变量名重复`)
            }
        return result
    }
  function onClick() {
    // if(document.getElementById('target')) document.getElementById('target').innerHTML ='';
    if(!textareaRef.current) {
      return ;
    }
    window.useState = useState;
   
    // 名称混淆
    function confound() {
        return {
          visitor: {
            ImportDefaultSpecifier(path, state){
                const curName = `${state.opts.prefix}${path.node.local.name}`;
                transferMap.set(path.node.local.name,curName);
                path.node.local.name = curName;
            }
          },
        };
      }
    // 名称混淆赋值
    function transConfound() {
        return {
        visitor: {
            Identifier(path) {
                path.node.name = transferMap.get(path.node.name) || path.node.name;
            },
        },
        };
    }
    // 引入文件名称混淆赋值
    function transFileConfound() {
        return {
        visitor: {
            VariableDeclaration(path, state) {
                const curKey = path.node.declarations[0]?.id?.name;
                const curValue = path.node.declarations[0]?.init?.name;
                if(mapSolute.get(`${path.node.declarations[0]?.id?.name}`)){
                    mapSolute.set(`${path.node.declarations[0]?.id?.name}`,{
                        targetKey: curValue,
                        targetValue: curKey,
                        replaceValue: `${curKey}_${curValue}`,
                    })
                }
            },
        },
        };
    }
    registerPlugin("confound", confound);
    registerPlugin("transConfound", transConfound);
    registerPlugin("transFileConfound", transFileConfound);
    // const importCheckedCode = doCheckImport(textareaRef.current.value,'index_')
  
    // transform-react-jsx已处理部分名称替换，单文件需独自处理
    let values = Array.from(mapSolute.values());
    try {
        const duplicateList = values.filter(e=>e.targetKey && values.map(w=>w.targetKey).filter(inner=>inner===e.targetKey).length>1);
        // console.log(duplicateList) 
        if(duplicateList.length>1){
            let reCode = `let offList=[];let doDuplicateStr = importCheckedCode.replace(/${duplicateList[0].targetKey}.*()/g,(match,offset)=>{console.log('....',match,offset);match.includes('()')&&offList.push(match);console.log(offList.length);return 'D_'+offList.length+'_'+match});importCheckedCode=doDuplicateStr`;
            // console.log(reCode)
            eval(reCode)
            // let testCode = `let offList=[];let okStrArr = importCheckedCode.matchAll(/${duplicateList[0].targetKey}.*/g);console.log([...okStrArr])`;
            // eval(testCode)
        }   
    } catch (error) {
        console.log(error)
    }
    // const output = transform(importCheckedCode,{
    //   presets: ['env'],
    //   plugins: [['transform-react-jsx']],
    // }).code;


    // const afterCode = transform(output, {
    //         presets: ['env'],
    //         plugins: ['transConfound'],
    // }).code;

    // eval(`var exports={};const { useRef, useState } = React;${afterCode};ReactDOM.createRoot(document.getElementById('target')).render(React.createElement(_default))`)
    // compileVue(options);
    ddff();
  }

  return (
    <div>
      <textarea ref={textareaRef} style={{ width: '500px', height: '300px'}} defaultValue={vueCode}></textarea>
      <button onClick={onClick}>编译</button>
      <div id='target'></div>
    </div>
  )
}

export default App