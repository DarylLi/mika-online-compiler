import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Avatar, Button, List, Modal } from 'antd';
import { socketStore } from '@store/socket';
import './index.scss';
import { editStore } from '@store/index';

interface DataType {
	gender?: string;
	name?: string;
	email?: string;
	avatar?: string;
	loading: boolean;
}

const requestList = (props: any) => {
	const navigate = useNavigate();
	const joinAssistance = (e, item) => {
		socketStore.switchList();
		socketStore.joinAssistance(item.requesterUuid);
		editStore.setAssistanceTemplate(item.templateContent, item.templateId);
		setTimeout(() => {
			navigate('assitant');
		}, 500);
	};
	return (
		<>
			<Modal
				title="Assistance List"
				open={props.showLog}
				footer={null}
				cancelText="close"
				className="AssistanceModal"
				width={600}
				onCancel={() => {
					socketStore.switchList();
				}}
			>
				<List
					className="assistance-request-list"
					itemLayout="horizontal"
					dataSource={socketStore.assitanceList.filter((e: any) => e.show)}
					renderItem={(item, index) =>
						item.show ? (
							<List.Item
								actions={[
									<a
										key="list-assistance-edit"
										onClick={(e) => {
											joinAssistance(e, item);
										}}
									>
										join
									</a>
								]}
							>
								<List.Item.Meta
									avatar={
										<Avatar
											src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
										/>
									}
									title={
										<span>
											User:{' '}
											<span className="attention">{item.requesterUuid}</span>
										</span>
									}
									description={
										<>
											please help me with the
											<span className="attentionType"> {item.templateId} </span>
											project
										</>
									}
								/>
							</List.Item>
						) : (
							<></>
						)
					}
				/>
			</Modal>
		</>
	);
};

export default observer(requestList);
