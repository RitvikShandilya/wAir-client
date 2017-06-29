<template>
    <chart :options="pie"></chart>
</template>

<script>
    import ECharts from 'vue-echarts/components/ECharts.vue'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/chart/pie'
    import 'echarts/lib/chart/map'
    import 'echarts/lib/chart/radar'
    import 'echarts/lib/chart/scatter'
    import 'echarts/lib/chart/effectScatter'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/polar'
    import 'echarts/lib/component/geo'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/visualMap'

    export default {
        name: 'light-sensor',
        components: {
            chart: ECharts
        },
        props: {
            statisticsLightData: {
                type: Array,
                required: true
            }
        },
        watch: {
            statisticsLightData: function () {
                this.pie.series[0].data = this.statisticsLightData;
            }
        },
        data: function () {
            return {
                pie: {
                    title: {
                        text: 'Light Sensor Data'
                    },
                    tooltip: {},
                    legend: {
                        data: ['Intensity']
                    },
                    xAxis: {
                        data: []
                    },
                    yAxis: {
                        axisLabel: {show: false}
                    },
                    series: [{
                        name: 'Intensity',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                }
            }
        }
    }
</script>

<style>
    .echarts {
        height: 300px;
    }
</style>