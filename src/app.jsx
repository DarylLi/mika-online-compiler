import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import PageEntry from './pageEntry';
import RouteCmpt from './router/route';
// import Sandbox from './components/sandbox'
import BabelCmp from './babelCmp';
import SFCCmpt from './sfcLoader';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <SFCCmpt/>
  // <PageEntry/>
  <RouteCmpt />
);
