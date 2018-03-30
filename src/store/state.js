import find from 'lodash-es/find';

export default class State {
    constructor () {
        this.activeGroupId = 1;
        this.taskGroups = [];
    }
    get activeGroup () {
        return find(this.taskGroups, group => {
            return group.id === this.activeGroupId;
        });
    }
}