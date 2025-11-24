import React, {useState, useEffect} from 'react'
import Directory from '@components/litCmpt/lftdir';
import MainEditor from '@components/litCmpt/ctmain';
import RightView from '@components/litCmpt/rtview'
import { observer } from "mobx-react";
import { editStore } from "@store/index";
import { Spin } from 'antd';
import '../main.scss';

function LitEntry() {
    useEffect(()=>{
    },[])
  return (
    <>
    <div className="App">
        <Directory></Directory>
        <MainEditor></MainEditor>
        <RightView></RightView>
    </div>
    <Spin spinning={editStore.showSpin} percent={'auto'} fullscreen >code服务运行中。。。</Spin>
    </>
    
  );
}

export default observer(LitEntry);
