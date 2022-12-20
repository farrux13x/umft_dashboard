<template>
    <div class="common-layout main">
        <el-aside>
            <ElAside />
        </el-aside>
        <section class="wrapper">
            <el-header>
                <ElHeader />
            </el-header>
            <el-main id="main" v-loading="loading">
                <router-view />
            </el-main>
        </section>
    </div>
</template>

<script>
    import ElHeader from '@/components/ElHeader.vue'
    import ElAside from '@/components/ElAside.vue'
    // import {
    //     mapGetters
    // } from 'vuex'
    export default {
        components: {
            ElAside,
            ElHeader
        },
        computed: {
            // ...mapGetters([
            //     'loading'
            // ])
        },
        watch: {
            $route() {
                document.getElementById('main').scrollTo(0, 0)
            }
        }
    }
</script>

<style>

</style>