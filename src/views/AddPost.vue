<template>
    <v-container class="mt-10">
        <v-row no-gutters>
            <v-col sm="4" class="mx-auto">
                <v-card class="pa-5 rounded-lg add-post-container" :elevation="10">
                    <v-card-title>Add New Post</v-card-title>
                    <v-divider></v-divider>
                    <!-- หากต้องการสร้างฟอร์มสำหรับอัปโหลดไฟล์ต้องใส่คำสั่ง enctype -->
                    <v-form
                        @submit.prevent="submitForm"
                        ref="form"
                        class="pa-5"
                        enctype="multipart/form-data"
                    >
                        <!-- title -->
                        <v-text-field
                            label="Title"
                            v-model="post.title"
                            prepend-icon="mdi-note"
                            :rules="rules"
                        >
                        </v-text-field>

                        <!-- category -->
                        <v-text-field
                            label="Category"
                            v-model="post.category"
                            prepend-icon="mdi-view-list"
                            :rules="rules"
                        >
                        </v-text-field>

                        <!-- content -->
                        <v-textarea
                            label="Content"
                            v-model="post.content"
                            prepend-icon="mdi-note-plus"
                            :rules="rules"
                        >
                        </v-textarea>

                        <!-- file input -->
                        <v-file-input
                            @change="selectFile"
                            :rules="rules"
                            show-size
                            counter
                            multiple
                            label="Select Image"
                        >
                        </v-file-input>

                        <!-- button -->
                        <v-btn type="submit" class="mt-3" color="primary">ADD POST</v-btn>
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
    methods: {
        // เลือกไฟล์
        selectFile(file) {
            this.image = file[0];
        },
        // submitform
        async submitForm() {
            const formData = new FormData();
            formData.append("image", this.image);
            formData.append("title", this.post.title);
            formData.append("category", this.post.category);
            formData.append("content", this.post.content);

            // เช็คว่า่ถ้า validate ผ่านแล้ว ให้ post และ redirect ไปหน้า home
            if (this.$refs.form.validate()) {
                const response = await API.addPost(formData);
                this.$router.push({ name: "home", params: { message: response.message } });
            }
        },
    },
};
</script>
<style>
</style>
