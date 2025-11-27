import { makeAutoObservable } from 'mobx';
import { replaceFileContent } from '@utils/index';
import { SocketInstance } from '@api/index';

class SocketStore {
	SocketInstance = new SocketInstance(this.handleMessage.bind(this));
	socketPending = false;
	needAssitance = false;
	joinAssitance = false;
	showList = false;
	// 作为协作者时，对方的ID
	assitantedId = null;
	// 作为被协作者时，对方的ID
	helperId = null;
	assitanceList = [];
	switchFileNode = [];
	updatedCode = null;
	constructor() {
		makeAutoObservable(this);
	}
	/**
	 * 他人加入协作成功，获取协作者id
	 * @param {any} info
	 */
	handleMatchAssitance({ helperUuid, templateId } = info) {
		this.helperId = helperUuid;
	}
	/**
	 * 被协作者接受文件切换
	 *
	 * @param {any} data
	 */
	handleSwitchFile(data) {
		this.switchFileNode = [data.path];
	}
	handleChangeFile(data) {
		this.updatedCode = data.content || ' ';
	}
	/**
	 * 协作者触发切换文件
	 * @param {string} path
	 */
	doSwitchFile({ templateId, path } = info) {
		if (!this.assitantedId) return;
		this.SocketInstance.switchContentFile(templateId, this.assitantedId, path);
	}
	/**
	 * 协作者触发修改文件内容
	 * @param {any} info
	 */
	doChangeContent({ templateId, path, code } = info) {
		if (!this.assitantedId) return;
		this.SocketInstance.sendContentMessage(
			templateId,
			path,
			code,
			this.assitantedId
		);
	}
	handleAssistanceEnd() {
		this.needAssitance = false;
		this.helperId = null;
	}
	/**
	 * 接受消息
	 * @param {{event:string,data:any}} message
	 */
	handleMessage(message) {
		// setTimeout(() => {
		this.socketPending = false;
		// 协作者加入
		message.event === 'helper-joined' &&
			this.handleMatchAssitance(message.data);
		// 协作者切换用户文件
		message.event === 'get-switch-file' && this.handleSwitchFile(message.data);
		// 协作者修改用户文件
		message.event === 'template-content-chunk' &&
			this.handleChangeFile(message.data);
		// 更新协作列表
		message.event === 'assistance-list-updated' && this.getAssistanceList();
		// 当前请求的协作结束
		message.event === 'assistance-ended' && this.handleAssistanceEnd();
		// 协作者跑路
		message.event === 'helper-leave' && (this.helperId = null);
		// 协作发起者跑路
		message.event === 'requester-leave' && this.endAssistance();
	}
	switchList() {
		this.showList = !this.showList;
	}
	/**
	 * 请求他人协作
	 * @param {string} templateType 模版类型：如react,vue,angularJs
	 * @param {string} templateData 模版文件stringify：
	 */
	requestAssistance(templateType, templateData) {
		this.socketPending = true;
		this.needAssitance = true;
		this.SocketInstance.requestAssistance(templateType, templateData);
	}
	endAssistance() {
		this.SocketInstance.endAssistance(this.assitantedId);
		let curUrl = window.location.href.split('/');
		curUrl.splice(-1);
		setTimeout(() => {
			window.location.href = curUrl.join('/');
		}, 1500);
	}
	getAssistanceList() {
		this.assitanceList = this.SocketInstance.assistanceRequests;
		return this.assitanceList;
	}
	/**
	 * 加入协作，帮助他人
	 * @param {string} uuid
	 */
	joinAssistance(uuid) {
		this.assitantedId = uuid;
		this.joinAssitance = true;
		this.SocketInstance.joinAssistance(uuid);
	}
	stopRequest(uuid) {
		this.needAssitance = false;
		this.SocketInstance.stopRequest(uuid);
	}
}

const socketStore = new SocketStore();
export { socketStore, SocketStore };
