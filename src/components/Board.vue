
<template>
    
    <div class="board">
        <div class="header">
            <h1 class="name">{{ board.name }}</h1>
        </div>
    </div>
    
</template>

<script>

    import { mapState, mapActions } from 'vuex';
    import { routerLink } from 'vue-router';
    import find from 'lodash/find';
    
    export default {
        name: 'boards-list',
        computed: {
            ...mapState({
                board: function (state) {
                    console.log(this.$route.params);

                    const id = this.$route.params.id;

                    return find(state.boards, (board) => {
                        return board.id === id;
                    });
                }
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


<style lang="scss">

    .header {
        height: 5rem;
        display: flex;
        justify-content: center;

        .name {
            text-align: center;
            margin-bottom: 0;
            margin-top: auto;
            font-size: 2rem;
            line-height: 2rem;

        }
    }

</style>