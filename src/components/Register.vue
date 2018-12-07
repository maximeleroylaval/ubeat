<template>
    <div class="container" v-on:>
        <div class="notification is-danger" hidden id="errorBox">
        </div>
        <div class="box center-box">
            <img src="@/assets/img/LogoTextOnly.png" alt="UBeat app" height="128">
            <h1 class="title form-label">Création de compte</h1>
            <label class="label form-label">Nom</label>
            <input type="text" placeholder="Nom" v-model="name" class="input form-input" id="nameInput" @keyup.enter="create"/>
            <label class="label form-label">Email</label>
            <input type="text" placeholder="Email" v-model="email" class="input form-input" id="emailInput" @keyup.enter="create"/>
            <label class="label form-label">Mot de passe</label>
            <input type="password" placeholder="Mot de passe" v-model="password" class="input form-input" id="passwordInput" @keyup.enter="create"/>
            <label class="label form-label">Confirmation de mot de passe</label>
            <input type="password" placeholder="Mot de passe" v-model="passwordConfirmation" class="input form-input" id="passwordInput2" @keyup.enter="create"/>
            <button v-on:click="create" class="button form-button" @mouseover="mouseOver" id="submitButton" @mouseout="mouseOut" >Créer son compte !</button>
        </div>
    </div>
</template>

<script>
  import * as api from '@/api';
  import router from '@/router';

  export default {
    name: 'Register',
    data() {
      return {
        email: '',
        password: '',
        passwordConfirmation: '',
        name: ''
      };
    },
    methods: {
      create() {
        this.hideError();
        const btn = document.getElementById('submitButton');
        let complete = true;
        btn.classList.add('is-loading');

        if (this.name === '' || this.name === null) {
          document.getElementById('nameInput').classList.add('is-danger');
          complete = false;
        }
        if (this.email === '' || this.email === null) {
          document.getElementById('emailInput').classList.add('is-danger');
          complete = false;
        }
        if (this.password === '' || this.password === null) {
          document.getElementById('passwordInput').classList.add('is-danger');
          complete = false;
        }
        if (this.passwordConfirmation === '' || this.passwordConfirmation === null) {
          document.getElementById('passwordInput2').classList.add('is-danger');
          complete = false;
        }
        if (complete) {
          if (!this.checkPasswordMatch()) {
            btn.classList.remove('is-loading');
            this.setError('Le mots de passe ne sont pas identiques');
            document.getElementById('passwordInput')
              .classList
              .add('is-danger');
            document.getElementById('passwordInput2')
              .classList
              .add('is-danger');
          } else {
            api.register(this.name, this.email, this.password).then(() => {
              this.$emit('registered');
              router.push('/login');
            }).catch(() => {
              this.setError('Email déjà pris');
              const email = document.getElementById('emailInput');
              email.classList.add('is-danger');
              btn.classList.remove('is-loading');
            });
          }
        } else {
          this.setError('Champs incomplets');
          btn.classList.remove('is-loading');
        }
      },
      setError(error) {
        const err = document.getElementById('errorBox');
        err.innerHTML = error;
        err.hidden = false;
      },
      hideError() {
        const err = document.getElementById('errorBox');
        const email = document.getElementById('emailInput');
        const password = document.getElementById('passwordInput');
        const password2 = document.getElementById('passwordInput2');
        const name = document.getElementById('nameInput');
        email.classList.remove('is-danger');
        name.classList.remove('is-danger');
        password.classList.remove('is-danger');
        password2.classList.remove('is-danger');
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
      checkPasswordMatch() {
        const password = document.getElementById('passwordInput');
        const password2 = document.getElementById('passwordInput2');
        return password.value === password2.value;
      }
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
