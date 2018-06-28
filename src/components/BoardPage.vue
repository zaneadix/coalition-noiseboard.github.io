
<template>
    
    <div v-if="board">
        <div class="header">
            <h1 class="name">{{ board.name }}</h1>
        </div>
        <Board model="board" interactive="true"></Board>
    </div>
    
    
</template>

<script>

    import { mapState, mapActions } from 'vuex';
    import { routerLink } from 'vue-router';
    import find from 'lodash/find';
    import { Howl } from 'howler';
    import Board from './Board.vue';
    
    export default {

        name: 'board-page',

        components: {
            Board
        },

        computed: {
            ...mapState({
                board: function (state) {
                    const id = this.$route.params.id;
                    return find(state.boards, (board) => {
                        return board.id === id;
                    });
                }

            })
        },

        methods: {

        }
    }

</script>


<style lang="scss" scoped="true">

    @import '../assets/variables';

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