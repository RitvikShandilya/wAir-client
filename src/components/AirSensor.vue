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
        name: 'air-sensor',
        components: {
            chart: ECharts
        },
        props: {
            statisticsAirData: {
                type: Object,
                required: true
            }
        },
        watch: {
            statisticsAirData: function () {
                this.pie.series[0].data[0].value = this.statisticsAirData.pm03;
                this.pie.series[0].data[1].value = this.statisticsAirData.pm25;
                this.pie.series[0].data[2].value = this.statisticsAirData.pm10;
            }
        },
        data: function () {
            return {
                pie: {
                    title: {
                        text: 'Air Sensor Pollution',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['PM 0.3', 'PM 2.5', 'PM 10']
                    },
                    series: [
                        {
                            name: 'light',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                {value: 1, name: 'PM 0.3'},
                                {value: 2, name: 'PM 2.5'},
                                {value: 3, name: 'PM 10'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
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