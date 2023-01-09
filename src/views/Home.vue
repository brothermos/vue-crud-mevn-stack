<template>
    <v-container>
        <!-- alert message -->
        <v-alert
            border="left"
            close-text="Close Alert"
            color="green accent-4"
            dark
            dismissible
            v-if="this.$route.params.message"
        >
            {{ this.$route.params.message }}
        </v-alert>

        <!-- show content -->
        <v-row no-gutters>
            <!-- loop ข้อมูลเพื่อมาแสดงเป็นโพส -->
            <v-col sm="4" class="pa-3" v-for="post in posts" :key="post._id">
                <v-card class="pa-1 rounded-lg" :to="{ name: 'post', params: { id: post._id } }">
                    <v-img height="350" :src="`/${post.image}`"></v-img>
                    <v-btn class="ml-4 mt-3" small outlined color="indigo">
                        {{ post.category }}
                    </v-btn>
                    <v-card-title class="headline">
                        {{ post.title }}
                    </v-card-title>
                    <v-card-text class="py-0">
                        <p>{{ post.content.substring(0, 100) + "..." }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import API from "@/api";

export default {
    name: "Home",
    data() {
        return {
            posts: [],
        };
    },

    // fetch ข้อมูลทุกโพส
    async created() {
        this.posts = await API.getAllPost();
    },
};
</script>
