<template>
    <div class="message__table">
        <div class="message__title" @click="$router.push(`/`)">Xabarlar</div>
        <div class="message__search">
            <el-icon>
                <Search />
            </el-icon>
            <input type="text" placeholder="Qidirish…">
        </div>
        <div class="user" v-for="item of getUser" :key="item">
            <el-badge @click="$router.push(`/chat/${item._id}`), item.msgCount = 0" :value="item.msgCount"
                :hidden="badge(item.msgCount)" class="item" type="primary">
                <div class="user__name">{{item.user}}</div>
                <div class="user__message" v-show="item.lastMsg.message">{{item.lastMsg.message}}</div>
                <div class="user__message" v-show="item.lastMsg.img">rasm</div>
                <div class="user__data">{{date(item.lastMsg.date)}}</div>
            </el-badge>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['getUser'],
        methods: {
            badge(val) {
                return val > 0 ? false : true
            },
            date(val) {
                let date = new Date()
                return `${date.getDate(val)}.${date.getMonth(val)+1}.${date.getFullYear(val)}`
            }
        }
    }
</script>
<style lang="scss" scoped>
@import '../styles/app.scss';
</style>