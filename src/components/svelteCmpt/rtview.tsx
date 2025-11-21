import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

function RightView(props: any) {
	// let cursocket: any = null;
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
