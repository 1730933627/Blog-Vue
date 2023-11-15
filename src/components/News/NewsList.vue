<template>
    <div class="normal pickup">
        <div class="centerview">
            <NewsItem v-for="item in paginatedData.slice(0,3)" :key="item.id" :item="item"/>
        </div>
    </div>
    <div class="normal">
        <div class="centerview">
            <NewsItem v-for="item in paginatedData.slice(3)" :key="item.id" :item="item"/>
        </div>
    </div>
</template>

<script>
    import {mapState,mapGetters} from 'vuex'
    import NewsItem from '@/components/News/NewsItem'
    export default {
        name:"NewsList",
        computed:{
            ...mapState('videoInfo',['news']),
            ...mapGetters('videoInfo',['readInfoListOfType']),
            initList(){
                const List = [];
                for(let item of this.readInfoListOfType){
                    List.push(item);
                }
                return List;
            },
            paginatedData() {
                const start = this.news.Page * this.news.PageSize
                    ,end = start + this.news.PageSize;
                return this.initList.slice(start, end);
            }
        },
        components:{
            NewsItem,
        },
    }
</script>

<style scoped>
  @media screen and (orientation: landscape) {
    .centerview{
        max-width: 70%;
    }
  }
  @media screen and (orientation: portrait) {
    .centerview{
        max-width: 80%;
    }
}
    @keyframes cardIn {
      0%{transform: translateY(-1vh)}
      100%{transform: translateY(0)}
    }
    .normal{
        width: 100%;
        margin-top: 2vh;
        animation: cardIn .5s ease-out;
    }
    .pickup{
        background-color: rgb(93, 193, 255);
    }
    .centerview{
        position: relative;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>