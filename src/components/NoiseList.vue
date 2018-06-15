
<template>
    
<!--     <ul class="noise-list">
        <li class="noise" v-for="noise in noises">
            <Task :model="task"
                  :key="task.name" />
        </li>
    </ul> -->
    
    <div class="noise-inventory">
        <div class="noise-category" v-for="category in noiseCategories">
            <h1>{{ category }}</h1>
        </div>
    </div>
    
</template>

<script>

    import { mapState, mapActions } from 'vuex';
    
    export default {
        name: 'noise-list'
        compouted: {
            ...mapState({
                noiseCategories: state => {
                    return Object.getOwnPropertyNames(state.noises);
                },
                noises: state =>  {
                    return state.noises;
                }
            })
        }
    }

</script>


<style>
    

</style>