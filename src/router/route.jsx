import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Suspense, useState } from 'react';
const PageEntry = React.lazy(() => import('../pageEntry'));
const VueEntry = React.lazy(() => import('../vueEntry'));

export default function RouteCmpt() {
  const [curPath, setCurPath] = useState('react');
  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav className='title-nav-header'>
        <div className='title-header'>Mika Coding Online</div>
        <Link
          className={`${curPath === 'react' ? 'active' : ''}`}
          onClick={() => {
            setCurPath('react');
          }}
          to='/'
        >
          React Compiler |{' '}
        </Link>
        <Link
          className={`${curPath === 'vue' ? 'active' : ''}`}
          onClick={() => {
            setCurPath('vue');
          }}
          to='/sfc'
        >
          Vue Compiler
        </Link>
        {/* <div className='title-header'>{`${curPath==='react'?'React':'Vue'}在线编辑`}</div>
         */}
      </nav>
      {/* Routes */}
      <Routes>
        <Route
          path='/'
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
      </Routes>
    </BrowserRouter>
  );
}
