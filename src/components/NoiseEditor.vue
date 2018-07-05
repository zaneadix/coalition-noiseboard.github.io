
<template>

    <div>
        {{ character }}
    
        {{ noise.name }}
    </div>

</template>

<script>
    
    export default {

        name: 'noise-editor',

        props: ['noise', 'character'],

        data: function () {
            return {

            }
        },

        computed: {
            // ...mapState({
            //     board: function (state) {
            //         const id = this.$route.params.id;
            //         return find(state.boards, (board) => {
            //             return board.id === id;
            //         });
            //     }
            // })
        },

        methods: {
            // displayNoiseEditor: function (key) {
            //     console.log('display detail for noise at', key);

            //     this.clickedNoises.push(this.board.keys[key]);
            // }
        }
    }

</script>

<style lang="scss" scoped="true">
    
    

</style>