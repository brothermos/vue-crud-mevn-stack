<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>Edit Post</v-card-title>
                    <v-divider></v-divider>
                    <!-- หากต้องการสร้างฟอร์มสำหรับอัปโหลดไฟล์ต้องใส่คำสั่ง enctype -->
                    <v-form
                        @submit.prevent="updateForm"
                        ref="form"
                        class="pa-5"
                        enctype="multipart/form-data"
                    >
                        <v-text-field label="Title" v-model="post.title" prepend-icon="mdi-note">
                        </v-text-field>

                        <v-text-field
                            label="Category"
                            v-model="post.category"
                            prepend-icon="mdi-view-list"
                        >
                        </v-text-field>

                        <v-textarea
                            label="Content"
                            v-model="post.content"
                            prepend-icon="mdi-note-plus"
                        >
                        </v-textarea>

                        <v-file-input
                            @change="selectFile"
                            show-size
                            counter
                            multiple
                            label="Select Image"
                        >
                        </v-file-input>
                        <v-img :src="`/${post.image}`"></v-img>

                        <v-btn type="submit" class="mt-3 mr-3" color="success">Update POST</v-btn>
                        <v-btn
                            type="submit"
                            class="mt-3 white--text"
                            color="red"
                            :to="{ name: 'post', params: { id: post._id } }"
                            >BACK</v-btn
                        >
                    </v-form>
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
            post: {
                title: "",
                category: "",
                content: "",
                image: "",
            },
            image: "",
            // validate form
            rules: [(value) => !!value || "This field is required!"],
        };
    },

    // เรียก API
    async created() {
        const response = await API.getPostByID(this.$route.params.id);
        this.post = response;
    },
    methods: {
        // เลือกไฟล์
        selectFile(file) {
            this.image = file[0];
        },

        async updateForm() {
            const formData = new FormData();
            formData.append("image", this.image);
            formData.append("title", this.post.title);
            formData.append("category", this.post.category);
            formData.append("content", this.post.content);
            formData.append("old_image", this.post.image);

            // เช็คว่า่ถ้า validate ผ่านแล้ว ให้ post และ redirect ไปหน้า home
            if (this.$refs.form.validate()) {
                const response = await API.updatePost(this.$route.params.id, formData);
                this.$router.push({ name: "home", params: { message: response.message } });
            }
        },
    },
};
</script>
