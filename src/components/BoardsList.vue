
<template>
    
    <div class="boards-list">
        <ul v-if="boards">
            <li class="title">
                <strong>Boards</strong>
                <button class="board-adder icon-button"
                    v-on:click="initNewBoard()">
                    <svg class="icon">
                        <use xlink:href="#icon-plus-square"></use>
                    </svg>
                </button>
            </li>
            <li class="name-field-wrapper"
                :hidden="!editNameField">
                <input
                    class="new-name-field form-control"
                    ref="nameField"
                    placeholder="Name your new board"
                    v-model="nameFieldValue"
                    :autoFocus="editNameField"
                    @focus="nameFieldHasFocus = true"
                    @blur="nameFieldHasFocus = false"
                    type="text">
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

        created: function () {
            window.addEventListener('keyup', this.checkPress);
        },

        data: function () {
            return {
                nameFieldValue: '',
                editNameField: false,
                nameFieldHasFocus: false
            }
        },

        computed: {
            ...mapState({
                boards: state => {
                    return state.boards;
                }
            })
        },

        methods: {

            ...mapActions(['createBoard']),

            checkPress: function (event) {

                if (this.nameFieldHasFocus && event.key === 'Enter') {
                    this.createBoard(this.nameFieldValue);
                    this.clearNameField();
                }

                if (this.nameFieldHasFocus && event.key === 'Escape') {
                    this.clearNameField();
                }
            },

            clearNameField: function (event) {
                this.nameFieldValue = '';
                this.editNameField = false;
            },

            initNewBoard: function () {
                this.nameFieldValue = '';
                this.editNameField = true;
            }
        }
    }

</script>


<style lang="scss" scoped="true">

    @import '../styles/variables';

    .boards-list {
        overflow: hidden;
    }
    
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
    
    .name-field-wrapper {
        padding-right: 1rem;
        padding-left: 1rem;
        .new-name-field {
            width: 100%;
        }
    }

</style>