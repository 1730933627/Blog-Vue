<template>
    <div class="center">
        <DownloadItem v-for="item in paginatedData" :key="item.id" :item="item"/>
    </div>
</template>

<script>
    import {mapState,mapGetters} from 'vuex'
    import DownloadItem from '@/components/Download/DownloadItem'
    export default {
        name:"DownloadList",
        computed:{
            ...mapState('videoInfo',['download']),
            ...mapGetters('videoInfo',['readInfoListOfVideo']),
            initList(){
                const List = [];
                for(let item of this.readInfoListOfVideo){
                    if(item.bdy_video != null){
                        item.photo = "【图片】";
                        if(item.photo_password==null){
                            item.photo_password = "没有分享链接";
                        }
                        if(item.video_password==null){
                            item.video_password = "Null";
                        }
                        const text = item.video_url.split("/")[2]
                        if((text==="ecchi.iwara.tv"||text=== "www.iwara.tv") && item.bdy_photo == null){
                          item.photo = "【无】";
                          item.photo_password = "解压码:yanlin";
                        }
                        List.push(item);
                    }
                }
                return List;
            },
            paginatedData() {
                const start = this.download.Page * this.download.PageSize
                    ,end = start + this.download.PageSize;
                return this.initList.slice(start, end);
            },
        },
        components:{
            DownloadItem,
        },
    }
</script>

<style scoped>
    @keyframes cardIn {
        0%{transform: translateY(-1vh)}
        100%{transform: translateY(0)}
    }
    .center{
        width: 80%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        animation: cardIn .5s ease-out;
    }
</style>