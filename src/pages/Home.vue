<template>
    <div class="fix-height">

        <main-layout>

            <md-layout md-gutter>
                <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="50" md-flex-large="50">

                    <md-card class="card-fix amber">
                        <md-card-media>
                            <!--<img class="card-image" src="../public/icons/air.png" alt="Air">-->
                            <light-sensor  v-bind:statisticsLightData="statisticsLightData"></light-sensor>

                        </md-card-media>

                        <!--<md-card-header>-->
                            <!--<div class="md-title fix-title">Air sensor data</div>-->
                        <!--</md-card-header>-->

                        <md-card-actions>
                            <md-button class="blue-grey" id="custom" @click.native="openDialog('dialog1')">
                                Read more
                            </md-button>
                        </md-card-actions>
                    </md-card>

                </md-layout>

                <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="50" md-flex-large="50">

                    <md-card class="card-fix amber">
                        <md-card-media>
                            <air-sensor  v-bind:statisticsAirData="statisticsAirData"></air-sensor>

                        </md-card-media>

                        <!--<md-card-header>-->
                            <!--<div class="md-title fix-title">Air sensor data</div>-->
                        <!--</md-card-header>-->

                        <md-card-actions>
                            <md-button class="blue-grey" id="custom" @click.native="openDialog('dialog1')">
                                Read more
                            </md-button>
                        </md-card-actions>
                    </md-card>

                </md-layout>
            </md-layout>
        </main-layout>

        <md-dialog ref="dialog1">
            <md-dialog-title>Air sensor details data</md-dialog-title>

            <md-dialog-content>
                <!--<light-sensor  v-bind:statisticsData="statisticsData"></light-sensor>-->
            </md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary" @click.native="closeDialog('dialog1')">Close</md-button>
            </md-dialog-actions>
        </md-dialog>

    </div>
</template>

<script>
    import axios from 'axios';
    import deepstream from 'deepstream.io-client-js'

    import Helper from '../helpers/Helper.vue'
    import MainLayout from '../layouts/Main.vue'
    import LightSensor from '../components/LightSensor.vue'
    import AirSensor from '../components/AirSensor.vue'

    export default {
        data () {
            return {
                isLogedIn: false,
                loading: true,
                errors: [],
                statisticsLightData: [],
                statisticsAirData: {},
                category: 'all'
            }
        },
        created: function () {
            if (this.$cookie.get('token')) {
                this.isLogedIn = true;
            }
            this.getLightStatistics();
            this.getAirStatistics();
            this.loading = false;

            this.client = deepstream('localhost:6020')
                .login()
                .on('connectionStateChanged', connectionState => {
                    this.$data.connectionState =  connectionState
                });

            this.client.event.subscribe( 'iot/light', ( data ) => {
                this.statisticsLightData = data;
            });
            this.client.event.subscribe( 'iot/air', ( data ) => {
                this.statisticsAirData = data;
            });
        },
        methods: {
            openDialog(ref) {
                this.$refs[ref].open();
            },
            closeDialog(ref) {
                this.$refs[ref].close();
            },
            filterByCategory(filterName) {
                this.category = filterName
            },
            getLightStatistics() {
                Helper.methods.getModule(Helper.data().statisticsLight, (data) => {
                    this.statisticsLightData = data
                });
            },
            getAirStatistics() {
                Helper.methods.getModule(Helper.data().statisticsAir, (data) => {
                    this.statisticsAirData = data
                });
            }
        },
        components: {
            MainLayout,
            LightSensor,
            AirSensor
        }
    }
</script>

<style scoped>
    .fix-height {
        height: 100vh;
        overflow-y: scroll;
    }

    .card-fix {
        margin: 15px;
    }
    .card-image {
        max-width: 300px;
        min-height: 250px;
        height: 100%;
    }
    .fix-title {
        white-space: nowrap !important;
        width: 250px !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
    }

    .article-image {
        background: #e7f0f4;
        height: 250px;
        padding: 20px 200px;
    }

    .article-image img {
        height: 100%;
    }

    /*colors*/
    .light-green {
        background: #8BC34A;
    }

    .light-green-text {
        color: #8BC34A !important;
    }

    .lime {
        background: #CDDC39;
    }

    .amber {
        background: #FFC107;
    }

    .amber-text {
        color: #FFC107 !important;
    }

    .brown {
        background: #795548;
    }

    .brown-text {
        color: #795548 !important;
    }

    .blue-grey {
        color: #607D8B;
    }
</style>