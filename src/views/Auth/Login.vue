<template>
  <v-app>
    <div id="login" class="bigbk">
      <v-container>
        <v-form
          @submit.prevent="submit"
          ref="form"
          v-model="valid"
          lazy-validation
          class="login-container"
        >
          <v-card-title>
            <v-img
              src="https://dev.dashboard.edenfarm.tech/assets/images/eden-side.png"
            ></v-img>
          </v-card-title>
          <v-text-field
            :rules="emailRules"
            v-model="form.email"
            label="E-Mail"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="form.password"
            @click.prevent="submit()"
            label="Password"
            :rules="passwordRules"
            :type="value ? 'password' : 'text'"
            :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (value = !value)"
          >
            <v-spacer></v-spacer>
          </v-text-field>
          <!-- <v-checkbox label="Remember Me"></v-checkbox> -->
          <v-btn
            depressed
            color="primary"
            type="submit"
            class="el-button btn btn-primary btn-block btn-signin el-button--primary el-button--large"
            style="width: 100%; margin-top: 30px; margin-bottom: 20px"
          >
            <!----><!----><span>Sign In</span>
          </v-btn>
        </v-form>
      </v-container>
    </div>
  </v-app>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'Login',
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        value: String,
        valid: true,

        emailRules: [(v) => !!v || 'E-mail is required'],
        passwordRules: [
          (v) => !!v || 'Password is required',
          (v) => (v && v.length >= 5) || 'Password must 5 characters',
        ],
      }
    },

    methods: {
      ...mapActions({
        signIn: 'auth/signIn',
      }),

      submit() {
        this.signIn(this.form).then(() => {
          this.$router.replace({
            name: 'Home',
          })
        })
      },
    },
  }
</script>

<style scoped>
  .bigbk {
    height: 100%;
    width: 100%;
    background: url(https://dev.dashboard.edenfarm.tech/assets/images/bg1.jpg);
    position: relative;
    top: 0;
    right: 0;
  }
  .login-container {
    box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 500px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
</style>
