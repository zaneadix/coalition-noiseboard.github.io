
<template>
    
<!--     <div class="noise-inventory">
        <div class="noise-category" v-for="category in noiseCategories">
            <h1>{{ category }}</h1>
        </div>
    </div> -->

    <div class="key"
         v-bind:class="{ active: pressed === character }">
        <span class="character">{{ character.toUpperCase() }}</span>
    </div>
    
</template>

<script>

    import { mapState, mapActions } from 'vuex';
    
    export default {
        name: 'key',
        props: [
            'character',
            'pressed'
        ],
        methods: {
            playNoise: function (noise) {
                var sound = new Howl({
                    src: [noise.path],
                    autoplay: true,
                    volume: 1,
                });
            }
        }
    }

</script>


<style lang="scss">
    
    .key {
        position: relative;
        height: 5rem;
        width: 6rem;
        background-color: #FFF;
        margin-right: .5rem;
        box-shadow: 2px 2px 4px rgba(0,0,0,.1), -2px 2px 4px rgba(0,0,0,.1);
        border-radius: 3px;

        &.active {
            box-shadow: 2px 2px 4px rgba(255, 75, 56,.2), -2px 2px 4px rgba(255, 75, 56,.2);
        }

/*        &:last-of-type {
            margin-right: 0;
        }
*/
        .character {
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

        /*&-0:after { content: '0'; }
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
        &-m:after { content: 'M'; }*/
    }

</style>