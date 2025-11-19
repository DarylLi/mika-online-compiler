import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import axios from 'axios';

function RightView(props: any) {
	const { cpType = 'react' } = props;
	// let cursocket: any = null;
	const [showView, setShowView] = useState(false);
	const frameRef: any = useRef(null);
	// useEffect(() => {}, [frameRef]);

	return (
		<div
			className="mika-mona-right-view simpleFrame"
			id="previewFrame"
			ref={frameRef}
		></div>
	);
}

export default observer(RightView);
