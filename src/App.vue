<template>
    <Live2D v-if="notHome"/>
    <router-view></router-view>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import Live2D from './components/Live2D';
  import axios from 'axios';
  export default {
    name: 'App',
    components: {
      Live2D
    },
    computed:{
        ...mapGetters('heardStatus',['getStatus']),
        notHome(){
            if(this.$route.fullPath == '/'){
              return false
            }else return true
        }
    },
    methods:{
        ...mapActions('videoInfo',["getInfoList"]),
        ...mapActions('windowSize',["changeSize"]),
        getLogo(){
          axios.get('https://api.yanlinn.com/face').then(
            response => {
              console.log(`%c${response.data}`,"color:#696969;");
              console.info("%c没事多打飞机,别搞我网站。","font-size: 20px;color: #00BFFF;");
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
</style>
