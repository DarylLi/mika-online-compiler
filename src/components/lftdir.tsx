import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import { Tree } from "antd";
import { templates } from "@mock/fileData";
import { vueTemplates } from "@mock/vueData";
import { editStore } from "@store/index";
import { getCodeTransform, getFileContent } from "@utils/index";
import { parseVue } from "@utils/parseVue";
import { FolderFilled, DownOutlined, FileOutlined } from "@ant-design/icons";
import {
  initIndexDB,
  getAllData,
  addData,
  updateData,
  getData,
  deleteData,
} from "@utils/indexDb";
import { observer } from "mobx-react-lite";
// const projcetTmp = { ...templates, ...crd, ...umiRust };

function Directory(props: any) {
  const { cpType = "react" } = props;
  const [defaultFile, setDefaultFile] = useState({});
  // editStore.setCurrentFile(currentFile);

  const [stat, setStat] = useState(1);
  const [code, setCode] = useState("");
  // const [spendKeys, setSpendKeys] = useState([editStore?.curType || "vue"]);
  const [spendKeys, setSpendKeys] = useState([
    cpType === "react" ? templates[0]?.path : vueTemplates[0]?.path,
  ]);
  const editorDidMount = (editor: any, monaco: any) => {
    console.log("editorDidMount", editor);
    editor.focus();
  };
  const onChange = (newValue: any, e: any) => {
    console.log("onChange", newValue, e);
  };
  const options = {
    selectOnLineNumbers: true,
  };

  const onExpand: any = (expandedKeys: any, expanded: boolean) => {
    setSpendKeys(expandedKeys);
  };
  const onSelect = (selectedKeys: any[], info: any) => {
    // replaceFileContent(
    //   editStore.currentFiles,
    //   info?.node?.path,
    //   info?.node?.value
    // );
    // console.log(editStore.currentFiles);
    info?.node?.kind !== "directory" &&
      editStore.updateCode(
        getFileContent(editStore.currentFiles, info?.node?.path) || ""
      );
    info?.node?.kind !== "directory" && editStore.updateInfo(info?.node || "");
    // getDBSaved({});
    setSpendKeys(
      spendKeys.includes(info?.node?.filename)
        ? spendKeys.filter((e) => e !== info.node.filename)
        : [...spendKeys, info?.node?.filename]
    );
  };
  useEffect(() => {
    const curData = {
      db: null,
      storeName: cpType === "react" ? "mika-templates" : "mika-vue-templates", //当前的数据库名
      version: 1, //版本号
    };
    const info = {
      id: "daryl",
      name: "daryl",
      templates: cpType === "react" ? templates : vueTemplates,
    };
    // 设定一个入口文件：app.jsx

    setTimeout(async () => {
      const curRequest = await initIndexDB(curData);
      editStore.setCurrentFiles(cpType === "react" ? templates : vueTemplates);
      editStore.setCurrentIndexDBInstance(curRequest);
      try {
        // indedb初始化
        let indexStore = await getData(
          curRequest.db,
          cpType === "react" ? "mika-templates" : "mika-vue-templates",
          "daryl"
        );
        // 渲染文件树，及indexdb缓存生成
        indexStore?.templates
          ? editStore.setCurrentFiles(indexStore.templates)
          : addData(
              curRequest.db,
              cpType === "react" ? "mika-templates" : "mika-vue-templates",
              info
            );
        // 默认文件加载
        const currentFile = (indexStore?.templates ||
          (cpType === "react" ? templates : vueTemplates))[0].children.find(
          (e: any) =>
            cpType === "react"
              ? e.filename.includes("app.jsx")
              : e.filename.includes("App.vue")
        );
        // 默认文件store相关存储
        editStore.updateCode(currentFile.value);
        editStore.updateInfo(currentFile);
        setDefaultFile(currentFile);
        // 渲染入口文件内容至目标dom
        const getRootDom = setInterval(() => {
          document.getElementById("previewFrame") &&
            (() => {
              cpType === "react"
                ? getCodeTransform(
                    currentFile?.value || "",
                    indexStore?.templates || null
                  )
                : parseVue(
                    currentFile?.value || "",
                    indexStore?.templates || null
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
    <div className="mika-mona-left-dir">
      {editStore.currentFiles.length > 0 && (
        <Tree
          showLine={false}
          showIcon={true}
          icon={<FileOutlined />}
          switcherIcon={<DownOutlined />}
          onSelect={onSelect}
          defaultSelectedKeys={[(defaultFile as any).path]}
          onExpand={onExpand}
          expandedKeys={spendKeys}
          treeData={(
            JSON.parse(JSON.stringify(editStore.currentFiles)) || []
          ).map((el: any) => ({
            ...el,
            icon: el.kind === "directory" ? <FolderFilled /> : <FileOutlined />,
          }))}
          fieldNames={{ title: "filename", key: "path" }}
        ></Tree>
      )}
    </div>
  );
}

export default observer(Directory);
