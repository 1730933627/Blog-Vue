<template>
    <div class="bottom" id="bottom">
        <div id="btop"></div>
        <Loading v-if="isLoading"/>
        <div class="news-list" v-else>
            <NewsSort/>
            <NewsList/>
            <PageControl/>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Loading from '../Subpage/Loading'
    import NewsSort from '@/components/News/NewsSort'
    import NewsList from '@/components/News/NewsList'
    import PageControl from '@/components/News/PageControl'

    export default {
        name:"Content",
        components:{
            NewsList,
            NewsSort,
            PageControl,
            Loading
        },
        computed:{
            ...mapGetters('videoInfo',['isLoading'])
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
</style>