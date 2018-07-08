
<template>
    <div id="board-page" class="container-fluid">
        <div class="page-wrapper" v-if="board">
            <div class="header">
                <h1 class="name">{{ board.name }}</h1>
            </div>
            <Board
                :model="board"
                v-on:noise-clicked="displayNoiseEditor($event)"
                interactive="true">
            </Board>
            
            <div class="noise-editor-container" v-if="selected">
                
                <NoiseEditor
                    :noise="selected.noise"
                    :character="selected.key">
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
                selected: null
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

            displayNoiseEditor: function (key) {
                this.selected = {
                    key,
                    noise: this.board.keys[key]
                };
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

                h1 {
                    text-align: center;
                    margin-bottom: 0;
                    margin-top: auto;
                    font-size: 2rem;
                    line-height: 2rem;
            
                }
            }

            .noise-editor-container {
                margin-top: auto;
                background-color: #fff;
            }
        }
    }

    

</style>