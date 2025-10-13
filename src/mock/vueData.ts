export const vueTemplates: any = [
  {
    filename: "src",
    value: "",
    path: "src",
    kind: "directory",
    children: [
      {
        filename: "App.vue",
        value: `<script setup>
import { ref } from "vue";
import ButtonCmpt from "./ButtonCmpt.vue";
const count = ref(12);
</script>
<template>
  <h1>okok</h1>
  <ButtonCmpt></ButtonCmpt>
  <div class="card">
    <button type="button" @click="count++">count iws {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
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
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
<style scoped>
.read-the-docs {
  color: #dedede;
}
</style>
`,
        path: "src/App.vue",
      },
      {
        filename: "ButtonCmpt.vue",
        value: `<template>
      <button @click="count++">
        You clicked ww {{ count }} times.
      </button>
    </template>`,
        path: "src/ButtonCmpt.vue",
      },
    ],
  },
];
