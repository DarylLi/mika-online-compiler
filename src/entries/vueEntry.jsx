import React, { useState, useEffect } from 'react';
import Directory from '@components/mainCmpt/lftdir';
import MainEditor from '@components/mainCmpt/ctmain';
import RightView from '@components/mainCmpt/rtview';
import { observer } from 'mobx-react';
import { editStore } from '@store/index';
import { Spin } from 'antd';
import '../main.scss';

function PageEntry() {
  const [stat, setStat] = useState(1);
  const [sfcLoaded, setSFCLoaded] = useState(false);
  const [percent, setPercent] = React.useState(0);
  const checkVueRely = () => {
    window['vue3-sfc-loader'] ??
      (() => {
        let script = document.createElement('script');
        script.setAttribute(
          'src',
          'https://all.franxxdaryl.site/assets/compiler-lib/vue3-sfc-loader.js'
        );
        script.onload = () => {
          setSFCLoaded(true);
        };
        document.body.appendChild(script);
      })();
  };
  useEffect(() => {
    checkVueRely();
  }, []);
  const editorDidMount = (editor, monaco) => {
    editor.focus();
  };
  const onChange = (newValue, e) => {
    console.log('onChange', newValue, e);
  };
  const options = {
    selectOnLineNumbers: true,
  };

  return (
    <>
      <div className='App'>
        <Directory cpType='vue'></Directory>
        <MainEditor cpType='vue'></MainEditor>
        <RightView cpType='vue'></RightView>
      </div>
      <Spin spinning={editStore.showSpin} percent={'auto'} fullscreen>
        vue切换中...
      </Spin>
    </>
  );
}

export default observer(PageEntry);
