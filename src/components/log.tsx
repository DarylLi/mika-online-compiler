import { observer } from 'mobx-react';
import React, { PureComponent, createRef } from 'react';
import { editStore } from '@store/index';
import { useConsole } from '@utils/index';
import { Button, Modal } from 'antd';
import { toJS } from 'mobx';

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
		let shadowDomOrHTML =
			(document as any).getElementById('angularLive')?.getAttribute('srcDoc') ||
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
				<Button onClick={this.switchLog}>
					{showLog ? 'hide console' : 'show console'}
				</Button>
				<Button onClick={this.openPreview}>Open Preview</Button>
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
