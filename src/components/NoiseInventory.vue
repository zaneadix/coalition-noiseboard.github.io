
<template>
    
    <div class="noise-inventory">
        
        <div class="container">

            <input id="noise-filter"
                   name="noise-filter"
                   type="text"
                   placeholder="Filter Noises">

            <div class="noise-category" v-for="category in noiseCategories">
                <h3>{{ category }}</h3>
                <div class="row">
                    <div class="col-3" v-for="noise in noises[category]">
                        <div class="noise-card">
                            <div class="header">
                                <h6 class="name">{{ noise.name }}</h6>
                            </div>
                            <div class="actions">
                                <button class="icon-button adder">
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
    
    export default {
        name: 'noise-inventory',
        created: function () {
            window.addEventListener('keyup', (event) => {
                console.log(event);
            })  
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
            playNoise: function (noise) {
                var sound = new Howl({
                    src: [noise.path],
                    autoplay: true,
                    volume: 0.5,
                    onend: function() {
                        console.log('Finished!');
                    }
                });
            }
        }
    }

</script>


<style lang="scss">

    @import '../assets/variables.scss';
    
    .noise-inventory {
        padding-top: 2rem;
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

</style>