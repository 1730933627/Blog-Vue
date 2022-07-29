<template>
    <div class="bottom" id="bottom">
        <div id="btop"></div>
        <div class="news-list">
            <NewsSort/>
            <NewsList/>
            <PageControl/>
        </div>
    </div>
</template>

<script>
    import NewsSort from '@/components/News/NewsSort'
    import NewsList from '@/components/News/NewsList'
    import PageControl from '@/components/News/PageControl'

    export default {
        name:"Content",
        components:{
            NewsList,
            NewsSort,
            PageControl
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