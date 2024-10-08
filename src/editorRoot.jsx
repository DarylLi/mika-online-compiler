import React from "react";
import Directory from '@components/reactEditor/lftdir';
import MainEditor from '@components/reactEditor/ctmain';
import RightView from '@components/reactEditor/rtview'

class EditorRoot extends React.Component{
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