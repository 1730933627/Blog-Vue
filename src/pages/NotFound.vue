<template>
    <MyLogo/>
    <LinkList/>
    <div class="errorBody" :style="'height:'+getHeight+'px'">
        <h1>非常抱歉,你要找的页面不见喏...</h1>
        <h2 v-text="text"></h2>
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
        data(){
          return{
            text:"5秒后将跳回主页"
          }
        },
        computed:{
            ...mapGetters('windowSize',['getHeight'])
        },
        components:{
            MyLogo,
            LinkList,
            Footer,
        },
        mounted(){
            if(this.$route.meta.beforePath!=="/"){
              this.text = "3秒之后返回";
              setTimeout(() => {
                this.$router.back()
              },3000)
            }else{
              this.text = "5秒后将跳回主页";
              setTimeout(() => {
                this.$router.replace({name:'Home'})
              },5000)
            }
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