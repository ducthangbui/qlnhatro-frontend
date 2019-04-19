<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img
                    src="../assets/logo.svg"
                    alt="Welcom to uSpy"
                    width="120"
                    height="120"
                  />
                  <h2 class="flex my-4 primary--text">Đăng nhập</h2>
                </div>
              </v-card-text>
              <v-flex>
                <v-text-field label="Email" v-model="username"></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field
                  label="Mật khẩu"
                  v-model="password"
                  :append-icon="show1 ? 'visibility' : 'visibility_off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                >
                </v-text-field>
              </v-flex>
              <v-btn dark block color="indigo" @click="login()">
                Đăng Nhập
                <v-icon right>fa fa-facebook-square fa-lg</v-icon>
              </v-btn>
              <v-card-actions> </v-card-actions>
            </v-card>
          </v-flex>
          <v-dialog v-model="dialog" max-width="290">
            <v-card>
              <v-card-title class="headline">Thông báo</v-card-title>

              <v-card-text>
                Đăng nhập thất bại
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" flat="flat" @click="dialog = false">
                  OK
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dialog: false
    };
  },
  created() {
    if (localStorage.getItem("token") !== null) {
      this.$router.push("/");
    }
  },
  methods: {
    login() {
      let that = this;
      console.log(this.username);
      console.log(this.password);
      axios
        .post("http://127.0.0.1:8000/api/signin", {
          email: this.username,
          password: this.password
        })
        .then(response => {
          console.log(response.data.token);
          console.log(response.status);
          if (response.status == 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            // localStorage.setItem("user", response.data.user.name);
            that.$router.push("/");
          } else {
            that.dialog = true;
          }
        })
        .catch(error => {
          this.dialog = true;
          console.log(error);
        });
    }
  }
};
</script>
