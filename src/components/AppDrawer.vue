<template>
  <v-navigation-drawer
      :clipped="true"
      :fixed="true"
      :permanent="true"
      :mini-variant="true"
      app
    >
      <v-list>
        <v-list-tile 
           v-if="!drawer.permanent"
           @click="makeDrawerPermanent">
          <v-list-tile-action><v-icon>chevron_right</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>Static Drawer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="toggleMiniDrawer">
          <v-list-tile-action><v-icon>aspect_ratio</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>Mini Drawer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>
        
        <v-list-tile>
          <v-list-tile-action><v-icon>dashboard</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
</template>


<script>
  export default {
    name: "app-drawer",
    data () {
      return {
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
        right: null
      }
    }
  }
</script>