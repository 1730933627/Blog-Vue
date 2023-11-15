<template>
  <div class="wrapper">
    <router-link to="about"><div class="back">✕</div></router-link>
    <TransitionGroup name="info" tag="ul" class="infos">
      <li v-for="i in infos" :key="i.id" :style="`color:${!i.code?'#008cff':'#ff0041'}`" class="info">{{i.text}}</li>
    </TransitionGroup>
    <div class="form" @keyup.enter="login">
      <h2>Editing System</h2>
      <input type="text" placeholder="Account" v-model="object.account">
      <input type="password" placeholder="Password" v-model="object.password">
      <button @click="login">Login</button>
    </div>
    <TransitionGroup name="bubbles" tag="ul" class="bg-bubbles">
      <li v-for="li in background" :key="li.id"
          :style="`left:${li.left}%;width:${li.size}vw;height:${li.size}vw;`"
      ></li>
    </TransitionGroup>
  </div>
</template>

<script>
import axios from "axios";
import {nanoid} from "nanoid";
export default {
  name: "Login",
  props:["logging"],
  data(){
    return{
      object:{
        account:"",
        password:""
      },
      infos:[],
      background:[],
      backgroundTimer:0
    }
  },
  methods:{
    login(){
      if(this.object.account!==""){
        if(this.object.password!==""){
          axios.post(process.env.VUE_APP_URL+"editLogin",{
            account:this.object.account,
            password:this.object.password,
          }).then(
              resolve=>{
                const data = resolve.data
                if(data.status===200){
                  clearInterval(this.backgroundTimer)
                  this.background = []
                  this.logging()
                }else{
                  this.pushInfo(data.msg,data.err)
                }
              },error=>{
                console.log(error)
              }
          )
        }else this.pushInfo("密码为空",-1)
      }else this.pushInfo("用户名为空",-1)
    },
    pushInfo(text,code){
      if(this.infos.length>10)return;
      const id = nanoid()
      this.infos.push({id,text,code})
      setTimeout(()=>{
        this.infos.splice(this.infos.findIndex(item => item.id === id), 1)
      },3000)
    },
    backgroundStart(){
      const start = (time) =>{
        if(this.background.length>10)return;
        const id = nanoid()
        const left = Math.floor(Math.random()*95+2.5);
        const size = Math.floor(Math.random()*10);
        const opacity = Math.random();
        this.background.push({id, left, size, opacity})
        setTimeout(()=>{
          this.background.splice(this.background.findIndex(item => item.id === id), 1)
        },time)
      }
      start(25000)
      this.backgroundTimer = setInterval(()=>{
        start(25000)
      },2500)
    }
  },
  mounted() {
    this.backgroundStart()
  }
}
</script>

<style scoped>

@media screen and (orientation: landscape) {
  .form{
    width: 20vw;
    position: absolute;
    right: 7.5%;
    top: 30%;
  }
  .form h2{
    font-size: 2.5em;
  }
  .form input{
    width: 15vw;
    padding: .75vh;
    font-size: 2em;
  }
  .form input:focus{
    width: 16vw;
  }
}
@media screen and (orientation: portrait) {
  .form{
    width: 50vw;
    margin: 25vh auto 0;
  }
  .form h2{
    font-size: 1.75em;
  }
  .form input{
    width: 45vw;
    padding: .5vh .75vh;
    font-size: 1.5em;
  }
  .form input:focus{
    width: 46vw;
  }
}
  ul{
    display: flex;
    flex-direction: column-reverse;
    list-style-type: none;
  }
  ul > li.info{
    width: 5vw;
    background: white;
    text-align: center;
    padding: 1vh 1vw;
    color: #3b3b3b;
    font-weight: bold;
    font-size: 1vw;
    margin: 1vh .5vw 0;
    border-radius: .25vw;
    white-space: nowrap;
  }
  .info-enter-active {animation: info-in 0.25s ease-out;}
  .info-leave-active {animation: info-out 0.25s ease-out;}
  @keyframes info-in {
    0% {transform: translateY(-100%);}
    100% {transform: translateX(0);}
  }
  @keyframes info-out {
    0% {transform: translateX(0%);}
    75% {transform: translateX(10%);}
    100% {transform: translateX(-110%);}
  }
  .wrapper {
    background: #87cefa;
    background: linear-gradient(to bottom right, #87cefa 0%, #75eeff 100%);
    opacity: 0.8;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  .wrapper.form-success .container h1 {
    transform: translateY(85px);
  }
  .back{
    width: 2.5vh;
    height: 2.5vh;
    background: rgba(41, 174, 255, 0.5);
    border-radius: 30%;
    border: .5vh solid white;
    position: absolute;
    right: 1vh;
    top: 1vh;
    font-size: 2vh;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 100%;
    font-weight: bold;
    color: white;
    cursor: pointer;
    z-index: 2;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    padding: 4vh;
    z-index: 2;
    background: rgba(255,255,255,0.15);
    border: 1px solid white;
    box-shadow: #00BFFF 0 0 .5vw;
    border-radius: .5vw;
  }
  .form h2{
    user-select: none;
    margin-bottom: 1vh;
    color: white;
    text-shadow: #00BFFF 0 0 .5vw;
    white-space: nowrap;
  }
  .form input{
    margin: .75vh .5vw;
    appearance: none;
    outline: 0;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    display: block;
    transition-duration: 0.25s;
    color: #545454;
  }
  .form input:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
  .form input:focus {
    background-color: white;
    color: #3b3b3b;
  }
  .form button {
    margin-top: 1.5vh;
    appearance: none;
    outline: 0;
    background-color: white;
    border: 0;
    padding: 1vh 1vw;
    color: #00BFFF;
    border-radius: 5px;
    width: 40%;
    cursor: pointer;
    font-size: 1.5em;
    transition-duration: 0.25s;
    user-select: none;
  }
  .form button:hover {
    background-color: #00BFFF;
    color: white;
  }
  .bg-bubbles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .bg-bubbles li {
    position: absolute;
    list-style: none;
    display: block;
    border-radius: 2.5%;
    width: 2vw;
    height: 2vw;
    background-color: rgba(255, 255, 255, 0.3);
    bottom: -5%;
  }
  .bubbles-enter-active {animation: square-in 25s linear;}
  .bubbles-leave-active {animation: square-out 1s linear;}
  @keyframes square-in {
    0% {transform: translateY(0) scale(0);}
    4% {transform: translateY(-12vh) scale(1) rotate(96deg);}
    100% {transform: translateY(-75vh) rotate(600deg);}
  }
  @keyframes square-out {
    0% {transform:translateY(-75vh) rotate(600deg) scale(1);}
    100% {transform:translateY(-78vh) rotate(624deg) scale(0);}
  }
</style>