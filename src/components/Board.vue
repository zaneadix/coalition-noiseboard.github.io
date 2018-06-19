
<template>
    
    <div class="board">
        <h1>{{ 'BOARD NAME' }}</h1>
    </div>
    
</template>

<script>

    import { mapState, mapActions } from 'vuex';
    import { routerLink } from 'vue-router';
    
    export default {
        name: 'boards-list',
        props: ['data'],
        computed: {
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