
export class TaskGroup {
    constructor () {
        this.id = '';
        this.name = '';
        this.tasks = [];
    }
}

export class Task {
    constructor () {
        this.id = '';
        this.name = '';
        this.status = '';
        

        this.subTasks = [];
    }
}