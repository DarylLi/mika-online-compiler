import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
const MainEntry = React.lazy(() => import('../entries/mainEntry'));
const VueEntry = React.lazy(() => import('../entries/vueEntry'));
const AngularEntry = React.lazy(() => import('../entries/ngEntry'));
const SvelteEntry = React.lazy(() => import('../entries/svelteEntry'));
const EmberEntry = React.lazy(() => import('../entries/emberEntry'));
const KoEntry = React.lazy(() => import('../entries/koEntry'));
const LitEntry = React.lazy(() => import('../entries/litEntry'));
const SolidEntry = React.lazy(() => import('../entries/solidEntry'));
const BackBoneEntry = React.lazy(() => import('../entries/backBoneEntry'));
const PreactEntry = React.lazy(() => import('../entries/preactEntry'));
const ArtTmpEntry = React.lazy(() => import('../entries/artTemplateEntry'));
const PugEntry = React.lazy(() => import('../entries/pugEntry'));
// 统一协助模版入口
const Assistance = React.lazy(() => import('../components/assistanceCmpt'));
import { message } from 'antd';
import { socketStore } from '@store/socket';
import TmpPopup from '../components/templatePop';
import { editStore } from '@store/index';
export default function RouteCmpt() {
  const [curPath, setCurPath] = useState('react');
  const [canRedirect, setCanRedirect] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  // const compilePugTemplate = (str = '', locals = {})=>{
  //   try {
  //     let funcStr = generateCode(parse(lex(str)), {
  //       compileDebug: false,
  //       pretty: true,
  //       inlineRuntimeFunctions: false,
  //       templateName: '_parse'
  //     });
  //     let func = wrap(funcStr, '_parse');
  //     return func(locals);
  //   } catch (e) {
  //     return `Compile Error: ${e.message}`;
  //   }
  // }
//   useEffect(()=>{
//     let str = compilePugTemplate(`div.main
//  - for(var i=0; i<data.length; i++)
//    div.child
//     | #{data[i]}
// div.another #{greet('shidhin')}`)
//   },[])
  socketStore.setMessageApi(messageApi);
  socketStore.setMessageContextHolder(contextHolder);
  const loadingCmpt = <>loading...</>
  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav className='title-nav-header'>
        {editStore.contextHolder}
        <div className='title-header'>Mika Online Editor</div>
        <TmpPopup />
        <div style={{"display":"none"}}>
        <Link
          className={`${curPath === 'react' ? 'active' : ''}`}
          onClick={e => {
            if (canRedirect) {
              setCurPath('react');
              setCanRedirect(false);
              setTimeout(() => {
                setCanRedirect(true);
              }, 1000);
            } else {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          to='/entry'
        >
          React Compiler
        </Link>
        <span>|</span>
        <Link
          className={`${curPath === 'vue' ? 'active' : ''}`}
          onClick={e => {
            if (canRedirect) {
              setCurPath('vue');
              setCanRedirect(false);
              setTimeout(() => {
                setCanRedirect(true);
              }, 1000);
            } else {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          to='/sfc'
        >
          Vue Compiler
        </Link>
        <span>|</span>
        <Link
          className={`${curPath === 'angular' ? 'active' : ''}`}
          onClick={e => {
            if (canRedirect) {
              setCurPath('angular');
              setCanRedirect(false);
              setTimeout(() => {
                setCanRedirect(true);
              }, 1000);
            } else {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          to='/angular'
        >
          Angular Compiler
        </Link>
        <Link
          className={`${curPath === 'svelte' ? 'active' : ''}`}
          onClick={e => {
            if (canRedirect) {
              setCurPath('svelte');
              setCanRedirect(false);
              setTimeout(() => {
                setCanRedirect(true);
              }, 1000);
            } else {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          to='/svelte'
        >
          Svelte 3 Compiler
        </Link>
        <Link
          className={`${curPath === 'arttemplate' ? 'active' : ''}`}
          onClick={e => {
            if (canRedirect) {
              setCurPath('arttemplate');
              setCanRedirect(false);
              setTimeout(() => {
                setCanRedirect(true);
              }, 1000);
            } else {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          to='/arttemplate'
        >
          ArtTemplate Compiler
        </Link>
        <Link
          className={`${curPath === 'pug' ? 'active' : ''}`}
          onClick={e => {
            if (canRedirect) {
              setCurPath('pug');
              setCanRedirect(false);
              setTimeout(() => {
                setCanRedirect(true);
              }, 1000);
            } else {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          to='/pug'
        >
          Pug Compiler
        </Link>
        </div>
      </nav>
      {/* Routes */}
      <Routes>
        <Route
          path='*'
          element={
            <Suspense fallback={loadingCmpt}>
              <MainEntry></MainEntry>
            </Suspense>
          }
        ></Route>
        <Route
          path='/entry'
          element={
            <Suspense fallback={loadingCmpt}>
              <MainEntry></MainEntry>
            </Suspense>
          }
        ></Route>
        <Route
          path='/sfc'
          element={
            <Suspense fallback={loadingCmpt}>
              <VueEntry></VueEntry>
            </Suspense>
          }
        ></Route>
        <Route
          path='/angular'
          element={
            <Suspense fallback={loadingCmpt}>
              <AngularEntry></AngularEntry>
            </Suspense>
          }
        ></Route>
        <Route
          path='/svelte'
          element={
            <Suspense fallback={loadingCmpt}>
              <SvelteEntry></SvelteEntry>
            </Suspense>
          }
        ></Route>
        <Route
          path='/ember'
          element={
            <Suspense fallback={loadingCmpt}>
              <EmberEntry></EmberEntry>
            </Suspense>
          }
        ></Route>
        <Route
          path='/ko'
          element={
            <Suspense fallback={loadingCmpt}>
              <KoEntry></KoEntry>
            </Suspense>
          }
        ></Route>
        <Route
          path='/lit'
          element={
            <Suspense fallback={loadingCmpt}>
              <LitEntry></LitEntry>
            </Suspense>
          }
        ></Route>
        <Route
          path='/solid'
          element={
            <Suspense fallback={loadingCmpt}>
              <SolidEntry></SolidEntry>
            </Suspense>
          }
        ></Route>
        <Route
          path='/assitant'
          element={
            <Suspense fallback={loadingCmpt}>
              <Assistance></Assistance>
            </Suspense>
          }
        ></Route>
        <Route
          path='/backbone'
          element={
            <Suspense fallback={loadingCmpt}>
              <BackBoneEntry></BackBoneEntry>
            </Suspense>
          }
        ></Route>
        <Route
          path='/preact'
          element={
            <Suspense fallback={loadingCmpt}>
              <PreactEntry></PreactEntry>
            </Suspense>
          }
        ></Route>
        <Route
          path='/arttemplate'
          element={
            <Suspense fallback={loadingCmpt}>
              <ArtTmpEntry></ArtTmpEntry>
            </Suspense>
          }
        ></Route>
        <Route
          path='/pug'
          element={
            <Suspense fallback={loadingCmpt}>
              <PugEntry></PugEntry>
            </Suspense>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
