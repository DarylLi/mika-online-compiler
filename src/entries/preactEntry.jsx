import React, {useState, useEffect} from 'react'
import Directory from '@components/preactCmpt/lftdir';
import MainEditor from '@components/preactCmpt/ctmain';
import RightView from '@components/preactCmpt/rtview'
import { observer } from "mobx-react";
import { editStore } from "@store/index";
import { Spin } from 'antd';
import '../main.scss';

function prEntry() {
    useEffect(()=>{
    },[])
  return (
    <>
    <div className="App">
        <Directory></Directory>
        <MainEditor></MainEditor>
        <RightView></RightView>
    </div>
    <Spin spinning={editStore.showSpin} percent={'auto'} fullscreen >preact切换中...</Spin>
    </>
    
  );
}

export default observer(prEntry);
