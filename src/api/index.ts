//type整理：pending
type Socket = any;
type UserInfo = any;
type AssistanceRequests = any;
type ContentChunks = any;
class SocketInstance {
	socket: Socket = null;
	userInfo: UserInfo = null;
	assistanceRequests: AssistanceRequests = null;
	contentChunks: ContentChunks = null;
	constructor() {
		if (this.socket && this.socket.readyState === WebSocket.OPEN) {
			console.log('⚠️ 已经连接，无需重复连接');
			return;
		}
		console.log('connecting', '连接中...');
		// 将 http:// 替换为 ws://，https:// 替换为 wss://
		const wsUrl =
			(window.location.protocol === 'https:' ? 'wss://' : 'ws://') +
			'localhost:3000';
		this.socket = new WebSocket(wsUrl);

		this.socket.onopen = () => {
			// updateStatus('connected', '已连接');
			console.log('✅ 已连接到服务器');
		};
		this.socket.onmessage = (event: { data: any }) => {
			try {
				const message = JSON.parse(event.data);
				this.handleMessage(message);
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
		const listDiv = document.getElementById('assistanceList');
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
	handleContentChunk(chunk: any) {
		const key = `${chunk.fromUuid}_${chunk.templateId}`;

		if (!this.contentChunks[key]) {
			this.contentChunks[key] = [];
		}

		this.contentChunks[key][chunk.chunkIndex] = chunk.content;
		console.log(`📦 接收内容分片 ${chunk.chunkIndex + 1}/${chunk.totalChunks}`);

		// 检查是否所有分片都已接收
		const receivedCount = this.contentChunks[key].filter(
			(c: any) => c !== undefined
		).length;
		if (receivedCount === chunk.totalChunks) {
			// 合并所有分片（按索引排序）
			const sortedChunks = this.contentChunks[key]
				.map((content: any, index: any) => ({ index, content }))
				.filter((item: any) => item.content !== undefined)
				.sort((a: any, b: any) => a.index - b.index);

			const fullContent = sortedChunks
				.map((item: any) => item.content)
				.join('');

			// 尝试解析为 JSON，如果是 JSON 则格式化显示
			try {
				const jsonContent = JSON.parse(fullContent);
				// document.getElementById('editorContent').value = JSON.stringify(
				// 	jsonContent,
				// 	null,
				// 	2
				// );
				console.log(
					`✅ 内容接收完成（JSON 格式），共 ${chunk.totalChunks} 个分片`
				);
			} catch (err: unknown) {
				// 不是 JSON，直接显示字符串
				// document.getElementById('editorContent').value = fullContent;
				console.log(
					`✅ 内容接收完成，共 ${chunk.totalChunks} 个分片,${err as any}`
				);
			}

			// 清理已处理的分片
			delete this.contentChunks[key];
		}
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

			case 'template-content-chunk':
				this.handleContentChunk(data);
				break;

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
}
export { SocketInstance };
export default new SocketInstance();
