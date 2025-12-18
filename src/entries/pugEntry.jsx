import React, {useState, useEffect} from 'react'
import Directory from '@components/pugTmpCmpt/lftdir';
import MainEditor from '@components/pugTmpCmpt/ctmain';
import RightView from '@components/pugTmpCmpt/rtview'
import { observer } from "mobx-react";
import { editStore } from "@store/index";
import { Spin } from 'antd';
import '../main.scss';

function PugEntry() {
    useEffect(()=>{
    },[])
  return (
    <>
    <div className="App">
        <Directory></Directory>
        <MainEditor></MainEditor>
        <RightView></RightView>
    </div>
    <Spin spinning={editStore.showSpin} percent={'auto'} fullscreen >pug切换中...</Spin>
    </>
    
  );
}

export default observer(PugEntry);
