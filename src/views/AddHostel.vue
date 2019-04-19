<template>
  <!-- <v-content> -->
  <v-container fluid fill-height>
    <v-layout>
      <v-flex>
        <v-card class="elevation-1 pa-3">
          <v-card-text>
            <div class="layout column align-center">
              <h2 class="flex my-4 primary--text">Thêm Nhà Trọ</h2>
            </div>
          </v-card-text>
          <v-flex
            xs12
            class="text-xs-center text-sm-center text-md-center text-lg-center"
          >
            <img :src="imageUrl" height="150" v-if="imageUrl" />
            <v-text-field
              label="Ảnh nhà trọ"
              @click="pickFile"
              v-model="imageName"
            ></v-text-field>
            <input
              type="file"
              style="display: none"
              ref="image"
              accept="image/*"
              @change="onFilePicked"
            />
          </v-flex>
          <v-flex>
            <v-text-field
              label="Giá phòng"
              v-model="price"
              prefix="$"
              type="decimals"
              suffix="/tháng"
            ></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
              label="Giá điện"
              v-model="electricprice"
              prefix="$"
              suffix="/số"
            ></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
              label="Giá nước"
              v-model="waterprice"
              prefix="$"
              suffix="/tháng"
            ></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
              label="Chi phí bảo vệ"
              v-model="securitycost"
              prefix="$"
              suffix="/tháng"
            ></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
              label="Chi phí vệ sinh"
              v-model="sanitationcost"
              prefix="$"
              suffix="/tháng"
            ></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
              label="Giờ đóng cửa"
              v-model="closedtime"
            ></v-text-field>
          </v-flex>
          <v-select v-model="add" :items="adds" label="Địa chỉ"></v-select>
          <v-select
            v-model="region"
            :items="regions"
            attach
            chips
            label="Vùng"
            multiple
          ></v-select>
          <div
            style="display: flex; flex-direction: column; align-items: center"
          >
            <v-radio-group v-model="haslandlord" row>
              <v-radio label="Chung chủ" value="1"></v-radio>
              <v-radio label="Không chung chủ" value="0"></v-radio>
            </v-radio-group>
          </div>

          <v-card-actions>
            <v-btn dark block color="indigo" @click="addEvent()">
              Thêm
            </v-btn>
            <v-btn dark block color="red" @click="cancelEvent()">
              Hủy
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Thông báo</v-card-title>

          <v-card-text>
            {{ notification }}
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
import axios from "axios";
import FormData from "form-data";

export default {
  data() {
    return {
      haslandlord: null,
      regions: [
        "ĐH Quốc Gia",
        "Bách-Kinh-Xây",
        "Chợ Xanh",
        "Chợ Phùng Khoang",
        "BV Thanh Nhàn",
        "BV Bạch Mai",
        "DH Kinh tế-Kỹ thuật"
      ],
      region: ["ĐH Quốc Gia"],
      adds: [
        "Quận Thanh Xuân",
        "Quận Hoàng Mai",
        "Quận Hà Đông",
        "Quận Cầu Giấy"
      ],
      add: "Quận Hoàng Mai",
      imageName: "",
      imageUrl: "",
      imageFile: "",
      dialog: false,
      notification: "Thêm nhà trọ thất bại"
    };
  },
  created() {
    if (localStorage.getItem("role") !== "1") {
      this.$router.push("/");
    }
  },
  methods: {
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    addEvent() {
      let that = this;
      console.log("picture|" + this.imageFile);
      console.log("price|" + this.price);
      console.log("electricprice|" + this.electricprice);
      console.log("securitycost|" + this.securitycost);
      console.log("sanitationcost|" + this.sanitationcost);
      console.log("closedtime|" + this.closedtime);
      let closedtime_ = 0;
      if (this.closedtime === undefined) {
        console.log("closedtime_|" + closedtime_);
        closedtime_ = 0;
      }
      console.log("add|" + this.add);
      let addid_ = 2;
      if (this.add === "Quận Thanh Xuân") {
        addid_ = 1;
      } else if (this.add === "Quận Hà Đông") {
        addid_ = 3;
      } else if (this.add === "Quận Cầu Giấy") {
        addid_ = 4;
      }

      console.log("region|" + this.region);
      let region_ = [];
      let r;
      for (r in this.region) {
        region_.push(r);
      }
      console.log("haslandlords|" + this.haslandlord);
      let token = localStorage.getItem("token");
      console.log("token|" + token);

      let data = new FormData();
      data.append("image", this.imageFile);
      data.append("electricprice", this.electricprice);
      data.append("securitycost", this.securitycost);
      data.append("sanitationcost", this.sanitationcost);
      data.append("waterprice", this.waterprice);
      data.append("closedtime", 0);
      data.append("price", this.price);
      data.append("addid", addid_);
      data.append("haslandlords", this.haslandlord);
      data.append("regions", region_);
      axios
        .post(
          "http://127.0.0.1:8000/api/hostel/addHostel?token=" + token,
          data,
          {
            "Content-Type": "multipart/form-data"
          }
        )
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            that.notification = "Thêm nhà trọ thành công";
            that.dialog = true;
          } else {
            that.dialog = true;
          }
        })
        .catch(error => {
          console.log(error);
          that.dialog = true;
        });
    },
    cancelEvent() {
      console.log("cancel event");
    }
  }
};
</script>
