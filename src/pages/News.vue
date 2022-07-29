<template>
    <MyLogo/>
    <LinkList/>
    <Content/>
    <Footer/>
    <ToTop/>
</template>

<script>
    import MyLogo from '@/components/MyLogo'
    import LinkList from '@/components/Subpage/LinkList'
    import Content from '@/components/News/Content'
    import Footer from '@/components/Subpage/Footer'
    import ToTop from '@/components/Subpage/ToTop'
    export default {
        name:"News",
        components:{
            MyLogo,
            LinkList,
            Content,
            Footer,
            ToTop
        }
    }
</script>

<style>    
</style>