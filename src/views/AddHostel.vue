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
              <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                <img :src="imageUrl" height="150" v-if="imageUrl"/>
                <v-text-field label="Ảnh nhà trọ" @click='pickFile' v-model='imageName'></v-text-field>
                <input
                  type="file"
                  style="display: none"
                  ref="image"
                  accept="image/*"
                  @change="onFilePicked"
                >
              </v-flex>
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
              <v-select
                      v-model="e1"
                      :items="states"
                      label="Địa chỉ"
              ></v-select>
              <v-select
                      v-model="e1"
                      :items="states"
                      label="Khu"
                      multiple="true"
              ></v-select>
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
      row: null,
      e1: 'Florida',
      states: [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District of Columbia', 'Federated States of Micronesia',
        'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
        'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ],
      imageName: '',
      imageUrl: '',
      imageFile: ''
    }
  },
  methods: {
    pickFile () {
      this.$refs.image.click ()
    },
    onFilePicked (e) {
      const files = e.target.files
      if(files[0] !== undefined) {
      this.imageName = files[0].name
      if(this.imageName.lastIndexOf('.') <= 0) {
        return
      }
      const fr = new FileReader ()
      fr.readAsDataURL(files[0])
      fr.addEventListener('load', () => {
        this.imageUrl = fr.result
        this.imageFile = files[0] // this is an image file that can be sent to server...
      })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    }
  }
}
</script>
