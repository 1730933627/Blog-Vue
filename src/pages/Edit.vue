<template>
  <MyLogo/>
  <LinkList/>
  <Container>
    <Login v-if="!isLogged" :logging="logging"/>
    <template v-else>
      <Editor :exitLogin="exitLogin" :open-adder="openAdder" :close-adder="closeAdder" :push-message="pushMessage"/>
      <transition name="adder">
        <Adder v-if="adderShow" :close-adder="closeAdder" :item="fixData" :push-message="pushMessage"></Adder>
      </transition>
      <Message :msg-list="msgList" v-show="msgList"/>
    </template>
  </Container>
</template>

<script>
import {nanoid} from "nanoid";
import MyLogo from '@/components/MyLogo'
import LinkList from '@/components/Subpage/LinkList'
import Container from "@/components/Edit/Container";
import Login from "@/components/Edit/Login";
import Cookies from "js-cookie";
import Editor from "@/components/Edit/Editor.vue";
import Adder from "@/components/Edit/Adder.vue";
import Message from "@/components/Edit/Message.vue";
export default {
  name: "Edit",
  data(){
    return {
      adderShow:false,
      isLogged:Cookies.get('isLogged')||false,
      fixData:null,
      msgList:[]
    }
  },
  components: {
    Message,
    Adder,
    Editor,
    MyLogo,
    LinkList,
    Container,
    Login,
  },
  methods:{
    logging(){
      this.isLogged = true;
      Cookies.set('isLogged', 'true', { expires: 7, path: '' });
    },
    exitLogin(){
      this.isLogged = false;
      Cookies.remove('isLogged', { path: '' });
    },
    openAdder(item){
      if(item){
        this.fixData = item;
      }else{
        this.fixData = null;
      }
      this.adderShow = true;
    },
    closeAdder(){
      this.adderShow = false;
    },
    pushMessage(msg,color="#222"){
      const id = nanoid()
      this.msgList.push({id, text:msg, color})
      setTimeout(()=>{
        this.msgList.splice(this.msgList.findIndex(item => item.id === id), 1)
      },3000)
    }
  },
}
</script>

<style scoped>
  .adder-enter-active {animation: adder-in 0.25s ease-out;}.adder-leave-active {animation: adder-out 0.25s ease-out;}
  @keyframes adder-in {
    0% {transform: translate(-50%,-50%) scaleX(0);opacity: 0;}
    90% {transform: translate(-50%,-50%) scaleX(1.1);opacity: 1;}
    100% {transform: translate(-50%,-50%) scaleX(1);opacity: 1;}
  }
  @keyframes adder-out {
    0% {transform: translate(-50%,-50%) scale(1);opacity: 1;}
    50% {transform: translate(-50%,-50%) scale(1.1);opacity: 1;}
    100% {transform: translate(-50%,-50%) scale(.5);opacity: 0;}
  }
</style>