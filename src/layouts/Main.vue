<template>
    <div>
        <md-toolbar>
            <md-button class="md-icon-button" @click.native="toggleRightSidenav">
                <md-icon>menu</md-icon>
            </md-button>

            <h2 class="md-title">My Files</h2>

            <span style="flex: 1"></span>

            <md-button class="md-icon-button">
                <md-icon>search</md-icon>
            </md-button>

            <md-button class="md-icon-button">
                <md-icon>view_module</md-icon>
            </md-button>
        </md-toolbar>

        <div>
            <div class="container">
                <slot></slot>
            </div>
        </div>

        <md-sidenav class="md-left" ref="rightSidenav">
            <md-toolbar class="md-account-header">
                <md-list class="md-transparent">
                    <md-list-item class="md-avatar-list">
                        <md-avatar class="md-large">
                            <img src="https://placeimg.com/64/64/people/8" alt="People">
                        </md-avatar>
                    </md-list-item>

                    <md-list-item>
                        <div class="md-list-text-container">
                            <span>{{username}}</span>
                            <span>{{email}}</span>
                        </div>


                        <md-menu>
                            <md-button md-menu-trigger class="md-icon-button md-list-action">
                                <md-icon>arrow_drop_down</md-icon>
                            </md-button>

                            <md-menu-content>
                                <md-menu-item @click.native="openDialog('dialog0')" v-if="!isLogedIn">Login</md-menu-item>
                                <md-menu-item @click.native="logout()" v-if="isLogedIn">Logout</md-menu-item>
                            </md-menu-content>
                        </md-menu>
                    </md-list-item>
                </md-list>
            </md-toolbar>

            <md-list>
                <v-link to="/">
                    <md-icon>insert_drive_file</md-icon> <span>Statistics</span>
                </v-link>

                <v-link to="/feed">
                    <md-icon>people</md-icon> <span>Feed</span>
                </v-link>
            </md-list>
        </md-sidenav>

        <md-dialog ref="dialog0">
            <md-dialog-title>Login / Signup</md-dialog-title>

            <md-dialog-content>
                <login v-on:login="onLogin"></login>
            </md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary" @click.native="closeDialog('dialog0')">Close</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
    import VLink from '../components/VLink.vue'
    import Login from '../components/Login.vue'
    import Helper from '../helpers/Helper.vue'

    import {router} from '../routes'

    export default {
        data() {
            return {
                isLogedIn: false,
                username: 'Anonimous',
                email: 'anonimous@hotmail.com'
            }
        },
        created: function () {
            if (this.$cookie.get('token')) {
                this.username = this.$cookie.get('username');
                this.email = this.$cookie.get('email');
                this.isLogedIn = true;
            }
        },
        methods: {
            openDialog(ref) {
                this.$refs[ref].open();
            },
            closeDialog(ref) {
                this.$refs[ref].close();
            },
            toggleRightSidenav() {
                this.$refs.rightSidenav.toggle();
            },
            closeRightSidenav() {
                this.$refs.rightSidenav.close();
            },
            open(ref) {
                console.log('Opened: ' + ref);
            },
            close(ref) {
                console.log('Closed: ' + ref);
            },
            onLogin(status) {
                if (status) {
                    this.closeDialog('dialog0');
                    this.toggleRightSidenav();
                    this.username = this.$cookie.get('username');
                    this.email = this.$cookie.get('email');
                    this.isLogedIn = true;
                }
            },
            logout() {
                this.unsetCookies();
                this.isLogedIn = false;
                router.go({
                    path: 'this.$route.path',
                    force: true
                })
            },
            unsetCookies () {
                this.$cookie.delete('username');
                this.$cookie.delete('email');
                this.$cookie.delete('token');
            }
        },
        components: {
            VLink,
            Login,
            Helper
        }
    }
</script>

<style scoped>
    .container {
        width: 100%;
        height: 60vh;
        margin: 0 auto;
    }
</style>