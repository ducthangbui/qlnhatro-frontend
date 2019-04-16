<template>
  <v-toolbar
    v-if="!$route.meta.public"
    color="primary"
    dark
    app
    dense
    :scroll-threshold="5"
    scroll-off-screen
  >
    <v-toolbar-side-icon @click.stop="toggleMainDrawer()"></v-toolbar-side-icon>
    <v-toolbar-title style="width: 120px" class="ml-0 pl-3 hidden-sm-and-down">
      <router-link to="/">
        <v-img
          src="../assets/logo.svg"
          height="48"
          width="100"
          contain
          alt="uSpy"
        ></v-img>
      </router-link>
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      hide-details
      clearable
      :height="32"
      prepend-inner-icon="search"
      label="Search"
      v-model="searchKeyword"
      @click:clear="clearSearch"
      @keyup.enter="search"
      v-slot:activator="{ on }"
    ></v-text-field>
    <v-menu
      v-model="advancedFilterBar"
      :close-on-content-click="false"
      :nudge-width="300"
      offset-y
      left
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>filter_list</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Advanced Filter</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">thumb_up</v-icon>
                </template>
                <span>Filter by like number</span>
              </v-tooltip>
            </v-list-tile-action>
            <v-layout>
              <v-flex xs6>
                <v-text-field
                  height="30"
                  single-line
                  type="number"
                  label="Like from"
                  v-model="filters.like.from"
                ></v-text-field>
              </v-flex>
              <v-subheader> _ </v-subheader>
              <v-flex xs6>
                <v-text-field
                  height="30"
                  single-line
                  type="number"
                  label="to"
                  v-model="filters.like.to"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">comment</v-icon>
                </template>
                <span>Filter by comment number</span>
              </v-tooltip>
            </v-list-tile-action>
            <v-layout>
              <v-flex xs6>
                <v-text-field
                  height="30"
                  single-line
                  type="number"
                  label="Comment from"
                  v-model="filters.comment.from"
                ></v-text-field>
              </v-flex>
              <v-subheader> _ </v-subheader>
              <v-flex xs6>
                <v-text-field
                  height="30"
                  single-line
                  type="number"
                  label="to"
                  v-model="filters.comment.to"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">share</v-icon>
                </template>
                <span>Filter by share number</span>
              </v-tooltip>
            </v-list-tile-action>
            <v-layout>
              <v-flex xs6>
                <v-text-field
                  height="30"
                  single-line
                  type="number"
                  label="Share from"
                  v-model="filters.share.from"
                ></v-text-field>
              </v-flex>
              <v-subheader> _ </v-subheader>
              <v-flex xs6>
                <v-text-field
                  height="30"
                  single-line
                  type="number"
                  label="to"
                  v-model="filters.share.to"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">event</v-icon>
                </template>
                <span>Filter by created date</span>
              </v-tooltip>
            </v-list-tile-action>
            <v-layout>
              <v-flex xs6>
                <v-menu
                  v-model="fromDatePicker"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  bottom
                  full-width
                  min-width="200px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="dateRange.from"
                      single-line
                      label="Date from"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    no-title
                    :max="dateRange.to"
                    scrollable
                    v-model="dateRange.from"
                    @input="fromDatePicker = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-subheader> _ </v-subheader>
              <v-flex xs6>
                <v-menu
                  v-model="toDatePicker"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  bottom
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="dateRange.to"
                      single-line
                      label="to"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    no-title
                    :min="dateRange.from"
                    scrollable
                    v-model="dateRange.to"
                    @input="toDatePicker = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-list-tile>
          <v-list-tile v-if="$vuetify.breakpoint.smAndDown">
            <v-list-tile-action>
              <v-icon>sort</v-icon>
            </v-list-tile-action>
            <v-btn-toggle
              v-model="sortByField"
              @change="onSortFieldChange"
              mandatory
            >
              <v-btn
                v-for="(item, index) in sortFields"
                :key="index"
                :value="item.value"
                :flat="!(sortByField === item.value)"
                color="primary"
              >
                <v-icon
                  :color="sortByField === item.value ? 'white' : 'primary'"
                  >{{ item.icon }}</v-icon
                >
              </v-btn>
            </v-btn-toggle>
            <v-btn-toggle mandatory>
              <v-btn @click="switchOrder" color="primary">
                <v-icon color="white">{{
                  sortOrder === "DESC" ? "arrow_downward" : "arrow_upward"
                }}</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-list-tile>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn flat @click="clearFilters">Clear</v-btn>
          <v-btn color="primary" depressed @click="applyFilters">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
    <v-spacer></v-spacer>
    <v-menu
      v-if="!$vuetify.breakpoint.smAndDown"
      v-model="menu"
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          flat
          v-on="on"
          class="text-none v-btn--active hidden-sm-and-down"
        >
          <v-icon>date_range</v-icon>
          {{
            moment(dateRange.from)
              .locale("vi-VN")
              .format("l")
          }}
          -
          {{
            moment(dateRange.to)
              .locale("vi-VN")
              .format("l")
          }}
        </v-btn>
      </template>

      <v-card>
        <date-range-picker
          :from="dateRange.from"
          :to="dateRange.to"
          panel="range"
          @update="update"
          width="100px"
          :future="false"
          :panels="['range']"
          submitTitle="OK"
          resetTitle="Reset"
          :theme="dateTheme"
        />
      </v-card>
    </v-menu>
    <v-btn-toggle
      v-model="sortByField"
      @change="onSortFieldChange"
      mandatory
      class="transparent hidden-sm-and-down"
    >
      <v-btn
        v-for="(item, index) in sortFields"
        :key="index"
        :value="item.value"
        flat
      >
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-btn-toggle>
    <v-btn-toggle mandatory class="transparent hidden-sm-and-down">
      <v-btn @click="switchOrder" flat>
        <v-icon>{{
          sortOrder === "DESC" ? "arrow_downward" : "arrow_upward"
        }}</v-icon>
      </v-btn>
    </v-btn-toggle>
    <div v-if="$vuetify.breakpoint.mdAndUp">
      <v-btn icon @click="handleFullScreen()">
        <v-icon>fullscreen</v-icon>
      </v-btn>
      <v-dialog v-model="logoutDialog" width="300">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>power_settings_new</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline">Logging out!</v-card-title>

          <v-card-text>
            Do you really want to log out?
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="logoutDialog = false">
              Cancel
            </v-btn>
            <v-btn color="primary" depressed @click="handleLogout()">
              Log me out
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  name: "app-toolbar",
  components: {},
  data() {
    return {
      tabs: null,
    logoutDialog: false,
    advancedFilterBar: false,
    searchKeyword: '',
    sortByField: 'reactions24h',
    sortByField2: { icon: 'thumb_up', value: 'reactions' },
    sortFields: [
      { icon: 'access_time', value: 'created_time' },
      { icon: 'whatshot', value: 'reactions24h' },
      { icon: 'thumb_up', value: 'reactions' },
      { icon: 'comment', value: 'comments' },
      { icon: 'share', value: 'shares' }
    ],
    denseToolbar: true,
    dateRange: {
      from: moment()
        .subtract(5, 'years')
        .startOf('year')
        .format('YYYY-MM-DD'),
      to: moment().format('YYYY-MM-DD')
    },
    dateTheme: {
      primary: '#8666ff',
      secondary: '#424242',
      ternary: '#93A0BD',
      border: '#e6e6e6',
      light: '#ffffff',
      dark: '#000000',
      hovers: {
        day: '#CCC',
        range: '#e6e6e6'
      }
    },
    menu: false,
    fromDatePicker: false,
    toDatePicker: false,
    filters: {
      like: {
        from: null,
        to: null
      },
      share: {
        from: null,
        to: null
      },
      comment: {
        from: null,
        to: null
      }
    }
    };
  }
};
</script>
