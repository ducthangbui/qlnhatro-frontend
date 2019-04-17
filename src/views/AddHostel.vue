<template>
  <v-content>
      <v-container>
        <v-layout>
          <v-flex>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <h2 class="flex my-4 primary--text">Thêm nhà trọ</h2>
                </div>
              </v-card-text>
              <v-flex>
                <v-text-field label="Giá phòng" v-model="price"></v-text-field>
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
                Thêm
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
</template>