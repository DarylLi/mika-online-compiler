import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { editStore } from '@store/index';
import { socketStore } from '@store/socket';

import './index.scss';

const terminate = (props) => {
	const closeTerminate = () => {
		const { handleClose } = props;
		console.log(handleClose);
		handleClose();
	};
	useEffect(() => {}, []);
	return (
		<>
			<div className="terminal-window">
				<header>
					<div className="button green" onClick={closeTerminate}></div>
					<div className="button yellow" onClick={closeTerminate}></div>
					<div className="button red" onClick={closeTerminate}></div>
				</header>
				<section className="terminal">
					<div className="history">
						{editStore.logMsg.map((info, i) => (
							<span className="prompt" key={i}>
								<span>{info.msg}</span>
								<span className="time">{info.time}</span>
							</span>
						))}
					</div>
				</section>
			</div>
		</>
	);
};

export default observer(terminate);
