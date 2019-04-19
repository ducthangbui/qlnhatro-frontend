<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex v-for="(hostel, index) in hostels" :key="index" md2 xs6>
        <!-- <div>{{ hostel.waterprice }}</div> -->
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 10 : 1}`">
            <v-img
              :src="
                require('~/Desktop/QLNhaTroSrc/public/upload/' + hostel.img)
              "
              aspect-ratio="1"
            >
              <div class="caption white--text black created-time">
                {{ moment(hostel.created_time).fromNow() }}
              </div>
            </v-img>
            <v-card-actions grid-list-xs>
              <v-layout
                grid-list-xs
                row
                fill-height
                align-center
                justify-space-around
              >
                <!-- <span>
                <span class="caption mr-2">
                  {{ numeral(item.reactions).format('0a') }}
                </span>
                <v-icon size="12" class="mr-1" color="orange">far fa-star</v-icon>
              </span> -->
              </v-layout>
            </v-card-actions>
            <v-card-title primary-title>
              <div>{{ hostel.waterprice }}</div>
            </v-card-title>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>

    <v-dialog v-model="hostelDialog" scrollable width="90%">
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions></v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import { error } from "util";
import moment from "moment";

export default {
  mounted() {
    this.handleScroll();
  },
  data() {
    return {
      hostels: [],
      offset: 0,
      scrolled: false,
      hostelDialog: false,
      moment: moment
    };
  },
  created() {
    // let offset = 0;
    axios
      .get("http://127.0.0.1:8000/api/hostels/" + this.offset)
      .then(response => {
        this.hostels = response.data.hostels;
        console.log(this.hostels);
      })
      .catch(error => {
        console.log(error);
      });
  },
  destroyed() {
    window.onscroll = null;
  },
  methods: {
    handleScroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          // this.$store.dispatch('posts/loadMore', {})
          // this.scrolled = window.scrollY > 0;
          this.offset = this.offset + 24;
          axios
            .get("http://127.0.0.1:8000/api/hostels/" + this.offset)
            .then(response => {
              this.hostels.push.apply(this.hostels, response.data.hostels);
              console.log(this.hostels);
            })
            .catch(error => {
              console.log(error);
            });
          console.log(this.offset);
          console.log("scroll");
        }
      };
    }
  }
};
</script>

