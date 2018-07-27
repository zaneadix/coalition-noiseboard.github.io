<template>
    
    <div id="noise-assigner"
         class="modal-container">

        <div class="modal">

            <button
                class="icon-button close"
                v-on:click="$emit('close-modal')">
                <svg class="icon">
                    <use xlink:href="#icon-create"></use>
                </svg>
            </button>

            <h3 class="title">
                Assign Noise
            </h3>

            <div class="body container-fluid">
                
                <div class="setup">

                    <div class="inline-field">
                        <label for="">Name it:</label>
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

                <Board
                    :model="board"
                    v-on:assign-noise="assignNoise($event)"
                    v-on:unassign-noise="unassignNoise($event)">
                </Board>

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
                if (newVal) {
                    this.noiseName = `${newVal.name}`;
                }
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
                }
            }),

            board: function () {
                return find(this.boards, (board) => {
                    return board.id === this.selectedBoard;
                });
            }
        },

        methods: {

            ...mapActions([
                'assignNoiseToBoard',
                'unassignNoiseFromBoard'
            ]),

            unassignNoise: function (key) {
                this.unassignNoiseFromBoard({
                    boardId: this.selectedBoard,
                    key
                });
            },

            assignNoise: function (key) {
                this.assignNoiseToBoard({
                    boardId: this.selectedBoard,
                    key,
                    name: this.noiseName,
                    source: this.noise.source
                });
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
            position: relative;

            .close {
                transform: rotate(45deg);
                transform-origin: center;
                position: absolute;
                top: 1rem;
                right: 1rem;

                svg {
                    height: 2rem;
                    width: 2rem;
                }
            }

            .body {
                display: block;
                
                .setup {
                    margin-bottom: 2rem;

                    label {
                        margin: 0 .5rem 0 0;
                    }
                }
            }
        }
    }
    
</style>