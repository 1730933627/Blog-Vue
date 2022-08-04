<template>
    <transition name="loading">
        <Loading v-if='Loading'/>
        <div v-else>
            <!-- <Particle/> -->
            <Background/>
            <MyLogo/>
            <LinkList/>
            <Sidebar/>
            <Heart/>
            <Topics/>
            <Footer/>
        </div>
    </transition>
    
</template>

<script>
    import {mapGetters} from 'vuex'
    // import Particle from '@/components/Particle'
    import Loading from '@/components/Home/Loading'
    import Background from '@/components/Home/Background'
    import MyLogo from '@/components/MyLogo'
    import LinkList from '@/components/Subpage/LinkList'
    import Sidebar from '@/components/Home/Sidebar'
    import Topics from '@/components/Home/Topics'
    import Heart from '@/components/Home/Heart'
    import Footer from '@/components/Home/Footer'
    export default {
        name:"Home",
        components:{
            // Particle,
            Loading,
            Background,
            MyLogo,
            LinkList,
            Sidebar,
            Topics,
            Heart,
            Footer
        },
        data(){
            return{
                Loading:true,
            }
        },
        computed:{
            ...mapGetters('videoInfo',['isInit'])
        },
        mounted(){
            if(this.isInit){
                setTimeout(() => {
                    this.Loading = false;
                },1500)
            }else{
                this.Loading = false;
            }
        }
    }
</script>

<style>
    .loading-enter-active {
        animation: loading-in 1s ease-in-out both;
    }

    .loading-leave-active {
        animation: loading-in 1s reverse ease-in-out both;
    }

    @keyframes loading-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>