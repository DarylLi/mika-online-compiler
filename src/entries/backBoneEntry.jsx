import React, {useState, useEffect} from 'react'
import Directory from '@components/backboneCmpt/lftdir';
import MainEditor from '@components/backboneCmpt/ctmain';
import RightView from '@components/backboneCmpt/rtview'
import { observer } from "mobx-react";
import { editStore } from "@store/index";
import { Spin } from 'antd';
import '../main.scss';

function bbEntry() {
    useEffect(()=>{
    },[])
  return (
    <>
    <div className="App">
        <Directory></Directory>
        <MainEditor></MainEditor>
        <RightView></RightView>
    </div>
    <Spin spinning={editStore.showSpin} percent={'auto'} fullscreen >backbone切换中...</Spin>
    </>
    
  );
}

export default observer(bbEntry);
