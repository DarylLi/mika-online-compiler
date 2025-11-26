import { makeAutoObservable } from 'mobx';
import { replaceFileContent } from '@utils/index';
import { socketStore } from './socket';
// const temMap = new WeakMap();
class EditorStore {
	// curTemplate = "createReactDemo";
	// curType = "create-react-demo-tmp";
	currentIndexDBInstance = null;
	currentFiles = [];
	curTemplate = 'rustUmi';
	curType = 'React';
	curStatic = 'dist';
	fileInfo = undefined;
	code = '';
	path = '';
	socket = null;
	showView = false;
	showSpin = false;
	logPanelRef = null;
	monacoModel = null;
	assistanceTemplate = null;
	logMsg = [];
	constructor() {
		makeAutoObservable(this);
	}
	setCurrentIndexDBInstance(instance) {
		this.currentIndexDBInstance = instance;
	}
	setCurrentFiles(file) {
		this.currentFiles = window._isAssistanceMode
			? this.assistanceTemplate
			: file;
	}
	setLogPanelRef(ref) {
		this.logPanelRef = ref;
	}
	setMonacoModel(model) {
		this.monacoModel = model;
	}
	clearLog() {
		this.logMsg.splice(0, this.logMsg.length);
		// this.logMsg = [];
	}
	setMsg(msgList) {
		this.logMsg = msgList;
	}
	setType(type) {
		this.curType = type;
	}
	updateMsg(msg) {
		let info = { msg, time: new Date().toTimeString().split(' ')[0] };
		this.logMsg = [...this.logMsg, info];
	}
	updateSpin(show) {
		this.showSpin = show;
	}
	updateInfo(data) {
		this.fileInfo = data;
		socketStore.doSwitchFile({
			templateId: this.curType,
			path: data.path
		});
	}
	updateCode(code, path = '') {
		this.code = code || ' ';
		if (path) {
			this.path = path;
		} else {
			socketStore.doChangeContent({
				templateId: this.curType,
				path: this.path,
				code
			});
		}
		//编译前清log
		this.clearLog();
	}
	replaceFileContent(code) {
		replaceFileContent(this.currentFiles, this.fileInfo.path, code);
	}
	previewView(code) {
		this.showView = true;
	}
	setAssistanceTemplate(template, type) {
		this.curType = type;
		this.code = '';
		// indexDB内部处理用标识
		window._isAssistanceMode = true;
		const curTemplate = JSON.parse(template);
		window._assistanceTempate = curTemplate;
		// if (assRoot) {
		// 	temMap.set(assRoot, JSON.parse(template));
		// }
		//temMap.set
		this.assistanceTemplate = curTemplate;
	}
}

const editStore = new EditorStore();
export { editStore, EditorStore };
