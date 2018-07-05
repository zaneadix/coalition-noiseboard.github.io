
<template>
    
    <div class="noise-inventory">

        <NoiseAssigner
            :hidden="!selectedNoise"
            v-on:close-modal="clearNoise()"
            :noise="selectedNoise">
        </NoiseAssigner>
        
        <div class="container-fluid">

            <input id="noise-filter"
                   class="form-control"
                   name="noise-filter"
                   type="text"
                   placeholder="Filter Noises">

            <div class="noise-category" v-for="category in noiseCategories">
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
    
    export default {
        name: 'noise-inventory',

        components: {
            NoiseAssigner
        },

        created: function () {
            window.addEventListener('keyup', (event) => {
                console.log(event);
            })  
        },

        data: function () {
            return {
                currentNoise: null,
                selectedNoise: null,
            }
        },

        created: function () {
            window.addEventListener('keyup', this.checkEsc);
        },

        computed: {
            ...mapState({
                noiseCategories: state => {
                    let categories = [];
                    if (state.noises) {
                        categories = Object
                            .getOwnPropertyNames(state.noises)
                            .filter(category => {
                                return category !== '__ob__';
                            });
                    }
                    return categories;
                },
                noises: state =>  {

                    console.log('computing noises');

                    return state.noises;
                }
            })
        },

        methods: {

            checkEsc: function (event) {
                if (event.code === 'Escape') {
                    this.clearNoise();
                }
            },

            clearNoise: function () {
                this.selectedNoise = null;
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

        #noise-filter {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 200px;
            height: 36px;
            padding: .5rem;
            border-radius: 3px;

            &:focus {
                outline: none;
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