<template>
    <MyLogo/>
    <LinkList/>
    <div class="errorBody" :style="'height:'+getHeight+'px'">
        <h1>非常抱歉,你要找的页面不见喏...</h1>
        <h2>5秒后将跳回主页</h2>
    </div>
    <Footer/>
</template>

<script>
    import {mapGetters} from 'vuex'
    import MyLogo from '@/components/MyLogo'
    import LinkList from '@/components/Subpage/LinkList'
    import Footer from '@/components/Subpage/Footer'
    export default {
        name:"About",
        computed:{
            ...mapGetters('windowSize',['getHeight'])
        },
        components:{
            MyLogo,
            LinkList,
            Footer,
        },
        mounted(){
            setTimeout(() => {
                this.$router.replace({
                    name:'Home'
                })
            },5000)
        }
    }
</script>

<style scoped>
    .errorBody{
        width: 100%;
        background-color: #87CEFA;
        box-sizing: border-box;
        padding: 40vh 2vh;
        text-align: center;
        color: white;
        cursor: default;
        user-select: none;
    }
    .errorBody h1{
        font-size: 5vh;
        margin-bottom: 10vh;
    }
    .errorBody h2{
        font-size: 3.5vh;
    }
</style>