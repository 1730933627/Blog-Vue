<template>
    <div class="detail">
        <div class="close" @click="setDownloadShow(false)">
        </div>
        <div class="title">{{item.name}}</div>
        <div class="line">
            <a :href="item.bdy_photo" id="photo" target="_blank">{{item.photo}}</a>
            <p class="password" @click="share">{{item.photo_password}}</p>
        </div>
        <div class="line">
            <a :href="item.bdy_video" target="_blank">【视频】</a>
            <p class="password" @click="share">{{item.video_password}}</p>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        name:"Detail",
        methods:{
            ...mapMutations('videoInfo',['setDownloadShow']),
            share(event) {
                let text = event.target.innerHTML;
                if(text == "没有分享链接" || text == null || text == undefined){
                    text = null;
                }else text = text.slice(4);
                this.$copyText(text).then(
                    response => {
                        this.addSpop(true);
                    }, 
                    error => {
                        this.addSpop(false);
                })
            }
        },
        props:['item','addSpop'],
    }
</script>

<style scoped>
  @media screen and (orientation: landscape) {
    .detail{
        width: 30%;
        top: 40vh;
        left: 35%;
    }
    .detail > .line > a{
        margin-right: 2vw;
    }
    .detail > .close{
        width: 3vh;
        height: 3vh;
    }
  }
  @media screen and (orientation: portrait) {
    .detail{
        width: 90%;
        top: 35vh;
        left: 5%;
    }
    .detail > .close{
        width: 3.5vh;
        height: 3.5vh;
    }
  }
    .detail{
        height: 30vh;
        position: fixed;
        padding: 8vh 6vh 8vh;
        background-color:white;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 1vh;
        border: 0.25vh solid #00BFFF;
    }
    .detail > .close{
        top: 1vh;
        right: 1vh;
        position: absolute;
        border-radius: 50%;
        background-color:#00BFFF;
        cursor: pointer;
    }
    .detail > .title{
        width: 100%;
        font-size: 2.5vh;
        margin-bottom: 2vh;
        text-align: center;
        user-select: none;
    }
    .detail > .line{
        width: 100%;
        display: flex;
        padding: 2vh 0;
        font-size: 2.5vh;
        justify-content: space-around;
        align-items: center;
    }
    .detail > .line > a{
        width: 4em;
        text-decoration: none;
        color: #00BFFF;
        font-weight: bold;
        user-select: none;
    }
    .detail > .line > p{
        width: 6.5em;
        text-align: right;
        cursor: pointer;
    }
</style>