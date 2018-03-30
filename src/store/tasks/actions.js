
export const addTaskGroup = ({commit}, name) => {
    commit('addTaskGroup', name);
}

export const addTask = ({commit}, name) => {
    commit('addTask', name);
}

export const removeTask = ({commit}, id) => {
    commit('removeTask', id);
}

export const setActiveGroup = ({commit}, id) => {
    commit('setActiveGroup', id);
}