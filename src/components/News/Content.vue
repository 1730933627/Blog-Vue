<template>
    <div class="bottom">
        <div class="title">
            <h1>NEWS</h1>
        </div>
        <Loading v-if="isLoading"/>
        <div class="news-list" v-else>
            <Error v-if="isError"></Error>
            <template v-else>
                <NewsSort/>
                <NewsList/>
                <PageControl/>
            </template>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Loading from '../Subpage/Loading'
    import NewsSort from '@/components/News/NewsSort'
    import NewsList from '@/components/News/NewsList'
    import PageControl from '@/components/News/PageControl'
    import Error from '../Subpage/Error.vue'

    export default {
        name:"Content",
        components:{
            NewsList,
            NewsSort,
            PageControl,
            Loading,
            Error
        },
        computed:{
            ...mapGetters('videoInfo',['isLoading','isError']),
        },
    }
</script>

<style scoped>
    .bottom{
        width:100%;
        background-color: #87CEFA;
    }
    .bottom #btop{
        height:10vh;
    }
    .title{
        color: white;
        user-select:none;
    }
    @media screen and (orientation: landscape) {
        .title{
          margin: 10vh 15.5vw 2vh;
        }
        .title > h1{
            font-size: 10vh;
        }
    }
    @media screen and (orientation: portrait) {
        .title > h1{
            font-size: 8vh;
        }
        .title{
          margin: 10vh 9vw 2vh;
        }
    }
</style>