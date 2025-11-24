import React, {useState, useEffect} from 'react'
import Directory from '@components/koCmpt/lftdir';
import MainEditor from '@components/koCmpt/ctmain';
import RightView from '@components/koCmpt/rtview'
import { observer } from "mobx-react";
import { editStore } from "@store/index";
import { Spin } from 'antd';
import '../main.scss';

function KoEntry() {
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

export default observer(KoEntry);
