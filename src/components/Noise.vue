
<template>
    
    <div class="noise-inventory">
        <div class="noise-category" v-for="category in noiseCategories">
            <h1>{{ category }}</h1>
        </div>
    </div>
    
</template>

<script>

    import { mapState, mapActions } from 'vuex';
    
    export default {
        name: 'noise'
        props: ['data'],
        computed: {
            ...mapState({
                noiseCategories: state => {
                    return Object.getOwnPropertyNames(state.noises);
                },
                noises: state =>  {
                    return state.noises;
                }
            })
        },
        methods: {
            playNoise: function (noise) {
                var sound = new Howl({
                    src: [noise.path],
                    autoplay: true,
                    volume: 1,
                });
            }
        }
    }

</script>


<style>
    

</style>