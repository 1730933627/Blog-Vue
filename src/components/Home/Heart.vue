<template>
  <div @click="setStatus" class="xin_body">
    <template v-if="isLandscape">
      <span :style="`color:${isShow?'#ff1536':'white'};`">♥</span>
    </template>
    <template v-else>
      <div style="position: relative">
        <transition name="heard">
          <img v-if="isShow" key="on" class="xin" src="images/icon/xin-active.png" alt=""/>
          <img v-else  key="off" class="xin" src="images/icon/xin.png" alt=""/>
        </transition>
        <i></i>
      </div>
    </template>
  </div>
</template>

<script>
    import {mapActions,mapGetters} from 'vuex'
    export default {
        name:"Heart",
        props:["changeLoading"],
        data(){
            return{
                isShow:false
            }
        },
        computed:{
            ...mapGetters('heardStatus',['getStatus']),
            ...mapGetters('windowSize',['isLandscape'])
        },
        methods:{
            ...mapActions('videoInfo',["getInfoList"]),
            setStatus(){
                this.$store.commit('heardStatus/CHANGESTATUS',!this.isShow);
                this.isShow = !this.isShow;
                this.getInfoList(this.getStatus);
                this.changeLoading()
            },
        },
        mounted(){
            this.isShow = this.getStatus;
        }
    }
</script>

<style scoped>
@media screen and (orientation: landscape) {
    .xin_body{
      top: 55vh;
      padding: 0 .25em 0 3.5vh;
      transform: skewX(-20deg) translateX(-37.5%);
    }
    .xin_body:hover{transform: skewX(-20deg) translateX(-32.5%);}
}
@media screen and (orientation: portrait) {
    .xin_body {
      top: 40vh;
    }
}
    .heard-enter-active, .heard-leave-active {
      transition: opacity .5s ease-in-out;
    }
    .heard-enter-from, .heard-leave-to {
      opacity: 0;
      display: none;
    }
    .xin_body{
        position: fixed;
        left: 0;
        background: #00BFFF;
        cursor: pointer;
        transition: all 0.5s ease-in-out;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .xin_body img{
      width: 7.5vh;
      transform: scaleX(.9);
    }
    .xin_body i{
      position: absolute;
      bottom: 0;
      right: -10%;
      height: 100%;
      width: 5vh;
      transform: skew(-10deg);
      background: #00BFFF;
      z-index: -1;
    }
    .xin_body span{
      transform: skewX(20deg);
      font-size: 7.5vh;
      line-height: 75%;
      bottom: 0;
      left: 0;
      padding-bottom: .05em;
      transition: all .5s ease-in-out;
      font-family: 微软雅黑 sans-serif;
    }
</style>