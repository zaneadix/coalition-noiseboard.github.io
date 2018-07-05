
<template>
    <div class="container-fluid">
        <div v-if="board">
            <div class="header">
                <h1 class="name">{{ board.name }}</h1>
            </div>
            <Board
                :model="board"
                v-on:noise-clicked="displayNoiseEditor($event)"
                interactive="true">
            </Board>
            
            <div class="row noise-editors">
                
                <NoiseEditor
                    v-for="clicked in clickedNoises"
                    :noise="clicked.noise"
                    :character="clicked.key">
                </NoiseEditor>

            </div>

        </div>
        <div v-else class="header">
            <h1>Nope.</h1>
        </div>
    </div>
</template>

<script>

    import { mapState, mapActions } from 'vuex';
    import { routerLink } from 'vue-router';
    import find from 'lodash/find';
    import { Howl } from 'howler';
    import Board from './Board.vue';
    import NoiseEditor from './NoiseEditor.vue';
    
    export default {

        name: 'board-page',

        components: {
            Board,
            NoiseEditor
        },

        data: function () {
            return {
                clickedNoises: []
            }
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
            displayNoiseEditor: function (key) {
                console.log('display detail for noise at', key);

                this.clickedNoises.push({
                    key,
                    noise: this.board.keys[key]
                });
            }
        }
    }

</script>


<style lang="scss" scoped="true">

    @import '../styles/variables';

    .header {
        height: 5rem;
        display: flex;
        justify-content: center;
        margin-bottom: 40px;

        h1 {
            text-align: center;
            margin-bottom: 0;
            margin-top: auto;
            font-size: 2rem;
            line-height: 2rem;
    
        }
    }

</style>