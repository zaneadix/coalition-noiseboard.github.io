
<template>

    <div class="noise-editor container-fluid">
        <div class="row">
            <div class="col">
                {{ character }}
            </div>
            <div class="col">
                {{ noise.name }}
            </div>
            <div class="col">
                <form>

                    <div class="form-check">
                        <input
                            name="loop-setting"
                            type="checkbox"
                            class="form-check-input"
                            v-model="noise.loop">
                        <label
                            for="loop-setting"
                            class="form-check-label">
                            Loop
                        </label>
                    </div>

                    <div class="form-check">
                        <input
                            name="solo-setting"
                            type="checkbox"
                            class="form-check-input"
                            v-model="noise.solo">
                        <label
                            for="solo-setting"
                            class="form-check-label">
                            Solo
                        </label>
                    </div>

                    <div class="form-check">
                        <input
                            name="global-stop-setting"
                            type="checkbox"
                            class="form-check-input"
                            v-model="noise.globalStop">
                        <label
                            for="global-stop-setting"
                            class="form-check-label">
                            Global Stop
                        </label>
                    </div>

                </form>
            </div>
        </div>
    </div>

</template>

<script>

    /*
        adjust volume
        mute
        loop
        adjust speed?
        stop on any new sound
        solo
        reset on replay
     */
    
    export default {

        name: 'noise-editor',

        props: ['noise', 'character'],

        data: function () {
            return {
                settingsInitialized: false,
                noiseSettings: null,
            }
        },

        watch: {
            noise: function (newValue, oldValue) {
                if (this.settingsInitialized) {
                    this.noiseSettings
                }
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

    @import '../styles/variables';
    
    .noise-editor {
        width: 80%;
        margin: auto auto 1rem;
        height: 240px;
        box-shadow: $standard-shadow;
        border: 1px solid $shadow;
    }

</style>