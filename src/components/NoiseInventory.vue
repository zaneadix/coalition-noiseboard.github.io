
<template>
    
    <div class="noise-inventory">

        <NoiseAssigner
            :hidden="!selectedNoise"
            v-on:close-modal="clearNoise()"
            :noise="selectedNoise">
        </NoiseAssigner>
        
        <div class="container-fluid">


            <div id="noise-filter-wrap">
                <input id="noise-filter"
                   class="form-control"
                   name="noise-filter"
                   ref="noiseFilter"
                   type="text"
                   placeholder="Filter Noises"
                   v-model="noiseFilter">
                <button class="clear-filter icon-button" v-on:click="clearNoiseFilter()">
                    <svg class="icon">
                        <use xlink:href="#icon-x-circle"></use>
                    </svg>
                </button>
            </div>

            

            <div class="noise-category" v-for="(val, category) in noises">
                <h2 class="category-title">{{ category | title }}</h2>
                <div class="row">
                    <div class="col-3" v-for="noise in noises[category]">
                        <div class="noise-card">
                            <div class="header">
                                <p class="name h5">{{ noise.name }}</p>
                            </div>
                            <div class="actions">
                                <button class="icon-button adder" v-on:click="selectNoise(noise)">
                                    <svg class="icon">
                                        <use xlink:href="#icon-plus-square"></use>
                                    </svg>
                                </button>
                                <button class="icon-button" v-on:click="playNoise(noise)">
                                    <svg class="icon">
                                        <use xlink:href="#icon-play"></use>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>

</template>

<script>

    import { mapState, mapActions } from 'vuex';
    import { Howl } from 'howler';
    import NoiseAssigner from './NoiseAssigner.vue';
    import filter from 'lodash/filter';
    import map from 'lodash/map';
    
    export default {
        name: 'noise-inventory',

        components: {
            NoiseAssigner
        },

        data: function () {
            return {
                currentNoise: null,
                selectedNoise: null,
                noiseFilter: ''
            }
        },

        created: function () {
            window.addEventListener('keyup', this.checkEsc);
        },

        computed: {
            ...mapState({

                noises: function (state) {

                    if (this.noiseFilter && state.noises) {

                        let filteredNoises = {};
                    
                        map(Object.getOwnPropertyNames(state.noises), category => {

                            if (category === '__ob__') return;

                            const noises = this.filterNoises(state.noises[category]);
                            
                            if (noises.length) {
                                filteredNoises[category] = noises;
                            }
                        })

                        return filteredNoises;
                    }

                    return state.noises;
                }
            }),
        },

        methods: {

            checkEsc: function (event) {
                if (event.code === 'Escape') {
                    const noiseFilter = this.$refs.noiseFilter;
                    if (document.activeElement === noiseFilter) {
                        this.clearNoiseFilter();
                        this.$refs.noiseFilter.blur();
                    }
                }
            },

            clearNoise: function () {
                this.selectedNoise = null;
            },

            clearNoiseFilter: function () {
                this.noiseFilter = '';
            },

            filterNoises: function (noises) {
                if (this.noiseFilter) {
                    const regExp = new RegExp(this.noiseFilter, 'i');
                    return filter(noises, noise => noise.name.match(regExp))
                }
                return noises;
            },

            selectNoise: function (noise) {
                this.selectedNoise = noise;
            },

            playNoise: function (noise) {

                if (this.currentNoise) {
                    this.currentNoise.stop();
                    delete this.currentNoise;
                }

                this.currentNoise = new Howl({
                    src: [noise.source],
                    autoplay: true,
                    volume: 0.5,
                    onend: function () {
                        this.currentNoise = null;
                        delete this.currentNoise;
                    }
                });
            }
        }
    }

</script>


<style lang="scss" scoped="true">

    @import '../styles/variables.scss';
    
    .noise-inventory {
        padding-top: 5rem;
        position: relative;

        #noise-filter-wrap {
            position: fixed;
            top: 0;
            right: 0;
            padding: 1rem;
            background-color: rgba(#FFF, .5);
            width: 240px;
            z-index: 100;
            border-bottom-left-radius: 3px;


            &:focus {
                outline: none;
            }

            #noise-filter {
                padding-right: 2rem;
            }

            .clear-filter {
                position: absolute;
                top: 1.6rem;
                right: 1.5rem;
            }
        }

        .noise-category {

            margin-bottom: 2rem;

            .category-title {
                text-align: center;
                margin-bottom: 1.5rem;
            }

            .noise-card {
                background-color: #FFF;
                box-shadow: $standard-shadow;
                margin-bottom: 2rem;
                border-radius: 3px;
                overflow: hidden;
                border: 1px solid $shadow;

                .header, .actions,  {
                    padding: .5rem;
                }

                .header {
                    // background-color: $blue;
                    // color: #FFF;
                    display: flex;

                    .name {
                        margin-bottom: 0;
                        font-weight: 600;
                    }
                }

                .actions {
                    display: flex;

                    svg {
                        height: 1.5rem;
                        width: 1.5rem;
                    }
                    
                    .adder {
                        margin-right: auto;
                    }
                }
            }
        }
    }

</style>