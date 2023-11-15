<template>
  <TransitionGroup name="msg" tag="ul" class="msgBody">
    <li v-for="item in msgList" :key="item.id" :style="`color:${item.color};`">{{item.text}}</li>
  </TransitionGroup>
</template>

<script>
export default {
  name: "Message",
  props:["msgList"]
}
</script>

<style scoped>
  .msg-enter-active {animation: msg-in 0.25s ease-out;}
  .msg-leave-active {animation: msg-out 0.25s ease-out;}
  @keyframes msg-in {
    0% {transform: translateY(-100%);opacity: 0;}
    100% {transform: translateX(0);opacity: 1;}
  }
  @keyframes msg-out {
    0% {transform: translateX(0%);opacity: 1;}
    75% {transform: translateX(10%);opacity: 1;}
    100% {transform: translateX(-110%);opacity: 0;}
  }
  .msgBody{
    position: fixed;
    left: 0;
    top: 14vh;
    display: flex;
    flex-direction: column-reverse;
  }
  .msgBody > li{
    list-style-type: none;
    width: 5em;
    background: white;
    padding: 1vh;
    line-height: 100%;
    text-align: center;
    font-size: 2vh;
    font-weight: bold;
    margin: .5vh 1vh 1vh;
    user-select: none;
    border-radius: .5vh;
    color: #222;
  }
</style>