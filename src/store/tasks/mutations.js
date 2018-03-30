import Vue from 'vue';
import findIndex from 'lodash-es/findIndex';
import { TaskGroup, Task } from './models';

export const addTaskGroup = (state, name) => {
    const id = state.taskGroups.length+1;
    const group = Object.assign(new TaskGroup(), {
        id,
        name,
        tasks: []
    });
    Vue.set(
        state,
        'taskGroups',
        state.taskGroups.concat(group)
    );
    Vue.set(
        state,
        'activeGroupId',
        id
    );
}

export const addTask = (state, name) => {
    const activeGroup = state.activeGroup;
    const id = activeGroup.tasks.length+1;
    const task = Object.assign(new Task(), {
        id,
        name,
        status: 'no rush'
    });
    Vue.set(
        activeGroup,
        'tasks',
        activeGroup.tasks.concat(task)
    );
}

export const removeTask = (state, id) => {
    const activeGroup = state.activeGroup;
    const index = findIndex(activeGroup.tasks, task => task.id === id);
    const update = [
        ...activeGroup.tasks.slice(0, index),
        ...activeGroup.tasks.slice(index+1)
    ]
    Vue.set(
        activeGroup,
        'tasks',
        update
    );
}

export const setActiveGroup = (state, id) => {
    Vue.set(
        state,
        'activeGroupId',
        id
    )
}