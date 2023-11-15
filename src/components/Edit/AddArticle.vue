<template>
  <div class="line">
    <label for="id">Card ID</label>
    <input type="text" name="id" id="id" v-model="info.news_id" @blur="watchId" autocomplete="off">
  </div>
  <div class="line">
    <label for="title">文章标题</label>
    <input type="text" name="title" id="title" v-model="info.title" autocomplete="off">
  </div>
  <div class="line">
    <div class="container">
      <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
      />
      <Editor
          style="height: 40vh; overflow-y: hidden;"
          v-model="info.content"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
      />
    </div>
  </div>
  <div class="line">
    <button class="submit" @click="articleSubmit" :disabled="!canClick"
            :style="`cursor: ${canClick?'pointer':'not-allowed'}`">提交</button>
  </div>
</template>

<script setup>
  import '@wangeditor/editor/dist/css/style.css'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import { onBeforeUnmount, ref, reactive, shallowRef, defineEmits } from 'vue'
  import { useStore } from 'vuex'
  import { nanoid } from "nanoid";
  import axios from "axios";

  const store = useStore();
  const emit = defineEmits(["pushMessage",'closeAdder'])
  const imgSize = 1024 * 1024 * 64
  const editorRef = shallowRef();
  const mode = 'simple';
  const canClick = ref(false)
  const info = reactive({
    news_id:'',
    title:'',
    date:'',
    content:'',
  })

  const toolbarConfig = {
    insertKeys: {index: 0,keys: ["headerSelect","fontFamily"]},
    excludeKeys:["bgColor","todo","insertTable","header1","header2","header3","fullScreen"]
  }
  const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF:{
      uploadImage:{
        fieldName: nanoid(),
        server: '/uploadImage',
        maxFileSize: imgSize,
        base64LimitSize: imgSize,
        onError(file, err, res) {
          emit("pushMessage",`上传出错`,"#ff0059")
        },
      },
      codeSelectLang:{
        codeLangs: [
          { text: 'CSS', value: 'css' },
          { text: 'HTML', value: 'html' },
          { text: 'XML', value: 'xml' },
        ]
      }
    }
  }
  const handleCreated = (editor) => {
    editorRef.value = editor
  }
  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    setTimeout(()=>{
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    },500)
  })

  const watchId = ()=>{
    if(info.news_id!==""){
      const videoInfo = store.dispatch("videoInfo/getItem",info.news_id)
      videoInfo.then(res=>{
        if(res[0]===undefined){
          canClick.value = false;
          emit("pushMessage",`没有该对象`,"#ff0059")
          return
        }
        const url = res[0]?.video_url
        const itemType = res[0]?.type
        if(itemType==="Article"){
          if(url==="/404"||url===undefined||url===""){
            canClick.value = true;
            emit("pushMessage",`ID可创建`,"#00debc")
          }else{
            canClick.value = false;
            emit("pushMessage",`ID不可创建`,"#ff0059")
          }
        }else{
          emit("pushMessage",`不是文章`,"#ff0059")
        }
      })
    }
  }
  const initDate = ()=> {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth()+1;
    if(month.toString().length===1){month="0"+month}
    let day = date.getDate();
    if(day.toString().length===1){day="0"+day}
    info.date=`${year}-${month}-${day}`;
  }
  const articleSubmit = async () => {
    initDate()
    await axios.post(process.env.VUE_APP_URL + "addArticle", {
      news_id: info.news_id,
      date: info.date,
      title: info.title,
      content: info.content
    }).then(
        res => {
          const datas = res.data;
          if (datas.err === 0) {
            emit("pushMessage", `创建成功`, "#00debc")
            info.news_id = ''
            info.date = ''
            info.title = ''
            info.content = ''
            emit("closeAdder")
            const status = store.getters["heardStatus/getStatus"]
            store.dispatch('videoInfo/getInfoList',status)
          } else {
            emit("pushMessage", `创建出错`, "#ff0059")
            console.log(datas.msg)
          }
        }, err => {
          emit("pushMessage", `网络错误`, "#ff0059")
        }
    )
  }

</script>

<style scoped>
.container{
  border: .2vh solid #707070;
  border-radius: .5vh;
  padding: .25vh;
}
.adderBody > .line{
  display: flex;
  align-items: center;
  padding: .5vh;
  flex-wrap: wrap;
  width: 100%;
}
.adderBody > .line > label{
  user-select: none;
  font-size: 2vh;
  margin-right: 1.5em;
  line-height: 100%;
  font-weight: bold;
  color: #3b3b3b;
  white-space: nowrap;
  width: 4em;
}
.adderBody > .line > input[type=text]{
  padding: .5vh 1vh;
  border: .2vh solid #707070;
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
.adderBody > .line > input[type=text]:focus{width: 16.25em}
.adderBody > .line > input[type=text]:hover,.adderBody > .line > input[type=text]:focus{border: .2vh solid #4d4d4d;}
.adderBody > .line > button{
  font-size: 2vh;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  text-align: center;
  user-select: none;
  line-height: 100%;
}
.adderBody > .line > button.submit{
  background: white;
  border: 0.25vh solid #00BFFF;
  color: #00BFFF;
  border-radius: 1vh;
  padding: 1vh 2vh;
  font-weight: bold;
  margin: 0 auto;
}
.adderBody > .line > button.submit:hover {
  background-color: #00BFFF;
  color: white;
}
</style>