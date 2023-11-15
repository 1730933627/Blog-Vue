<template>
    <div :class="logoStyle" :style=logoAnime>
        <router-link to="/"><img src="images/icon/logo.png" ondragstart="return false" alt="logo"/></router-link>
    </div>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex'
    export default {
        name:"MyLogo",
        computed:{
            ...mapGetters('windowSize',['getLogoStatus']),
            logoStyle(){
                if(this.$route.fullPath === '/'){
                    return "logo-h";
                }else return "logo";
            },
            logoAnime(){
              if(this.$route.fullPath === '/'){
                this.homeLogo()
                return "animation:logoInH .3s ease-out"
              }else{
                this.elseHome()
                if(this.getLogoStatus<=1)return "animation:logoIn .3s ease-out"
                else return "";
              }
            }
        },
      methods:{
          ...mapActions('windowSize',['homeLogo','elseHome'])
      }
    }
</script>

<style>
@keyframes logoInH {
  0%{transform: scale(.85)}
  75%{transform: scale(1.025)}
  100%{transform: scale(1)}
}
@keyframes logoIn {
  0%{transform: translateX(-1vw)}
  100%{transform: translateX(0)}
}

/* Home */
@media screen and (orientation: landscape) {
    .logo-h{
        position: fixed;
        top:10%;
        left:7%;
        width: 25%;
    }
    .logo-h img{
        width: 100%;
        transform:translate(0px,0px);
        user-select: none;
        transition:transform 0.2s ease-in-out;
    }
    .logo-h img:hover{
        transform:translate(0px,-5px);
        transition:transform 0.2s ease-in-out;
    }
}
@media screen and (orientation: portrait) {    
    .logo-h{
        width: 40%;
        display: block;
        position: fixed;
        top: 2%;
        right: 3%;
    }
    .logo-h img{
        display: block;
        width: 100%;
        transform:translate(0px,0px);
        user-select: none;
        transition:transform 0.2s ease-in-out;
    }
    .logo-h img:hover{
        transform:translate(-5px,0px);
        transition:transform 0.2s ease-in-out;
    }
}
/* Else */
@media screen and (orientation: landscape) {
    .logo{
        left: 0;
        width:18vh;
        margin-left: 1.5vh;
        margin-top: 1.5vh;
    }
    .logo img{
        width: 100%;
        user-select: none;
    }
    .logo:hover{
        transition:transform 0.2s ease-in-out;
        transform: scale(1.05);
    }
}
@media screen and (orientation: portrait) {
    .logo{
        left: 0;
        width:20vh;
        margin-left: 1vh;
        margin-top: 1vh;
    }
}
    .logo{
        z-index: 100;
        position:fixed;
        top: 0;
        transition:transform 0.2s ease-in-out;
        transform: scale(1);
    }
    .logo img{
        width: 100%;
        user-select: none;
    }
    .logo:hover{
        transition:transform 0.2s ease-in-out;
        transform: scale(1.05);
    }
</style>