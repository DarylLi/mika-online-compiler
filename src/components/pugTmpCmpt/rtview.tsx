import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';

function RightView(props: any) {
	const frameRef: any = useRef(null);

	return (
		<div
			className="mika-mona-right-view simpleFrame pug-frame"
			id="previewFrame"
			ref={frameRef}
		></div>
	);
}

export default observer(RightView);
