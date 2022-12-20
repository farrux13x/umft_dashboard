<template>
    <aside class="aside">
        <img src="@/assets/logo.png" alt="" class="aside__logo">
        <div class="aside__btns">
            <span @click="toggle = 0" :class="`${toggle == 0 ? 'active' : ''}`">
                <el-icon>
                    <house />
                </el-icon>
            </span>
            <span @click="toggle = 1" :class="`${toggle == 1 ? 'active' : ''}`">
                <el-icon><Message /></el-icon>
            </span>
        </div>
        <div :class="`aside__links ${toggle == 0 ? 'active' : ''}`">
            <router-link to="/">
                <el-icon>
                    <house />
                </el-icon>
                Bosh sahifa
            </router-link>
            <router-link to="/schedule/all">
                <el-icon>
                    <calendar />
                </el-icon>
                Yo'nalishlar
            </router-link>
            <router-link to="/department">
                <el-icon>
                    <grid />
                </el-icon>
                Sahifalar
            </router-link>
            <router-link to="/subject">
                <el-icon>
                    <document />
                </el-icon>
                Savol javob
            </router-link>
            <router-link to="/group">
                <el-icon>
                    <user-filled />
                </el-icon>
                Sozlamalar
            </router-link>
        </div>
        <div :class="`aside__links ${toggle == 1 ? 'active' : ''}`">
            <router-link to="/">
                <el-icon><ChatSquare /></el-icon>
                Xabarlar
            </router-link>
            <router-link to="/schedule/all">
                <el-icon><Histogram /></el-icon>
                Jadval
            </router-link>
        </div>
    </aside>
</template>

<script>
    export default {
        data: () => ({
            toggle: 0
        })
    }
</script>

<style lang="scss">
@import '../styles/var.scss';

.aside {
    width: 250px;
    height: 100vh;
    overflow: auto;
    padding: 10px 30px;
    display: flex;
    flex-direction: column;
    &__btns {
        display: flex;
        margin-top: 20px;
        margin-bottom: 40px;
        span {
            flex:1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            padding: 10px;
            border-radius: 10px;
            cursor: pointer;
            &.active {
                background-color: $green;
                color: #fff;
            }
        }
    }
    &__logo {
        max-width: 100%;
    }
    &__links {
        
        display: flex;
        flex-direction: column;
        gap:20px;
        flex: 1;
        opacity: 0;
        max-height: 0;
        overflow: hidden;
        transition: 0.3s;
        display: none;
        &.active {
            display: flex;
            opacity: 1;
            max-height: 100vh;
        }
        span,
        a {
            cursor: pointer;
            display: flex;
            align-items: center;
            height: 40px;
            font-size: 15px;
            gap:10px;
            padding: 0 15px;
            border-radius: 10px;
            color: $black;
            background-color: #f1f1f1;
            &.router-link-active,
            &:hover {
                background-color: $green;
                color: #fff;

            }
        }
        span {
            background-color: $red;
            color: #fff;
        }
    }
}
    // @import '@/styles/part/aside.scss';
</style>