<template>
    <div>
        <MyLogo/>
        <LinkList/>
        <div class="background" :style="`min-height: ${windowHeight}px;`">
            <div class="content" v-show="isShow">
                <div style="position: relative;"><div class="title">{{ title }}</div><div class="date">{{ date }}</div></div>
                <div v-html="content"></div>
            </div>
        </div>
        <Footer/>
        <ToTop/>
    </div>
</template>

<script setup>
    import { computed, toRefs, defineProps, onBeforeMount,ref } from 'vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    import MyLogo from '@/components/MyLogo'
    import LinkList from '@/components/Subpage/LinkList'
    import Footer from '@/components/Subpage/Footer'
    import ToTop from '@/components/Subpage/ToTop'

    const router = useRouter()
    const store = useStore()
    const props = defineProps({id:String})

    const {id} =toRefs(props)
    const windowHeight = computed(() => store.getters["windowSize/getHeight"])
    const title = ref("")
    const date = ref("")
    const content = ref("")
    const isShow = ref(false)
    onBeforeMount(()=>{
        axios.get(process.env.VUE_APP_URL+'getarticle', {params: {id: id.value}}).then(
                response => {
                    if(response.data.status===200&&response.data.data.length!==0){
                        const datas = response.data.data[0];
                        date.value = datas.date;
                        content.value = datas.content;
                        title.value = datas.title;
                        console.log();
                        document.title = datas.title + " |" + document.title.split("|")[1];
                        isShow.value = true;
                    }else{
                        router.replace("/404")
                    }
                },
                error=>{
                    console.log(error);
            })
    })

</script>

<style scoped>
    .background{
        background-color: #87CEFA;
        padding-top: 12.5vh;
    }
    .content{
        background-color: white;
        margin: 0 auto;
        width: 80%;
        display: flex;
        flex-direction: column;
        padding: 2vh;
        box-shadow:  0 0 2vh #30b0ff;
        border-radius: .25vh;
    }
    .content *{
        user-select: none;
        color: #333;
        font-size: 2vh;
    }
    .title{
        width: 100%;
        font-size: 6vh;
        font-weight: bolder;
        line-height: 100%;
        text-align: center;
        border-bottom: 2px solid #333;
        padding: 1vh 0 2vh;
    }
    .date{
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 2vh;
    }
    .content >>> h1,.content >>> h2,.content >>> h3,.content >>> h4,.content >>> h5{
        color: #444;
        padding: 1vh 0 .5vh;
    }
    .content >>> p{
        color: #444;
        line-height: 200%;
    }
    .content >>> span{
        color: rgb(255, 17, 108);
        line-height: 200%;
    }
    .content >>> a{
        color: #6f00ff;
        padding: 0 .5vh;
        cursor: pointer;
    }
    .content >>> img{
        width: 40vw;
    }
    .content >>> ol,.content >>> ul{
        display: flex;
        flex-direction: column;
        align-items: baseline;
        padding-left: 2em;
        border-left: 1px solid black;
    }
    .content >>> li{
        line-height: 110%;
        padding: .5vh 0;
    }
    .content >>> code{
      display: inline-block;
      background: #e0f3ff;
      padding: 2vh;
      border-radius: .5vh;
      user-select: text;
      font-weight: bold;
    }
</style>