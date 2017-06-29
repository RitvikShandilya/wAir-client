<script>
    import moment from 'moment'
    import axios from 'axios';
    const api = 'http://localhost:3000/api/v1';

    export default {
        data() {
            return {
                errors: [],
                login: `${api}/login`,
                signup: `${api}/signup`,
                sensor: `${api}/sensor`,
                statisticsLight: `${api}/statistics/light`,
                statisticsAir: `${api}/statistics/air`
            }
        },
        methods: {
            formatDate: function (value) {
                if (value) {
                    return moment(String(value)).format('dddd, MMMM Do YYYY, h:mm:ss a')
                }
            },
            getModule: function (route, cb) {
                axios.get(route)
                    .then(response => {
                        cb(response.data)
                    })
                    .catch(e => {
                        console.log(e)
//                        this.errors.push(e)
                    })
            },
            postModule: function (route, data, cb) {
                axios.post(route, data)
                    .then(response => {
                        cb(response.data)
                    })
                    .catch(e => {
                        console.log(e)
//                        this.errors.push(e)
                    })
            },
            putModule: function (route, data, cb) {
                axios.put(route, data)
                    .then(response => {
                        cb(response)
                    })
                    .catch(e => {
//                        this.errors.push(e)
                    })
            }
        }
    }
</script>