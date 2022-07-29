<template>
    <footer class="footer">
        <div>
            <p><a href="https://beian.miit.gov.cn"><span>陇ICP备20002446号</span></a></p>
        </div>
        <div>
            <p><span>@稽智の琰凛</span><router-link to="/about"><span>YanLin Inc</span></router-link></p>
        </div>
    </footer>
</template>

<script>
    export default {
        name:"Footer"
    }
</script>

<style scoped>
    .footer{
        position: absolute;
        bottom:0;
        left:0;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .footer p{
        display: block;
        font-size: 1.5vh;
        color:rgb(102, 102, 102);
        margin: 0.5vh;
        cursor: default;
    }
    .footer a{
        text-decoration: none;
        transition:color 0.2s ease-in-out;
        color:#00BFFF;
    }
    .footer a:hover{
        transition:color 0.2s ease-in-out;
        color:#1E90FF;
    }
    .footer span{
        padding: 0 .5vw;
        user-select: none;
    }
</style>