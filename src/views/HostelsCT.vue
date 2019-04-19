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
      scrolled: false,
      hostelDialog: false
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