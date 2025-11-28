import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { renderButton } from '@utils/initButton';
import { editStore } from '@store/index';
import { socketStore } from '@store/socket';
import RequestList from './socketCmpt/requestList';
import '~@styles/popup';

const Popup = (props) => {
	useEffect(() => {
		popRef.current && renderButton(popRef.current);
	}, []);
	const popRef = useRef(null);
	const [tmp, setTmp] = useState('React');
	const navigate = useNavigate();
	const directLink = (url: string, type: string) => {
		(window as any)._isAssistanceMode = false;
		(window as any)._assistanceTempate = undefined;
		editStore.setType(type);
		switchPop();
		setTmp(type);
		navigate(url);
	};

	const switchPop = () => {
		editStore.updatePop(!editStore.showStorePop);
	};
	return (
		<>
			<RequestList showLog={socketStore.showList}></RequestList>
			<div className="popupCtrl" onClick={switchPop}>
				<svg
					ref={popRef}
					className="liquid-button"
					data-text="select template"
					data-force-factor="0.1"
					data-layer-1-viscosity="0.5"
					data-layer-2-viscosity="0.4"
					data-layer-1-mouse-force="400"
					data-layer-2-mouse-force="500"
					data-layer-1-force-limit="1"
					data-layer-2-force-limit="2"
					data-color1="#FFF500"
					data-color2="#20D8F9"
					data-color3="#20D8F9"
				></svg>
			</div>
			<div className="popupCurShow">
				<svg viewBox="0 0 600 300">
					<symbol id="s-text">
						<text textAnchor="start" x="0%" y="50%" dy=".35em">
							{editStore.curType}
						</text>
					</symbol>
					<use className="pop-text" xlinkHref="#s-text"></use>
					<use className="pop-text" xlinkHref="#s-text"></use>
					<use className="pop-text" xlinkHref="#s-text"></use>
					<use className="pop-text" xlinkHref="#s-text"></use>
					<use className="pop-text" xlinkHref="#s-text"></use>
				</svg>
			</div>
			<div className={`popupPanel ${editStore.showStorePop ? 'show' : ''}`}>
				<div onClick={() => directLink('entry', 'React')}>
					<svg
						className="popIcon"
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						fill="#0DB5EA"
						viewBox="0 0 16 16"
					>
						<path d="M16 8c0-1.06-1.32-2.06-3.36-2.68.46-2.08.26-3.72-.66-4.26a1.5 1.5 0 0 0-.74-.18v.72c.16 0 .28.02.38.08.44.26.64 1.22.48 2.46l-.16.96a15.5 15.5 0 0 0-2.08-.36c-.44-.6-.9-1.16-1.36-1.64 1.08-.96 2.08-1.5 2.76-1.5V.88c-.9 0-2.08.64-3.26 1.74C6.8 1.52 5.64.88 4.74.88v.72c.68 0 1.68.54 2.74 1.52-.46.48-.92 1.02-1.34 1.62-.74.08-1.44.2-2.08.36a5.4 5.4 0 0 1-.16-.94c-.16-1.24.04-2.22.48-2.48.1-.06.22-.08.38-.08V.9c-.28 0-.52.06-.74.18-.92.52-1.12 2.18-.64 4.24C1.32 5.94 0 6.94 0 8s1.32 2.06 3.36 2.68c-.46 2.08-.26 3.72.66 4.26.22.12.46.18.74.18.9 0 2.08-.64 3.26-1.74 1.18 1.1 2.36 1.74 3.26 1.74.28 0 .52-.06.74-.18.92-.52 1.12-2.18.64-4.24C14.68 10.06 16 9.06 16 8m-4.24-2.18c-.12.42-.28.86-.44 1.28l-.42-.78c-.16-.26-.3-.52-.46-.76.44.08.88.16 1.32.26m-1.5 3.48c-.26.44-.52.86-.78 1.24a18 18 0 0 1-2.94 0A16 16 0 0 1 5.08 8a16 16 0 0 1 1.46-2.54 18 18 0 0 1 2.94 0A16 16 0 0 1 10.94 8c-.2.44-.44.88-.68 1.3m1.06-.42c.18.44.32.88.46 1.3-.42.1-.88.2-1.34.26.16-.26.32-.5.46-.78zM8 12.36c-.3-.32-.6-.66-.9-1.04.3.02.6.02.9.02s.6 0 .9-.02c-.28.38-.6.72-.9 1.04m-2.42-1.92c-.46-.06-.9-.16-1.34-.26.12-.42.28-.86.44-1.28l.42.78zM8 3.64c.3.32.6.66.9 1.04-.3-.02-.6-.02-.9-.02s-.6 0-.9.02c.28-.38.6-.72.9-1.04M5.58 5.56c-.16.26-.32.5-.46.78q-.24.39-.42.78c-.18-.44-.32-.88-.46-1.3.42-.1.88-.18 1.34-.26m-2.96 4.1C1.46 9.16.72 8.52.72 8s.74-1.16 1.9-1.66c.28-.12.58-.22.9-.32.18.64.44 1.3.74 1.98q-.45 1.02-.72 1.98c-.32-.1-.62-.2-.92-.32m1.76 4.66c-.44-.26-.64-1.22-.48-2.46l.16-.96c.64.16 1.34.28 2.08.36.44.6.9 1.16 1.36 1.64-1.08.96-2.08 1.5-2.74 1.5a1 1 0 0 1-.38-.08m7.74-2.5c.16 1.24-.04 2.22-.48 2.48a.7.7 0 0 1-.38.08c-.68 0-1.68-.54-2.74-1.52.46-.48.92-1.02 1.34-1.62.74-.08 1.44-.2 2.08-.36.08.32.14.64.18.94m1.26-2.16c-.28.12-.58.22-.9.32-.18-.64-.44-1.3-.74-1.98q.45-1.02.72-1.98c.32.1.62.22.92.34 1.16.5 1.9 1.14 1.9 1.66 0 .5-.76 1.14-1.9 1.64M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"></path>
					</svg>
					React
				</div>
				<div onClick={() => directLink('sfc', 'Vue')}>
					<svg
						className="popIcon"
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 16 16"
					>
						<path
							fill="#41B883"
							d="M9.85 1.07 8 4.27l-1.85-3.2H0l8 13.86 8-13.86z"
						></path>
						<path
							fill="#34495E"
							d="M9.85 1.07 8 4.27l-1.85-3.2H3.2L8 9.4l4.8-8.32H9.85z"
						></path>
					</svg>
					Vue
				</div>
				<div onClick={() => directLink('angular', 'AngularJS')}>
					<img
						className="popIcon"
						src="data:image/png;base64,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"
						alt=""
					/>
					Angular
				</div>
				<div onClick={() => directLink('svelte', 'Svelte 3')}>
					<svg
						className="popIcon"
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 16 16"
					>
						<path
							fill="#FF3E00"
							d="M13.8 2.12A4.88 4.88 0 0 0 7.26.72L3.54 3.08A4.3 4.3 0 0 0 1.6 5.94c-.18.98-.02 2 .44 2.9a4.15 4.15 0 0 0-.64 1.6 4.88 4.88 0 0 0 7.34 4.84l3.72-2.38a4.3 4.3 0 0 0 1.94-2.86c.18-.98.02-2-.44-2.9.32-.48.54-1.02.64-1.6a4.56 4.56 0 0 0-.8-3.42"
						></path>
						<path
							fill="#fff"
							d="M6.94 13.92c-1.16.3-2.4-.16-3.08-1.14a2.67 2.67 0 0 1-.38-2.36l.06-.2.18.14c.42.32.9.56 1.42.7l.14.04-.02.14c-.02.2.04.38.14.54.2.3.58.44.94.36a.7.7 0 0 0 .22-.1l3.62-2.3c.18-.12.3-.3.34-.5a.72.72 0 0 0-.14-.6.85.85 0 0 0-1.16-.24l-1.38.88a2.89 2.89 0 0 1-3.82-.82 2.67 2.67 0 0 1-.46-2.02c.12-.7.54-1.3 1.12-1.68l3.62-2.3a2.89 2.89 0 0 1 3.82.82 2.67 2.67 0 0 1 .38 2.36l-.06.2-.18-.14a4.1 4.1 0 0 0-1.42-.7l-.14-.04.02-.14a.85.85 0 0 0-1.3-.78L5.82 6.3c-.18.1-.32.3-.34.5a.7.7 0 0 0 .14.6.85.85 0 0 0 1.16.24l1.38-.88a2.89 2.89 0 0 1 3.82.82c.42.58.58 1.3.46 2.02-.12.7-.54 1.3-1.12 1.68l-3.64 2.3c-.24.16-.48.26-.74.34"
						></path>
					</svg>
					Svelte 3
				</div>
				<div onClick={() => directLink('lit', 'LitJs')}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="popIcon"
						viewBox="0 0 16 16"
						width="1em"
						height="1em"
					>
						<path
							fill="#283198"
							d="M4.8 9.6V16l-3.2-3.2zm6.4-6.4v6.4L8 12.8V6.4z"
						></path>
						<path
							fill="#324FFF"
							d="M1.6 6.4v6.4l3.2-3.2zM8 0v6.4L4.8 9.6V3.2zm6.4 6.4v6.4L11.2 16V9.6z"
						></path>
						<path
							fill="#00E8FF"
							d="M8 6.4v6.4L4.8 9.6zm3.2 3.2V16L8 12.8z"
						></path>
						<path fill="#0FF" d="M4.8 9.6V16L8 12.8z"></path>
					</svg>
					LitJs
				</div>
				<div onClick={() => directLink('solid', 'Solid')}>
					<img
						className="popIcon"
						src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20166%20155.3'%3e%3cpath%20d='M163%2035S110-4%2069%205l-3%201c-6%202-11%205-14%209l-2%203-15%2026%2026%205c11%207%2025%2010%2038%207l46%209%2018-30z'%20fill='%2376b3e1'/%3e%3clinearGradient%20id='a'%20gradientUnits='userSpaceOnUse'%20x1='27.5'%20y1='3'%20x2='152'%20y2='63.5'%3e%3cstop%20offset='.1'%20stop-color='%2376b3e1'/%3e%3cstop%20offset='.3'%20stop-color='%23dcf2fd'/%3e%3cstop%20offset='1'%20stop-color='%2376b3e1'/%3e%3c/linearGradient%3e%3cpath%20d='M163%2035S110-4%2069%205l-3%201c-6%202-11%205-14%209l-2%203-15%2026%2026%205c11%207%2025%2010%2038%207l46%209%2018-30z'%20opacity='.3'%20fill='url(%23a)'/%3e%3cpath%20d='M52%2035l-4%201c-17%205-22%2021-13%2035%2010%2013%2031%2020%2048%2015l62-21S92%2026%2052%2035z'%20fill='%23518ac8'/%3e%3clinearGradient%20id='b'%20gradientUnits='userSpaceOnUse'%20x1='95.8'%20y1='32.6'%20x2='74'%20y2='105.2'%3e%3cstop%20offset='0'%20stop-color='%2376b3e1'/%3e%3cstop%20offset='.5'%20stop-color='%234377bb'/%3e%3cstop%20offset='1'%20stop-color='%231f3b77'/%3e%3c/linearGradient%3e%3cpath%20d='M52%2035l-4%201c-17%205-22%2021-13%2035%2010%2013%2031%2020%2048%2015l62-21S92%2026%2052%2035z'%20opacity='.3'%20fill='url(%23b)'/%3e%3clinearGradient%20id='c'%20gradientUnits='userSpaceOnUse'%20x1='18.4'%20y1='64.2'%20x2='144.3'%20y2='149.8'%3e%3cstop%20offset='0'%20stop-color='%23315aa9'/%3e%3cstop%20offset='.5'%20stop-color='%23518ac8'/%3e%3cstop%20offset='1'%20stop-color='%23315aa9'/%3e%3c/linearGradient%3e%3cpath%20d='M134%2080a45%2045%200%2000-48-15L24%2085%204%20120l112%2019%2020-36c4-7%203-15-2-23z'%20fill='url(%23c)'/%3e%3clinearGradient%20id='d'%20gradientUnits='userSpaceOnUse'%20x1='75.2'%20y1='74.5'%20x2='24.4'%20y2='260.8'%3e%3cstop%20offset='0'%20stop-color='%234377bb'/%3e%3cstop%20offset='.5'%20stop-color='%231a336b'/%3e%3cstop%20offset='1'%20stop-color='%231a336b'/%3e%3c/linearGradient%3e%3cpath%20d='M114%20115a45%2045%200%2000-48-15L4%20120s53%2040%2094%2030l3-1c17-5%2023-21%2013-34z'%20fill='url(%23d)'/%3e%3c/svg%3e"
						alt=""
					/>
					Solid
				</div>
				<div onClick={() => directLink('ember', 'EmberJS')}>
					<svg
						className="popIcon"
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 128 128"
					>
						<g fill="none" fillRule="evenodd">
							<path
								fill="#E05C43"
								fillRule="nonzero"
								d="M64 0c35.346 0 64 28.654 64 64s-28.654 64-64 64S0 99.346 0 64 28.654 0 64 0"
							></path>
							<path
								fill="#FFF"
								d="M65.265 24.128c8.246-.163 14.073 2.073 19.087 9.19 10.934 27.109-28.147 41.1-29.714 41.65l-.049.016s-1.18 7.363 10.028 7.08c13.793 0 28.294-10.691 33.81-15.21a3.293 3.293 0 0 1 4.468.265l4.13 4.29a3.29 3.29 0 0 1 .085 4.491c-3.59 3.997-12.014 12.203-24.696 17.504 0 0-21.16 9.798-35.42.52-8.503-5.53-10.842-12.151-11.793-19.038.005 0-10.324-.524-16.957-3.114-6.635-2.592.049-10.411.049-10.411s2.04-3.233 5.92 0c3.883 3.228 11.13 1.772 11.13 1.772.646-5.099 1.72-11.828 4.884-18.93 6.632-14.885 16.789-19.915 25.038-20.075m4.853 14.915c-4.369-4.21-16.984 4.202-17.471 23.45 0 0 3.724 1.134 11.97-4.53 8.25-5.661 9.87-14.718 5.501-18.92"
							></path>
						</g>
					</svg>
					EmberJS
				</div>
				<div onClick={() => directLink('ko', 'KnockOutJs')}>
					<img
						src="https://quintagroup.com/cms/js/js-image/knockout-js-logo.png/@@images/f4756dda-f9a9-4c04-9223-9f5724569747.png"
						className="popIcon"
						alt=""
					/>
					KnockOutJs
				</div>
			</div>
		</>
	);
};

export default observer(Popup);
