<template>
    <van-row>
        <van-sticky>
            <van-nav-bar
                    title="政策法规"

                    @click-left="onClickLeft"
                    @click-right="onClickRight"
            >
                <template #right>
                    <van-icon name="home-o" size="18" >
                    回到顶部
                    </van-icon>
                </template>
            </van-nav-bar>
            <van-cell-group>
                <img src="./assets/header_zc.png" style="width:90%;margin:10px"/>
                <!--<van-image width="100" height="100" src="./assets/header_zc.png" />-->
            </van-cell-group>
        </van-sticky>

        <!-- <div>
             <van-pagination v-model="currentPage" :page-count="12" mode="simple" />
         </div>-->
        <!--<ul  >
            <block v-for="(item,index) in list.recordset" v-bind:key="index" v-html="item">

            </block>

        </ul>-->
        <div id="flag"></div>
        <van-pull-refresh v-model="isFresh" @refresh="onRefresh">
            <van-list
                    v-model="isLoading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
            >
                <van-row>
                    <van-card v-for="(record,index) in recordset" :key="index"

                              @click="open(record.href)"
                              style="font-size:0.9em;">
                        <template #title>
                            <div style="margin-top:15px">{{record.title}}</div>
                        </template>
                        <template #footer>
                            <van-tag plain type="primary" size="large">{{record.date}}</van-tag>
                        </template>

                    </van-card>
                </van-row>
            </van-list>
        </van-pull-refresh>
    </van-row>
</template>

<script>
    //import HelloWorld from './components/HelloWorld.vue'
    // import http from './api/http.js'
    import {Toast} from 'vant';

    export default {
        name: 'App',
        components: {
            //HelloWorld
        },
        data() {
            return {
                isFresh: false,
                isLoading: false,
                finished: false,
                //list: [],
                totalrecord: 9999,
                recordset: [],
                startrecord: 1,
                endrecord: 45,
                currentPage: 1,

            }
        },
        mounted() {
            let that = this;
            that.recordset = []
            that.getList().then(data => {
                that.recordset = data;
            })
            // this.$http.post("/getWebText", {url: "http://rsj.weihai.gov.cn/art/2020/7/24/art_46521_2359752.html"}).then(data => {
            //     console.log(data)
            // })
        },
        methods: {
            getList() {
                let that = this;
                return this.$http.post("/parseUrl", {url: `http://rsj.weihai.gov.cn/module/web/jpage/dataproxy.jsp?startrecord=${that.startrecord}&endrecord=${that.endrecord}&perpage=15&webid=82&appid=1&columnid=46521&sourceContentType=1&unitid=100041&permissiontype=0`}).then(data => {
                    //console.log(data);
                    let recordset = [];
                    data.recordset.forEach(item => {
                        //let href=item.match(/href='(.+)'/)
                        //console.log(item.match(/title='(.+)'/))
                        let obj = {
                            href: item.match(/href='(\S+)'/)[1],
                            title: '● ' + item.match(/title='(.+)'/)[1],
                            date: item.match(/\[(\S+)\]/)[1]
                            /*content:item.match(/"\s*>(.+)<\/a>/)[1]*/
                        }
                        recordset.push(obj);

                    })
                    //that.list = data;
                    that.totalrecord = data.totalrecord;
                    return recordset;
                })
            },
            onRefresh() {
                let that = this;
                this.isFresh = true;
                this.startrecord=1;
                this.endrecord=45;
                this.finished=false;
                this.getList().then(data => {

                    setTimeout(() => {
                        that.recordset = data;
                        Toast('刷新成功');
                        that.isFresh = false;
                    }, 1000);

                });

            },
            onLoad() {
                let that = this;
                that.startrecord += 45;
                //console.log(that.endrecord + 45)
                //console.log(that.totalrecord)
                if (that.endrecord + 45 >= that.totalrecord) {
                    that.endrecord = that.totalrecord;
                    that.finished = true;
                } else {
                    that.endrecord += 45;
                    that.finished = false
                }
                this.getList().then(data => {
                    setTimeout(() => {
                        that.recordset.push.apply(that.recordset, data);
                        //Toast('刷新成功');
                        that.isLoading = false;
                    }, 500);
                })
            },
            onClickLeft() {
                Toast('返回');
            },
            onClickRight() {
                document.getElementById("flag").scrollIntoView({behavior:"auto",block:"center",inline:"center"})
            },
            open(href) {
                window.location.href=href;
               /* this.$http.post("/getWebText", {url: href}).then(data => {
                    if(data.status==200){
                        console.log(data.data)
                    }else{
                        Toast(data.data);
                    }
                })*/

            }
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
