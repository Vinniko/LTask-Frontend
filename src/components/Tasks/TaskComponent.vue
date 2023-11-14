<template>
    <div class="container">
        <div class="buttons">
            <router-link to="/" class="back-button">
                Вернуться к списку
            </router-link>

            <a class="edit-save-button" @click="onEditSaveButtonLabel">
                {{editSaveButtonLabel}}
            </a>
        </div>

        <v-form class="form">
            <div class="row">
                <v-text-field
                        class="field"
                        v-model="task.name"
                        :counter="10"
                        label="Название"
                        required
                        :readonly="!isFieldEditable"
                        variant="underlined"
                ></v-text-field>

                <v-combobox
                        class="field"
                        v-model="task.status"
                        label="Статус"
                        :items="statuses"
                        :readonly="!isEditable"
                        variant="underlined"
                ></v-combobox>

                <div class="checkbox">
                    <input
                            type="checkbox"
                            id="checkbox"
                            v-model="task.is_open"
                            :disabled="!isFieldEditable"
                    >
                    <label for="checkbox">Открыта</label>
                </div>
            </div>

            <div class="row">
                <v-textarea
                        v-model="task.description"
                        :counter="256"
                        label="Описание"
                        :readonly="!isFieldEditable"
                        variant="underlined"
                ></v-textarea>
            </div>
        </v-form>
    </div>

</template>

<script>
    import {Task} from "@/api/task";

    export default {
        name: "TaskComponent",

        props: {
            user: {
                type: Object
            }
        },

        computed: {
            editSaveButtonLabel() {
                return this.isEditable ? 'Сохранить' : 'Редактировать';
            },

            isGranted() {
                return this.user?.roles.find((value) => {
                    return value.name === 'EDITOR';
                })  ? true : false;
            },

            isFieldEditable() {
                if (!this.isGranted) {
                    return false;
                }

                return this.isEditable;
            }
        },

        data: () => ({
            task: {
                name: null,
                description: null,
                author_id: 0,
                status: 'new',
                is_open: true
            },
            statuses: [],
            isEditable: false,
            taskId: 0
        }),

        mounted() {
            this.taskId = this.$route.params.id;
            this.getStatuses();

            if (this.taskId !== 'create') {
                this.getTask(this.taskId);
            } else {
                this.isEditable = true;
            }
        },

        methods: {
            getTask(id) {
                Task.get(id).then(({ data }) => {
                    this.task = {
                        id: data.data.id,
                        name: data.data.name,
                        description: data.data.description,
                        author_id: data.data.author_id,
                        status: data.data.status,
                        is_open: data.data.is_open ? true : false
                    };
                }).catch(() => {
                    // handling
                })
            },

            getStatuses() {
                Task.statuses().then(({ data }) => {
                    this.statuses = data.data;
                }).catch(() => {
                    // handling
                })
            },

            createTask() {
                this.task.author_id = this.user?.id;

                Task.create(this.task).then().catch(() => {
                    // handling
                });
            },

            editTask() {
                Task.update(this.task.id, this.task).then().catch(() => {
                    // handling
                });
            },

            onEditSaveButtonLabel() {
                if (!this.isEditable) {
                    this.isEditable = true;
                    console.log(this.isGranted, this.isEditable, !this.isGranted && !this.isEditable)
                    return;
                }

                if (this.taskId === 'create') {
                    this.createTask();
                } else {
                    this.editTask();
                }

                this.$router.push({ path: '/' });
            }
        }
    }
</script>

<style scoped>
    .container {
        margin-top: 60px;
        display: flex;
        justify-content: center;
        align-content: center;
        flex-wrap: wrap;
        flex-direction: column;
        width: 100%;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        flex-direction: row;
        width: 80%;
    }

    .back-button {
        padding: 8px;
        display: block;
        width: 256px;
        height: 38px;
        border: 1px grey solid;
        text-align: center;
        text-decoration: none;
        color: black;
    }

    .edit-save-button {
        padding: 8px;
        display: block;
        width: 256px;
        height: 38px;
        border: 1px grey solid;
        text-align: center;
        text-decoration: none;
        color: black;
        cursor: pointer;
    }

    .form {
        margin-top: 60px;
        display: flex;
        justify-content: center;
        align-content: center;
        flex-wrap: wrap;
        flex-direction: column;
        width: 80%;
        gap: 16px;
    }

    .row {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        flex-direction: row;
        width: 100%;
        gap: 16px;
    }

    .checkbox {
        padding-top: 20px;
    }
</style>
