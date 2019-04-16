<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex v-for="(hostel, index) in hostels" :key="index" md2 xs6>
        <!-- <div>{{ hostel.waterprice }}</div> -->
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 10 : 1}`">
            <v-card-title primary-title
              ><div>{{ hostel.waterprice }}</div></v-card-title
            >
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import { error } from "util";

export default {
  mounted() {
    this.handleScroll();
  },
  data() {
    return {
      hostels: [],
      offset: 0,
      scrolled: false
    };
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
  }
};
</script>

