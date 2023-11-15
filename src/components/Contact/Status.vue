<template>
    <div class="status-body">
        <transition name="message">
            <div class="message" v-if="message.statusShow">
                <span>{{message.info}}</span>
            </div>
        </transition>
        <transition name="background">
            <div class="loading-background" :style="'height:'+getHeight+ 'px'" v-if="message.statusShow"></div>
        </transition>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name:"Status",
        props:['message'],
        computed:{
            ...mapGetters('windowSize',['getHeight'])
        },
    }
</script>

<style scoped>
    .background-enter-active {
        animation: backgroundIn .25s ease-out both;
    }
    .background-leave-active {
        animation: backgroundIn .25s reverse ease-in both;
    }
    @keyframes backgroundIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 0.25;
        }
    }
    .message-enter-active {
        animation: roadRunnerIn .25s ease-out both;
    }
    .message-leave-active {
        animation: roadRunnerOut .25s ease-in both;
    }
    @keyframes roadRunnerIn {
        0% {
            transform: translateX(-1500px) skewX(30deg) scaleX(1.3);
        }
        70% {
            transform: translateX(30px) skewX(0deg) scaleX(0.9);
        }
        100% {
            transform: translateX(0px) skewX(0deg) scaleX(1);
        }
    }
        
    @keyframes roadRunnerOut {
        0% {
            transform: translateX(0px) skewX(0deg) scaleX(1);
        }
        30% {
            transform: translateX(-30px) skewX(-5deg) scaleX(0.9);
        }
        100% {
            transform: translateX(1500px) skewX(30deg) scaleX(1.3);
        }
    }
  @media screen and (orientation: landscape) {
    .message{
        width: 20%;
        height: 15vh;
        left: 40%;
    }
  }
  @media screen and (orientation: portrait) {
    .message{
        width: 80%;
        height: 15vh;
        left: 10%;
    }
  }
    .status-body{
        width: 100%;
        position: fixed;
        top: 0;
    }
    .loading-background{
        width: 100%;
        background-color:black;
        opacity: 0.25;
        z-index: 95;
    }
    .message{
        position: absolute;
        z-index: 96;
        top: 40vh;
        background-color: white;
        box-sizing: border-box;
        padding: 5vh;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-radius: 1vh;
    }
    .message span{
        font-size: 3vh;
        font-weight: bold;
        user-select: none;
    }
</style>