<template>
  <v-app id="inspire">
    <app-drawer v-if='this.$route.path !== "/login" || this.$route.path !== "/signup"'></app-drawer>
    <app-toolbar v-if='this.$route.path !== "/login" || this.$route.path !== "/signup"'></app-toolbar>
    <v-content class="grey lighten-2">
      <div class="page-wrapper" style="height:calc(100% - 50px)">
        <router-view></router-view>
      </div>
      <!-- App Footer -->
      <v-footer height="auto" class="white pa-3 app--footer">
        <span class="caption"
          >USpy.biz &copy; {{ new Date().getFullYear() }}</span
        >
        <v-spacer></v-spacer>
        <span class="caption mr-1">Make With Love</span>
        <v-icon color="pink" small>favorite</v-icon>
      </v-footer>
    </v-content>
    <app-fab></app-fab>
  </v-app>
</template>

<script>
import AppToolbar from "@/components/AppToolbar";
import AppDrawer from "@/components/AppDrawer";

export default {
  name: "App",
  components: {
    AppToolbar,
    AppDrawer
  },
  data() {
    return {
      
    };
  },
  creadted() {
    console.log(this.$route.path)
  }
};
</script>
