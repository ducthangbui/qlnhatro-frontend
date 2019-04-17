<template>
  <!-- <v-toolbar dark color="primary">
    <v-toolbar-side-icon></v-toolbar-side-icon>

    <v-toolbar-title class="white--text">Title</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>refresh</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar> -->
  <v-toolbar
    dark
    color="primary"
    app
    :fixed="true"
    :clipped-left="true"
    v-if="!$route.meta.public"
  >
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Vuetify Drawer Example</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>refresh</v-icon>
    </v-btn>

    <v-btn icon @click="onAvatar">
      <v-icon>power_settings_new</v-icon>
    </v-btn>

    <v-dialog v-model="dialogSignOut" max-width="290">
      <v-card>
        <v-card-title class="headline">Thông báo</v-card-title>

        <v-card-text>
          Bạn có muốn đăng xuất ?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" flat="flat" @click="dialogSignOut = false">
            Huỷ
          </v-btn>
          <v-btn color="red" flat="flat" @click="dialogSignOutHandle">
            Đồng ý
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogSignIn" max-width="290">
      <v-card>
        <v-card-title class="headline">Thông báo</v-card-title>

        <v-card-text>
          Bạn có muốn đăng nhập ?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" flat="flat" @click="dialogSignIn = false">
            Huỷ
          </v-btn>
          <v-btn color="red" flat="flat" @click="dialogSignInHandle">
            Đồng ý
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>

<script>
export default {
  name: "app-toolbar",
  components: {},
  data() {
    return {
      dialogSignOut: false,
      dialogSignIn: false
    };
  },
  methods: {
    async onAvatar() {
      console.log("click avatar");
      let token = localStorage.getItem("token");
      console.log(token);
      if (localStorage.getItem("token") !== null) {
        this.dialogSignOut = true;
      } else {
        this.dialogSignIn = true;
      }
    },
    dialogSignOutHandle() {
      localStorage.clear();
      this.dialogSignOut = false;
      alert("Đăng xuất thành công");
      // this.$router.push("/");
    },
    dialogSignInHandle() {
      this.dialogSignIn = false;
      this.$router.push("/login");
    }
  }
};
</script>
