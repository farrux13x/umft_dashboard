<template>
    <el-row justify="space-between" class="mb-20">
        <h1>Sozlamalar</h1>
        <el-button type="primary" @click="clear()">
            <el-icon>
                <Plus/>
            </el-icon>
            Sozlama qo'shish
        </el-button>
    </el-row>
    <el-table :data="settings.settings" >
        <el-table-column label="№" prop="index" />
        <el-table-column label="name" prop="name" />
        <el-table-column label="slug" prop="slug" />
        <el-table-column label="value" prop="value" />
        <el-table-column align="right">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row._id)">
                    <el-icon><Edit /></el-icon>
                </el-button>
                <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.row._id)">
                    <el-icon><Delete /></el-icon>
                </el-button
                >
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="Yangi yo'nalish">
        <el-form :model="form" ref="validate">
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item prop="name" :rules="rules">
                        <el-input v-model="form.name" placeholder="Nomlanishi" />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item prop="slug" :rules="rules">
                        <el-input v-model="form.slug" placeholder="Nomlanishi" />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item prop="value" :rules="rules">
                        <el-input v-model="form.value" placeholder="Nomlanishi" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible=false">Cancel</el-button>
                <el-button type="primary" v-if="toggle" @click="add">Confirm</el-button>
                <el-button type="primary" v-else @click="change">Save</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'

export default {
    data(){
        return{
            rules:[{required:true,message:'Maydonni to`ldiring',trigger:['blur', 'change']}],
            form:{},
            toggle:true,
            dialogVisible:false,
        }
    },
    computed:{
        ...mapGetters([
            'url',
            'settings'
        ]),
    },
    methods:{
        ...mapActions([
            'allSettings',
            'addSettings',
            'editSettings',
            'saveSettings',
            'delSettings'
        ]),
        add(){
            this.addSettings(this.form)
            this.dialogVisible = false
        },
        change(){
            this.saveSettings(this.form)
            console.log(this.form)
            this.dialogVisible = false
            this.toggle = true
        },
        handleDelete(id){
            this.delSettings(id)
        },
        handleEdit(id){
            this.editSettings(id)
            .then(res =>{
                this.form = res.data
                this.dialogVisible = true
                this.toggle = false
            })
        },
        clear(){
            this.dialogVisible = true
            this.toggle = true
        }
    },
    mounted(){
        this.allSettings()
    }
}

</script>
<style lang="scss">
    .wrapper .el-table .el-button {
        width: unset;
    }
</style>