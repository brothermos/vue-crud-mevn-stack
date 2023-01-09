<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="pa-4 mx-auto">
                <v-card class="pa-2">
                    <!-- imagee -->
                    <v-img :src="`/${post.image}`"></v-img>
                    <!-- category, ปุ่ม edit,delete -->
                    <v-card-actions class="pb-0 mt-3">
                        <v-row class="mt-1 mx-1">
                            <!-- category -->
                            <v-col sm="2">
                                <v-btn small outlined color="primary">
                                    {{ post.category }}
                                </v-btn>
                            </v-col>

                            <v-col sm="10" class="d-flex justify-end">
                                <!-- edit button -->
                                <v-btn
                                    color="success"
                                    class="white--text mr-2"
                                    :to="{ name: 'edit-post', params: { id: post._id } }"
                                >
                                    EDIT
                                </v-btn>
                                <!-- delete button -->
                                <v-btn
                                    color="red"
                                    class="white--text"
                                    @click="deletePost(post._id)"
                                >
                                    DELETE
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                    <!-- Title -->
                    <v-card-subtitle class="headline">
                        <h3>{{ post.title }}</h3>
                    </v-card-subtitle>
                    <!-- Content, เวลาที่ post -->
                    <v-card-text class="grey--text">
                        <p>{{ post.content }}</p>
                        <p>{{ post.created }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import API from "@/api";

export default {
    data() {
        return {
            post: {},
        };
    },
    // เรียกข้อมูลจาก ID
    async created() {
        const response = await API.getPostByID(this.$route.params.id);
        this.post = response;
    },
    methods: {
        async deletePost(id) {
            // alert ให้กดยืนยันก่อนจะลบ เมื่อลบแล้วให้ redirect ไปหน้า home
            if (window.confirm("Are you sure you want to delete this post?")) {
                const response = await API.deletePost(id);
                this.$router.push({ name: "home", params: { message: response.message } });
            }
        },
    },
};
</script>
