
<template>

    <div class="key assignment-key"
         v-on:click="$emit('key-clicked', character)">
        <div class="key-body">
            <span class="character">{{ character }}</span>
            <span v-if="model">{{ model.name }}</span>
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
            'model'
        ]
    }

</script>


<style lang="scss" scoped="true">

    @import '../assets/variables';

</style>