import React from 'react';
import ReactDOM from 'react-dom/client';
import RouteCmpt from './router/route';
import Welcome from './components/welcome';
import LogCmpt from './components/log'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <SFCCmpt/>
  // <PageEntry/>
  <>
  <Welcome />
  <RouteCmpt />
  <LogCmpt />
  </>
);
