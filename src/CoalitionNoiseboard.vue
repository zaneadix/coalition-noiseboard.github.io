
<template>
    <div id="coalition-noiseboard">

        <div class="sidebar">
            <div class="brand">
                <svg class="logo">
                    <use xlink:href="#icon-mask"></use>
                </svg>
                <span class="name">Coalition<br>Noiseboard</span>
            </div>

            <ul>
                <li>
                    <router-link :to="'/'">Noises</router-link>
                </li>
            </ul>
            <BoardsList></BoardsList>
        </div>
        
        <div class="content">
            <router-view></router-view>
        </div>
        
    </div>
</template>


<script>

    import NoiseInventory from './components/NoiseInventory.vue';
    import BoardsList from './components/BoardsList.vue';

    export default {
        name: 'coalition-noiseboard',
        components: {
            NoiseInventory,
            BoardsList
        }
    }

</script>


<style lang="scss">

    @import '~bootstrap/scss/bootstrap.scss';
    @import './assets/global.scss';

</style>
