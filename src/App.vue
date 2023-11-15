<template>
    <router-view></router-view>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import axios from 'axios';
  export default {
    name: 'App',
    components: {},
    watch:{
      "notHome":{
        handler(newVal){
          const waifu = document.querySelector("#waifu");
          if(!newVal){
            if(waifu)waifu.style.display = "none";
          }else{
            const timer = setInterval(()=>{
              const waifu1 = document.querySelector("#waifu");
              if(waifu1){waifu1.style.display = "block";clearInterval(timer);}
            },100)
          }
        },
        immediate: true
      }
    },
    computed:{
        ...mapGetters('heardStatus',['getStatus']),
        ...mapGetters('windowSize',['isLandscape']),
        notHome(){
          if(this.isLandscape){
            return this.$route.fullPath !== '/';
          }else{
            return false;
          }
        }
    },
    methods:{
        ...mapActions('videoInfo',["getInfoList"]),
        ...mapActions('windowSize',["changeSize"]),
        getLogo(){
          axios.get(process.env.VUE_APP_URL+'face').then(
            response => {
              console.log(`%c${response.data}`,"color:#696969;");
              console.info("%c本网站是基于MMD视频的创作分享。","font-size: 2em;color: #00BFFF;");
              console.info("%c没事多打飞机,别搞我网站。","font-size: 1.5em;color: #00BFFF;");
            },
            error => {
              console.log(error);
            }
          )
        }
    },
    beforeMount(){
        this.getInfoList(this.getStatus);
        this.getLogo();
        this.changeSize();
    }
  }
</script>

<style>
  *{
    padding: 0;
    margin: 0;
  }
  @keyframes fades {
    0%{opacity: 0;}
    100%{opacity: 100%}
  }
  .anm-enter-active{
    animation: fades .25s ease-in-out;
  }
  .anm-leave-active{
    animation: fades .25s ease-in-out reverse;
  }
</style>
