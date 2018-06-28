<template>
    
    <div id="noise-assigner" class="modal-container">
        <div class="modal">

            <h3 class="title">
                Assign Noise
            </h3>

            <div class="body">
                
                <div class="setup">

                    <div class="inline-field">
                        <label for="">Rename noise:</label>
                        <input type="text" v-model="noiseName">
                    </div>

                    <div class="inline-field">
                        <label for="">Pick a board:</label>
                        <select v-model="selectedBoard">
                            <option v-for="(board, index) in boards"
                                    v-bind:value="board.id">
                                {{ board.name }}
                            </option>
                        </select>
                    </div>
                    
                </div>

                <Board model="board" v-on:set-to-key="setNoise($event)"></Board>

            </div>
        </div>
    </div>

</template>

<script>
    
    import { mapState, mapActions } from 'vuex';
    import find from 'lodash/find';
    import Board from './Board.vue';
    
    export default {
        name: 'noise-assigner',

        components: {
            Board
        },

        props: ['noise'],

        watch: { 
            noise: function(newVal, oldVal) {
              console.log('Prop changed: ', newVal, ' | was: ', oldVal);
            }
        },

        data: function () {
            return {
                initialized: false,
                selectedBoard: '',
                noiseName: ''
            }
        },

        computed: {
            ...mapState({
                boards: function (state) {
                    if (state.boards.length && !this.initialized) {
                        this.selectedBoard = state.boards[0].id;
                        this.initialized = true;
                    }
                    return state.boards;
                },
                board: function (state) {
                    const id = this.$route.params.id;
                    return find(state.boards, (board) => {
                        return board.id === this.selectedBoard;
                    });
                }
            })
        },

        methods: {
            setNoise: function (key) {
                console.log('SETTING', this.noise.name, 'TO', key)
            }
        }
    }

</script>

<style lang="scss" scoped="true">

    #noise-assigner {
        .modal {
            max-width: 90%;
            width: 90%;
            height: 90%;

            .body {
                .setup {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    margin-bottom: 2rem;

                    label {
                        margin: 0 .5rem 0 0;
                    }
                }
            }
        }
    }
    
</style>