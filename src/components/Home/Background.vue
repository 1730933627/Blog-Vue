<template>
    <div class="background" :style="backgroundStyle"></div>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from "axios";
export default {
    name:"Background",
    data(){
        return{
            screenHeight:0,
            wallpaper:''
        }
    },
    computed:{
        ...mapGetters('windowSize',['getHeight','isLandscape']),
        backgroundStyle(){
            let image;
            if(this.isLandscape){
                // 横屏
                image = 'background-image: url("images/background/lm.jpg");';
            }else{
                // 竖屏
                this.wallpaper = localStorage.getItem('wallpaper')||'images/background/bs.jpg'
                image = `background-image: url('${this.wallpaper}');`;
            }
            let height = 'height:'+ this.getHeight + 'px;'
            return height + image
        }
    },
    methods:{
      getWallpaper(){
        axios.get(process.env.VUE_APP_URL+'wallpaper').then(res=>{
          if(res.status === 200){
            this.wallpaper = process.env.VUE_APP_IMAGE_URL+ "WallPaper/" + res.data.data.name;
            localStorage.setItem('wallpaper',this.wallpaper)
            localStorage.setItem('wallpaperTimer',`${new Date().getTime()}`)
          }
        }).catch(err=>{
          this.wallpaper = 'images/background/bs.jpg';
        })
      }
    },
    beforeMount() {
      const localWallpaper = localStorage.getItem('wallpaper')
      if(localWallpaper){
        const dateOld = Number(localStorage.getItem('wallpaperTimer'))||0;
        const dateNow = new Date().getTime();
        const difVal = (dateNow - dateOld) / (1000 * 60 * 60 * 24)
        if(difVal >= 1){
          this.getWallpaper();
        }else{
          this.wallpaper = localWallpaper;
        }
      }else{
        this.getWallpaper();
      }
    }
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