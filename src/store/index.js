import { makeAutoObservable } from 'mobx';
import { replaceFileContent } from '@utils/index';

class EditorStore {
	// curTemplate = "createReactDemo";
	// curType = "create-react-demo-tmp";
	currentIndexDBInstance = null;
	currentFiles = [];
	curTemplate = 'rustUmi';
	curType = 'rust-umi-generate';
	curStatic = 'dist';
	fileInfo = undefined;
	code = '';
	path = '';
	socket = null;
	showView = false;
	showSpin = false;
	logPanelRef = null;
	monacoModel = null;
	logMsg = [];
	viewSrc = `editorTarget/${this.curTemplate}/${this.curType}/${
		this.curStatic || 'dist'
	}/index.html`;

	constructor() {
		makeAutoObservable(this);
	}
	setCurrentIndexDBInstance(instance) {
		this.currentIndexDBInstance = instance;
	}
	setCurrentFiles(file) {
		this.currentFiles = file;
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
	updateMsg(msg) {
		let info = { msg, time: new Date().toTimeString().split(' ')[0] };
		this.logMsg = [...this.logMsg, info];
	}
	initSocket(socket) {
		this.socket = socket;
	}
	updateSpin(show) {
		this.showSpin = show;
	}
	updateInfo(data) {
		this.fileInfo = data;
	}
	updateCode(code, path = '') {
		this.code = code || ' ';
		path && (this.path = path);
		//编译前清log
		this.clearLog();
	}
	replaceFileContent(code) {
		replaceFileContent(this.currentFiles, this.fileInfo.path, code);
	}
	previewView(code) {
		this.showView = true;
	}
}

const editStore = new EditorStore();
export { editStore, EditorStore };
