
<template>
    
    <div class="noise-inventory">

        <NoiseAssigner v-if="selectedNoise" :noise="selectedNoise"></NoiseAssigner>
        
        <div class="container">

            <input id="noise-filter"
                   name="noise-filter"
                   type="text"
                   placeholder="Filter Noises">

            <div class="noise-category" v-for="category in noiseCategories">
                <h3 class="category-title">{{ category | title }}</h3>
                <div class="row">
                    <div class="col-3" v-for="noise in noises[category]">
                        <div class="noise-card">
                            <div class="header">
                                <h6 class="name">{{ noise.name | title }}</h6>
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
                    return state.noises;
                }
            })
        },

        methods: {

            selectNoise: function (noise) {
                this.selectedNoise = noise;
            },

            playNoise: function (noise) {

                if (this.currentNoise) {
                    this.currentNoise.stop();
                    delete this.currentNoise;
                }

                this.currentNoise = new Howl({
                    src: [noise.path],
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

    @import '../assets/variables.scss';
    
    .noise-inventory {
        padding-top: 5rem;
        position: relative;

        #noise-filter {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 200px;
            background-color: $blue;
            color: $white;
            border: 0;
            height: 36px;
            padding: .5rem;
            border-radius: 3px;

            &:focus {
                outline: none;
            }
        }

        .noise-category {

            margin-bottom: 1rem;

            .category-title {

                margin-bottom: 1rem;
            }

            .noise-card {
                background-color: #FFF;
                box-shadow: 0px 2px 4px rgba(0,0,0,.1);
                margin-bottom: 1rem;
                border-radius: 3px;
                overflow: hidden;

                .header, .actions,  {
                    padding: .5rem;
                }

                .header {
                    background-color: $blue;
                    color: #FFF;
                    display: flex;

                    .name {
                        margin-bottom: 0;
                    }
                }

                .actions {
                    display: flex;
                    
                    .adder {
                        margin-right: auto;
                    }
                }
            }
        }
    }

</style>