<template>
    <img @click="toTop" src="images/icon/jt (2).png" class="jt">
</template>

<script>
export default {
    name:"ToTop",
    methods:{
        toTop(){
            let smoothScrollToTopSetInterval = setInterval(() => {
                let Y_TopValve = (window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop);
                if (Y_TopValve > 1) {
                    scrollTo(0, Math.floor(Y_TopValve * 0.85));
                } else {
                    scrollTo(0, 0);
                    clearInterval(smoothScrollToTopSetInterval);
                }
            }, 1000 / 60);
        }
    }
}
</script>

<style scoped>
  @media screen and (orientation: landscape) {
    .jt{
        bottom: 5vh; 
        right: 5vh;
    }
  }
  @media screen and (orientation: portrait) {
    .jt{
        bottom: 2vh; 
        left: 2vh;
    }
  }
    @keyframes to_top{
        0% {
            transform: scale(0);
            opacity: 0;
        }
        85%{
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    .jt:hover{
        transform: scale(1.15);
        transition: transform 0.25s ease-in-out;
    }
    .jt{
        width:4vh;
        position: fixed;
        cursor:pointer;
        padding: 1vh;
        transition: transform 0.25s ease-in-out;
        background-color: #00BFFF;
        border-radius: 50%;
        animation: to_top 0.5s ease-in-out;
    }
</style>