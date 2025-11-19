import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
const PageEntry = React.lazy(() => import('../pageEntry'));
const VueEntry = React.lazy(() => import('../vueEntry'));
const AngularEntry = React.lazy(() => import('../ngEntry'));
const SvelteEntry = React.lazy(() => import('../svelteEntry'));
import TmpPopup from '../components/templatePop';
const curRelativePath = window.location.href;
const pathname = window.location.pathname;
export default function RouteCmpt() {
  const [curPath, setCurPath] = useState('react');
  const [canRedirect, setCanRedirect] = useState(true);
  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav className='title-nav-header'>
        <div className='title-header'>Mika Coding Online</div>
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
          // to={`${pathname.endsWith('/') ? curRelativePath.replace(/\/$/, '') : curRelativePath}/entry`}
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
          // to={`${pathname.endsWith('/') ? curRelativePath.replace(/\/$/, '') : curRelativePath}/sfc`}
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
        </div>
        {/* <div className='title-header'>{`${curPath==='react'?'React':'Vue'}在线编辑`}</div>
         */}
      </nav>
      {/* Routes */}
      <Routes>
        <Route
          path='*'
          element={
            <Suspense fallback={<div>loading...</div>}>
              <PageEntry></PageEntry>
            </Suspense>
          }
        ></Route>
        <Route
          path='/entry'
          element={
            <Suspense fallback={<div>loading...</div>}>
              <PageEntry></PageEntry>
            </Suspense>
          }
        ></Route>
        <Route
          path='/sfc'
          element={
            <Suspense fallback={<div>loading...</div>}>
              <VueEntry></VueEntry>
            </Suspense>
          }
        ></Route>
        <Route
          path='/angular'
          element={
            <Suspense fallback={<div>loading...</div>}>
              <AngularEntry></AngularEntry>
            </Suspense>
          }
        ></Route>
        <Route
          path='/svelte'
          element={
            <Suspense fallback={<div>loading...</div>}>
              <SvelteEntry></SvelteEntry>
            </Suspense>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
