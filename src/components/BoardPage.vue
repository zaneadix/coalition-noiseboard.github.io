
<template>
    <div id="board-page" class="container-fluid">
        <div class="page-wrapper" v-if="board">

            <div class="modal-container delete-modal" v-if="showDelete">
                <div class="modal">
                    <h3 class="title">
                        Delete "{{ board.name }}"?
                    </h3>
                    <div class="body">
                        <h6>Are you sure as fuck?</h6>
                        <div class="inline-group">
                            <button
                                class="btn btn-primary"
                                v-on:click="deleteThisBoard()">
                                Yeah, do it
                            </button>
                            <button
                                class="btn btn-secondary"
                                v-on:click="showDelete=false">
                                Don't do it
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="header">
                <div class="edit-wrapper">
                    <h1 class="name">{{ board.name }}</h1>
                    <div class="actions">
                        <button class="icon-button">
                            <svg class="icon">
                                <use xlink:href="#icon-edit"></use>
                            </svg>
                        </button>
                        <button class="icon-button" v-on:click="showDelete=true">
                            <svg class="icon">
                                <use xlink:href="#icon-trash"></use>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <Board
                :model="board"
                v-on:noise-clicked="displayNoiseEditor($event)"
                interactive="true">
            </Board>
            
            <div class="noise-editor-container" v-if="selected">
                
                <NoiseEditor
                    :noise="selected.noise"
                    :character="selected.key"
                    v-on:save-settings="saveSettings($event)">
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
    import { Howler } from 'howler';
    import Board from './Board.vue';
    import NoiseEditor from './NoiseEditor.vue';
    import { STOP_ALL_NOISES } from '../const';

    /*
        global mute
        global volume

     */
    
    export default {

        name: 'board-page',

        components: {
            Board,
            NoiseEditor
        },

        data: function () {
            return {
                selected: null,
                showDelete: false
            }
        },
        
        beforeRouteUpdate: function (to, from, next) {
            document.dispatchEvent(new Event(STOP_ALL_NOISES));
            next();
        },

        computed: {
            ...mapState({
                board: function (state) {
                    const id = this.$route.params.id;
                    const board = find(state.boards, (board) => {
                        return board.id === id;
                    });
                    if (board) {
                        document.title = board.name;
                    }
                    return board;
                }
            })
        },

        methods: {

            ...mapActions([
                'saveBoardNoiseDefaults',
                'deleteBoard'
            ]),

            displayNoiseEditor: function (key) {
                this.selected = {
                    key,
                    noise: this.board.keys[key]
                };
            },

            saveSettings: function (key) {
                this.saveBoardNoiseDefaults({ boardId: this.board.id, key })
            },

            deleteThisBoard: function () {
                this.deleteBoard(this.board.id)
                    .then(function (response) {
                        console.log(response);
                    })
            }
        }
    }

</script>


<style lang="scss" scoped="true">

    @import '../styles/variables';

    #board-page {

        .page-wrapper {

            display: flex;
            flex-direction: column;
            min-height: 100vh;

            .header {
                height: 4rem;
                display: flex;
                justify-content: center;
                margin-bottom: 40px;

                .edit-wrapper {
                    position: relative;
                    margin-top: auto;
                    .actions {
                        position: absolute;
                        top: 0;
                        left: 100%;
                        display: flex;
                        // padding-left: 1rem;

                        button {
                            display: inline-block;
                            margin-left: 1rem;
                        }
                    }
                }

                h1 {
                    // text-align: center;
                    margin-bottom: 0;
                    font-size: 2rem;
                    line-height: 2rem;
                }
            }

            .noise-editor-container {
                margin-top: auto;
                background-color: #fff;
            }
        }

        .delete-modal {
            .body {
                flex-direction: column;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }

    

</style>