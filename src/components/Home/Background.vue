<template>
    <div class="background" :style="backgroundStyle"></div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name:"Background",
    data(){
        return{
            screenHeight:0
        }
    },
    computed:{
        ...mapGetters('windowSize',['getHeight','isLandscape']),
        backgroundStyle(){
            if(this.isLandscape){
                // 横屏
                var image = 'background-image: url("images/background/lm.jpg");';
            }else{
                // 竖屏');
                var image = 'background-image: url("images/background/bs.jpg");';
            }
            let height = 'height:'+ this.getHeight + 'px;'
            return height + image
        }
    },
}
</script>

<style scoped>
    .background{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        transition: background-image 0.5s ease-in-out;
    }
</style>