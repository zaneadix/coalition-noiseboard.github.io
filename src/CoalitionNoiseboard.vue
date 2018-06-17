
<template>
    <div id="coalition-noiseboard">

        <div class="sidebar">
            <div class="brand">
                <svg class="logo">
                    <use xlink:href="#icon-mask"></use>
                </svg>
                <span class="name">Coalition<br>Noiseboard</span>
            </div>
            <BoardsList></BoardsList>
        </div>
        
        <div class="content">
            <div class="container">
                <NoiseInventory></NoiseInventory>
            </div>
        </div>
        
    </div>
</template>


<script>

    import NoiseInventory from './components/NoiseInventory.vue';
    import BoardsList from './components/BoardsList.vue';

    export default {
        name: 'coalition-noiseboard',
        components: {
            NoiseInventory,
            BoardsList
        }
    }

</script>


<style lang="scss">

    @import '~bootstrap/scss/bootstrap.scss';
    @import './assets/variables.scss';

    html {
        // font-size: 14px;
    }

    body {
        background-color: $white;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: $blue;
    }

    .icon {
        height: 1rem;
        width: 1rem;
    }

    .icon-button {
        padding: 0;
        margin: 0;
        border: 0;
        height: 0;

        .icon {
            height: 1.5rem;
            width: 1.5rem;
        }
    }

    #coalition-noiseboard {

        display: flex;
        flex-grow: 1;
        overflow: hidden;
        height: 100vh;

        .sidebar {
            background-color: $blue;
            width: 240px;
            flex-shrink: 0;
            color: $white;

            .brand {
                display: flex;
                padding: 1rem;
                border-bottom: 1px solid $white; 
                margin-bottom: 1rem;
                .logo {
                    height: 3rem;
                    width: 3rem;
                    margin-right: .5rem;
                }

                .name {
                    font-size: 1.3rem;
                    line-height: 1.4rem;
                    margin-top: auto;
                }
            }

            ul {
                list-style: none;
                padding: 0;
                margin: 0;

                li a, .title {
                    padding-left: 1rem;
                }

                li {
                    margin-bottom: .5rem;
                    a {
                        color: $white;
                        padding-left: 1rem;
                        display: inline-block;
                        width: 100%;
                        &:hover {
                            text-decoration: none;
                            background-color: darken($blue, 10%);
                        }
                    }
                }
            }
        }

        .content {
            flex-grow: 1;
            overflow-y: scroll;
        }

        nav {
            background-color: #FFF;
            box-shadow: 0px 2px 4px rgba(0,0,0,.1);
        }
        
        .title {
            .coalition-mask {
                height: 2rem;
            }
        }
    }

</style>
