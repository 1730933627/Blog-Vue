<template>
    <canvas id="live2d" :width="windowsHeight/3.5" :height="windowsHeight/3.8"></canvas>
</template>

<script>
    import '@/assets/live2d/live2d'
    export default {
        name:"Live2D",
        computed:{
            windowsHeight(){
                return window.innerHeight;
            }
        },
        mounted(){
            loadlive2d("live2d", "live2d/bilibili-live/33/model.json");
        }
    }
</script>

<style scoped>
@media screen and (orientation: landscape) {
    #live2d{
        z-index: 80;
        position: fixed;
        bottom: 0;
        left: -2vw;
    }
}
@media screen and (orientation: portrait) {
    #live2d{
        display: none;
    }
}
</style>