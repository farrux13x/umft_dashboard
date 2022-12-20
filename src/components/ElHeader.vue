<template>
    <header class="header">
        <el-container>
            <h2>Hayrli kech Adminbek</h2>
            <el-input class="ml-a" v-model="search" placeholder="Qidiruv" clearable />
            <el-button class="ml-1">
                <el-icon><bell/></el-icon>
            </el-button>
        </el-container>
    </header>
</template>

<script>
export default {
    data: () =>  ({
        search:''
    })
}
</script>

<style lang="scss">
@import '@/styles/part/header.scss';
</style>