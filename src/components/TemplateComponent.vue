<template >
    <div class="container">
        <HeaderComponent @selectUser="onUserSelect"></HeaderComponent>
        <router-view :user="user"></router-view>
    </div>
</template>

<script>
import HeaderComponent from './Templates/HeaderComponent.vue'

    export default {
        name: "TemplateComponent",

        components: {
            HeaderComponent,
        },

        data: () => ({
            user: null,
        }),

        methods: {
          onUserSelect(value) {
              this.user = value;
          }
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        flex-direction: column;
        justify-content: flex-start;
    }
</style>
