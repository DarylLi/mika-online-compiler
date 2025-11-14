import React, {useState, useEffect} from 'react'
import Directory from '@components/lftdir';
import MainEditor from '@components/ctmain';
import RightView from '@components/rtview'
import { observer } from "mobx-react";
import { editStore } from "@store/index";
import { Spin } from 'antd';
import './main.scss'

function NgEntry() {
  const [sfcLoaded, setSFCLoaded] = useState(false);
    const checkAngularRely=()=>{
        let styleList =[
            "https://ajax.googleapis.com/ajax/libs/angular_material/1.2.1/angular-material.min.css",
        ];
        let scriptList =[
            "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.8.3/angular.min.js",
            "https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular-animate.js",
            "https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular-aria.js",
            "https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular-messages.min.js",
            "https://ajax.googleapis.com/ajax/libs/angular_material/1.2.1/angular-material.min.js"
        ]
        // (()=>{
        //     for(style of styleList){
        //         let style = document.createElement('style');
        //         doc
        //     }
        //     let script = document.createElement('script');
        //     script.setAttribute('src','https://cdn.jsdelivr.net/npm/vue3-sfc-loader@0.9.5/dist/vue3-sfc-loader.js');
        //     script.onload=(()=>{
        //       setSFCLoaded(true);
        //     })
        //     document.body.appendChild(script);    
        // })()
    }
    useEffect(()=>{
        // checkAngularRely();
    },[])
  return (
    <>
    <div className="App">
        <Directory cpType="angular"></Directory>
        <MainEditor cpType="angular"></MainEditor>
        <RightView cpType="angular"></RightView>
    </div>
    <Spin spinning={editStore.showSpin} percent={'auto'} fullscreen >code服务运行中。。。</Spin>
    </>
    
  );
}

export default observer(NgEntry);
