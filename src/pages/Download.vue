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
    import ToTop from '@/components/Subpage/ToTop'
    import Footer from '@/components/Subpage/Footer'
    import Content from '@/components/Download/Content'
    export default {
        name:'Download',
        components:{
            MyLogo,
            LinkList,
            Content,
            ToTop,
            Footer
        },
    }
</script>

<style>

</style>