import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import './index.scss'
function WelcomePage() {
	const [hide,setHide] = useState(false)
	useEffect(()=>{
		setTimeout(()=>{
			setHide(true);
		},6000)
	},[])
	return (
		<div className={`welcomeContainer ${hide?'hide':''}`}>
		<h1>Mika <strong>Online Editor</strong></h1>
		</div>
	);
}
export default observer(WelcomePage);
