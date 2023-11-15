<script>
    import {h,computed} from 'vue'
    import {useStore} from 'vuex'
    export default {
        name:"Error",
        setup(){
            const windowHeight = computed(() => {
                return useStore().getters['windowSize/getHeight']*0.75+'px';
            })
            return () => h('div', { class: 'error', style: { height: windowHeight.value}, innerHTML: '出现错误,请联系管理员'});
        }
    }
</script>

<style scoped>
    .error{
        font-size: 5vh;
        text-align: center;
        user-select: none;
        color: white;
        font-weight: bold;
        padding: 25vh 0;
        box-sizing: border-box;
    }
</style>