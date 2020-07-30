<template>
    <van-row style="overflow-x: hidden;">
        <van-sticky>
            <van-nav-bar
                    title="政策法规"
                    @click-left="onClickLeft"
            >
                <template #left>
                    <van-icon name="arrow-left" size="18">
                        返回
                    </van-icon>
                </template>
            </van-nav-bar>
            <van-cell-group>
                <img src="../assets/header_zc.png" style="width:90%;margin:10px"/>
                <!--<van-image width="100" height="100" src="./assets/header_zc.png" />-->
            </van-cell-group>
        </van-sticky>
        <van-row>
<!--
            <div v-html="web"></div>
-->
            <iframe :srcdoc="web" id="target" sandbox="allow-same-origin allow-top-navigation allow-forms allow-scripts allow-popups"  seamless="seamless" style="width: 100vw;height:85vh;border:1px solid #eee" frameborder="no" ></iframe>
        </van-row>
    </van-row>
</template>

<script>
    import {Toast} from 'vant'
    export default {
        name: 'About',
        data(){
          return {
              web:'',
          }
        },
        props: {
           // msg: String
        },
        mounted() {
            let that=this;
            let href =localStorage.getItem("currentHref");

           // console.log("++++++++++++++++++")
           // console.log(href);
            this.$http.post("/getWebText",{url:href}).then(res=>{
                if(res.status==200){
                    let html=res.data;
                    html= html
                        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/g, '')
                        .replace(/src="\//g,`src="http://rsj.weihai.gov.cn/`)
                        .replace(/<img\s+.+?src=/g,`<img style="width:93vw;text-align:left;" src=`)
                        .replace(/href="\//g,`href="http://rsj.weihai.gov.cn/`)
                        .replace(/w1100/g,``)
                       // .replace(/<div\s+id="zoom"[\s\S]*?>/g,`<div id="zoom" style="width:100vw" >`)
                        .replace(/id=zoom/,`id=zoom style="width:91vw;"`)
                        .replace(/h170/,'')
                        .replace(/menu\s+bgc/,'')
                        .replace(/<head>/,`<head><style>body{overflow-x: hidden;overflow-y:auto}</style>`)
                        .replace(/"\s*bottom\s*"/,`"bottom" style="display:none;"`)
                    /*.replace(/<img[\s]+.+>/g)*/
                        //.replace(/data-src/g, "src")
                        //.replace(/https/g, 'http')
                        //.replace(/visibility: hidden/g, '')
                        //.replace(/href="##">阅读原文/g, 'href="'+src+'" target="_blank">阅读原文')
                        //.replace(/"/g,'&quot;')
                    ;
                    that.web=html;
                    document.getElementById('target').contentWindow.document.write(html)
                    document.getElementById('target').contentWindow.document.close();
                    /*let objectContainer = document.createElement('div');
                    objectContainer.innerHTML=html;
                    document.getElementById('target').contentWindow.document.body.appendChild(objectContainer)*/
                    //document.close();

                }else{
                    Toast(res.data);
                }

                //console.log(res)
            })
        },
        methods:{
            onClickLeft(){
                //window.history.back();
                this.$router.go(-1);
            }
        }
    }
</script>


