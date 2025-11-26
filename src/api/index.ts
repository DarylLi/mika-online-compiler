//type整理：pending
type Socket = any;
type UserInfo = any;
type AssistanceRequests = any;
type ContentChunks = any;
const sockethost = '192.168.71.77';
class SocketInstance {
	socket: Socket = null;
	userInfo: UserInfo = null;
	assistanceRequests: AssistanceRequests = null;
	contentChunks: ContentChunks = null;
	constructor(handleMessage: any) {
		if (this.socket && this.socket.readyState === WebSocket.OPEN) {
			console.log('⚠️ 已经连接，无需重复连接');
			return;
		}
		console.log('connecting', '连接中...');
		// 将 http:// 替换为 ws://，https:// 替换为 wss://
		const wsUrl =
			(window.location.protocol === 'https:' ? 'wss://' : 'ws://') +
			`${sockethost}:3000`;
		this.socket = new WebSocket(wsUrl);

		this.socket.onopen = () => {
			// updateStatus('connected', '已连接');
			console.log('✅ 已连接到服务器');
		};
		this.socket.onmessage = (event: { data: any }) => {
			try {
				const message = JSON.parse(event.data);
				this.handleMessage(message);
				handleMessage(message);
			} catch (error: unknown) {
				console.log(`❌ 消息解析错误: ${error as any}`);
			}
		};

		this.socket.onerror = (error: Error) => {
			// updateStatus('disconnected', '连接错误');
			console.log(`❌ WebSocket 错误` + error.message);
		};

		this.socket.onclose = () => {
			// updateStatus('disconnected', '已断开');
			console.log('❌ 已断开连接');
			this.userInfo = null;
		};
	}
	updateAssistanceList() {
		// const listDiv = document.getElementById('assistanceList');
		if (this.assistanceRequests?.length === 0) {
			// listDiv.innerHTML = '暂无协助请求';
			console.log('无请求');
			return;
		}
		// listDiv.innerHTML = assistanceRequests
		// 	.map(
		// 		(req) => `
		//         <div class="assistance-item" onclick="document.getElementById('requesterUuid').value='${req.requesterUuid}'">
		//             <strong>UUID:</strong> ${req.requesterUuid}<br>
		//             <strong>模板ID:</strong> ${req.templateId}
		//         </div>
		//     `
		// 	)
		// 	.join('');
	}
	handleMessage(message: any) {
		const { event, data } = message;
		switch (event as any) {
			case 'user-connected':
				this.userInfo = data;
				console.log(`data:`, data);
				console.log(`✅ 用户已连接: ${data.uuid}`);
				break;

			case 'assistance-list-updated':
				this.assistanceRequests = data;
				this.updateAssistanceList();
				console.log(`📋 协助列表已更新: ${data.length} 个请求`);
				break;

			case 'assistance-list':
				this.assistanceRequests = data;
				this.updateAssistanceList();
				console.log(`📋 获取协助列表: ${data.length} 个请求`);
				break;

			case 'helper-joined':
				console.log(`👤 协助者已加入: ${data.helperUuid}`);
				break;

			case 'assistance-joined':
				console.log(`✅ 已加入协助: ${data.requesterUuid}`);
				break;

			case 'assistance-requested':
				console.log(`✅ 协助请求已发送`);
				break;

			// case 'template-content-chunk':
			// 	this.handleContentChunk(data);
			// 	break;

			case 'message-received':
				// const chatDiv = document.getElementById('chatMessages');
				// chatDiv.innerHTML += `<div><strong>${data.fromUuid}:</strong> ${data.content}</div>`;
				// chatDiv.scrollTop = chatDiv.scrollHeight;
				console.log(`💬 收到消息: ${data.content}`);
				break;

			case 'message-sent':
				console.log(`✅ 消息已发送`);
				break;

			case 'assistance-ended':
				console.log(`🔚 协助已结束`);
				break;

			case 'error':
				console.log(`❌ 错误: ${data.message}`);
				break;

			default:
				console.log(`⚠️ 未知事件: ${event}`);
		}
	}
	requestAssistance(templateId: string, templateContent: string) {
		if (!this.userInfo) {
			console.log('请先连接服务器');
			return;
		}
		if (
			this.sendWebSocketMessage('request-assistance', {
				templateId,
				templateContent
			})
		) {
			console.log('📤 发送协助请求');
		}
	}
	joinAssistance(requesterUuid: string) {
		if (this.sendWebSocketMessage('join-assistance', { requesterUuid })) {
			console.log(`📤 加入协助: ${requesterUuid}`);
		}
	}
	switchContentFile(templateId: string, toUuid: string, switchFile: string) {
		if (!this.userInfo) {
			console.log('请先连接服务器');
			return;
		}
		if (
			this.sendWebSocketMessage('switch-content-file', {
				switchFile,
				toUuid,
				templateId
			})
		) {
			console.log('📤 切换当前文件');
		}
	}
	endAssistance(requesterUuid: string) {
		if (
			this.sendWebSocketMessage('end-assistance', {
				requesterUuid
			})
		) {
			console.log('📤 结束协助');
		}
	}
	sendContentMessage(
		templateId: string,
		path: string,
		code: string,
		toUuid: string
	) {
		this.sendWebSocketMessage('send-template-content', {
			content: code || ' ',
			path,
			toUuid,
			templateId
		});
	}
	sendWebSocketMessage(event: string, data: any) {
		if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
			console.error('请先连接服务器');
			return false;
		}
		try {
			this.socket.send(JSON.stringify({ event, data }));
			return true;
		} catch (error) {
			console.error(`❌ 发送消息失败: ${error.message}`);
			return false;
		}
	}
}
export { SocketInstance };
// export default new SocketInstance();
