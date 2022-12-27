<template>
    <h1>Home</h1>
    <!-- <pre>{{settings.settings.length}}</pre> -->
    <el-row :gutter="12">
        <el-col :span="8">
            <el-card class="demo-progress" shadow="always" >
                <div>Xodimlar</div>
                <div>{{settings.settings.length}}/20</div>
                <el-progress :percentage="(settings.settings.length*100)/20"/>
            </el-card>
        </el-col>
        <el-col :span="8" class="mb-12">
            <el-card class="demo-progress" shadow="always" >
                <div>Yo'nalish</div>
                <div>{{settings.settings.length}}/20</div>
                <el-progress :percentage="(settings.settings.length*100)/20"/>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card class="demo-progress" shadow="always" >
                <div>Guruh</div>
                <div>{{settings.settings.length}}/20</div>
                <el-progress :percentage="(settings.settings.length*100)/20"/>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card class="demo-progress" shadow="always" >
                <div>O'quvchilar</div>
                <div>{{settings.settings.length}}/20</div>
                <el-progress :percentage="(settings.settings.length*100)/20"/>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card class="demo-progress" shadow="always">
                <div>Chiqimlar</div>
                <div>{{settings.settings.length}}/20</div>
                <el-progress :percentage="(settings.settings.length*100)/20"/>
            </el-card>
        </el-col>
        <el-col :span="8" class="mb-12">
            <el-card shadow="always" class="demo-progress">
                <div>Kassa</div>
                <div>{{settings.settings.length}}/20</div>
                <el-progress :percentage="(settings.settings.length*100)/20"/>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    methods:{
        ...mapActions([
            'countSettings',
            'allSettings',
        ])
    },
    computed:{
        ...mapGetters([
            'countSetting',
            'settings'
        ])
    },
    mounted(){
        this.allSettings()
    }
}
</script>
<style lang="scss">
.el-col-8 {
    margin-top: 20px;
}
</style>