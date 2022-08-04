<template>
    <div class="loading" :style="{height}">
        <span>正在加载数据</span>
        <transition-group name="loading">
            <span v-for="i in count" :key="i" v-text="'.'"></span>
        </transition-group>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name:"Loading",
        data(){
            return{
                count:0
            }
        },
        computed:{
            ...mapGetters('windowSize',['getHeight']),
            height(){
                return this.getHeight*0.7+'px';
            }
        },
        mounted(){
            this.timer = setInterval(() => {
                this.count++;
                if(this.count==4){
                    clearInterval(this.timer);
                }
            }, 250);
        }
    }
</script>

<style scoped>
    .loading-enter-active {
        animation: text ease-in-out 0.5s;
    }
    .loading-leave-active {
        animation: text 0.5s ease-in-out reverse;
    }
    @keyframes text{
        0%{opacity: 0;}
        100%{opacity: 1;}
    }
    .loading{
        padding: 2vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 4vh;
        color: white;
        user-select: none;
        cursor: default;
    }
</style>