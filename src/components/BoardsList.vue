
<template>
    
    <div class="boards-list">
        <ul v-if="boards">
            <li class="title">
                <strong>Boards</strong>
                <button class="board-adder icon-button inverse">
                    <svg class="icon">
                        <use xlink:href="#icon-plus-square"></use>
                    </svg>
                </button>
            </li>
            <li v-for="board in boards">
                <router-link :to="'/board/'+board.id">{{board.name}}</router-link>
            </li>
        </ul>
    </div>
    
</template>

<script>

    import { mapState, mapActions } from 'vuex';
    
    export default {
        name: 'boards-list',
        computed: {
            ...mapState({
                boards: state => {
                    console.log('got boards', state);
                    return state.boards;
                }
            })
        },
        methods: {}
    }

</script>


<style lang="scss">

    @import '../assets/variables';
    
    .title {
        display: flex;
        padding-right: 1rem;
        .board-adder {
            padding: 0;
            margin: 0;
            border: 0;
            margin-left: auto;
            line-height: 0;
            background-color: transparent;
            .icon {
                height: 1.2rem;
                width: 1.2rem;
            }
        }
    }

</style>