<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'
//import qs from 'qs'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted() {
    axios.get("http://rsj.weihai.gov.cn/module/web/jpage/dataproxy.jsp?startrecord=1&endrecord=45&perpage=15&webid=82&appid=1&columnid=46521&sourceContentType=1&unitid=100041&permissiontype=0").then(data=>{
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
