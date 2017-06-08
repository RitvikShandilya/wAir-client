<template>
    <!--<router-link to="/forum">Forum</router-link>-->
    <md-list-item @click.native="go(to)" class="md-primary">
        <slot></slot>
    </md-list-item>
</template>

<script>
    import {router} from '../routes'

    export default {
        props: {
            to: {
                type:String,
                required: true
            }
        },
        methods: {
            go (to) {
                router.push({ path: to })
            }
        }
    }
</script>