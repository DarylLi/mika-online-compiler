import React, {useState, useEffect} from 'react'
import Directory from '@components/artTmpCmpt/lftdir';
import MainEditor from '@components/artTmpCmpt/ctmain';
import RightView from '@components/artTmpCmpt/rtview'
import { observer } from "mobx-react";
import { editStore } from "@store/index";
import { Spin } from 'antd';
import '../main.scss';

function artTmpEntry() {
    useEffect(()=>{
    },[])
  return (
    <>
    <div className="App">
        <Directory></Directory>
        <MainEditor></MainEditor>
        <RightView></RightView>
    </div>
    <Spin spinning={editStore.showSpin} percent={'auto'} fullscreen >arttemplate切换中...</Spin>
    </>
    
  );
}

export default observer(artTmpEntry);
