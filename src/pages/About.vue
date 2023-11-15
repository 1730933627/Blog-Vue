<template>
    <MyLogo/>
    <LinkList/>
    <Content/>
    <Footer/>
</template>

<script>
    import MyLogo from '@/components/MyLogo'
    import LinkList from '@/components/Subpage/LinkList'
    import Footer from '@/components/Subpage/Footer'
    import Content from '@/components/About/Content'
    export default {
        name:"About",
        components:{
            MyLogo,
            LinkList,
            Content,
            Footer
        }
    }
</script>

<style>

</style>