export const vueTemplates: any = [
	{
		filename: 'src',
		value: '',
		path: 'src',
		kind: 'directory',
		children: [
			{
				filename: 'App.vue',
				value: `<script setup>
import { ref } from "vue";
import ButtonCmpt from "./ButtonCmpt.vue";
const count = ref(12);
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
];
</script>
<template>
  <h2>This is Vue Page</h2>
  <div class='vue-logo'>
  <img
      alt="Vue logo"
      class="logo"
      src="https://v2.vuejs.org/images/logo.svg"
      width="125"
      height="125"
    />
  </div>
  <h3>ElementPlus components below:</h3>
  <div style={{"padding":"10px"}}>
    <el-button type='warning'>Waring!!!</el-button>
  </div>
  <div class="common-layout">
    <div>
    <el-link href="https://element-plus.org" target="_blank">default</el-link>
    <el-link type="primary">primary</el-link>
    <el-link type="success">success</el-link>
    <el-link type="warning">warning</el-link>
    <el-link type="danger">danger</el-link>
    <el-link type="info">info</el-link>
  </div> 
  </div>
  <div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
  </div>
  <div class="card">
    <el-button type="button" @click="count++">count iws {{ count }}</el-button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  
  <h3>Other components:</h3>
  <ButtonCmpt></ButtonCmpt>
  <!-- <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p> -->
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  <!-- <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
  </nav> -->
  <!-- <main>
    <RouterView />
  </main> -->
</template>
<style scoped>
.read-the-docs {
  color: #dedede;
}
h2{
  text-align:center;
}
.el-link {
  margin-right: 8px;
  margin-top: 10px;
  margin-bottom: 20px;
}
.vue-logo{
  display:flex;
  justify-content:center;
}
</style>
`,
				path: 'src/App.vue'
			},
			{
				filename: 'ButtonCmpt.vue',
				value: `<template>
  <button @click="count++">
    You you clicked :{{ count }} times! !
  </button><p>Hello</p>
</template>
<script setup>
  import {ref} from 'vue';
  const count = ref(0);
</script>`,
				path: 'src/ButtonCmpt.vue'
			}
		]
	}
];
