<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import http from './api/http.js'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted() {
    http.post("/getWebText",{url:"http://rsj.weihai.gov.cn/art/2020/7/24/art_46521_2359752.html"}).then(data=>{
      console.log(data)
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
