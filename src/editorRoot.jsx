import React from "react";
import Directory from '@components/reactEditor/lftdir';
import MainEditor from '@components/reactEditor/ctmain';
import RightView from '@components/reactEditor/rtview'
import { renderShadowRoot } from "@utils/commonUtils";

class EditorRoot extends React.Component{
    componentDidMount(){
        renderShadowRoot();
    }
    render(){
        return( 
           <>
            <div className="App">
                <Directory></Directory>
                <MainEditor></MainEditor>
                <RightView></RightView>
            </div>
            </>
        );
    }
};
export default EditorRoot