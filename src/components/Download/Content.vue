<template>
    <div class="main-body">
        <div class="title">
            <h2>Download</h2>
        </div>
        <Loading v-if="isLoading" />
        <div class="content" v-else>
            <DownloadList/>
            <transition name="detail">
                <Detail v-if="readDownloadItem.show" :item="readDownloadItem.info" :addSpop="addSpop"/>
            </transition>
            <div class="spop-body">
                <transition-group name="spop">
                    <Spop v-for="(spop,index) in spopList" :key="index" :spop="spop" :deleteSpop="deleteSpop"/>
                </transition-group>
            </div>
        <PageControl/>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {nanoid} from 'nanoid'
    import DownloadList from './DownloadList';
    import Detail from './Detail';
    import PageControl from './PageControl'
    import Spop from '@/components/Subpage/Spop';
    import Loading from '../Subpage/Loading';
    export default {
        name:"Download",
        data(){
            return{
                spopList:[]
            }
        },
        computed:{
            ...mapGetters('videoInfo',['readDownloadItem','isLoading'])
        },
        methods:{
            addSpop(status){
                if(this.spopList.length<6)this.spopList.push({id:nanoid(),'status':status});
            },
            deleteSpop(id){
                this.spopList.splice(this.spopList.findIndex(e => e.id === id), 1);
            }
        },
        components:{
            DownloadList,
            Detail,
            Spop,
            PageControl,
            Loading
        }
    }
</script>

<style scoped>
    .spop-enter-active {
        animation: spopIn ease-in-out 0.5s;
    }
    .spop-leave-active {
        animation: spopIn 0.5s ease-in-out reverse;
    }
    @keyframes spopIn {
        0% {
            transform: translateX(100%);
            opacity: 0;
        }
        85%{
            transform: translateX(-10%);
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }
    .spop-body{
        position: fixed;
        top: 13vh;
        right: 3vh;
        display: flex;
        flex-direction: column;
    }
    .detail-enter-active {
        animation: detailIn ease-in-out 0.5s;
    }
    .detail-leave-active {
        animation: detailIn 0.5s ease-in-out reverse;
    }
    @keyframes detailIn {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        85% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
  @media screen and (orientation: landscape) {
    .main-body .title{
        font-size: 6vh;
    }
    .content{
        min-height: 60vh;
    }
  }
  @media screen and (orientation: portrait) {
    .main-body .title{
        font-size: 3vh;
    }
    .content{
        min-height: 65vh;
    }
  }
    .main-body{
        transition: all 0.5s ease-in-out;
        background-color: #87CEFA;
        padding-top: 12vh;
        width: 100%;
    }
    .main-body .title{
        margin: 0 14.9% 2vh;
        color: white;
        user-select:none;
    }
</style>