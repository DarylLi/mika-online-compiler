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
const Assistance = React.lazy(() => import('../components/assistanceCmpt'));

import TmpPopup from '../components/templatePop';

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
        </div>
      </nav>
      {/* Routes */}
      <Routes>
        <Route
          path='*'
          element={
            <Suspense fallback={<div>loading...</div>}>
              <MainEntry></MainEntry>
            </Suspense>
          }
        ></Route>
        <Route
          path='/entry'
          element={
            <Suspense fallback={<div>loading...</div>}>
              <MainEntry></MainEntry>
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
        <Route
          path='/ember'
          element={
            <Suspense fallback={<div>loading...</div>}>
              <EmberEntry></EmberEntry>
            </Suspense>
          }
        ></Route>
        <Route
          path='/ko'
          element={
            <Suspense fallback={<div>loading...</div>}>
              <KoEntry></KoEntry>
            </Suspense>
          }
        ></Route>
        <Route
          path='/lit'
          element={
            <Suspense fallback={<div>loading...</div>}>
              <LitEntry></LitEntry>
            </Suspense>
          }
        ></Route>
        <Route
          path='/solid'
          element={
            <Suspense fallback={<div>loading...</div>}>
              <SolidEntry></SolidEntry>
            </Suspense>
          }
        ></Route>
        <Route
          path='/assitant'
          element={
            <Suspense fallback={<div>loading...</div>}>
              <Assistance></Assistance>
            </Suspense>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
