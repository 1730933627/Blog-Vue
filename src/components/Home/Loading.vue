<template>
    <div>
        <div class="spinner">
            <div :class="[spinnerSonClass,'rect1']"></div>
            <div :class="[spinnerSonClass,'rect2']"></div>
            <div :class="[spinnerSonClass,'rect3']"></div>
            <div :class="[spinnerSonClass,'rect4']"></div>
            <div :class="[spinnerSonClass,'rect5']"></div>
            <div :class="[spinnerSonClass,'rect6']"></div>
        </div>
        <div class="loading-background" :style="'height:'+loadingHeight+ 'px'"></div>
    </div>
</template>

<script>
export default {
    name:'Loading',
    data(){
        return{
            loadingHeight:window.innerHeight||0,
            screenHeight:0,
            spinnerSonClass:'spinner-son-R'
        }
    },
    computed:{
        backgroundStyle(){
            let height = 'height:'+ this.loadingHeight + 'px;'
            return height
        }
    },
    created(){
        if(window.innerHeight<window.innerWidth){
            this.spinnerSonClass = 'spinner-son-R';
        }else{
            this.spinnerSonClass = 'spinner-son-P';
        }
    }
}
</script>

<style scoped>
    .loading-background{
        width: 100%;
        background-color: white;
        z-index: 99;
        position: absolute;
    }
    .spinner {
        z-index: 100;
        position: absolute;
        top: 42vh;
        left: 47vw;
        height: 10vh;
        text-align: center;
        user-select: none;
    }
    .spinner-son-R{
        background-color: #63B8FF;
        height: 100%;
        width: 0.4vw;
        margin: 0.1vw;
        border-radius: 10px;
        display: inline-block;
        animation: stretchdelay 1.1s infinite ease-in-out;
    }
    .spinner-son-P{
        background-color: #63B8FF;
        height: 100%;
        width: 1.5vw;
        margin: 0.5vw;
        border-radius: 10px;
        display: inline-block;
        animation: stretchdelay 1.1s infinite ease-in-out;
    }
    .spinner .rect2 {
        animation-delay: -1s;
    }
    .spinner .rect3 {
        animation-delay: -0.9s;
    }
    .spinner .rect4 {
        animation-delay: -0.8s;
    }
    .spinner .rect5 {
        animation-delay: -0.7s;
    }
    .spinner .rect6 {
        animation-delay: -0.6s;
    }
    @keyframes stretchdelay {
        0%, 40%, 100% {
            transform: scaleY(0.4);
        }  20% {
            transform: scaleY(1.0);
        }
    }
</style>