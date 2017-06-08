<template>
    <div>
        <div class="login" v-if="loginShow">
            <form novalidate @submit.stop.prevent="submit">
                <md-input-container>
                    <label>Username</label>
                    <md-input v-model="loginData.username"></md-input>
                </md-input-container>

                <md-input-container md-has-password>
                    <label>Password</label>
                    <md-input type="password" v-model="loginData.password"></md-input>
                </md-input-container>
            </form>

            <md-button class="md-primary" @click.native="login()">Login</md-button>
            <md-button class="md-primary" @click.native="toSignup()">I need account</md-button>
        </div>
        <div class="signup" v-if="!loginShow">
            <form novalidate @submit.stop.prevent="submit">
                <md-input-container>
                    <label>Email</label>
                    <md-input v-model="signupData.email"></md-input>
                </md-input-container>

                <md-input-container>
                    <label>Username</label>
                    <md-input v-model="signupData.username"></md-input>
                </md-input-container>

                <md-input-container md-has-password>
                    <label>Password</label>
                    <md-input type="password" v-model="signupData.password"></md-input>
                </md-input-container>

                <md-input-container md-has-password>
                    <label>Repeat Password</label>
                    <md-input type="password" v-model="signupData.passwordRepeat"></md-input>
                </md-input-container>
            </form>

            <md-button class="md-primary" @click.native="signup()">Signup</md-button>
            <md-button class="md-primary" @click.native="toLogin()">I have account</md-button>
        </div>
    </div>

</template>

<script>
    import Helper from '../helpers/Helper.vue'

    import {router} from '../routes'

    export default {
        name: "login",
        data() {
            return {
                loginShow: true,
                loginData: {
                    username: '',
                    password: ''
                },
                signupData: {
                    email: '',
                    username: '',
                    password: '',
                    passwordRepeat: ''
                }
            }
        },
        methods: {
            login () {
                Helper.methods.postModule(Helper.data().login, this.loginData, (data) => {
                    this.setCookies(data);
                    this.$emit('login', true);
                    this.loginData = {};
                    router.go({
                        path: 'this.$route.path',
                        force: true
                    })
                });
            },
            signup () {
                Helper.methods.postModule(Helper.data().signup, this.signupData, (data) => {
                    this.setCookies(data);
                    this.$emit('login', true);
                    this.signupData = {};
                    router.go({
                        path: 'this.$route.path',
                        force: true
                    })
                });
            },
            toSignup () {
                this.loginShow = false;
            },
            toLogin () {
                this.loginShow = true;
            },
            setCookies (data) {
                this.$cookie.set('username', data.data.username, { expires: '1D' });
                this.$cookie.set('email', data.data.email, { expires: '1D' });
                this.$cookie.set('token', data.token, { expires: '1D' });
            }
        }
    }
</script>