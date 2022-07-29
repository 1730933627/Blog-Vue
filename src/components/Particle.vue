<template>
    <div id="particles-js"></div>
</template>

<script>
    import 'particles.js/particles'
    const particlesJS = window.particlesJS;
    particlesJS.load('particles-js', '@/assets/config/particlesjs-config.json', ()=>{
        // console.log('callback - particles.js config loaded');
    });
    export default {
        name:'Particle'
    }
</script>

<style>
    #particles-js{
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
    }
</style>