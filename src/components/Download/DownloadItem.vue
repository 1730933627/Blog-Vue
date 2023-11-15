<template>
    <div class="item" @click="showInfo">
        <img v-lazy="item.img_url" @error="defaultImg" alt="" :key="item.img_url"/>
        <div class="item_info">
            <h5>{{item.name}}</h5>
        </div>
    </div>
</template>

<script>
    import {mapMutations,mapGetters} from 'vuex'
    export default {
        name:"DownloadItem",
        props:['item'],
        methods:{
            ...mapMutations('videoInfo',['saveDownloadItem','setDownloadShow']),
            showInfo(){
                if(this.readDownloadItem.show){
                    this.setDownloadShow(false);
                    setTimeout(() => {
                        this.saveDownloadItem({show:true,info:this.item});
                    },750)
                }else this.saveDownloadItem({show:true,info:this.item})
            },
            defaultImg(e){
              const img = e.srcElement;
              img.src = this.getDefaultImg;
              img.onerror = null;
            }
        },
        computed:{
            ...mapGetters('videoInfo',['readDownloadItem','getDefaultImg'])
        },
    }
</script>

<style scoped>
  @media screen and (orientation: landscape) {
    .item{
        width: 22.5%;
    }
  }
  @media screen and (orientation: portrait) {
    .item{
        width: 100%;
    }
  }
    @keyframes itemIn{
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
    .item{
        background-color: white;
        border: 1vh solid white;
        box-shadow: 0 0 .5vh #008ee0;
        margin-bottom: 2vh;
        user-select: none;
        cursor: pointer;
        border-radius: 0.5vh;
        transition: transform 0.25s ease-in-out;
        animation: itemIn 0.3s ease-in-out;
    }
    .item:hover{
        transform: scale(1.025);
    }
    .item > img{
        width: 100%;
    }
    .item_info{
        color: #00BFFF;
    }
    .item_info h5{
        font-size: 1.5vh;
    }
</style>