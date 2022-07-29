<template>
    <transition name="loading">
        <Loading v-if='isLoading'/>
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
    // import Particle from '@/components/Particle'
    import Loading from '@/components/Home/Loading'
    import Background from '@/components/Home/Background'
    import MyLogo from '@/components/MyLogo'
    import LinkList from '@/components/Home/LinkList'
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
                isLoading:true,
            }
        },
        mounted(){
            setTimeout(() => {
                this.isLoading = !this.isLoading;
            },1000)
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