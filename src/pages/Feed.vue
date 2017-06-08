<template>
    <div class="fix-height">
        <main-layout>

            <md-list class="md-double-line">
                <md-subheader class="md-inset">Data from sensors</md-subheader>

                <md-list-item v-for="item in sensorData.items" :key="item.guid" @click.native="go(item.guid)">
                    <md-avatar class="md-avatar-icon">
                        <md-icon>folder</md-icon>
                    </md-avatar>

                    <div class="md-list-text-container">
                        <span>{{item.title}}</span>
                        <p>{{item.date | formatDate}}</p>
                    </div>

                    <!--<md-button class="md-icon-button md-list-action">-->
                        <!--{{item.comments.length}}-->
                        <!--<md-tooltip md-direction="left">Number of comments</md-tooltip>-->
                    <!--</md-button>-->
                </md-list-item>
            </md-list>

            <!--<md-button class="md-fab md-fab-bottom-right" @click.native="openDialog('dialog1')" v-if="isLogedIn">-->
                <!--<md-icon>add</md-icon>-->
            <!--</md-button>-->

            <!--<md-dialog ref="dialog1">-->
                <!--<md-dialog-title>Create Topic</md-dialog-title>-->

                <!--<md-dialog-content>-->
                    <!--<form novalidate @submit.stop.prevent="submit">-->
                        <!--<md-input-container>-->
                            <!--<label>Topic title</label>-->
                            <!--<md-input v-model="createTopicData.title"></md-input>-->
                        <!--</md-input-container>-->

                        <!--<md-input-container>-->
                            <!--<label>Topic desciription</label>-->
                            <!--<md-input v-model="createTopicData.description"></md-input>-->
                        <!--</md-input-container>-->
                    <!--</form>-->
                <!--</md-dialog-content>-->

                <!--<md-dialog-actions>-->
                    <!--<md-button class="md-primary" @click.native="createTopic()">Add</md-button>-->
                    <!--<md-button class="md-primary" @click.native="closeDialog('dialog1')">Close</md-button>-->
                <!--</md-dialog-actions>-->
            <!--</md-dialog>-->
        </main-layout>
    </div>
</template>

<script>
    import axios from 'axios'
    import * as _ from 'lodash'
    import deepstream from 'deepstream.io-client-js'
    import MainLayout from '../layouts/Main.vue'
    import Helper from '../helpers/Helper.vue'

    import {router} from '../routes'

    export default {
        data() {
            return {
                isLogedIn: false,
                errors: [],
                sensorData: {
                    items: [],
                    meta: {
                        total: 0
                    }
                },
                connectionState: 'INITIAL'
            }
        },
        created: function () {
            if (this.$cookie.get('token')) {
                this.isLogedIn = true;
            }
            this.getFeed();
            this.client = deepstream('localhost:6020')
                .login()
                .on('connectionStateChanged', connectionState => {
                    console.log(connectionState);
                    this.$data.connectionState =  connectionState
                });

            this.client.event.subscribe( 'iot', ( data ) => {
                this.$data.sensorData.items.push(data);
                this.$data.sensorData.meta.total = data.length;
            });
        },
        computed: {
//            sort: function () {
//                return this.sensorData.sort(function(a, b) {
//                    return new Date(b.date) - new Date(a.date);
//                });
//            }
        },
        methods: {
            openDialog(ref) {
                this.$refs[ref].open();
            },
            closeDialog(ref) {
                this.$refs[ref].close();
            },
            getFeed () {
                Helper.methods.getModule(Helper.data().sensor, (data) => {
                    this.sensorData.items = data;
                    this.sensorData.meta.total = data.length;
                })
            }
        },
        filters: {
            formatDate: (value) => Helper.methods.formatDate(value)
        },
        components: {
            MainLayout,
            Helper
        }
    }
</script>

<style>
    .fix-height {
        height: 100vh;
        overflow-y: scroll;
    }
</style>