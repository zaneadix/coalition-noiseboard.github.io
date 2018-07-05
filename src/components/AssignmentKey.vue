
<template>

    <div class="key assignment-key"
         v-on:click="checkClick($event, 'assign')">
        <div class="key-body"
             ref="keyBody"
             @mouseenter="hover = true"
             @mouseleave="hover = false">

            <button
                class="unassigner icon-button"
                ref="unassignerBtn"
                v-if="hover && noise"
                v-on:click="checkClick($event, 'unassign')">
                <svg class="icon" ref="unassignerSvg">
                    <use xlink:href="#icon-x-square"></use>
                </svg>
            </button>

            <span class="character">{{ character | title }}</span>
            <span v-if="noise" class="noise-name">{{ noise.name }}</span>
            <small v-else class="soft-text">empty</small>
        </div>
    </div>
    
</template>

<script>

    import { mapState, mapActions } from 'vuex';
    
    export default {
        name: 'assignment-key',

        props: [
            'character',
            'noise'
        ],

        data: function () {
            return {
                hover: false
            }
        },

        methods: {

            checkClick: function (event) {
                switch (event.target) {
                    case this.$refs.unassignerSvg:
                    case this.$refs.unassignerBtn:
                        this.$emit('unassign', this.character);
                        break;
                    default:
                        this.$emit('assign', this.character);
                }
            }
        }
    }

</script>


<style lang="scss" scoped="true">

    @import '../styles/variables';

    .key-body {
        .unassigner {
            position: absolute;
            top: 3px;
            right: 3px;
            svg {
                height: 1rem;
                width: 1rem;
            }
        }
    }

</style>