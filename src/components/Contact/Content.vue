<template>
    <div class="contact">
        <h1>Contact</h1>
        <div class="contact-body">
            <div class="interval">
                <div class="title">发送类型:</div>
                <div class="radio-body">
                    <div>
                      <input type="radio" name="types" value="通讯" id="radio1" v-model="userInfo.type">
                      <label for="radio1" id="radio">通讯</label>
                    </div>
                    <div>
                      <input type="radio" name="types" value="咨询" id="radio2" v-model="userInfo.type">
                      <label for="radio2" id="radio">咨询</label>
                    </div>
                    <div>
                      <input type="radio" name="types" value="其他" id="radio3" v-model="userInfo.type">
                      <label for="radio3" id="radio">其他</label>
                    </div>
                </div>
            </div>
            <div class="interval">
                <label for="name"><span class="title">称呼:</span></label>
                <input id="name" type="text" name="name" v-model="userInfo.name">
            </div>
            <div class="interval">
                <label for="email"><span class="title">电子邮箱:</span></label>
                <input id="email" type="email" name="email" v-model="userInfo.email">
            </div>
            <div class="interval" style="align-items: flex-start">
                <label for="texts"><span class="title">发送内容:</span></label>
                <textarea id="texts" ref="infoTextarea" name="texts" v-model="userInfo.text"></textarea>
            </div>
            <div class="text">
                <p>我们仅将查询表中输入的个人信息用于回答查询内容。</p>
                <p>我已经阅读了所有人的意见，印象和询问，我们不承诺单独答复和回应。谦虚地感谢您的理解。</p>
                <div class="agree-body" :style="`${userInfo.agree?'transform:scale(1.1)':''}`">
                    <input type="checkbox" name="agreement" v-model="userInfo.agree" style="color: #00BFFF">
                    <span @click="agree">我同意</span>
                </div>
            </div>
            <div class="submit">
                <button type="button" :disabled="!userInfo.agree" @click="button" :style="buttonStyle">送信</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name:"Content",
        props:['showStatus'],
        data(){
            return{
                userInfo:{
                    type:"通讯",
                    name:"",
                    email:"",
                    text:"",
                    agree:false
                },
                buttonStyle:"cursor:not-allowed;"
            }
        },
        methods:{
            button(){
                if(this.userInfo.name!=="" && this.userInfo.email!==""){
                    this.showStatus("正在发送···");
                    let url = process.env.VUE_APP_URL+"insert";
                    axios.post(url, {
                      name: this.userInfo.name,
                      types: this.userInfo.type,
                      email: this.userInfo.email,
                      texts: this.userInfo.text
                    }).then(response=>{
                        if(response.data.status === 200){
                            this.showStatus("发送成功");
                            this.userInfo = {type:"通讯",name:"",email:"",text:"",agree:false};
                        }else{
                            this.showStatus("未被处理的错误");
                            console.log(response);
                        }
                    }).catch(error=>{
                        this.showStatus("发送失败请联系管理员");
                        console.warn(error);
                    });
                }
                else{
                    this.showStatus("请输入称呼和邮箱");
                }
            },
            agree(){
                this.userInfo.agree=!this.userInfo.agree;
            }
        },
        watch:{
            "userInfo.agree":{
                immediate:true,
                handler(newValue){
                    if(newValue)this.buttonStyle="cursor:pointer";
                    else this.buttonStyle="cursor:not-allowed;";
                }
            },
            "userInfo.text":{
              handler(newVal,oldVal){
                const textarea = this.$refs['infoTextarea']
                if(textarea.clientHeight<textarea.scrollHeight){
                  textarea.style.height = textarea.scrollHeight + 'px'
                }
              }
            }
        }
    }
</script>

<style scoped>
  @media screen and (orientation: landscape) {
    .contact-body{
        width: 50%;
    }
    .contact > h1{
        margin: 1vh 23vw;
    }
    .contact input[type=text],input[type=email],textarea {
      width: 80%;
    }
    .contact input[type=text]:focus,input[type=email]:focus,textarea:focus{
      width: 81%;
    }
  }
  @media screen and (orientation: portrait) {
    .contact-body{
        width: 75%;
    }
    .contact > h1{
        margin: 0.1vh 5vw 0.5vh;
    }
    .contact input[type=text],input[type=email],textarea {
      width: 92.5%;
    }
    .contact input[type=text]:focus,input[type=email]:focus,textarea:focus{
      width: 95%;
    }
  }
    .contact{
        width: 100%;
        padding: 11vh 0;
        background-color: #87CEFA;
    }
    .contact > h1{
        font-size: 8vh;
        color: white;
        user-select: none;
    }
    @keyframes contactBodyIn{
        0%{transform: translateX(-2vw)}
        100%{transform: translateX(0)}
    }
    .contact-body{
        margin: 0 auto;
        padding: 4vh 3.5vh;
        background-color: #87CEFA;
        box-shadow: 0 0 3vh #3eb5ff;
        border-radius: 3vh;
        animation: contactBodyIn .75s ease-out;
    }
    .interval{
        padding: 2vh 0;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    .interval .title{
        display: block;
        width: 6em;
        font-size: 2.5vh;
        color: white;
        font-weight: bold;
        cursor: default;
        user-select: none;
    }
    .radio-body{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
    .radio-body > div{
        display: flex;
        align-items: center;
        margin-right: 3vw;
        transition: transform .25s ease-in-out;
    }
    #radio{
        color: white;
        font-size: 2vh;
        cursor: pointer;
        user-select: none;
        padding-left: .5vh;
        white-space:nowrap;
    }
    .contact input[type=text],input[type=email],textarea{
        border: 1px solid #696969;
        transition: all 0.35s ease-in-out;
        font-size: 2vh;
        padding: 0.15vh 0.75vh;
        outline: none;
        color: #5e5e5e;
        border-radius: .25vh;
    }
    .contact input[type=text],input[type=email]{
        height: 3vh;
    }
    .contact textarea{
        min-height: 10vh;
        resize: none;
    }
    .contact textarea::-webkit-scrollbar {display: none;}
    .contact input:focus,.contact textarea:focus{
        background-color: aliceblue;
    }
    .contact textarea:hover{
        background-color: aliceblue;
    }
    .contact input:invalid,.contact textarea:invalid{
        border: 1px solid red;
    }
    .radio-body input[type=radio]{
      appearance: none;
      position: relative;
      display: inline-block;
      vertical-align: middle;
      width: 1.25em;
      height: 1.25em;
      background: white;
      font-size: 2vh;
      cursor: pointer;
      outline: none;
      transition: all .2s ease;
      border-radius: 50%;
    }
    .radio-body input[type="radio"]:after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      background: #00BFFF;
      border-radius: 50%;
      width: 0;
      height: 0;
      opacity: 0;
      transform: translate(-50%, -50%);
      transition: all .2s ease;
    }
    .radio-body input[type="radio"]:checked:after {
      width: .75em;
      height: .75em;
      opacity: 1;
    }
    .text{
        color: white;
        width: 55%; 
        text-align: center;
        margin: 2.5vh auto;
        user-select: none;
    }
    .text > p{
        font-size: 1.75vh;
        margin-bottom: 2vh;
    }
    .agree-body{
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform 0.25s ease-in-out;
    }
    .agree-body > input{
        width: 2vh;
        height: 2vh;
        cursor:pointer;
    }
    .agree-body > span{
        font-weight: bold;
        color: #fff;
        font-size: 2.25vh;
        cursor:pointer;
        margin-left: 1vh;
        padding-bottom: .25vh;
    }
    .submit{
        user-select: none;
        text-align: center;
    }
    .submit button{
        margin: 0 auto;
        width: 15vh;
        height: 6vh;
        font-size: 2vh;
        border: .3vh solid #fff;
        background-color: #363636;
        border-radius: 1vh;
        color: aliceblue;
        transform: scale(1);
        transition: transform 0.25s ease-in-out;
    }
    .submit button:hover{
        transform: scale(1.03);
    }
</style>