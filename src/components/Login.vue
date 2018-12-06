<template @keyup.enter="login">
    <div class="container" v-on:>
        <div class="notification is-danger" hidden id="errorBox">
            <button class="delete" v-on:click="hideError"></button>
            Email/Mot de passe incorrects
        </div>
        <div class="box center-box">
            <img src="@/assets/img/LogoTextOnly.png" alt="UBeat app" height="128">
            <label class="label form-label">Email</label>
            <input type="text" placeholder="Email" v-model="email" class="input form-input" id="emailInput"/>
            <label class="label form-label">Mot de passe</label>
            <input type="password" placeholder="Mot de passe" v-model="password" class="input form-input" id="passwordInput"/>
            <button v-on:click="login" class="button form-button" @mouseover="mouseOver" id="submitButton" @mouseout="mouseOut" >Se connecter</button>
        </div>
        <router-link :to="'register'">Pas encore inscrit ? C'est par ici</router-link>
    </div>
</template>

<script>
  import router from '@/router';
  import * as api from '@/api';

  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      login() {
        const btn = document.getElementById('submitButton');
        btn.classList.add('is-loading');
        api.user.email = this.email;
        api.user.password = this.password;
        api.login().then((r) => {
          api.user.accessToken = r.data.token;
          this.$emit('logged');
          router.push({ path: '/' });
        }).catch(() => {
          const err = document.getElementById('errorBox');
          const email = document.getElementById('emailInput');
          const password = document.getElementById('passwordInput');
          email.classList.add('is-danger');
          password.classList.add('is-danger');
          err.hidden = false;
          btn.classList.remove('is-loading');
        });
      },
      hideError() {
        const err = document.getElementById('errorBox');
        const email = document.getElementById('emailInput');
        const password = document.getElementById('passwordInput');
        email.classList.remove('is-danger');
        password.classList.remove('is-danger');
        err.hidden = true;
      },
      mouseOver() {
        const btn = document.getElementById('submitButton');
        btn.classList.add('is-link');
      },
      mouseOut() {
        const btn = document.getElementById('submitButton');
        btn.classList.remove('is-link');
      },
    }
  };
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;
    }
    .center-box {
        display: flex;
        flex-direction: column;
        align-content: center;
        max-width: 500px;
    }
    .form-label {
        margin-top: 20px;
    }
    .form-input {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .form-button {
        margin-top: 30px;
        margin-bottom: 10px;
    }
    #errorBox {
        max-width: 500px;
        min-width: 420px;
    }
</style>
