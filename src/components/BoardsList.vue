
<template>
    
    <div class="boards-list">
        <ul>
            <li class="title"><strong>Boards</strong></li>
            <li>
                <router-link to="/?board=scotch_on_the_rocks">Scotch on the Rocks</router-link>
            </li>
            <li>
                <router-link to="/?board=wild_frontier">Wild Frontier</router-link>
            </li>
        </ul>
    </div>
    
</template>

<script>

    import { mapState, mapActions } from 'vuex';
    import { routerLink } from 'vue-router';
    
    export default {
        name: 'boards-list',
        props: ['data'],
        compouted: {
            ...mapState({
                // noiseCategories: state => {
                //     return Object.getOwnPropertyNames(state.noises);
                // },
                // noises: state =>  {
                //     return state.noises;
                // }
            })
        },
        methods: {
            // playNoise: function (noise) {
            //     var sound = new Howl({
            //         src: [noise.path],
            //         autoplay: true,
            //         volume: 1,
            //     });
            // }
        }
    }

</script>


<style>
    

</style>