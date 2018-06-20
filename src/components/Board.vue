
<template>
    
    <div class="board">
        <div v-if="board">
            <div class="header">
                <h1 class="name">{{ board.name }}</h1>
            </div>
            <div class="body container">
                <div class="keys">
                    <div class="key-row">
                        <div class="key key-0"></div>
                        <div class="key key-1"></div>
                        <div class="key key-2"></div>
                        <div class="key key-3"></div>
                        <div class="key key-4"></div>
                        <div class="key key-5"></div>
                        <div class="key key-6"></div>
                        <div class="key key-7"></div>
                        <div class="key key-8"></div>
                        <div class="key key-9"></div>
                    </div>
                    <div class="key-row">
                        <div class="key key-q"></div>
                        <div class="key key-w"></div>
                        <div class="key key-e"></div>
                        <div class="key key-r"></div>
                        <div class="key key-t"></div>
                        <div class="key key-y"></div>
                        <div class="key key-u"></div>
                        <div class="key key-i"></div>
                        <div class="key key-o"></div>
                        <div class="key key-p"></div>
                    </div>
                    <div class="key-row">
                        <div class="key key-a"></div>
                        <div class="key key-s"></div>
                        <div class="key key-d"></div>
                        <div class="key key-f"></div>
                        <div class="key key-g"></div>
                        <div class="key key-h"></div>
                        <div class="key key-j"></div>
                        <div class="key key-k"></div>
                        <div class="key key-l"></div>
                    </div>
                    <div class="key-row">
                        <div class="key key-z"></div>
                        <div class="key key-x"></div>
                        <div class="key key-c"></div>
                        <div class="key key-v"></div>
                        <div class="key key-b"></div>
                        <div class="key key-n"></div>
                        <div class="key key-m"></div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    
</template>

<script>

    import { mapState, mapActions } from 'vuex';
    import { routerLink } from 'vue-router';
    import find from 'lodash/find';
    import { Howl } from 'howler';
    
    export default {
        name: 'boards-list',
        created: function () {
            window.addEventListener('keyup', this.checkInput)  
        },
        computed: {
            ...mapState({
                board: function (state) {
                    console.log(this.$route.params);

                    const id = this.$route.params.id;

                    return find(state.boards, (board) => {
                        return board.id === id;
                    });
                }

            })
        },
        methods: {
            // playNoise: function (noise) {
            //     var sound = new Howl({
            //         src: [noise.path],
            //         autoplay: true,
            //         volume: 1,
            //     });
            // }
            checkInput: function (event) {
                console.log('CLICKED', event.key);
                if (!this.board.keys[event.key]) {
                    var sound = new Howl({
                        src: ['/noises/guns/gun2.wav'],
                        autoplay: true,
                        volume: 0.5,
                    });
                }
            }
        }
    }

</script>


<style lang="scss">

    @import '../assets/variables';

    .header {
        height: 5rem;
        display: flex;
        justify-content: center;

        .name {
            text-align: center;
            margin-bottom: 0;
            margin-top: auto;
            font-size: 2rem;
            line-height: 2rem;

        }
    }

    .body {
        padding-top: 4rem;
    }

    .keys {
        .key-row {
            display: flex;
            justify-content: center;
            margin-bottom: .5rem;
        }
        .key {
            position: relative;
            height: 5rem;
            width: 6rem;
            background-color: #FFF;
            margin-right: .5rem;
            box-shadow: 2px 2px 4px rgba(0,0,0,.1);
            border-radius: 3px;

            &:last-of-type {
                margin-right: 0;
            }

            &:after {
                display: block;
                position: absolute;
                content: '';
                top: 3px;
                left: 3px;
                font-size: 1rem;
                line-height: 1rem;
                opacity: 1;
                z-index: 1;
                text-align: center;
            }

            &-0:after { content: '0'; }
            &-1:after { content: '1'; }
            &-2:after { content: '2'; }
            &-3:after { content: '3'; }
            &-4:after { content: '4'; }
            &-5:after { content: '5'; }
            &-6:after { content: '6'; }
            &-7:after { content: '7'; }
            &-8:after { content: '8'; }
            &-9:after { content: '9'; }

            &-q:after { content: 'Q'; }
            &-w:after { content: 'W'; }
            &-e:after { content: 'E'; }
            &-r:after { content: 'R'; }
            &-t:after { content: 'T'; }
            &-y:after { content: 'Y'; }
            &-u:after { content: 'U'; }
            &-i:after { content: 'I'; }
            &-o:after { content: 'O'; }
            &-p:after { content: 'P'; }

            &-a:after { content: 'A'; }
            &-s:after { content: 'S'; }
            &-d:after { content: 'D'; }
            &-f:after { content: 'F'; }
            &-g:after { content: 'G'; }
            &-h:after { content: 'H'; }
            &-j:after { content: 'J'; }
            &-k:after { content: 'K'; }
            &-l:after { content: 'L'; }

            &-z:after { content: 'Z'; }
            &-x:after { content: 'X'; }
            &-c:after { content: 'C'; }
            &-v:after { content: 'V'; }
            &-b:after { content: 'B'; }
            &-n:after { content: 'N'; }
            &-m:after { content: 'M'; }
        }
    }

</style>