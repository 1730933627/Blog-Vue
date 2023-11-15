<template>
  <div class="container" :style="containerHeight">
    <div class="center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  name: "Container",
  computed:{
    ...mapGetters('windowSize',['getHeight']),
    containerHeight(){
      let headHeight = this.getHeight * 0.1;
      return `height:${this.getHeight - headHeight}px`;
    }
  }
}
</script>

<style scoped>
@keyframes wrapperIn {
  0%{opacity: 0;transform: translateX(1.5vw)}
  100%{opacity: 1;transform: translateX(0)}
}
  .container{
    display: flex;
    padding-top: 10vh;
    background: #87cefa;
    justify-content: center;
    align-content: center;
    align-items: center;
  }
  .center{
    width: 80%;
    height: 90%;
    background: white;
    border-radius: .25vw;
    box-shadow: #6ca9d0 0 0 1vw;
    padding: 1vh;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    animation: wrapperIn 1s ease-out;
  }
</style>