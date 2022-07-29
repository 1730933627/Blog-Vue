<template>
    <div @click="setStatus" class="xin_body">
        <transition name="heard">
            <img v-if="isShow" key="on" class="xin" src="images/icon/xin-active.png"/>
            <img v-else  key="off" class="xin" src="images/icon/xin.png"/>
        </transition>
    </div>
</template>

<script>
    import {mapActions,mapGetters} from 'vuex'
    export default {
        name:"Heart",
        data(){
            return{
                isShow:false
            }
        },
        computed:{
            ...mapGetters('heardStatus',['getStatus'])
        },
        methods:{
            ...mapActions('videoInfo',["getInfoList"]),
            setStatus(){
                this.$store.commit('heardStatus/CHANGESTATUS',!this.isShow);
                this.isShow = !this.isShow;
                this.getInfoList(this.getStatus);
            },
        },
        mounted(){
            this.isShow = this.getStatus;
        }
    }
</script>

<style scoped>
@media screen and (orientation: landscape) {
    .xin_body{
        top: 60vh;
    }
}
@media screen and (orientation: portrait) {
    .xin_body{
        top: 40vh;
    }
}
    .heard-enter-active, .heard-leave-active {
        transition: opacity .5s ease-in-out
    }

    .heard-enter-from, .heard-leave-to {
        opacity: 0
    }
    .xin_body{
        text-align: center;
        position: fixed;
        left: 0;
        border-top: 5.5vh solid #00BFFF;
        border-right: 2.5vh solid transparent;
        /* height: 0px; */
        width: 4.5vh;
        cursor: pointer;
        transition: top 0.5s ease-in-out;
        user-select: none;
    }
    .xin{
        transform: scale(1);
        transition: transform 0.3s ease-in-out;
        position:absolute;
        left: 0.5vh;
        top: -5.1vh;
        padding: 0.1vh;
        height: 4.5vh;
        /* width: 2.5vw; */
    }
    .xin:hover{
        transform:scale(0.9);
        transition:transform 0.3s ease-in-out;
    }
</style>