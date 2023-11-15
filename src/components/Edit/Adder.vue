<template>
  <div class="adderBody">
    <div class="close" @click="closeAdder">✕</div>
    <div class="top">
      <h1 v-text="info.id===''?'添加卡片':'修改卡片'"></h1>
      <img
          alt="" ref="image"
          class="image"
          :src="image"
          v-show="image"
          @click="$refs.upload.click()"
          :style="`transform: translateY(${info.id?'137.5':'105'}%);`"
      >
      <div class="selectType" v-show="!info.id">
        <div v-for="(item,index) in typeList" class="typeItem radioBody">
          <label :for="item">{{index===0?'卡片':index===1?'日志':'文章'}}</label>
          <input type="radio" :id="item" name="radio"  v-model="type" :value="item" :checked="index===0"/>
        </div>
      </div>
    </div>
    <template v-if="type==='item'">
      <div class="line" v-if="info.id">
        <label for="id">ID</label>
        <span v-text="info.id"></span>
      </div>
      <div class="line">
        <label for="name">名称</label>
        <input type="text" name="name" id="name" v-model="info.name" autocomplete="off">
      </div>
      <div class="line">
        <label for="date">日期</label>
        <input type="date" name="date" id="date" v-model="info.date" autocomplete="off">
      </div>
      <div class="line">
        <label for="type">类型</label>
        <div class="radioBody">
          <label for="video">Video</label>
          <input type="radio" name="type" id="video" value="Video" v-model="info.type">
        </div>
        <div class="radioBody">
          <label for="clothes">Clothes</label>
          <input type="radio" name="type" id="clothes" value="Clothes" v-model="info.type">
        </div>
        <div class="radioBody">
          <label for="infoArticle">Article</label>
          <input type="radio" name="type" id="infoArticle" value="Article" v-model="info.type">
        </div>
      </div>
      <div class="line">
        <label for="image">图片地址</label>
        <button class="upload_button" @click="$refs.upload.click()">选择上传的图片</button>
        <input type="text" name="rename" id="rename" v-model="info.img_url" style="width: 6em" placeholder="cb.jpg" autocomplete="off">
        <input type="file" @change="uploadFile" ref="upload" name="image" id="image" style="display: none">
      </div>
      <div class="line">
        <label for="video_url">视频地址</label>
        <input type="text" name="video_url" id="video_url" v-model="info.video_url" placeholder="/404" autocomplete="off">
      </div>
      <div class="line">
        <label for="pattern">模式</label>
        <div class="radioBody">
          <label for="fullAge">全年龄</label>
          <input type="radio" name="pattern" id="fullAge" value="0" v-model="info.pattern">
        </div>
        <div class="radioBody">
          <label for="18p">18禁</label>
          <input type="radio" name="pattern" id="18p" value="1" v-model="info.pattern">
        </div>
      </div>
      <div class="line">
        <label for="bdy_photo">分享图片</label>
        <input type="text" name="bdy_photo" id="bdy_photo" placeholder="空" v-model="info.bdy_photo" autocomplete="off">
        <input type="text" name="photo_pass" id="photo_pass" placeholder="提取码" style="width: 4em;" v-model="info.photo_pass" autocomplete="off">
      </div>
      <div class="line">
        <label for="bdy_video">分享视频</label>
        <input type="text" name="bdy_video" id="bdy_video" placeholder="空" v-model="info.bdy_video" autocomplete="off">
        <input type="text" name="video_pass" id="video_pass" placeholder="提取码" style="width: 4em;" v-model="info.video_pass" autocomplete="off">
      </div>
      <div class="line">
        <button class="submit" @click="submit">提交</button>
      </div>
    </template>
    <template v-else-if="type==='logs'">
      <div class="line">
        <label for="logsDate">日期</label>
        <input type="date" name="logsDate" id="logsDate" v-model="logs.date" autocomplete="off">
      </div>
      <div class="line">
        <label for="logsText">文本</label>
        <textarea id="logsText" v-model="logs.text" ref="logTextarea" style="resize:none;"></textarea>
      </div>
      <div class="line">
        <button class="submit" @click="logsSubmit">提交</button>
      </div>
    </template>
    <template v-else-if="type==='article'">
      <AddArticle @push-message="pushMessage" @close-adder="closeAdder"/>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import {mapActions,mapGetters} from "vuex"
import AddArticle from "@/components/Edit/AddArticle.vue";

export default {
  name: "Adder",
  components: {AddArticle},
  props:["closeAdder","item","pushMessage"],
  data(){
    return{
      type:'item',
      typeList:['item','logs','article'],
      info:{
        id:"",
        name:"",
        date:"",
        type:"Video",
        img_url:"",
        video_url:"",
        pattern:"0",
        bdy_photo:"",
        photo_pass:"",
        bdy_video:"",
        video_pass:"",
      },
      logs:{
        date:'',
        text:'',
        year:'',
        month:'',
      },
      oldImage:"",
      canChangeOldImage:true,
      image:"",
      imageFile:"",
    }
  },
  methods:{
    ...mapActions("videoInfo",["getInfoList"]),
    logsSubmit(){
      if(this.logs.date===""){
        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        if(month.toString().length===1){month="0"+month}
        if(day.toString().length===1){day="0"+day}
        this.logs.date=`${year}-${month}-${day}`;
        this.logs.year = year.toString()
        this.logs.month =`${month}/${day}`;
      }else{
        const dateList = this.logs.date.split('-')
        this.logs.year = dateList[0];
        this.logs.month =`${dateList[1]}/${dateList[2]}`;
      }
      this.addRequest({year:this.logs.year,month:this.logs.month,text:this.logs.text,},"addLogs")
    },
    submit(){
      if(this.info.name!==""){
        if(this.imageFile){
          this.uploadPhoto(this.imageFile)
          this.canChangeOldImage = true;
        }
        if(this.info.id===""){
          if(this.info.img_url==="")this.info.img_url="cb.jpg";
          if(this.info.video_url==="")this.info.video_url="/404";
          if(this.info.date===""){
            const date = new Date();
            const year = date.getFullYear();
            let month = date.getMonth()+1;
            if(month.toString().length===1){month="0"+month}
            let day = date.getDate();
            if(day.toString().length===1){day="0"+day}
            this.info.date=`${year}-${month}-${day}`;
          }
          this.addRequest(this.sendData,"send_videoinfo")
        }else{
          this.addRequest(this.sendData,"fix_videoinfo")
        }
      }else{
        this.pushMessage("请输入名称","#ff0059")
      }
    },
    async addRequest(data,methods){
      let sendText = "添加";
      if(this.imageFile!==""){this.deleteImage(this.oldImage)}
      if(methods==="fix_videoinfo") sendText = "修改";
      await axios.post(process.env.VUE_APP_URL + methods,data).then(
          resolve=>{
            if(resolve.data.status===200&&resolve.data.err===0){
              if(methods==="send_videoinfo"){this.info.id = resolve.data.msg[0].id;}
              if(methods!=="addLogs"){this.getInfoList(this.getStatus)}
              this.closeAdder();
              this.pushMessage(sendText + "成功","#00debc")
            }
          }
      ).catch(error=>{
        this.pushMessage(sendText + "失败","#ff0059")
      })
    },
    clearImage(){
      this.image = "";
      this.$refs.image.src = "";
      this.info.img_url = "";
      this.imageFile = "";
    },
    uploadFile(el) {
      if (!el.target.files[0]?.size){
        this.clearImage()
        return;
      }
      if (el.target.files[0].type.indexOf('image') === -1) {
        el.target.value = "";
        this.clearImage()
        this.pushMessage("请选择图片文件","#ff0059")
      } else {
        this.info.img_url = el.target.value.split("\\").pop()||"cb.jpg"
        this.imageFile = el.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(el.target.files[0]);
        reader.onload = element => {
          this.image = element.target.result;
        }
      }
    },
    async uploadPhoto(data){
      let formData = new FormData()
      let config = {headers:{'Content-Type':'multipart/form-data'}};
      formData.append('photo', data);
      formData.append('file_name', this.info.img_url);
      await axios.post(process.env.VUE_APP_URL+"upload_photo",formData,config).then(
          resolve=>{
            if(resolve.data.status===200&&resolve.data.err===0){
              console.log("图片上传成功")
            }
          }
      ).catch(error=>{
        this.pushMessage("图片上传失败","#ff0059")
      })
    },
    deleteImage(file_name){
      if(file_name!==""&&file_name!=="cb.jpg"){
        axios.post(process.env.VUE_APP_URL+'delete_videoinfo',{file_name:file_name}).then(
            resolve=>{
              if(resolve.data.status===200&&resolve.data.err===0){
                console.log("旧图片已删除")
              }
            }
        ).catch(error=>{
          this.pushMessage("旧图片删除失败","#ff0059")
        })
      }
    }
  },
  watch:{
    "info.img_url":{
      handler(newVal,oldVal){
        if(newVal&&oldVal){
          if(this.canChangeOldImage){
            console.log(oldVal)
            this.oldImage = oldVal;
            this.canChangeOldImage = false;
          }
        }
      }
    },
    "logs.text":{
      handler(newVal,oldVal){
        let textarea = this.$refs['logTextarea']
        if(textarea.clientHeight<textarea.scrollHeight){
          textarea.style.height = textarea.scrollHeight + 'px'
        }
      }
    }
  },
  computed:{
    ...mapGetters("heardStatus",["getStatus"]),
    sendData(){
      const sendData = {}
      for(let tar in this.info){
        if(this.info[tar]!==""&&this.info[tar]!==null){
          if(tar==="date"){
            sendData.year = this.info.date.split("-")[0];
            let month = this.info.date.split("-")[1];
            if(month.slice(0,1)==="0"){month = month.slice(1,2);}
            let day = this.info.date.split("-")[2];
            if(day.slice(0,1)==="0"){day = day.slice(1,2);}
            sendData.month = `${month}/${day}`;
            continue;
          }
          if(tar==="photo_pass"){
            if(this.info.photo_pass.length===4){
              sendData[tar+"word"] = "提取码:"+ this.info.photo_pass;
            }else if(this.info.photo_pass.length===6){
              sendData[tar+"word"] = "解压码:"+ this.info.photo_pass;
            }
            continue;
          }
          if(tar==="video_pass"){
            if(this.info.video_pass.length===4){
              sendData[tar+"word"] = "提取码:"+ this.info.video_pass;
            }
            continue;
          }
          sendData[tar] = this.info[tar];
        }
      }
      return sendData;
    }
  },
  mounted() {
    if(this.item){
      this.type = 'item';
      this.image = this.item.img_url;
      this.info.id = this.item.id;
      this.info.name = this.item.name;
      let month = this.item.month.split("/")[0];
      let day = this.item.month.split("/")[1];
      this.info.date = `${this.item.year}-${month.length===1?"0"+month:month}-${day.length===1?"0"+day:day}`;
      this.info.img_url = this.item.img_url.split("/").pop();
      this.info.video_url = this.item.video_url;
      this.info.type = this.item.type;
      this.info.pattern = this.item.pattern;
      this.info.bdy_photo = this.item.bdy_photo;
      if(this.item.photo_password){
        this.info.photo_pass = this.item.photo_password.split(":").pop().trim();
      }
      this.info.bdy_video = this.item.bdy_video;
      if(this.item.video_password){
        this.info.video_pass = this.item.video_password.split(":").pop().trim();
      }
    }
  }
}
</script>

<style scoped>
  .adderBody{
    background: white;
    position: fixed;
    top: 55%;
    left: 50%;
    transform: translate(-50%,-50%);
    border: 1vh solid #00BFFF;
    border-radius: 2vh;
    transition: all 0.25s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2.5vh 5vh 3vh;
    z-index: 10;
  }
  .adderBody> div.top{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    position: relative;
  }
  .adderBody> div.top> h1{
    font-size: 3vh;
    color: #3b3b3b;
    user-select: none;
    margin-bottom: 1vh;
  }
  .adderBody> div.top> .image{
    width: 12.5vh;
    position: absolute;
    right: 0;
    bottom: 0;
    border: .25vh solid #707070;
    transition: all 0.2s ease-in-out;
    border-radius: .5vh;
    padding: .65vh;
    cursor: pointer;
  }
  .adderBody> div.top> .image:hover{
    border: .25vh solid #4d4d4d;
  }
  .adderBody > .line{
    display: flex;
    align-items: center;
    padding: .5vh;
    flex-wrap: wrap;
    width: 100%;
  }
  .adderBody > .line > span{
    font-size: 2vh;
    user-select: none;
    color: #3b3b3b;
    font-weight: bold;
  }
  .adderBody > .line > label{
    user-select: none;
    font-size: 2vh;
    width: 4em;
    margin-right: 1em;
    line-height: 100%;
    font-weight: bold;
    color: #3b3b3b;
    white-space: nowrap;
  }
  .radioBody{
    display: flex;
    align-items: center;
  }
  .radioBody > label{
    user-select: none;
    font-size: 2vh;
    line-height: 100%;
    color: #444;
    white-space: nowrap;
    padding-right: .25em;
    cursor: pointer;
  }
  .radioBody > input[type="radio"]{
    appearance: none;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 1.25em;
    height: 1.25em;
    border: .1vh solid #ccc;
    font-size: 2vh;
    cursor: pointer;
    outline: none;
    transition: all .2s ease;
    border-radius: 50%;
    margin-right: 1vw;
  }
  .radioBody > input[type="radio"]:after {
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
  .radioBody > input[type="radio"]:checked:after {
    width: .75em;
    height: .75em;
    opacity: 1;
  }
  .adderBody > .line > input[type=text],.adderBody > .line > input[type=date],.adderBody > .line > textarea{
    padding: .5vh 1vh;
    border: .25vh solid #707070;
    font-size: 2vh;
    outline: none;
    border-radius: .5vh;
    cursor: pointer;
    background: white;
    transition: all 0.25s ease-in-out;
    color: #5e5e5e;
    margin-right: 1em;
    width: 16em;
    line-height: 100%;
  }
  .adderBody > .line > input[type=text]:focus{transform: scaleX(1.025)}
  .adderBody > .line > input[type=text]:hover,.adderBody > .line > input[type=text]:focus{border: .25vh solid #4d4d4d;}
  .adderBody > .line > input[type=date]:hover,.adderBody > .line > input[type=date]:focus{border: .25vh solid #4d4d4d;}
  .adderBody > .line > textarea::-webkit-scrollbar {display: none;}
  .adderBody > .line > button{
    font-size: 2vh;
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    text-align: center;
    user-select: none;
    line-height: 100%;
  }
  .adderBody > .line > button.upload_button{
    padding: .5vh 1vh;
    border: .25vh solid #707070;
    font-size: 2vh;
    border-radius: .5vh;
    background: white;
    color: #5e5e5e;
    margin-right: 1em;
    width: 9em;
    line-height: 115%;
    white-space: nowrap;
  }
  .adderBody > .line > button.upload_button:hover,.adderBody > .line > button.upload_button:focus{border: .25vh solid #4d4d4d;}
  .adderBody > .line > button.submit{
    background: white;
    border: 0.25vh solid #00BFFF;
    color: #00BFFF;
    border-radius: 1vh;
    padding: 1vh 2vh;
    font-weight: bold;
    cursor: pointer;
    margin: 0 auto;
  }
  .adderBody > .line > button.submit:hover {
    background-color: #00BFFF;
    color: white;
  }
  .close{
    width: 3vh;
    height: 3vh;
    background: #00BFFF;
    line-height: 3vh;
    text-align: center;
    font-size: 2.5vh;
    font-weight: bold;
    border-radius: 1.05vh;
    position: absolute;
    right: 0;
    top: 0;
    margin: .5vh;
    cursor: pointer;
    user-select: none;
    color: white;
    transition: all 0.15s ease-in-out;
  }
  .close:hover{
    background: #34cfff;
    transform: rotate(-90deg) scale(1.1);
  }
  .selectType{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 2vw;
    font-weight: bold;
  }
</style>