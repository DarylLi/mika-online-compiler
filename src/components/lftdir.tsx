import React, { useState, useEffect } from 'react';
import { Input, Tree, message } from 'antd';
import { templates } from '@mock/fileData';
import { vueTemplates } from '@mock/vueData';
import { editStore } from '@store/index';
import { getCodeTransform, getFileContent } from '@utils/index';
import { parseVue } from '@utils/parseVue';
import {
  FolderFilled,
  DownOutlined,
  FileOutlined,
  CloseOutlined,
  EditOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
import {
  initIndexDB,
  getAllData,
  addData,
  updateData,
  getData,
  deleteData,
} from '@utils/indexDb';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
// const projcetTmp = { ...templates, ...crd, ...umiRust };

function Directory(props: any) {
  const { cpType = 'react' } = props;
  const [defaultFile, setDefaultFile] = useState({});
  // editStore.setCurrentFile(currentFile);
  const [messageApi, contextHolder] = message.useMessage();
  const [newFile, setNewFile] = useState(null);
  const [showOP, setShowOP] = useState('');
  const [showRename, setShowRename] = useState('');
  const [showRenameKey, setShowRenameKey] = useState('');
  // const [spendKeys, setSpendKeys] = useState([editStore?.curType || "vue"]);
  const [spendKeys, setSpendKeys] = useState([
    cpType === 'react' ? templates[0]?.path : vueTemplates[0]?.path,
  ]);
  const onChange = (newValue: any, e: any) => {
    console.log('onChange', newValue, e);
  };

  const onExpand: any = (expandedKeys: any, expanded: boolean) => {
    setSpendKeys(expandedKeys);
  };
  const onRightClick = (info: any) => {
    setShowOP(info?.node?.path);
  };
  const inputName = (e: any) => {
    setShowRename(e.target.value);
  };
  const finishChangeName = (e: any) => {
    // 改名后：
    // 同步更新Store
    const templatesAfter = toJS(editStore.currentFiles);
    (templatesAfter[0].children || []).forEach((element: any) => {
      if (element.path === showRenameKey) {
        element.filename = showRename;
      }
    });
    // 同步更新indexDB缓存
    editStore.setCurrentFiles(templatesAfter);
    const changedData = {
      id: 'daryl',
      name: 'daryl',
      templates: toJS(templatesAfter),
    };
    updateData(
      (editStore as any).currentIndexDBInstance.db,
      cpType === 'react' ? 'mika-templates' : 'mika-vue-templates',
      changedData
    );
    // 重新编译
    const currentFile = templatesAfter[0].children.find((e: any) =>
      cpType === 'react'
        ? e.filename.includes('app.jsx')
        : e.filename.includes('App.vue')
    );
    cpType === 'react'
      ? getCodeTransform(currentFile?.value || '', templatesAfter)
      : parseVue(currentFile?.value || '', templatesAfter);
    setShowOP('');
    setShowRename('');
    setShowRenameKey('');
  };
  const AddFile = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (newFile) {
      return;
    }
    const templatesAfter = toJS(editStore.currentFiles);
    (templatesAfter[0].children || []).forEach((element: any) => {
      if (element.path === showRenameKey) {
        element.filename = showRename;
      }
    });

    const curFiles = templatesAfter[0].children;
    if (curFiles.length > 7) {
      messageApi.open({
        type: 'error',
        content: 'maxium file number reached ！！',
      });
      return;
    }
    let curFile = {
      filename: `newFile${curFiles.length}.${cpType === 'react' ? 'jsx' : 'vue'}`,
      path: `src/newFile${curFiles.length}.${cpType === 'react' ? 'jsx' : 'vue'}`,
      value: ` `,
    };
    templatesAfter[0].children.push(curFile);
    // setNewFile();
    // 同步更新indexDB缓存
    editStore.setCurrentFiles(templatesAfter);
    const changedData = {
      id: 'daryl',
      name: 'daryl',
      templates: toJS(templatesAfter),
    };
    updateData(
      (editStore as any).currentIndexDBInstance.db,
      cpType === 'react' ? 'mika-templates' : 'mika-vue-templates',
      changedData
    );
  };
  const changeName = (event: any, node: any) => {
    event.preventDefault();
    event.stopPropagation();
    setShowRename(node?.filename);
    setShowRenameKey(node?.path);
  };
  const deleteData = (event: any, node: any) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const onSelect = (selectedKeys: any[], info: any) => {
    console.log(info);
    info?.node?.kind !== 'directory' &&
      editStore.updateCode(
        getFileContent(editStore.currentFiles, info?.node?.path) || ''
      );
    info?.node?.kind !== 'directory' && editStore.updateInfo(info?.node || '');
    // getDBSaved({});
    setSpendKeys(
      spendKeys.includes(info?.node?.filename)
        ? spendKeys.filter(e => e !== info.node.filename)
        : [...spendKeys, info?.node?.filename]
    );
    setShowOP('');
    setShowRenameKey('');
  };
  useEffect(() => {
    const curData = {
      db: null,
      storeName: cpType === 'react' ? 'mika-templates' : 'mika-vue-templates', //当前的数据库名
      version: 1, //版本号
    };
    const info = {
      id: 'daryl',
      name: 'daryl',
      templates: cpType === 'react' ? templates : vueTemplates,
    };
    // 设定一个入口文件：app.jsx

    setTimeout(async () => {
      const curRequest = await initIndexDB(curData);
      editStore.setCurrentFiles(cpType === 'react' ? templates : vueTemplates);
      editStore.setCurrentIndexDBInstance(curRequest);
      try {
        // indedb初始化
        let indexStore = await getData(
          curRequest.db,
          cpType === 'react' ? 'mika-templates' : 'mika-vue-templates',
          'daryl'
        );
        // 渲染文件树，及indexdb缓存生成
        indexStore?.templates
          ? editStore.setCurrentFiles(indexStore.templates)
          : addData(
              curRequest.db,
              cpType === 'react' ? 'mika-templates' : 'mika-vue-templates',
              info
            );
        // 默认文件加载
        const currentFile = (indexStore?.templates ||
          (cpType === 'react' ? templates : vueTemplates))[0].children.find(
          (e: any) =>
            cpType === 'react'
              ? e.filename.includes('app.jsx')
              : e.filename.includes('App.vue')
        );
        // 默认文件store相关存储
        editStore.updateCode(currentFile.value);
        editStore.updateInfo(currentFile);
        setDefaultFile(currentFile);
        // 渲染入口文件内容至目标dom
        const getRootDom = setInterval(() => {
          document.getElementById('previewFrame') &&
            (() => {
              cpType === 'react'
                ? getCodeTransform(
                    currentFile?.value || '',
                    indexStore?.templates || templates
                  )
                : parseVue(
                    currentFile?.value || '',
                    indexStore?.templates || vueTemplates
                  );
              clearInterval(getRootDom);
            })();
        }, 500);
      } catch (error) {
        console.log(error);
        // addData(curRequest.db, "mika-templates", info);
      }

      // updateData(curRequest.db, "mika-templates", info);
    });
  }, []);
  return (
    <div className='mika-mona-left-dir'>
      {contextHolder}
      {editStore.currentFiles.length > 0 && (
        <Tree
          showLine={false}
          showIcon={true}
          icon={<FileOutlined />}
          switcherIcon={<DownOutlined />}
          onSelect={onSelect}
          onRightClick={onRightClick}
          defaultSelectedKeys={[(defaultFile as any).path]}
          onExpand={onExpand}
          expandedKeys={spendKeys}
          titleRender={(node: any) =>
            showRenameKey === node.path ? (
              <Input
                size='small'
                value={showRename}
                onClick={e => {
                  e.stopPropagation();
                }}
                onFocus={e => {
                  e.stopPropagation();
                }}
                onInput={e => {
                  inputName(e);
                }}
                onBlur={finishChangeName}
              />
            ) : (
              <>
                <div className='mika-mona-left-dir-title'>{node.filename}</div>
                {'src' === node.path && (
                  <span
                    className='mika-mona-left-dir-title-add'
                    onClick={AddFile}
                  >
                    <FileAddOutlined />
                  </span>
                )}
                {showOP === node.path && !/App.vue|app.jsx/.test(showOP) && (
                  <div className='mika-mona-left-dir-title-op'>
                    <span>
                      <EditOutlined
                        onClick={event => {
                          changeName(event, node);
                        }}
                      ></EditOutlined>
                    </span>
                    <span>
                      <CloseOutlined
                        onClick={event => deleteData(event, node)}
                      ></CloseOutlined>
                    </span>
                  </div>
                )}
              </>
            )
          }
          treeData={(
            JSON.parse(JSON.stringify(editStore.currentFiles)) || []
          ).map((el: any) => ({
            ...el,
            icon: el.kind === 'directory' ? <FolderFilled /> : <FileOutlined />,
          }))}
          fieldNames={{ title: 'filename', key: 'path' }}
        ></Tree>
      )}
    </div>
  );
}

export default observer(Directory);
