<template>
    <div class="fix-height">
        <main-layout>

            <md-list class="md-double-line">
                <md-subheader class="md-inset">Data from sensors</md-subheader>
                    <md-list-item v-for="item in showLatest" :key="item.guid" @click.native="openDialog('dialog1', item)">
                        <md-avatar class="md-avatar-icon">
                            <md-icon>folder</md-icon>
                        </md-avatar>

                        <div class="md-list-text-container">
                            <span>{{item.title}}</span>
                            <p>{{item.date | formatDate}}</p>
                        </div>
                    </md-list-item>
            </md-list>

            <md-dialog ref="dialog1">
                <md-dialog-title>Sensor read details</md-dialog-title>

                <md-dialog-content>
                    <div class="">
                        some description ...
                    </div>
                </md-dialog-content>

                <md-dialog-actions>
                    <md-button class="md-primary" @click.native="closeDialog('dialog1')">Close</md-button>
                </md-dialog-actions>
            </md-dialog>
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
                sensorDetails: {},
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
                    this.$data.connectionState =  connectionState
                });

            this.client.event.subscribe( 'iot', ( data ) => {
                this.$data.sensorData.items.push(data);
                this.$data.sensorData.meta.total = data.length;
            });
        },
        computed: {
            showLatest: function() {
                let dataToReturn = [];
                this.sort(this.sensorData.items, (data) => {
                    dataToReturn = this.limit(data);
                })
                return dataToReturn;
            }
        },
        methods: {
            openDialog(ref, data) {
                if (data !== undefined) {
                    this.sensorDetails = data;
                }
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
            },
            sort (data, cb) {
                cb(data.sort(function(a, b) {
                    return new Date(b.date) - new Date(a.date);
                }));
            },
            limit (data) {
                return data.splice(0, 10);
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