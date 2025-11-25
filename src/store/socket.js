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
	constructor() {
		console.log(SocketInstance);
		makeAutoObservable(this);
	}
	/**
	 *
	 * @param {any} info
	 */
	handleMatchAssitance({ helperUuid, templateId } = info) {
		this.helperId = helperUuid;
	}
	/**
	 *
	 * @param {{event:string,data:any}} message
	 */
	handleMessage(message) {
		// setTimeout(() => {
		this.socketPending = false;
		message.event === 'helper-joined' &&
			this.handleMatchAssitance(message.data);
		// }, 2000);
	}
	switchList() {
		this.showList = !this.showList;
	}
	/**
	 *
	 * @param {string} templateType 模版类型：如react,vue,angularJs
	 * @param {string} templateData 模版文件stringify：
	 */
	requestAssistance(templateType, templateData) {
		this.socketPending = true;
		this.needAssitance = true;
		this.SocketInstance.requestAssistance(templateType, templateData);
	}
	getAssistanceList() {
		this.assitanceList = this.SocketInstance.assistanceRequests;
		return this.assitanceList;
	}
	/**
	 *
	 * @param {string} uuid
	 */
	joinAssistance(uuid) {
		this.assitantedId = uuid;
		this.joinAssitance = true;
		this.SocketInstance.joinAssistance(uuid);
	}
}

const socketStore = new SocketStore();
export { socketStore, SocketStore };
