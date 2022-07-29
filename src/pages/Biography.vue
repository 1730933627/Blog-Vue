<template>
    <MyLogo/>
    <LinkList/>
    <Content/>
    <ToTop/>
    <Footer/>
</template>

<script>
    import MyLogo from '@/components/MyLogo'
    import LinkList from '@/components/Subpage/LinkList'
    import Content from '@/components/Biography/Content'
    import ToTop from '@/components/Subpage/ToTop'
    import Footer from '@/components/Subpage/Footer'
    export default {
        name:'Biography',
        components:{
            MyLogo,
            LinkList,
            Content,
            ToTop,
            Footer
        }
    }
</script>

<style>

</style>