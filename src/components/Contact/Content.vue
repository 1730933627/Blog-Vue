<template>
    <div class="contact">
        <h1>Contact</h1>
        <div class="contact-body">
            <div class="interval">
                <div class="title">发送类型:</div>
                <div class="radio-body">
                    <div><input type="radio" name="types" value="通讯" id="radio1" v-model="userInfo.type"><label for="radio1" id="radio">通讯</label></div>
                    <div><input type="radio" name="types" value="咨询" id="radio2" v-model="userInfo.type"><label for="radio2" id="radio">咨询</label></div>
                    <div><input type="radio" name="types" value="其他" id="radio3" v-model="userInfo.type"><label for="radio3" id="radio">其他</label></div>
                </div>
            </div>
            <div class="interval">
                <label for="name"><div class="title">称呼:</div></label>
                <input id="name" type="text" name="name" v-model="userInfo.name">
            </div>
            <div class="interval">
                <label for="email"><div class="title">电子邮箱:</div></label>
                <input id="email" type="email" name="email" v-model="userInfo.email">
            </div>
            <div class="interval">
                <label for="texts"><div class="title">发送内容:</div></label>
                <textarea name="texts" v-model="userInfo.text"></textarea>
            </div>
            <div class="text">
                <p>我们仅将查询表中输入的个人信息用于回答查询内容。</p>
                <p>我已经阅读了所有人的意见，印象和询问，我们不承诺单独答复和回应。谦虚地感谢您的理解。</p>
                <div class="agree-body">
                    <input type="checkbox" name="agreement" v-model="userInfo.agree">
                    <span @click="userInfo.agree=!userInfo.agree">我同意</span>
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
                if(this.userInfo.name!="" && this.userInfo.email!=""){
                    this.showStatus("正在发送···");
                    let url = "https://api.yanlinn.com/insert";
                    const param = new URLSearchParams();
                    param.append('name', this.userInfo.name);
                    param.append('types', this.userInfo.type);
                    param.append('email', this.userInfo.email);
                    param.append('texts', this.userInfo.text);
                    axios.post(url,param).then(response=>{
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
            }
        },
        watch:{
            "userInfo.agree":{
                immediate:true,
                handler(newvalue){
                    if(newvalue)this.buttonStyle="cursor:pointer";
                    else this.buttonStyle="cursor:not-allowed;";
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
        margin: 1vh 23.5%;
    }
  }
  @media screen and (orientation: portrait) {
    .contact-body{
        width: 75%;
    }
    .contact > h1{
        margin: 0.1vh 23.5% 0.5vh;
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
    .contact-body{
        margin: 0 auto;
        padding: 4vh 3.5vh;
        background-color: #87CEFA;
        box-shadow: 0 0 3vh #3eb5ff;
        border-radius: 3vh;
    }
    .interval{
        margin-bottom: 1vh;
        display: flex;
        align-items: baseline;
    }
    .interval .title{
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
        width: 60%;
    }
    .radio-body > div{
        display: flex;
        align-items: center;
        width: 33%;
    }
    #radio{
        color: white;
        margin: 0 4% 0 5%;
        font-size: 2vh;
        cursor: pointer;
        user-select: none;
    }
    .contact input[type=text],input[type=email],textarea{
        width: 85%;
        margin-top: 2vh;
        border: 1px solid #696969;
        transition: all 0.35s ease-in-out;
    }
    .contact input[type=text],input[type=email]{
        height: 3vh;
        padding: 0.1vh 0.75vh;
        font-size: 1.5vh;
    }
    .contact textarea{
        padding: .75vh;
        min-height: 10vh;
        resize: vertical;
        font-size: 2vh;
    }
    .contact input:focus,.contact textarea:focus{
        background-color: aliceblue;
        outline: none;
    }
    .contact input:hover,.contact textarea:hover{
        background-color: aliceblue;
        border: 1px solid black;
    }
    .contact input:invalid,.contact textarea:invalid{
        border: 1px solid red;
    }
    .radio-body input[type=radio]{
        cursor: pointer;
        width: 2vh;
        height: 2vh;
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