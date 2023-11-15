<template>
  <div class="main" style="">
    <header>
      <div class="left">
        <input type="text" :placeholder="'ID'+getMaxIdFun" v-model="search.id"/>
        <input type="text" placeholder="Name" v-model="search.name" style="width: 8vw"/>
        <div class="selectBody">
          <label v-show="!search.year">Year</label>
          <select v-model="search.year" name="Year">
            <option v-for="year in yearList" :value="year">{{year}}</option>
          </select>
        </div>
        <div class="selectBody">
          <label v-show="!search.month">Month</label>
          <select v-model="search.month">
            <option v-for="month in monthList" :value="month">{{month}}</option>
          </select>
        </div>
        <div class="selectBody">
          <label v-show="!search.type">Type</label>
          <select v-model="search.type">
            <option v-for="type in typeList" :value="type">{{type}}</option>
          </select>
        </div>
      </div>
      <div class="right">
        <button @click="resetSearch" class="reset">重置索引</button>
        <button @click="setStatus" v-text="heart?'展示全龄':'展示全部'" class="heart"></button>
        <button @click="openAdder(null)" class="append">添加一项</button>
        <button class="exit" @click="exitLogin">退出登录</button>
      </div>
    </header>
    <template v-if="!isError">
      <ul class="content">
        <li v-for="item in paginatedData" :key="item.id" class="item">
          <span class="id">{{item.id}}</span>
          <div class="img"><img v-lazy="item.img_url" alt="" :key="item.img_url" @error="defaultImg"></div>
          <span class="name">{{item.name}}</span>
          <span class="year">{{item.year}}</span>
          <span class="month">{{monthFormat(item.month)}}</span>
          <a :href="item.video_url" class="url" target="_blank">预览</a>
          <span class="type">{{item.type}}</span>
          <span class="share" :style="`color:${item.bdy_video?'':'#ff0059'}`">{{item.bdy_video?'有分享':'无分享'}}</span>
          <span class="pattern" :style="`color:${item.pattern?'#ff0059':'#1E90FF'}`">{{item.pattern?"R18":"普通"}}</span>
          <div class="button" style="display: flex">
            <button class="edit" @click="edit(item)">编辑</button>
            <button class="delete" @click="deleteVideo(item)">删除</button>
          </div>
        </li>
      </ul>
      <div class="page" v-show="!isLoading">
        <span @click="prevPage">▲</span>
        <ul>
          <li v-for="i in totalPage" :key="i" @click="pageGoto(i)" v-show="pageCount(i)" :class="i-1===page.pointer?'active':''">{{i}}</li>
        </ul>
        <span @click="nextPage">▼</span>
        <select name="pages" title="每页个数" v-model="page.size">
          <option v-for="i in page.sizes" :value="i" :key="i">{{i}}/P</option>
        </select>
        <span class="total">共{{totalPage}}页</span>
      </div>
    </template>
    <div v-else class="error">网络错误</div>
  </div>
</template>

<script>
import axios from "axios";
import {mapActions, mapGetters} from "vuex"
import Footer from "@/components/Home/Footer";
export default {
  name: "Editor",
  components: {Footer},
  props:["exitLogin","openAdder","closeAdder","pushMessage"],
  data(){
    return{
      list:[],
      page:{
        pointer:0,
        size:25,
        sizes:[25,50,75]
      },
      search:{
        id:"",
        name:"",
        year:"",
        month:"",
        type:"",
      },
      heart:sessionStorage.getItem('heart') === "true" || false,
    }
  },
  computed:{
    ...mapGetters("videoInfo",["readInfoListAll","isLoading","getYear","getMonth","getTypes","isError","isLoading","getMaxId"]),
    ...mapGetters('heardStatus',['getStatus']),
    ...mapGetters('videoInfo',['getDefaultImg']),
    videoList(){return this.readInfoListAll;},
    getMaxIdFun(){
      return this.getMaxId===false?'':':'+this.getMaxId
    },
    monthList(){
      return this.getMonth.sort((a,b)=>{
        return parseInt(a)-parseInt(b);
      })
    },
    yearList(){
      return this.getYear.sort((a,b)=>{
        return parseInt(a)-parseInt(b);
      })
    },
    typeList(){
      return this.getTypes;
    },
    monthFormat(){
      return function (month){
        let m = month.split("/")[0];
        if(m.length===1){m = "0" + m}
        let d = month.split("/")[1];
        if(d.length===1){d = "0" + d}
        return `${m}/${d}`;
      }
    },
    idFilterList(){
      if(this.search.id!==""){
        return this.videoList.filter(item=>{
          if(item.id===Number(this.search.id))return item;
        })
      }else return this.videoList;
    },
    nameFilterList(){
      if(this.search.name!==""){
        return this.idFilterList.filter(item=>{
          return item.name.toLowerCase().indexOf(this.search.name.toLowerCase()) !== -1;
        })
      }else return this.idFilterList;
    },
    dateFilterList(){
      let yearList = [];
      let monthList = [];
      if(this.search.year!==""){
        yearList = this.nameFilterList.filter(item=>{if(item.year===this.search.year)return item;})
      }else yearList = this.nameFilterList;
      if(this.search.month!==""){
        monthList = yearList.filter(item=>{if(item.month.split("/")[0]===this.search.month)return item;})
      }else monthList = yearList;
      return monthList
    },
    typeFilterList(){
      if(this.search.type!==""){
        return this.dateFilterList.filter(item=>{
          if(item.type===this.search.type)return item;
        })
      }else return this.dateFilterList;
    },
    totalPage(){
      let l = this.typeFilterList.length,
          s = this.page.size;
      return Math.floor(l / s)+1;
    },
    paginatedData() {
      const start = this.page.pointer * this.page.size
          ,end = start + this.page.size;
      return this.typeFilterList.slice(start, end);
    },
    pageCount(){
      return i=>{
        return i-1<this.page.pointer+3&&i-1>this.page.pointer-3;
      }
    }
  },
  methods:{
    ...mapActions('videoInfo',["getInfoList"]),
    defaultImg(e){
      const img = e.srcElement;
      img.src = this.getDefaultImg;
      img.onerror = null;
    },
    setStatus(){
      this.$store.commit('heardStatus/CHANGESTATUS',!this.heart);
      this.heart = !this.heart;
      this.getInfoList(this.getStatus);
    },
    resetSearch(){
      this.search = {
        id:"",
        name:"",
        year:"",
        month:"",
        type:"",
      }
    },
    nextPage() {
      if(this.page.pointer<this.totalPage-1){
        this.page.pointer++;
      }
    },
    prevPage(){
      if(this.page.pointer>0){
        this.page.pointer--;
      }
    },
    pageGoto(e){
      this.page.pointer = e-1;
    },
    edit(item){
      this.closeAdder();
      this.openAdder(item);
    },
    async deleteVideo(item){
      const data = {id:item.id}
      if(item.img_url.split("/").pop()!=="cb.jpg"){
        data["file_name"] = item.img_url.split("/").pop()
      }
      await axios.post(process.env.VUE_APP_URL+'delete_videoinfo',data).then(
          resolve=>{
            if(resolve.data.status===200&&resolve.data.err===0){
              this.getInfoList(this.getStatus)
              this.pushMessage("删除成功","#00debc")
            }
          }
      ).catch(error=>{
        this.pushMessage("删除失败","#ff0059")
      })
    }
  },
}
</script>

<style scoped>
  .main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    position: relative;
  }
  .main::-webkit-scrollbar {
    display: none;
  }
  header{
    width: 100%;
    border-bottom: 1px solid #87cefa;
    padding: 1vh 1vh 2vh;
    position: sticky;
    top: 0;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    z-index: 1;
  }
  header input,header select{
    padding: .5vh 1vh;
    border: .25vh solid #707070;
    font-size: 2vh;
    outline: none;
    border-radius: .5vh;
    cursor: pointer;
    background: white;
    transition: all 0.25s ease-in-out;
    color: #5e5e5e;
  }
  header input{
    width: 5vw;
    margin-right: 2vw;
  }
  header input:focus{
    padding: .5vh 1.5vh .5vh 1vh;
  }
  header input:hover,header input:focus{
    border: .25vh solid #4d4d4d;
  }
  header .selectBody{
    display: inline-block;
    position: relative;
    user-select: none;
  }
  header .selectBody>label{
    position: absolute;
    left: 10%;
    top: 50%;
    transform: translateY(-50%);
    line-height: 100%;
    color: #5e5e5e;
    font-size: 2vh;
  }
  .selectBody > select > option{
    font-size: 2vh;
  }
  header select{
    width: 7em;
    margin-right: 1vw;
  }
  header select:hover,header select:focus{
    border: .25vh solid #4d4d4d;
  }
  header select>option{
    border-radius: 0;
  }
  header button{
    padding: .5vh 1vh;
    margin-left: 1vw;
    font-size: 2vh;
    border-radius: .5vh;
    transition: all 0.25s ease-in-out;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
  }
  header button.reset{border: .25vh solid #5e5e5e;background: white;color: #5e5e5e;}
  header button.reset:hover,header input.reset:focus{background: #5e5e5e;color: white;}
  header button.heart{border: .25vh solid #ff0041;background: white;color: #ff0041;}
  header button.heart:hover,header input.heart:focus{background: #ff0041;color: white;}
  header button.append{border: .25vh solid #2f00bb;background: white;color: #2f00bb;}
  header button.append:hover,header input.append:focus{background: #2f00bb;color: white;}
  header button.exit{border: .25vh solid #009f1c;background: white;color: #009f1c;}
  header button.exit:hover,header input.exit:focus{background: #009f1c;color: white;}

  ul.content{display: flex;flex-direction: column;}
  @keyframes item-in {
    0% {transform: translateY(-25%);opacity: 0;}
    100% {transform: translateY(0);opacity: 1;}
  }
  ul > li.item{
    display: flex;
    list-style-type: none;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid #87cefa;
    animation: item-in .5s ease-in-out;
  }
  ul > li.item > .img{
    width: 10vh;
    padding: .25vh;
    font-size: 0;
    user-select: none;
  }
  ul > li.item > .img >img{
    width: 100%;
    pointer-events:none;
  }
  ul > li.item > span{
    font-size: 2vh;
    user-select: none;
    color: #3b3b3b;
    font-weight: bold;
    white-space: nowrap;
  }
  ul > li.item > a{
    font-size: 2vh;
    user-select: none;
    font-weight: bold;
    color: #1E90FF;
    text-decoration: none;
    white-space: nowrap;
  }
  ul > li.item > span.id{
    width: 3em;
    text-align: center;
    border: .25vh solid #00BFFF;
    color: #00BFFF;
    border-radius: 1vh;
    font-weight: bold;
    font-size: 2vh;
    margin-left: .25vw;
  }
  ul > li.item > span.name{
    width: 16em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  ul > li.item > span.year{
    width: 2.5em;
  }
  ul > li.item > span.month{
    width: 3em;
  }
  ul > li.item > span.type{
    width: 5em;
    text-align: left;
  }
  ul > li.item button{
    border-radius: 1vh;
    padding: 1vh 2vh;
    text-align: center;
    font-size: 2vh;
    font-weight: bold;
    transition: all 0.5s ease-in-out;
    cursor: pointer;
    line-height: 100%;
    user-select: none;
  }
  ul > li.item button.edit{
    background: #00BFFF;
    border: .25vh solid #00BFFF;
    color: white;
    margin-right: .25vh;
  }
  ul > li.item button.edit:hover {
    background-color: white;
    color: #00BFFF;
  }
  ul > li.item button.delete{
    background: #ff0059;
    border: .25vh solid #ff0059;
    color: white;
    margin: 0 .25vh;
  }
  ul > li.item button.delete:hover {
    background-color: white;
    color: #ff0059;
  }
  @keyframes pageAn {
    0%{transform: translateX(100%);opacity: 0;}
    100%{transform: translateX(0);opacity: 1;}
  }
  .page{
    position: fixed;
    right: 0;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1vh;
    border-top-left-radius: 1vh;
    border-bottom-left-radius: 1vh;
    user-select: none;
    animation: pageAn .5s ease-in-out;
  }
  .page> span{
    font-size: 4vh;
    line-height: 100%;
    cursor: pointer;
    color: #3b3b3b;
    transition: all .25s ease-in-out;
  }
  .page> span:hover{color: black;}
  .page> span.total{
    font-size: 1.75vh;
    cursor: default;
    font-weight: bold;
    margin: .5vh 0;
  }
  .page> ul> li{
    list-style-type: none;
    padding: .5vh;
    border: .25vh solid #3b3b3b;
    color: #3b3b3b;
    width: 1em;
    height: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2vh;
    margin: 1vh 0;
    border-radius: .5em;
    font-weight: bold;
    cursor: pointer;
    transition: all .2s ease-in-out;
  }
  .page> ul> li:hover{color: white;background: #3b3b3b;}
  .page> ul> li.active{color: #00BFFF;border: .25vh solid #00BFFF;}
  .page> ul> li.active:hover{background: #00BFFF;color: white;}
  .page> select{
    margin: 1vh 0 .5vh;
    width: 3em;
    padding: .5vh .75vh;
    font-size: 2vh;
    font-weight: bold;
    border: .15vh solid #3b3b3b;
    color: #3b3b3b;
    border-radius: 1em;
    appearance: none;
    outline: none;
    box-sizing: border-box;
    cursor: pointer;
    transition: all .2s ease-in-out;
  }
  .page> select:hover,.page> select:focus{
    color: white;
    background: #3b3b3b;
  }
  @keyframes errorAn { 0%{opacity: 0} 100%{opacity: 1} }
  .error{
    color: #87cefa;
    font-size: 10vh;
    user-select: none;
    margin: 20vh auto;
    font-weight: bold;
    animation: errorAn .5s ease-in-out;
  }
</style>