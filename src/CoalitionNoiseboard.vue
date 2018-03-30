
<template>
    <div id="coalition-noiseboard">
        <h1 class="title">Coalition Noiseboard</h1>
    </div>
</template>


<script>

    // import CoalitionMask from './components/CoalitionMask.vue'

    export default {
        name: 'coalition-noiseboard',
        components: {
            // CoalitionMask
        }
    }
</script>


<style lang="scss">

    body {
        background-color: #f6f8fa;
    }

    #coalition-noiseboard {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #33485d;
        margin-top: 60px;

        
        .title {
            .coalition-mask {
                height: 2rem;
            }
        }
    }

</style>
