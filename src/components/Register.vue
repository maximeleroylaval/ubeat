<template>
    <div class="container">
        <div class="notification is-success" hidden id="confirmationBox">
            Account created, redirecting to sign in page in {{ sec }} seconds ...
        </div>
        <div class="notification is-danger" hidden id="errorBox">
        </div>
        <div class="box center-box">
            <img src="@/assets/img/LogoTextOnly.png" alt="UBeat app" height="128">
            <h1 class="title form-label">Create an account</h1>
            <label class="label form-label">Name</label>
            <input type="text" placeholder="Name" v-model="name" class="input form-input" id="nameInput" @keyup.enter="create"/>
            <label class="label form-label">Email</label>
            <input type="text" placeholder="Email" v-model="email" class="input form-input" id="emailInput" @keyup.enter="create"/>
            <label class="label form-label">Password</label>
            <input type="password" placeholder="Password" v-model="password" class="input form-input" id="passwordInput" @keyup.enter="create"/>
            <label class="label form-label">Password confirmation</label>
            <input type="password" placeholder="Password confirmation" v-model="passwordConfirmation" class="input form-input" id="passwordInput2" @keyup.enter="create"/>
            <button v-on:click="create" class="button form-button" @mouseover="mouseOver" id="submitButton" @mouseout="mouseOut" >Create</button>
        </div>
        <router-link :to="'login'">Back to log in</router-link>
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
        name: '',
        sec: 5
      };
    },
    methods: {
      create() {
        this.sec = 5;
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
            this.setError('Password aren\'t identical');
            document.getElementById('passwordInput')
              .classList
              .add('is-danger');
            document.getElementById('passwordInput2')
              .classList
              .add('is-danger');
          } else {
            api.register(this.name, this.email, this.password).then(() => {
              document.getElementById('confirmationBox').hidden = false;
              setInterval(() => { this.sec -= 1; }, 1000);
              setTimeout(() => { router.push('/login'); }, 5000);
            }).catch(() => {
              this.setError('Email already taken');
              const email = document.getElementById('emailInput');
              email.classList.add('is-danger');
              btn.classList.remove('is-loading');
            });
          }
        } else {
          this.setError('Missing fields');
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
