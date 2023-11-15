<template>
    <div class="bmenu">
        <ul class="menu">
            <div class="button" @click="change('All')"><li>All</li></div>
            <div class="button" @click="change('Video')"><li>Video</li></div>
            <div class="button" @click="change('Article')"><li>Article</li></div>
            <div class="button" @click="change('Clothes')"><li>Clothes</li></div>
        </ul>
    </div>
</template>

<script>
    import {mapGetters,mapMutations} from 'vuex'
    export default {
        name:"NewsSort",
        computed:{
            ...mapGetters('videoInfo',['readInfoListOfType'])
        },
        methods:{
            ...mapMutations('videoInfo',['changeType','changeNewsPageEnd']),
            change(value){
                this.changeType(value);
                this.changeNewsPageEnd(this.readInfoListOfType.length);
            }
        }
    }
</script>

<style scoped>
  @media screen and (orientation: landscape) {
    .bmenu{
        width:67.5vw;
    }
    .button{
        min-width: 4.5vh;
        margin: 1vh 0 0 1.5vw;
        padding: 0.5vh 0.5vw;
    }
  }
  @media screen and (orientation: portrait) {
    .bmenu{
        width:77.5vw;
    }
    .button{
        min-width: 5vh;
        margin: 1vh 0 0 1.5vw;
        padding: 0.5vh 1vw;
    }
  }
    .bmenu{
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        flex-wrap: wrap;
    }
    .bmenu > ul{
        list-style-type:none;
    }
    .menu{
        margin-left: auto;
    }
    .button{
        display: inline-block;
        text-align: center;
        color: aliceblue;
        background: linear-gradient(225deg, transparent 1vh, #363636 0);
        font-size: 2vh;
        transform:translate(0px,0px);
        transition:transform 0.2s ease-in-out;
        user-select: none;
    }
    .button:hover{
        transform:translate(0px,-5px);
        transition:transform 0.25s ease-in-out;
    }
    .button > li{
        cursor: pointer;
    }
</style>