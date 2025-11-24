import { observer } from 'mobx-react';
import React, { PureComponent, createRef } from 'react';
import { editStore } from '@store/index';
import { useConsole, getFileContent, getCodeTransform } from '@utils/index';
import { showVuePreview } from '@utils/parseVue';
import { Button, Tooltip, Modal } from 'antd';
import { toJS } from 'mobx';
import { FileTextOutlined, PlayCircleOutlined } from '@ant-design/icons';

@observer
class EditLog extends PureComponent<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			showLog: false,
			logPanelRef: null
		};
	}
	switchLog = () => {
		this.setState({ showLog: !this.state.showLog });
	};
	openPreview = () => {
		if (window.location.pathname === '/sfc') {
			let currentFile = getFileContent(editStore.currentFiles, 'src/App.vue');
			showVuePreview(
				currentFile,
				JSON.parse(JSON.stringify(editStore.currentFiles))
			);
			return;
		} else if (
			window.location.pathname === '/entry' ||
			window.location.pathname === '/'
		) {
			let currentFile = getFileContent(editStore.currentFiles, 'src/app.jsx');
			getCodeTransform(
				currentFile,
				JSON.parse(JSON.stringify(editStore.currentFiles)),
				false,
				true
			);
			return;
		}
		let shadowDomOrHTML =
			(
				(document as any).getElementById('angularLive') ||
				(document as any).getElementById('frameLive')
			)?.getAttribute('srcDoc') ||
			(document as any)
				.getElementById('previewFrame')
				.shadowRoot.querySelector('html');
		let newWindow = window.open('', '_blank', 'width=600,height=800');
		if (newWindow) {
			newWindow.document.write(shadowDomOrHTML.innerHTML || shadowDomOrHTML);
			newWindow.document.close();
		}
	};
	componentDidMount(): void {
		console.log(editStore.SocketInstance);
		useConsole(toJS(editStore.logMsg), editStore);
		this.setState({ logPanelRef: createRef() }, () => {
			editStore.setLogPanelRef(this.state.logPanelRef);
		});
	}
	render() {
		const hideModal = () => {
			this.setState({ showLog: false });
		};
		const { showLog, logPanelRef } = this.state;
		const classNames = {
			header: 'mika-log-header',
			body: 'mika-log-body'
		};
		return (
			<span className="logControl">
				{editStore.SocketInstance?.userInfo?.uuid}
				<Tooltip
					placement="bottom"
					color="#e52a39"
					title={showLog ? 'hide console' : 'show console'}
				>
					<Button
						onClick={this.switchLog}
						shape="circle"
						icon={<FileTextOutlined />}
						size="small"
					></Button>
				</Tooltip>
				<Tooltip placement="bottom" color="#ff3e00" title="open preview">
					<Button
						onClick={this.openPreview}
						shape="circle"
						icon={<PlayCircleOutlined />}
						size="small"
					></Button>
				</Tooltip>
				<Modal
					title="compile Logs"
					open={showLog}
					onOk={hideModal}
					onCancel={hideModal}
					classNames={classNames}
					footer={null}
					cancelText="close"
				>
					<div className="mika-out-log-content" ref={this.state.logPanelRef}>
						{editStore.logMsg.map((info, i) => (
							<span className="info-item" key={i}>
								<span>{info.msg}</span>
								<span>{info.time}</span>
							</span>
						))}
					</div>
				</Modal>
			</span>
		);
	}
}

export default EditLog;
