<template>
    <MyLogo/>
    <LinkList/>
    <Content :showStatus="showStatus"/>
    <Status @click="message.statusShow=false" :message="message"/>
    <Footer/>
</template>

<script>
    import MyLogo from '@/components/MyLogo'
    import LinkList from '@/components/Subpage/LinkList'
    import Content from '@/components/Contact/Content'
    import Status from '@/components/Contact/Status'
    import Footer from '@/components/Subpage/Footer'
    export default {
        name:'Download',
        data(){
            return{
                message:{
                    info:"发送中···",
                    statusShow:false
                }
            }
        },
        methods:{
            showStatus(info="发送中···"){
                this.message.info = info;
                this.message.statusShow = true;
            },
        },
        components:{
            MyLogo,
            LinkList,
            Content,
            Status,
            Footer,
        }
    }
</script>

<style>

</style>