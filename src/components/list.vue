<template>
  <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
    <li v-for="(item,index) in list" :key="index">{{ item }}</li>
  </ul>
</template>

<script>
/*  import { InfiniteScroll } from 'mint-ui';
  Vue.use(InfiniteScroll);*/
  import 'mint-ui/lib/style.css'
export default {
  name: 'list',
  props: {
    //msg: String
  },
  data:function(){
    return {
      list:[]
    }
  },
  methods:{
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        let last =this.list.length? this.list[this.list.length - 1]:0;
        console.log(last)
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i);
        }
        this.loading = false;
      }, 2500);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

