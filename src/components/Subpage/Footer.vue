<template>
    <footer class="footer">
        <div class="sns-list">
            <div class="f-item"><img src="images/icon/QQ.png" @click="openQQ"/></div>
            <div class="f-item"><img src="images/icon/WX.png" @click="isShow=!isShow"/></div>
            <div class="f-item" v-show="getStatus"><a href="https://www.patreon.com/YanLinn" target="_blank"><img src="images/icon/PT.png"/></a></div>
            <div class="f-item" v-show="getStatus"><a href="https://azz.net/yanlin" target="_blank"><img src="images/icon/AZZ.png"/></a></div>
            <div class="f-item" v-show="getStatus"><a href="https://yanlinn.huotan.com" target="_blank"><img src="images/icon/HTW.png"/></a></div>
            <div class="f-item" v-show="!getStatus"><a href="https://www.aplaybox.com/u/178812252" target="_blank"><img src="images/icon/MZW.png"/></a></div>
        </div>
        <transition name="wx">    
            <div class="wx" v-show="isShow">
                <img src="images/icon/wx.jpg">
            </div>
        </transition>
        <p><span>@YanLin</span><router-link to="/about"><span>YanLin Inc</span></router-link></p>
    </footer>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name:"Footer",
        data(){
            return{
                isShow:false
            }
        },
        computed:{
            ...mapGetters('heardStatus',['getStatus'])
        },
        methods:{
            openQQ(){
                let qq = "1730933627";
                if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|wOSBrowser|BrowserNG|WebOS)/i))) {
                    window.location.href = `mqqwpa://im/chat?chat_type=wpa&uin=${qq}&version=1&src_type=web&web_src=oicqzone.com`;
                }
                else {
                    window.location.href = `tencent://message/?uin=${qq}`;
                }
            }
        }
    }
</script>

<style scoped>
    .wx-enter-active, .wx-leave-active {
        transition: transform .5s ease-in-out;
    }
    .wx-enter-from, .wx-leave-to {
        transform:translateX(-150%);
    }
    .footer{
        background-color: #87CEFA;
        padding: 5vh 0 2vh 0;
        user-select: none;
    }
    .footer .sns-list{
        text-align: center;
    }
    .sns-list .f-item{
        display: inline;
        margin: 0 2vh;
    }
    .f-item img{
        transform: translate(0px,0px);
        transition:transform 0.2s ease-in-out;
        width:5vh;
        cursor: pointer;
    }
    .f-item img:hover{
        transform: translate(0px,-5px);
        transition:transform 0.2s ease-in-out;
    }
    .footer > p{
        margin-top: 2vh;
        text-align: center;
        color: white;
        font-size: 1.5vh;
    }
    .footer > p > span{
        margin: 1vh 3vh;
    }
    .footer > p > a{
        color: white;
        text-decoration: none;
    }
    .footer > p > a:hover{
        text-decoration:underline;
    }
    .wx{
        position: fixed;
        line-height: 0;
        padding: 0.5vh;
        background-color: white;
        box-shadow: 0 0 .5vw #63B8FF;
        left: 1vw;
        bottom: 30vh;
        transition: all 0.5s ease-in-out;
    }
    
  @media screen and (orientation: landscape) {
    .wx{
        border-radius: 0.5vw;
    }
    .wx img{
        width: 10vh;
    }
  }
  @media screen and (orientation: portrait) {
    .wx{
        border-radius: 1vw;
    }
    .wx img{
        width: 10vh;
    }
  }
</style>