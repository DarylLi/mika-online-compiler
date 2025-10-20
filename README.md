# Mika Online Compiler

## 项目简介

Mika Online Compiler 是一个基于前端渲染的在线代码编辑器，支持实时编译和预览功能。该项目允许用户在浏览器中直接编写、编辑和预览 React 和 Vue 代码，无需本地开发环境即可快速体验前端开发。

## 核心特性

### 🚀 多框架支持

- **React 支持**: 完整的 React 18 开发环境，支持 JSX 语法
- **Vue 支持**: Vue 3 单文件组件 (SFC) 支持，包含 template、script、style 块

### 🎨 UI 组件库集成

- **React**: 集成 Ant Design 组件库，提供丰富的 UI 组件
- **Vue**: 集成 Element Plus 组件库，支持完整的组件生态

### 💻 编辑器功能

- **Monaco Editor**: 基于 VS Code 的编辑器内核，提供完整的代码编辑体验
- **语法高亮**: 支持 JavaScript、TypeScript、Vue、JSX 等多种语法
- **智能提示**: 代码自动补全和错误检测
- **主题支持**: 内置暗色主题，提供舒适的编码环境

### 🔧 编译与预览

- **实时编译**: 代码修改后自动编译，无需手动刷新
- **热更新**: 支持组件热重载，提升开发效率
- **沙箱预览**: 使用 Shadow DOM 隔离预览环境，确保代码安全
- **模块解析**: 智能处理文件依赖关系，支持组件间引用

### 📁 文件管理

- **文件树**: 可视化的文件目录结构
- **文件操作**: 创建、删除、重命名文件功能
- **本地存储**: 使用 IndexedDB 持久化保存项目数据

## 技术架构

### 前端技术栈

- **React 18**: 主要 UI 框架
- **MobX**: 状态管理
- **Monaco Editor**: 代码编辑器
- **Webpack 5**: 模块打包工具
- **Babel**: JavaScript 编译器
- **Vue-SFC-Loader**: Vue 单文件组件加载器

### 核心功能实现

- **代码转换**: 使用 Babel Standalone 进行实时代码转换
- **模块解析**: 自定义模块解析器处理文件依赖
- **组件热更新**: 动态卸载和重新挂载组件实现热更新

## 项目结构

```
src/
├── components/          # React 组件
│   ├── ctmain.tsx      # 主编辑器组件
│   ├── lftdir.tsx      # 左侧文件树
│   ├── rtview.tsx      # 右侧预览面板
│   └── vueCmpt/        # Vue 组件示例
├── utils/              # 工具函数
│   ├── index.js        # React 代码转换工具
│   ├── parseVue.js     # Vue 代码解析器
│   └── indexDb.js      # IndexedDB 操作
├── store/              # 状态管理
├── router/             # 路由配置
└── mock/               # 模拟数据
```

## 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
```

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

### 预览

<img width="2874" height="1364" alt="b9cee4f8182f707f01215b71837b9964" src="https://github.com/user-attachments/assets/053ce5c7-ce4c-4fc5-a4c5-db9602181318" />

<img width="2876" height="1366" alt="6a44a0992ec58964c5b401bdf91b0a85" src="https://github.com/user-attachments/assets/33b07a3d-2349-4c9f-a1f0-668726410e1c" />

## 使用说明

1. **选择框架**: 在界面中选择 React 或 Vue 开发模式
2. **创建文件**: 使用文件树创建新的组件文件
3. **编写代码**: 在 Monaco 编辑器中编写代码
4. **实时预览**: 右侧预览面板会实时显示编译结果
5. **保存项目**: 项目数据会自动保存到本地 IndexedDB

## 功能演示

### React 开发示例

```jsx
import React, { useState } from 'react';
import { Button, Card } from 'antd';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Card title='React 计数器'>
      <p>当前计数: {count}</p>
      <Button onClick={() => setCount(count + 1)}>点击增加</Button>
    </Card>
  );
}

export default App;
```

### Vue 开发示例

```vue
<template>
  <el-card title="Vue 计数器">
    <p>当前计数: {{ count }}</p>
    <el-button @click="increment">点击增加</el-button>
  </el-card>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const count = ref(0);

    const increment = () => {
      count.value++;
    };

    return {
      count,
      increment,
    };
  },
};
</script>
```

## 开发计划

- [ ] 支持更多 UI 组件库 (Material-UI, Vuetify 等)
- [ ] 添加代码片段和模板功能
- [ ] 支持 CSS 预处理器 (Sass, Less)
- [ ] 集成代码格式化工具
- [ ] 添加项目导出功能
- [ ] 支持多人协作编辑
- [ ] 添加代码分享功能

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目！

## 许可证

MIT License

## 相关链接

- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react)
- [Ant Design](https://ant.design/)
- [Element Plus](https://element-plus.org/)
- [Vue 3](https://vuejs.org/)
- [React](https://reactjs.org/)
