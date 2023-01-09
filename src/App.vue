<template>
    <v-app id="inspire">
        <!-- NAVBAR -->
        <v-navigation-drawer v-model="drawer" app>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title> Vue Crud </v-list-item-title>
                    <v-list-item-subtitle>MEVN Full Stack</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            
            <!-- NAVBAR LIST -->
            <v-list>
                <v-list-item-group color="primary" class="pa-2">
                    <!-- loop ข้อมูลเพื่อมาแสดงแถบ side bar -->
                    <v-list-item v-for="(item, i) in items" :key="i" :to="item.link" link>
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <h3 v-text="item.title"></h3>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>SEC Playground</v-toolbar-title>
        </v-app-bar>

        <!-- MAIN CONTENT -->
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
export default {
    data: () => ({
        drawer: null,
        items: [
            { title: "Home", icon: "mdi-home", link: "/" },
            { title: "Add Post", icon: "mdi-note-plus", link: "/add-post" },
            { title: "About", icon: "mdi-help-box", link: "/about" },
        ],
    }),
};
</script>
