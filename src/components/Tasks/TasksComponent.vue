<template>
    <div class="container">
        <div class="buttons">
            <router-link to="/task/create" class="create-button" v-if="isGranted">
                Создать задачу
            </router-link>
        </div>

        <div class="table">
            <div class="row">
                <div class="column column-name">Название</div>
                <div class="column column-status">Статус</div>
                <div class="column column-is-open">Открыта</div>
            </div>

            <router-link class="row" :to="{ name: 'task', params: { id: task.id }}" v-for="(task, index) in tasks" :key="index">
                    <div class="column column-name">{{ task.name }}</div>
                    <div class="column column-status">{{ task.status }}</div>
                    <div class="column column-is-open">{{ task.is_open ? 'Да' : 'Нет' }}</div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import {Task} from "@/api/task";

    export default {
        name: "TasksComponent",

        props: {
            user: {
                type: Object
            }
        },

        computed: {
            isGranted() {
                return this.user?.roles.find((value) => {
                    return value.name === 'EDITOR';
                }) ? true : false;
            }
        },

        data: () => ({
            tasks: [],
        }),

        mounted() {
            this.getTasks();
        },

        methods: {
            getTasks() {
                Task.all().then(({ data }) => {
                    this.tasks = data.data;
                }).catch(() => {
                    // handling
                })
            },
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        flex-direction: row;
        width: 100%;
        margin-top: 60px;
    }

    .table {
        display: block;
        width: 60%;
        border: 1px solid gray;
        margin-top: 16px;
    }

    .row {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 24px;
        border-bottom: 1px solid gray;
        text-decoration: none;
        color: black;
    }

    .column {
        text-align: center;
    }

    .column-name {
        width: 50%;
        border-right: 1px solid gray;
    }

    .column-status {
        width: 25%;
        border-right: 1px solid gray;
    }

    .column-is-open {
        width: 25%;
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        flex-direction: row;
        width: 60%;
    }

    .create-button {
        padding: 8px;
        display: block;
        width: 25%;
        height: 38px;
        border: 1px grey solid;
        text-align: center;
        text-decoration: none;
        color: black;
    }
</style>
