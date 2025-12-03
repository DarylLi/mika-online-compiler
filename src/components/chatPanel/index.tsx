import { observer } from 'mobx-react';
import React, { useEffect, useState, useRef } from 'react';
import { socketStore } from '@store/socket';
import { CloseOutlined } from '@ant-design/icons';
import './index.scss';
import { editStore } from '@store/index';
function chatPanel(): any {
	const [msgVal, setMsgVal] = useState('');
	const curRef = useRef<any>(null);

	const RenderList = socketStore.chatMessages.map((e, index) =>
		e.from === 'me' ? (
			<div className="message message-personal new" key={index}>
				{e.content}
				<div className="timestamp">{e.timestamp}</div>
			</div>
		) : (
			<div className="message new" key={index}>
				<figure className="avatar">
					<img src="data:image/webp;base64,UklGRowDAABXRUJQVlA4IIADAACwEQCdASpQAFAAPkkejESioaEWaZ4gKASEoApeVBVF4/UgkedF/iRbgr9mfXo6JLqAN5IU7pwyhrn8HukfTYvJf5+eU1Kfs7/GdfxXD8ObuTpPOYTuG7hssGkSboihwYJuiXJw2H9VGkWfA8WhnI6687WcQGqlIWhswOpgYCKDhEmgCMCFQPMHUEtqv2k0hl9nfrcEpzAA/vHKU/FXw4Nk+D0aXnFf52D/wP/A+WxpMDwOA2i6pMS/XD8wFUITg++KhHW42dw/E5mKZ2GOEPAHQwKPTVnueM/2DWkkotksBBZHY2W3G9/KljKABoIK3scwKloCXlO0WxWl25f8OY3Iv+rhhGkVleJWKjKfMNol4cEofjk6Ynna2xS+fTT189mnr3+yynMiFxAlSmsyqv2m5mdfyx/QDTcCrGusA4kXWtd+wCP0hU468dQvBtfzTrvT8Q+YgWiH4gwH7EnnFKBHum794qDrVc5Rx+t9D3qZQllwUqTSJpwiq0c9/uAEdqw4eb28MGY0J/8qIbEelk/uwPH8Sndx4emRcnnpJfxDUWBICqWKIMAOWspGPv3EW4V9PH1H6P+o4oSVA/kAaCx/zu8BT9zudt0trwJIxFLE3T7gDdIqn17+x5PYciz1iPBOokbIpFrU4/WXodM/xr/1YjudF4gIMz0dXMdfmClmYmwANDT/Cf23smf/0Rd83trBFH59jPq2uq5+O4M04UjOaYBa2RgwT3ALEt/UDf7grPFMXVPGy6nML4xmjT+WBHC+2cjIhg3eav9Ivkz/Guez/6+//pL9V9aPwFV/Wx/n5OQ89toPIKRsXvilTCN30L6bRljMXPXWXfgWHmGcJKWswcSq4XGgTyN61miSLdFigi69X3bYfQ6+edD1GXgGLamix9dINXLvO/39QkfwWzp2NPuPf5OZXoo0FmLB71mEdt+n1/55D1ZYRbMud8bybNV936RybuHZmsH9vh/tTOcs0ubQuWRgdmB6PAcLh+XvRJijShNWztHjK+PFFURG/P7Trhy/SymyuhpKhTRw6tzz+XKTCtLNEYsoWfscVn0jlKPWqKqf0+bfTunwqKv8NHQB5qsxNLfU0AdaAIO0mkCwJhRc3VCBDJJYK2Ewv3JVgcnjMIEa+fAeaqnBn9MpykWbC33UzuyqSnflwNsNv1hXQbX+gJt4DlgBAQWhJAAAAA==" />
				</figure>
				{e.content}
				<div className="timestamp">{e.timestamp}</div>
			</div>
		)
	);
	const handleKeyDown = (event: any) => {
		if (event.key === 'Enter') {
			sendingMessage();
			// You can add logic here to submit a form, send a message, etc.
		}
	};
	const sendingMessage = () => {
		const newMsg = {
			from: 'me',
			content: msgVal,
			timestamp: `${new Date().getHours() < 10 ? 0 : ''}${new Date().getHours()}:${new Date().getMinutes() < 10 ? 0 : ''}${new Date().getMinutes()}`
		};
		socketStore.sendChatMessage(
			socketStore.helperId || socketStore.assitantedId,
			msgVal,
			editStore.curType,
			newMsg
		);
		// setChatList([...chatList, newMsg]);
		setMsgVal('');
		setTimeout(() => {
			curRef.current?.scrollTo(0, 1000);
		});
	};
	return (
		<>
			{(socketStore?.helperId || socketStore?.assitantedId) && (
				<div
					className={`chatting-panel ${socketStore.showChatAlarm ? 'alarm' : ''}`}
				>
					<div
						className="container"
						onClick={() => socketStore.handleShowChatPanel(true)}
					>
						<div id="chatbot">
							<div className="dot"></div>
							<div className="dot"></div>
							<div className="dot"></div>
						</div>
						<div id="antenna">
							<div id="beam"></div>
							<div id="beam-pulsar"></div>
						</div>
					</div>
					<div className={`chat ${socketStore.showChatPanel ? 'show' : ''}`}>
						<div className="chat-title">
							<h3>
								talk to {socketStore.joinAssitance ? 'helper' : 'requester'}
							</h3>
							<h2>
								{socketStore.joinAssitance
									? (socketStore.assitantedId || '').slice(0, 5)
									: (socketStore.helperId || '').slice(0, 5)}
								...
							</h2>
							<figure className="avatar">
								<img src="data:image/webp;base64,UklGRowDAABXRUJQVlA4IIADAACwEQCdASpQAFAAPkkejESioaEWaZ4gKASEoApeVBVF4/UgkedF/iRbgr9mfXo6JLqAN5IU7pwyhrn8HukfTYvJf5+eU1Kfs7/GdfxXD8ObuTpPOYTuG7hssGkSboihwYJuiXJw2H9VGkWfA8WhnI6687WcQGqlIWhswOpgYCKDhEmgCMCFQPMHUEtqv2k0hl9nfrcEpzAA/vHKU/FXw4Nk+D0aXnFf52D/wP/A+WxpMDwOA2i6pMS/XD8wFUITg++KhHW42dw/E5mKZ2GOEPAHQwKPTVnueM/2DWkkotksBBZHY2W3G9/KljKABoIK3scwKloCXlO0WxWl25f8OY3Iv+rhhGkVleJWKjKfMNol4cEofjk6Ynna2xS+fTT189mnr3+yynMiFxAlSmsyqv2m5mdfyx/QDTcCrGusA4kXWtd+wCP0hU468dQvBtfzTrvT8Q+YgWiH4gwH7EnnFKBHum794qDrVc5Rx+t9D3qZQllwUqTSJpwiq0c9/uAEdqw4eb28MGY0J/8qIbEelk/uwPH8Sndx4emRcnnpJfxDUWBICqWKIMAOWspGPv3EW4V9PH1H6P+o4oSVA/kAaCx/zu8BT9zudt0trwJIxFLE3T7gDdIqn17+x5PYciz1iPBOokbIpFrU4/WXodM/xr/1YjudF4gIMz0dXMdfmClmYmwANDT/Cf23smf/0Rd83trBFH59jPq2uq5+O4M04UjOaYBa2RgwT3ALEt/UDf7grPFMXVPGy6nML4xmjT+WBHC+2cjIhg3eav9Ivkz/Guez/6+//pL9V9aPwFV/Wx/n5OQ89toPIKRsXvilTCN30L6bRljMXPXWXfgWHmGcJKWswcSq4XGgTyN61miSLdFigi69X3bYfQ6+edD1GXgGLamix9dINXLvO/39QkfwWzp2NPuPf5OZXoo0FmLB71mEdt+n1/55D1ZYRbMud8bybNV936RybuHZmsH9vh/tTOcs0ubQuWRgdmB6PAcLh+XvRJijShNWztHjK+PFFURG/P7Trhy/SymyuhpKhTRw6tzz+XKTCtLNEYsoWfscVn0jlKPWqKqf0+bfTunwqKv8NHQB5qsxNLfU0AdaAIO0mkCwJhRc3VCBDJJYK2Ewv3JVgcnjMIEa+fAeaqnBn9MpykWbC33UzuyqSnflwNsNv1hXQbX+gJt4DlgBAQWhJAAAAA==" />
							</figure>
							<div
								className="close-btn"
								onClick={() => socketStore.handleShowChatPanel(false)}
							>
								<CloseOutlined />
							</div>
						</div>
						<div className="messages">
							<div className="messages-content" ref={curRef}>
								{RenderList}
							</div>
						</div>
						<div className="message-box">
							<textarea
								//@ts-ignore
								type="text"
								className="message-input"
								placeholder="Type message..."
								onKeyDown={handleKeyDown}
								onChange={(e: any) => {
									setMsgVal(e.target.value);
								}}
								value={msgVal}
							></textarea>
							<button
								type="submit"
								className="message-submit"
								onClick={sendingMessage}
							>
								Send
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
export default observer(chatPanel);
