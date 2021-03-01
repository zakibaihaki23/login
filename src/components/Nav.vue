<template v-if="authenticated">
  <div>
    <v-app-bar app color="h-bg" fixed>
      <v-app-bar-nav-icon @click="toggleDrawer()" />

      <v-spacer />

      <v-menu
        :close-on-content-click="false"
        left
        min-width="400"
        offset-y
        transition="slide-x-transition"
      >
      </v-menu>

      <v-menu left offset-y transition="slide-x-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon>
            <v-badge
              bordered
              color="green"
              content="6"
              dot
              offset-x="6"
              offset-y="6"
            >
              <v-avatar color="grey" size="40">
                <v-img
                  src="https://www.coachcarson.com/wp-content/uploads/2018/09/Chad-Profile-pic-circle.png"
                  size="40"
                ></v-img>
              </v-avatar>
            </v-badge>
          </v-btn>
        </template>

        <v-list dense min-width="48" nav width="140">
          <template v-for="akun in accounts">
            <v-divider v-if="akun.divider" :key="akun.name" link />

            <v-list-item @click="logout" :key="akun.path" :to="akun.path" link>
              <v-list-item-icon>
                <v-icon size="16" right small>
                  {{ akun.icon }}
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ akun.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer.display" app class="elevation-1" fixed>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img
              src="https://www.coachcarson.com/wp-content/uploads/2018/09/Chad-Profile-pic-circle.png"
              size="70"
            />
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Picker
            </v-list-item-title>
            <v-list-item-subtitle>picker@edenfarm.id</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item-group
          v-for="items in drawer.data"
          :key="items.path"
          color="primary"
        >
          <v-list-item
            v-if="items.children.length <= 1"
            :to="`${items.path}/${items.children[0].path}`"
            exact
            exact-active-class="primary--text"
          >
            <v-list-item-icon>
              <v-icon>
                {{ items.icon }}
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ items.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <v-sheet class="text-center pa-4" elevation="4">
          <div class="mt-4">
            <v-switch
              v-model="$vuetify.theme.dark"
              inset
              label="Theme Dark"
            ></v-switch>
          </div>
        </v-sheet>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data: () => ({
      drawer: {
        display: null,
        data: [],
      },
      accounts: [
        {
          icon: 'mdi-logout',
          name: 'Logout',
          path: '/',
        },
      ],
    }),
    methods: {
      toggleDrawer() {
        this.drawer.display = !this.drawer.display
      },
      getRoutes() {
        this.$router.options.routes.forEach((route) => {
          this.drawer.data.push(route)
        })
      },
      ...mapActions({
        signOutAction: 'auth/signIn',
      }),
      logout() {
        localStorage.removeItem('token')
        this.$router.push('/')
        location.reload()
      },
    },
    created() {
      this.getRoutes()
    },
    computed: {
      ...mapGetters({
        authenticated: 'auth/authenticated',
      }),
    },
  }
</script>

<style lang="scss">
  .h-sticky {
    position: sticky;
    top: 0;
    z-index: 2;
  }
</style>
