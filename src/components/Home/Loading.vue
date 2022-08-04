<template>
    <div class="loading-body">
        <div class="spinner">
            <div v-for="i in 6" :key="i" :class="[spinnerSonClass,'rect'+i]"></div>
        </div>
        <div class="loading-background" :style="'height:'+ this.getHeight +'px'"></div>
    </div>
</template>

<script>
    import "@/assets/pace/pace.min.js"
    import "@/assets/pace/minimal.css"
    import {mapGetters} from 'vuex'
    export default {
        name:'Loading',
        computed:{
            ...mapGetters('windowSize',['getHeight','isLandscape']),
        },
        created(){
            if(this.isLandscape){
                this.spinnerSonClass = 'spinner-son-L';
            }else{
                this.spinnerSonClass = 'spinner-son-P';
            }
        }
    }
</script>

<style scoped>
    .loading-body{
        display: flex;
        justify-content: center;
    }
    .loading-background{
        width: 100%;
        background-color: white;
        z-index: 99;
        position: absolute;
    }
    .spinner {
        z-index: 100;
        height: 10vh;
        margin-top: 40vh;
        text-align: center;
        user-select: none;
    }
    .spinner-son-L{
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