<template>
  <!-- <v-content> -->
      <v-container fluid fill-height>
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
                <v-text-field label="Giá điện" v-model="electricprice"></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field label="Chi phí bảo vệ" v-model="sanitationcost"></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field label="Giờ đóng cửa" v-model="closedtime"></v-text-field>
              </v-flex>
              <v-radio-group v-model="row" row>
                <v-radio label="Chung chủ" value="1"></v-radio>
                <v-radio label="Không chung chủ" value="0"></v-radio>
              </v-radio-group>
              <v-card-actions>
                <v-btn dark block color="indigo" @click="login()">
                Thêm
                </v-btn>
                <v-btn dark block color="red" @click="login()">
                Hủy
                </v-btn>
              </v-card-actions>
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
    <!-- </v-content> -->
</template>

<script>
export default {
  data () {
    return {
      row: null
    }
  }
  }
</script>
