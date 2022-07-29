<template>
    <div class="item">
        <div class="item_list" @click="openQQ">
            <img src="images/icon/QQ.png"/>
        </div>
        <div class="item_list" @click="showQR=!showQR">
            <img src="images/icon/WX.png"/>
        </div>
        <transition name="QR">
            <div class="wx" v-show="showQR">
                <img src="images/icon/wx.jpg"/>
            </div>
        </transition>
        <!-- <script>sidebar()</script> -->
        <div class="item_list" v-show="getStatus">
            <a href="https://www.patreon.com/YanLinn" target="_blank">
                <img src="images/icon/PT.png"/>
            </a>
        </div>
        <div class="item_list" v-show="getStatus">
            <a href="https://azz.net/yanlin" target="_blank">
                <img src="images/icon/AZZ.png"/>
            </a>
        </div>
        <div class="item_list" v-show="getStatus">
            <a href="https://yanlinn.huotan.com/" target="_blank">
                <img src="images/icon/HTW.png"/>
            </a>
        </div>
        <div class="item_list" v-show="!getStatus">
            <a href="https://www.aplaybox.com/u/178812252" target="_blank">
                <img src="images/icon/MZW.png"/>
            </a>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name:"Sidebar",
        data(){
            return{
                showQR:false
            }
        },
        computed:{
            ...mapGetters('heardStatus',['getStatus']),
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
@media screen and (orientation: landscape) {
    .item{
        top:9vh;
    }
    .item .item_list img{
        border-radius:4vh;
        width:4vh;
    }
}
@media screen and (orientation: portrait) {
    .item{
        top:13vh;
    }
    .item .item_list img{
        border-radius:5vh;
        width:5vh;
    }
}
    .QR-enter-active {
        animation: QR-in .5s ease-out both;
    }

    .QR-leave-active {
        animation: QR-in .5s reverse ease-in both;
    }
    @keyframes QR-in {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        50% {
            transform: scale(1.25);
            opacity: 0.75;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    .item{
        position: absolute;
        right:2vw;
    }
    .item_list{
        transform:translate(0px,0px);
        transition:transform 0.2s ease-in-out;
        margin-bottom: 1.5vh;
        cursor: pointer;
        user-select: none;
    }
    .item_list:hover{
        transform:translate(-5px,0px);
        transition:transform 0.2s ease-in-out;
    }
    .wx{
        position: absolute;
        line-height: 0;
        padding: 0.3vw;
        margin: 2vh;
        border-radius: 5px;
        box-shadow: 0 0 1vh #63B8FF;
        left: -8vw;
        top: 0.5vh;
        transition: all 0.5s ease-in-out;
    }
    .wx img{
        width: 10vh;
    }
</style>