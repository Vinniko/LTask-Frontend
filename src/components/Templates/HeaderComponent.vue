<template class="container">
    <div class="container">
        <div class="logo">

        </div>

        <div class="name">
            <h1>Тестовый трекер</h1>
        </div>

        <div class="user">
            <v-combobox
                class="combobox"
                :items="users"
                item-title="name"
                item-value="id"
                v-model="user"
                return-object
                variant="underlined"
                @update:modelValue="selectUser"
            ></v-combobox>
        </div>
    </div>
</template>

<script>
    import {VCombobox} from "vuetify/lib/components/VCombobox/VCombobox";
    import {Users} from "@/api/user";

    export default {
        name: "HeaderComponent",

        components: {
            VCombobox
        },

        data: () => ({
            users: [],
            user: null,
        }),

        mounted() {
            this.getUsers();
        },

        methods: {
            getUsers() {
                Users.get().then(({ data }) => {
                    this.users = data.data;
                    this.user = 1;
                    this.$emit('selectUser', this.users?.at(0));
                }).catch(() => {
                    // handling
                })
            },

            selectUser() {
                this.$emit('selectUser', this.user);
            }
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 64px;
        flex-direction: row;
        justify-content: center;
        border-bottom: 1px solid black;
    }

    .logo {
        width: 20%;
        padding: 8px;
    }

    .name {
        width: 60%;
        text-align: center;
    }

    .user {
        width: 20%;
    }

    .combobox {
        background-color: white;
        height: 24px;
    }
</style>
