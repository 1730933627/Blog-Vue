<template>
    <div class="spop">
        <span>{{msg}}</span>
    </div>
</template>

<script>
    export default {
        name:"Spop",
        props:['spop','deleteSpop'],
        computed:{
            msg(){
                return this.spop.status?"复制成功":"复制失败";
            }
        },
        mounted(){
            setTimeout(() => {
                this.deleteSpop(this.spop.id);
            },2000)
        }
    }
</script>

<style scoped>
    .spop{
        width: 8vh;
        height: 2.5vh;
        padding: 2vh 3vh;
        background-color: white;
        display: flex;
        align-items: center;
        border-radius: 1vh;
        cursor: pointer;
        margin-bottom: 2vh;
    }
    .spop > span{
        font-size: 1.75vh;
        user-select: none;
    }
</style>