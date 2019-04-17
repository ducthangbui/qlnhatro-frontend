<template>
  <v-app id="signup" class="primary">
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
                  <h2 class="flex my-4 primary--text">Đăng ký</h2>
                </div>
              </v-card-text>
              <v-flex>
                <v-text-field v-model="name" label="Họ tên"></v-text-field>
              </v-flex>
              <v-card-actions>
                <v-checkbox
                  v-model="checkbox_men"
                  :label="`Nam:`"
                  @change="onCheckBoxMen"
                ></v-checkbox>
                <v-checkbox
                  v-model="checkbox_women"
                  :label="`Nữ:`"
                  @change="onCheckBoxWomen"
                ></v-checkbox>
              </v-card-actions>
              <v-flex>
                <v-text-field v-model="phonenumber" label="SĐT"></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field v-model="username" label="Email"></v-text-field>
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
              <v-card-actions>
                <v-checkbox
                  v-model="checkbox_kt"
                  :label="`Khách trọ:`"
                  @change="onCheckBoxKT"
                ></v-checkbox>
                <v-checkbox
                  v-model="checkbox_ct"
                  :label="`Chủ trọ:`"
                  @change="onCheckBoxCT"
                ></v-checkbox>
              </v-card-actions>
              <v-btn dark block color="indigo" @click="login()">
                Đăng ký
                <v-icon right>fa fa-facebook-square fa-lg</v-icon>
              </v-btn>
              <v-card-actions> </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
        show1: false,
        items: [{ title: 'Nam' }, { title: 'Nữ' }],
        checkbox_men: false,
        checkbox_women: false,
        checkbox_kt: true,
        checkbox_ct: false
    };
  },
  methods: {
    onCheckBoxMen() {
      if (this.checkbox_men) {
        this.checkbox_women = false
      }
    },
    onCheckBoxWomen() {
      if (this.checkbox_women) {
        this.checkbox_men = false
      }
    },
    onCheckBoxCT() {
      if (this.checkbox_ct) {
        this.checkbox_kt = false
      }
    },
    onCheckBoxKT() {
      if (this.checkbox_kt) {
        this.checkbox_ct = false
      }
    },
    login() {
      console.log(this.name)
      console.log(this.username)
      console.log(this.password)
      console.log(this.phonenumber)
      let gender_ = 1
      let roleid_var = 2
      if (this.checkbox_men) {
        console.log('gender = 1')
        gender_ = 1
      } else {
        console.log('gender = 2')
        gender_ = 2
      }

      if (this.checkbox_ct) {
        roleid_var = 1
      }
      console.log(roleid_var)
      axios
        .post('http://127.0.0.1:8000/api/signup', {
          name: this.name,
          email: this.username,
          password: this.password,
          phonenumber: this.phonenumber,
          gender: gender_,
          roleid: roleid_var
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }
  }
}
</script>
<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  z-index: 0;
}
</style>
