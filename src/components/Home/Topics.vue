<template>
    <div class="top_newsm" ref="top_newsm">
        <div @click="showNews" id="top_news_button">
            <div class="top_news">
                <p>TOPICS</p>
            </div>
            <div class="news_jt">
                <img src="images/icon/jt.png"/>
            </div>
        </div>
        <div class="new_topics">
            <span>New Topics</span>
        </div>
        <div class="error" v-text="'出现错误,请联系管理员'" v-if="isError"></div>
        <div class="new_topics_p" id="new_topics_p" v-else>
            <div  v-for="(item,index) in msgs_topics" :key="index">
                <span class="time">{{item.year}}.{{item.month}}</span>
                <a @click="openUrl(item.video_url)" class="word">
                    <span id="item_name">{{item.name}}</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name:"Topics",
    data(){
        return{
            first:true,
            isShow:(localStorage.getItem('topicsShow') === "true" || false)
        }
    },
    computed:{
        ...mapGetters('videoInfo',['readInfoListAll','isError']),
        ...mapGetters('heardStatus',['getStatus']),
        msgs_topics(){
            const List = [];
            const computedList = [];
            List.push(...this.readInfoListAll.slice(0,6));
            for(let item of List){
                if(item.month.split('/')[1].length === 1){
                    item.month = item.month.split('/')[0] +'/'+ '0'+ item.month.split('/')[1];
                }
                if(item.month.split('/')[0].length === 1){
                    item.month = '0' + item.month.split('/')[0] +'/'+ item.month.split('/')[1];
                }
                computedList.push(item);
            }
            return computedList;
        }
    },
    methods:{
        showNews(){
            if (this.isShow) {
                this.$refs.top_newsm.style.transform = 'translate(0,0px)';
                if(!this.first){
                    this.first = false;
                }else this.isShow = false;
            }
            else {
                this.$refs.top_newsm.style.transform = 'translate(-100%,0px)';
                if(!this.first){
                    this.first = false;
                }else this.isShow = true;
            }
            localStorage.setItem('topicsShow',!this.isShow);
        },
        openUrl(link){
            if(link==="/404"){this.$router.push({name:'NotFound'})
            }else if(!link.indexOf("http")){
              window.open(link,"_blank");
            }else{
              const type = link.split("?")[0];
              const id = link.split("?")[1].split("=")[1];
              if(type==="article"){
                this.$router.push({name: 'Article',query:{id}});
              }
            }
        }
    },
    mounted(){
        this.showNews();
    }
}
</script>

<style scoped>

@media screen and (orientation: landscape) {
    .top_newsm{
        min-width: 35vw;
        min-height: 30vh;
    }
}
@media screen and (orientation: portrait) {
    .top_newsm{
        min-width: 80vw;
        max-width: 90vw;
        min-height: 25vh;
    }    
}
    .error{
        font-size: 3vh;
        margin: 7.5vh auto;
        color: white;
        user-select: none;
    }
    #top_news_button{
        cursor: pointer;
    }
    .top_newsm{
        z-index: 20;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #00BFFF;
        transform: translate(-100%,0px);
        transition: all .5s ease-in-out;
        display: flex;
        align-items: baseline;
        flex-direction: column;
    }
    .top_news{
        position: absolute;
        top:0;
        right: 0;
        transform: translateX(100%);
        border-top: 7vh solid #00BFFF;
        border-right: 1.5vh solid transparent;
        width: 2.5vh;
        z-index: 5;
    }
    .top_news p{
        transform:rotate(90deg);
        color:#F0FFFF;
        position: absolute;
        left: -1.5vh;
        top: -4.6vh;
        font-size: 1.5vh;
        user-select: none;
    }
    .top_news p:hover{
        text-decoration:underline;
    }
    .new_topics{
        padding:5px;
        font-size: 2vh;
        margin: 5% 0 0 5%;
        background-color: rgb(77, 77, 77);
        color:#fff;
        user-select: none;
    }
    .new_topics_p{
        width: 100%;
        margin: 2% 0 5%;
        font-size: 2vh;
        color: #fff;
    }
    .new_topics_p > div{
        padding: 0.75vh 7.5% 0 1%;
        display: flex;
        align-items: center;
    }
    .new_topics_p .time{
        margin-right: 3%;
        user-select: none;
    }
    .new_topics_p .word{
        cursor: pointer;
        color: #fff;
    }
    .new_topics_p .word a:hover{
        text-decoration:underline;
    }
    .news_jt{
        width:6vh;
        position: absolute;
        top: 5px;
        right: 0;
        user-select: none;
    }
    .news_jt img{
        width: 100%;
    }
</style>