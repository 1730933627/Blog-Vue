<template>
    <div class="bottom" :style="bottomHeight">
        <div>
            <div id="btop"></div>
            <h1>YanLin Inc.</h1>
            <div id="readme">
                <div class="left">
                    <p>法人名：稽智の琰凛</p>
                    <p>设立日:2020年6月11日</p>
                    <p>本站非商务网站</p>
                    <p>有事可以联系QQ:1730933627</p>
                    <p>主要内容:呈现了有关MMD的一系列自制动画。</p>
                    <p>备案号:陇ICP备20002446号</p>
                </div>
                <transition name="info">
                    <div class="right" v-show="finish">
                        <p>当前粉丝:<span id="follower">{{fans}}</span></p>
                        <p>今日:<span id="year">{{year}}</span>年<span id="month">{{month}}</span>月<span id=day>{{day}}</span>日</p>
                        <p>请勿侵权</p>
                        <p>可以闲聊哦~</p>
                        <p>感谢所有的投喂</p>
                        <p>以上</p>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from 'axios'
    export default {
        name:"Content",
        data(){
            return{
                finish:false,
                fans:0,
            }
        },
        computed:{
            ...mapGetters('windowSize',["getHeight","isLandscape"]),
            year(){
                const date = new Date();
                return date.getFullYear();
            },
            month(){
                const date = new Date();
                return date.getMonth()+1;
            },
            day(){
                const date = new Date();
                return date.getDate();
            },
            bottomHeight(){
                return `min-height:${this.getHeight*0.68}px;`
            }
        },
        beforeMount(){
            if(this.isLandscape){
              axios.post(process.env.VUE_APP_URL+'bl-api?uid=22516494').then(
                  response => {
                    this.fans = response.data.message.fans;
                    this.finish = true;
                  },
                  error => {
                    console.log(error);
                  })
            }
        }
    }
</script>

<style scoped>
  @media screen and (orientation: landscape) {
    .bottom #readme{
        width:55%;
        padding: 8vh 2vw;
    }
    .bottom h1{
        margin: 11vh 19.8% 0;
    }
  }
  @media screen and (orientation: portrait) {
    .bottom #readme{
        width:80%;
        padding: 3vh 3vw 5vh;
    }
    #readme .right{
        display: none;
    }
    .bottom h1{
        margin: 11vh 7vw 1.5vh;
    }
  }
    .info-enter-active {
        animation: in .5s ease-out both;
    }
    .info-leave-active {
        animation: in .5s reverse ease-in both;
    }
    @keyframes in {
        0% {
                transform: translateX(15%);
                opacity: 0;
        }
        100% {
                transform: translateX(0);
                opacity: 1;
        }
    }
    .bottom{
        width:100%;
        background-color: #87CEFA;
        padding: 8.2vh 0 12vh;
    }
    .bottom h1{
        user-select: none;
        font-size: 6vh;
        color: white;
    }
    .bottom #readme{
        display: flex;
        justify-content:space-between;
        background-color: aliceblue;
        margin: 0 auto;
        box-shadow: 0px 5px 0.5vh aqua;
    }
    .bottom #readme p{
        padding: 0.5vh 0 1vh;
        margin: 0 2vw;
        font-size: 2.5vh;
    }
    #readme > div{
        display: flex;
        flex-direction: column;
    }
    #readme > .left{
        align-items: flex-start;
    }
    #readme > .right{
        align-items: flex-end;
    }
</style>