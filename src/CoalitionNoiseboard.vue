
<template>
    <div id="coalition-noiseboard">
        
        <nav class="navbar">
            <div class="container">
                <span class="navbar-brand">Coalition Noiseboard</span>
            </div>
        </nav>
        
        <div class="container">
            <svg class="icon">
                <use xlink:href="#icon-music"></use>
            </svg>
            <NoiseInventory></NoiseInventory>
        </div>
        
    </div>
</template>


<script>

    import NoiseInventory from './components/NoiseInventory.vue';

    export default {
        name: 'coalition-noiseboard',
        components: {
            NoiseInventory
        }
    }
</script>


<style lang="scss">

    @import '~bootstrap/scss/bootstrap.scss';

    html {
        font-size: 14px;
    }

    body {
        background-color: #f6f8fa;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #33485d;
    }

    .icon {
        height: 1rem;
        width: 1rem;
    }

    .icon-button {
        padding: 0;
        margin: 0;
        border: 0;
        height: 0;

        .icon {
            height: 1.5rem;
            width: 1.5rem;
        }
    }

    #coalition-noiseboard {

        nav {
            background-color: #FFF;
            box-shadow: 0px 2px 4px rgba(0,0,0,.1);
        }
        
        .title {
            .coalition-mask {
                height: 2rem;
            }
        }
    }

</style>
