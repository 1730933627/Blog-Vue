<template>
    <div class="perpage">
        <button id="pre" @click="prePage"><span>上一页</span></button>
        <span class="page" @click="goPage" v-for="(son,index) in totalPage" :key="index">{{son}}</span>
        <button id="next" @click="nextPage"><span>下一页</span></button>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    export default {
        name:"PageControl",
        computed:{
            ...mapState('videoInfo',['news']),
            totalPage(){
                if(this.news.Page === 0 || this.news.Page === this.news.PageEnd){
                    return ["首页","尾页"]
                }else{
                    return [1,'第'+(this.news.Page+1)+'页',this.news.PageEnd+1]
                }
            }
        },
        methods:{
            ...mapMutations('videoInfo',['changeNewsPage']),
            prePage(){
                this.changeNewsPage(this.news.Page-1);
            },
            nextPage(){
                this.changeNewsPage(this.news.Page+1);
            },
            goPage(event){
                if(event.target.innerHTML === '首页'){
                    this.changeNewsPage(0);
                }else if(event.target.innerHTML === '尾页'){
                    this.changeNewsPage(this.news.PageEnd);
                }else{
                    let pageNum = parseInt(event.target.innerHTML.replace(/[^0-9]/ig,""))
                    this.changeNewsPage(pageNum-1);
                }
            }
        },
    }
</script>

<style scoped>
    *{
        user-select: none;
    }
  @media screen and (orientation: landscape) {
    .perpage{
        width: 33.3%;
    }
    .perpage button{
        border-radius: 2vh;
        padding: 1vh;
        margin: 0 2vw 0;
        font-size: 2vh;
        width: 12vh;
        height: 6vh;
    }
    .perpage .page{
        margin: .5vh 1vh;
    }
  }
  @media screen and (orientation: portrait) {
    .perpage{
        width: 80%;
    }
    .perpage button{
        border-radius: 1vh;
        padding: 1vh;
        margin: 0 2vw 0;
        font-size: 1.5vh;
        width: 8vh;
        height: 4vh;
    }
    .perpage .page{
        margin: .5vh .5vh;
    }
  }
    .perpage{
        display: flex;
        padding: 3.5vh 0 5vh;
        margin: 0 auto;
        justify-content: space-between;
        align-items: center;
    }
    .perpage .page{
        font-size: 1.5vh;
        background-color: white;
        padding: .5vh 1vh;
        border-radius: .5vh;
        cursor: pointer;
        box-shadow: rgb(0 142 224) 0 0 .75vh;
        transition: transform 0.25s ease-in-out;
        white-space: nowrap;
    }
    .perpage .page:hover{
        transform: scale(1.1);
    }
    .perpage button{
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0;
        font-weight: bold;
        color: rgb(54, 54, 54);
        background-color: #fff;
        cursor:pointer;
        box-shadow: rgb(0 142 224) 0 0 .75vh;
        transition: all 0.45s linear;
    }
    .perpage button:hover{
        transform :scale(1.03);
    }
    .perpage #pre span,.perpage #next span {
        cursor: pointer;
        position: relative;
        transition: 0.5s ease-in-out;
        display: flex;
        align-items: center;
    }
    .perpage #next span:after,.perpage #pre span:after{
        position: absolute;
        font-size: 1em;
        opacity: 0;
        transition: 0.5s ease-in-out;
        line-height: 100%;
    }
    .perpage #next span:after {
        content: '▶';
        right: 0;
    }
    .perpage #pre span:after {
        content: '◀';
        left: 0;
    }
    .perpage #next:hover span:after {
        opacity: 1;
        right: -1vh;
    }
    .perpage #pre:hover span:after {
        opacity: 1;
        left: -1vh;
    }
    .perpage #next:hover span {
        padding-right: 1vh;
    }
    .perpage #pre:hover span {
        padding-left: 1vh;
    }
</style>