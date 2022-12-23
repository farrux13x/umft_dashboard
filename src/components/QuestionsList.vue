<template>
    <el-row justify="space-between" class="mb-20">
        <h1>Savol javoblar</h1>
        <el-button type="primary" @click="clear()">
            <el-icon>
                <Plus />
            </el-icon>
            Yangi savol
        </el-button>
    </el-row>
    <el-dialog v-model="dialogVisible"  title="Yangi savol qo'shish" width="60%">
        <el-form :model="form" ref="validate">
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item prop="question" :rules="rules" >
                        <el-input :rows="5" type="textarea" v-model="form.question" placeholder="Savol matni" />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item prop="answer" :rules="rules" >
                        <el-input :rows="5" type="textarea" v-model="form.answer" placeholder="Javob matni" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Bekor qilish</el-button>
                <el-button type="primary" v-if="!toggle" @click="add">
                    Qo'shish
                </el-button>
                <el-button type="primary" v-else @click="change">
                    O'zgartirish
                </el-button>
            </span>
        </template>
    </el-dialog>
    <el-table :data="allFaq.faq" height="481">
            <el-table-column label="№" prop="index" />
            <el-table-column label="Savol" prop="question" />
            <el-table-column label="Holati" prop="status" />
            <el-table-column label="Holati" >
                <template #default="scope">
                    <el-tag >{{scope.row.status}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Javob" prop="answer" />
            <el-table-column align="right">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row._id)"
                        >
                        <el-icon><Edit /></el-icon>
                    </el-button
                    >
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.row._id)"
                        >
                        <el-icon><Delete /></el-icon>
                    </el-button
                    >
                </template>
            </el-table-column>
        </el-table>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        data() {
            return {
                dialogVisible: false,
                toggle: false,
                rules: [{ required: true, message: 'Maydonni to`ldiring', trigger: ['blur', 'change']}],
                form: {
                    question: '',
                    slug: '',
                }
            }
        },
        computed: {
        ...mapGetters([
            'url',
            'allFaq'
        ])
        },
        methods: {
            ...mapActions([
                'faq',
                'allFaqs',
                'delFaq',
                'editFaq',
                'saveFaq'
            ]),
            clear(){
                this.dialogVisible = true, 
                this.toggle = false
                this.form={}
            },
            handleEdit(id){
                this.editFaq(id)
                .then(res =>{
                    this.form = res.data
                    this.dialogVisible = true
                    this.toggle = true
                })
            },
            handleDelete(id){
                this.delFaq(id)
            },
            change(){
                this.saveFaq(this.form)
                this.dialogVisible = false
                this.form = {}
            },
            add() {
                this.$refs['validate'].validate((valid) => {
                    if (valid) {
                        this.faq(this.form)
                        this.dialogVisible = false
                    }else{
                        this.dialogVisible = true
                        return false;
                    }
                });
            }
        },
        mounted(){
            this.allFaqs()
        }
    }
</script>

<style lang="scss">
    .wrapper .el-table .el-button {
        width: unset;
    }
    .el-form-item__label {
        position: absolute;
        top: -28px;
        left: 0;
    }
    .table__img{
        width: 100px;
        height: 100px;
        object-fit: contain;
    }
    .el-form-item {
        position: relative;
    }
    .el-form-item__content {
        margin-bottom: 15px;
    }
</style>