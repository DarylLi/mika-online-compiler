import React, {useState, useEffect} from 'react'
import Directory from '@components/svelteCmpt/lftdir';
import MainEditor from '@components/svelteCmpt/ctmain';
import RightView from '@components/svelteCmpt/rtview'
import { observer } from "mobx-react";
import { editStore } from "@store/index";
import { Spin } from 'antd';
import '../main.scss';

function svEntry() {
    useEffect(()=>{
    },[])
  return (
    <>
    <div className="App">
        <Directory></Directory>
        <MainEditor></MainEditor>
        <RightView></RightView>
    </div>
    <Spin spinning={editStore.showSpin} percent={'auto'} fullscreen >svelte切换中...</Spin>
    </>
    
  );
}

export default observer(svEntry);
