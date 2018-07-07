<template>
    <section class="app">
        <section class="this_section">
            <!-- <nav class="this_nav">

            </nav> -->
            <router-view class="view router"></router-view>
        </section>
    </section>
</template>
<script>
    // import Default from './component/default'
export default {
    name: 'app',
    // components:{Default},
    data() {
        return {

        };
    },
    methods: {

    }
}
</script>
<style lang="less" scoped>

</style>
