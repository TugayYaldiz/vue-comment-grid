<template>
  <div class="signBox">
    <div class="firstSign">
      <button v-if="!signUpBox && !signInBox" @click="clearSignBox('signUp')">Log IN</button>
      <span class="dot" v-if="!signUpBox && !signInBox" style="align-self:center">•</span>
      <button class="secondary" v-if="!signInBox && !signUpBox" @click="clearSignBox('signIn')">Sign UP</button>
    </div>
    <div class="signBoxes" v-if="signInBox">
      <form method="post" @submit="signIn($event);">
        <div class="inputBoxes">
          <input type="email" name="userEmail" id="userEmail" class="default" v-model="userEmail" ref="email" spellcheck="false" required>
          <span class="bar"></span>
          <label class="placeholder" :class="userEmail.length!=0 ? 'upperHolder':''">Email</label>
        </div>
        <div class="inputBoxes">
          <input type="password" name="userPassword" id="userPassword" class="default" v-model="userPassword" required>
          <span class="bar"></span>
          <label class="placeholder" :class="userPassword.length!=0 ? 'upperHolder':''">Password</label>
        </div>
        <div class="signIn" style="grid-column:2;">
          <button @click.prevent.self v-if="requestLoading"><div class="requestLoading"></div></button>
          <button v-else>Log IN</button>
        </div>
        <span class="dot or" style="grid-row:1/3;">•</span>
        <div class="signIn secondary" style="grid-column:4;">
          <button class="signIn" @click.prevent="clearSignBox('signIn')">Sign UP</button>
        </div>
        <transition name="fade">
          <div class="alert" v-if="alert" :class="alertClass" :key="alertClass" style="grid-column:1/5;">
            <div>{{alertMessage}}</div>
          </div>
        </transition>
      </form>
    </div>
    <div class="signBoxes" v-if="signUpBox">
      <form method="post" @submit="signUp($event);">
        <div class="inputBoxes">
          <input type="text" name="newUserName" id="newUserName" :class="checkNewUserName" v-model.lazy="newUserName" required ref="newUserName" spellcheck="false">
          <span class="bar"></span>
          <label class="placeholder" ref="namePlaceholder" :class="checkNewUserName">{{checkFailedName}}</label>
        </div>
        <div class="inputBoxes">
          <input type="email" name="newUserEmail" id="newUserEmail" :class="checkNewUserEmail" v-model.lazy="newUserEmail" required spellcheck="false">
          <span class="bar"></span> 
          <label class="placeholder" ref="emailPlaceholder" :class="checkNewUserEmail">{{checkFailedEmail}}</label>
        </div>
        <div class="inputBoxes">
          <input type="password" name="newUserPassword" id="newUserPassword" :class="checkNewUserPassword" v-model.lazy="newUserPassword" required>
          <span class="bar"></span> 
          <label class="placeholder" ref="passPlaceholder" :class="checkNewUserPassword">{{checkFailedPassword}}</label>
        </div>
        <div class="inputBoxes">
          <input type="password" name="newUserRePassword" id="newUserRePassword" :class="checkNewUserRePassword" v-model.lazy="newUserRePassword" required>
          <span class="bar"></span> 
          <label class="placeholder" ref="rePassPlaceholder" :class="checkNewUserRePassword">{{checkFailedRePassword}}</label>
        </div>
        <div class="signUp" style="grid-column:2;">
          <button @click.prevent.self v-if="requestLoading"><div class="requestLoading"></div></button>
          <button v-else>Sign Up</button>
        </div>
        <span class="dot or" style="grid-row:1/5;">•</span> 
        <div class="signUp secondary" style="grid-column:4;">
          <button @click.prevent="clearSignBox('signUp')">Log IN</button>
        </div>
        <transition name="fade">
          <div class="alert" v-if="alert" :class="alertClass" :key="alertClass" style="grid-column:1/5;">
            <div>{{alertMessage}}</div>
          </div>
        </transition>
      </form>
    </div>
  </div>  
</template>

<script>
  import axios from 'axios';
  const INSTANCE = axios.create({
    baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
  })
  export default {
    name: 'Sign',
    props: {
      baseURL: {
        type: String,
        required: true
      },
      apiKey: {
        type: String,
        required: true
      },
      maxUserNameLength: {
        type: String,
        default: '30'
      },
    },
    data() {
      return {
        idTokenD: null,
        userIdD: null,
        expiresInD: null,
        signInBox: false,
        signUpBox: false,
        userEmail: '',
        userPassword: '',
        newUserName: '',
        newUserEmail: '',
        newUserPassword: '',
        newUserRePassword: '',
        requestLoading: false,
      }
    },
    methods: {
      signUp(event) {
        if (event) event.preventDefault()
        this.alertMessage = ''
        if (this.checkNewUserName != 'pass') {
          this.$refs.namePlaceholder.classList.remove("shake")
          setTimeout(() => {
            this.$refs.namePlaceholder.className += " shake"
          }, 1);
        }
        if (this.checkNewUserEmail != 'pass') {
          this.$refs.emailPlaceholder.classList.remove("shake")
          setTimeout(() => {
            this.$refs.emailPlaceholder.className += " shake"
          }, 1);
        }
        if (this.checkNewUserPassword != 'pass') {
          this.$refs.passPlaceholder.classList.remove("shake")
          setTimeout(() => {
            this.$refs.passPlaceholder.className += " shake"
          }, 1);
        }
        if (this.checkNewUserRePassword != 'pass') {
          this.$refs.rePassPlaceholder.classList.remove("shake")
          setTimeout(() => {
            this.$refs.rePassPlaceholder.className += " shake"
          })
        }
        if (this.checkAllPass) {
          this.alert = false
          this.requestLoading = true;
          INSTANCE.post('/signupNewUser?key=' + this.apiKey, {
            email: this.newUserEmail,
            password: this.newUserPassword,
            returnSecureToken: true
          })
            .then(res => {
              this.idTokenD = res.data.idToken;
              this.userIdD = res.data.localId;
              this.expiresInD = res.data.expiresIn;     
              console.log(this.filterNewUserName);         
              console.log(this.newUserEmail);         
              console.log(this.userIdD);         
              axios
                .put(
                  this.baseURL +
                    "/commentUsers/" +
                    this.userIdD  +
                    ".json?auth=" +
                    this.idTokenD,
                  {
                    name: this.filterNewUserName,
                    email: this.newUserEmail,
                    user_id: this.userIdD
                  }
                )
                .then(res => {
                  const data = [
                    this.idTokenD,
                    this.userIdD,
                    this.filterNewUserName,
                    this.expiresInD,
                    null
                  ];
                  this.signUser(data);
                  this.setLocalStorageItems(
                    this.idTokenD,
                    this.userIdD,
                    this.expiresInD,
                    this.filterNewUserName
                  );
                  this.clearAlert();
                  this.clearSignPanel();
                })
                .catch(err => {
                  this.setAlert("Invalid Name or Email!\n", "fail");
                });
            })
            .catch(err => {
              this.setAlert('Email address has been taken or invalid Password or Email adress!\n', 'fail')
            })
        }
      },
      signIn(event) {
        if (event) event.preventDefault()
        this.requestLoading = true;
        INSTANCE.post('/verifyPassword?key=' + this.apiKey, {
          email: this.userEmail,
          password: this.userPassword,
          returnSecureToken: true
        })
          .then(res => {
            this.idTokenD = res.data.idToken
            this.userIdD = res.data.localId
            this.expiresInD = res.data.expiresIn
            axios.get(this.baseURL + '/commentUsers/' + this.userIdD + '.json' + '?auth=' + this.idTokenD )
              .then(res => {
                const data = [this.idTokenD, this.userIdD, res.data.name, this.expiresInD, res.data.admin]
                this.signUser(data)
                this.setLocalStorageItems(this.idTokenD, this.userIdD, this.expiresInD, res.data.name, res.data.admin)
                this.clearAlert()
                this.clearSignPanel()
              })
              .catch(err => this.setAlert('Unauthorized!\n', 'fail'))
          })
          .catch(err => this.setAlert('Wrong password or email!\n', 'fail'))
      },
      signUser(data) {
        this.$emit('sign-user', data)
      },
      setAlert(message, style, type) {
        type == 'append' ? this.alertMessage += message : this.alertMessage = message
        this.alertClass = style
        this.alert = true
        this.requestLoading = false;
        setTimeout(() => {
          this.clearAlert();
        }, 5000);
      },
      clearAlert() {
        this.requestLoading = false;
        this.alertMessage = ''
        this.alertClass = ''
        this.alert = false
      },
      clearSignPanel() {
        this.showSignPanel = false
        this.signInBox = false
        this.signUpBox = false
        this.userEmail = ''
        this.userPassword = ''
        this.newUserName = ''
        this.newUserEmail = ''
        this.newUserPassword = ''
        this.newUserRePassword = ''
      },
      clearSignBox(from) {
        if (from == 'signIn') {
          this.signInBox = false;
          this.signUpBox = true;
          this.$nextTick(() => {
            this.$refs.newUserName.focus();
          })
        } else {
          this.signInBox = true;
          this.signUpBox = false;
          this.$nextTick(() => {
            this.$refs.email.focus();
          })
        }
        this.clearAlert();
      },
      setLocalStorageItems(token, userId, expDate, userName, admin) {
        const now = new Date()
        const expirationDate = new Date(now.getTime() + expDate * 1000)
        localStorage.setItem('commentToken', token)
        localStorage.setItem('commentUserId', userId)
        localStorage.setItem('commentExpirationDate', expirationDate)
        localStorage.setItem('commentUserName', userName)
        localStorage.setItem('commentAdmin', admin)
      }
    },
    computed: {
      filterNewUserName() {
        return this.newUserName.replace(/^ +/g, '').replace(/ +/g, ' ').replace(/ +$/g, '')
      },
      checkNewUserName() {
        return this.newUserName.length > 0 ? this.newUserName.length <= 30 ? 'pass' : 'fail' : 'default'
      },
      checkNewUserEmail() {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return this.newUserEmail.length > 0 ? re.test(this.newUserEmail) ? 'pass' : 'fail' : 'default'
      },
      checkNewUserPassword() {
        return this.newUserPassword.length > 0 ? this.newUserPassword.length >= 8 ? 'pass' : 'fail' : 'default'
      },
      checkNewUserRePassword() {
        return this.newUserRePassword.length > 0 ? this.newUserRePassword == this.newUserPassword ? 'pass' : 'fail' : 'default'
      },
      checkFailedName() {
        return this.checkNewUserName == 'fail' ? 'Invalid name length! (Max: ' + this.maxUserNameLength + ')' : 'Username'
      },
      checkFailedEmail() {
        return this.checkNewUserEmail == 'fail' ? 'Invalid email address!' : 'Email'
      },
      checkFailedPassword() {
        return this.checkNewUserPassword == 'fail' ? 'Minnimum 8 character!' : 'Password'
      },
      checkFailedRePassword() {
        return this.checkNewUserRePassword == 'fail' ? 'Passwords doesn\'t match!' : 'Confirm Password'
      },
      checkAllPass() {
        return this.checkNewUserName == 'pass' && this.checkNewUserEmail == 'pass' && this.checkNewUserPassword == 'pass' && this.checkNewUserRePassword == 'pass' ? true : false
      }
    },
  }
</script>

<style scoped>
  .signBox {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: minmax(0, auto);
  }
  .firstSign {
    display: grid;
    grid-template-columns: 1fr 0.001fr 1fr;
    grid-auto-rows: minmax(0, auto);
    white-space: nowrap;
    grid-gap: 5px;
  }
  .firstSign > button,
  .signUp > button,
  .signIn > button {
    width: 100%;
    height: 100%;
    font-family: "Roboto", sans-serif;
    background-color: rgba(42, 94, 190, 0.9);
    color: #fff;
    box-sizing: border-box;
    padding: 8px 10px;
    font-size: 13px;
    line-height: 16px;
    font-weight: 700;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    outline: none;
    transition: linear 0.1s all;
    -moz-transition: linear 0.1s all;
    -webkit-transition: linear 0.1s all;
  }
  .firstSign > .secondary,
  .signUp.secondary > button,
  .signIn.secondary > button {
    border: 2px solid rgba(42, 94, 190, 0.9);
    background-color: #fff;
    color: rgba(42, 94, 190, 0.9);
  }
  .firstSign > button:hover,
  .signUp > button:hover,
  .signIn > button:hover {
    background-color: rgba(37, 75, 145, 0.9);
    color: #fff;
  }
  .signBoxes > form {
    display: grid;
    grid-template-columns: 0.001fr;
    grid-auto-columns: minmax(auto, -webkit-max-content);
    grid-auto-columns: minmax(auto, -moz-max-content);
    grid-auto-columns: minmax(auto, max-content);
    grid-auto-rows: minmax(0, auto);
    grid-gap: 10px;
    grid-column-gap: 5px;
    margin-bottom: 10px;
    padding-top: 10px;
  }
  .inputBoxes {
    grid-column: 1;
    display: grid;
    grid-template-columns: 0.001fr;
    grid-auto-rows: minmax(0, auto);
  }
  .inputBoxes > input {
    font-family: "Roboto", sans-serif;
    box-sizing: border-box;
    background-color: #fff;
    border: none;
    border-bottom: 2px solid #333;
    line-height: 12px;
    outline: none;
    padding: 10px 8px 2px;
    height: 30px;
    text-overflow: ellipsis;
    margin-left: 1px;
    margin-top: 2px;
    border-top-left-radius: 49px;
    border-top-right-radius: 49px;
  }
  .placeholder {
    grid-column: 1;
    align-self: center;
    justify-self: center;
    font-size: 12px;
    margin-top: -21px;
    pointer-events: none;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }
  .inputBoxes > input:focus ~ label {
    margin-top: -60px;
    color: #fff;
    box-sizing: border-box;
    font-size: 12px;
    padding: 2px 5px;
    border-radius: 18px;
    background-color: rgb(42, 94, 190);
  }
  .inputBoxes > .upperHolder {
    margin-top: -60px !important;
    color: #fff;
    box-sizing: border-box;
    font-size: 12px;
    padding: 2px 5px;
    border-radius: 18px;
    background-color: rgb(42, 94, 190);
  }
  .inputBoxes > .placeholder.pass {
    background-color: rgba(76, 175, 80, 1) !important;
    margin-top: -60px !important;
    color: #fff;
    box-sizing: border-box;
    font-size: 12px;
    padding: 2px 5px;
    border-radius: 18px;
  }
  .inputBoxes > .placeholder.fail {
    background-color: rgba(255, 82, 82, 1) !important;
    margin-top: -60px !important;
    color: #fff;
    box-sizing: border-box;
    font-size: 12px;
    padding: 2px 5px;
    border-radius: 18px;
  }
  .bar {
    position: relative;
  }
  .bar:before,
  .bar:after {
    content: "";
    height: 3px;
    width: 0;
    bottom: 0;
    position: absolute;
    background: rgb(42, 94, 190);
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }
  .bar:before {
    left: 50%;
  }
  .bar:after {
    right: 50%;
  }
  .inputBoxes > input:focus ~ .bar:before,
  input:focus ~ .bar:after {
    width: 50%;
  }
  .or {
    grid-column: 3;
    align-self: center;
    justify-self: center;
  }
  .signIn {
    grid-row: 1/3;
  }
  .signUp {
    grid-row: 1/5;
    align-self: stretch;
    justify-self: stretch;
  }
  @media (hover: none) {
    .signUp.secondary > button:hover,
    .signIn.secondary > button:hover {
      background-color: #fff;
      color: rgba(42, 94, 190, 0.9);
    }    
  }
  input:-webkit-autofill {
    animation-name: autofill;
    animation-fill-mode: both;
    -webkit-animation-name: autofill;
    -webkit-animation-fill-mode: both;
  }
  @keyframes autofill {
    to {
      color: #1d2129;
      border-top-left-radius: 49px;
      border-top-right-radius: 49px;
      background-color: #fff;
    }
  }
  @-webkit-keyframes autofill {
    to {
      color: #1d2129;
      border-top-left-radius: 49px;
      border-top-right-radius: 49px;
      background-color: #fff;
    }
  }
  .shake {
    animation-name: shakeKeyframe;
    animation-duration: 0.8s;
    animation-iteration-count: 1;
  }
  @keyframes shakeKeyframe {
    from,
    to {
      transform: translate3d(0, 0, 0);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translate3d(-10px, 0, 0);
    }

    20%,
    40%,
    60%,
    80% {
      transform: translate3d(10px, 0, 0);
    }
  }
</style>
