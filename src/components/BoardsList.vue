
<template>
    
    <div class="boards-list">
        <ul v-if="boards">
            <li class="title"><strong>Boards</strong></li>
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


<style>
    

</style>