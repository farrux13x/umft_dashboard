<template>
    <el-row justify="space-between" class="mb-20">
        <h1>Sahifalar</h1>
        <el-button type="primary" @click="clear()">
            <el-icon>
                <Plus />
            </el-icon>
            Yangi sahifa qo'shish
        </el-button>
    </el-row>
    <el-dialog v-model="dialogVisible"  title="Yangi yo'nalish" width="70%">
        <el-form :model="form" ref="validate">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item prop="title" :rules="rules" label="Nomlanishi" >
                        <el-input v-model="name" placeholder="Nomlanishi" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="slug" :rules="rules" label="Slogan url">
                        <el-input v-model="form.slug" placeholder="slogan" />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="Matni" prop="text" :rules="rules" >
                        <quill-editor ref="quillEditor" toolbar="full" contentType="html" v-model:content="form.text">
                        </quill-editor>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="type" :rules="rules"  label="Yo'nalish turi">
                        <el-select v-model="form.type" placeholder="Oddiy sahifa">
                            <el-option label="Oddiy sahifa" value="simple" />
                            <el-option label="FAQ style" value="faq__list" />
                            <el-option label="Qabul style" value="admission" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Rasm" prop="slug" :rules="img" >
                        <el-upload
                        ref="upload"
                            v-model:file-list="img"
                            class="upload-demo"
                            :on-remove="handleRemove"
                            :action="`${url}/page/image`"
                            :limit="1"
                            :auto-upload="true"
                        >
                            <el-button type="primary">Click to upload</el-button>
                        </el-upload>

                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" v-if="!toggle" @click="add">
                    Confirm
                </el-button>
                <el-button type="primary" v-else @click="change">
                    Save
                </el-button>
            </span>
        </template>
    </el-dialog>
    <el-table :data="allPage.page" height="481">
            <el-table-column label="№" prop="index" />
            <el-table-column label="Rasm" prop="img">
                <template #default="scope">
                    <img class="table__img" :src="`${url}/${scope.row.img}`" alt="">
                </template>
            </el-table-column>
            <el-table-column label="Yo'nalish nomi" prop="title" />
            <el-table-column label="URI" prop="slug" />
            <el-table-column label="O'qish turi" prop="type" />
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
    import {QuillEditor} from '@vueup/vue-quill'
    import {mapGetters, mapActions} from 'vuex'
    import '@vueup/vue-quill/dist/vue-quill.snow.css';
    export default {
        data() {
            return {
                dialogVisible: false,
                toggle: false,
                name:'',
                img:[],
                rules: [{ required: true, message: 'Maydonni to`ldiring', trigger: ['blur', 'change']}],
                form: {
                    title: '',
                    slug: '',
                    img: '',
                    text: 0,
                    type: '',
                }
            }
        },
        components: {
            QuillEditor
        },
        computed: {
        ...mapGetters([
            'url',
            'allPage'
        ])
        },
        methods: {
            // ...mapMutations([
            //     'socketChatMessage',
            //     'socketOtherMutation',
            //     'socketViewing'
            // ]),
            ...mapActions([
                'page',
                'allPages',
                "delPageImg",
                'delPage',
                'editPage',
                'savePage'
            ]),
            clear(){
                this.dialogVisible = true, 
                this.toggle = false
                this.form={}
                this.form.img='', 
                this.form.text=''
            },
            handleRemove(file){
                this.delPageImg(file)
            },
            handleEdit(id){
                this.editPage(id)
                .then(res =>{
                    this.form = res.data
                    this.dialogVisible = true
                    this.toggle = true
                })
            },
            handleSuccess(response, uploadFile){
                this.img = response
                this.center.logo = URL.createObjectURL(uploadFile.raw)
            },
            handleDelete(id){
                this.delPage(id)
            },
            change(){
                this.savePage(this.form)
                this.dialogVisible = false
                this.form = {}
            },
            add() {
                this.$refs['validate'].validate((valid) => {
                    if (valid) {
                        if(this.img.length>0){
                            this.form.img = this.img[0].response
                            this.dialogVisible = false
                            this.page(this.form)
                        }
                    }else{
                        this.dialogVisible = true
                        return false;
                    }
                });
            }
        },
        watch:{
            name(val){
                this.form.title = val
                this.form.slug = val.split(' ').join('-').toLowerCase()
            }
        },
        mounted(){
            this.allPages()
        }
    }
</script>

<style lang="scss">
    .ql-toolbar.ql-snow {
        width: 100%;
    }
    .wrapper .el-table .el-button {
        width: unset;
    }
    .ql-toolbar.ql-snow+.ql-container.ql-snow {
        width: 100%;
    }

    .custom-file-input::-webkit-file-upload-button {
        display: none;
    }
    .custom-file-input::before {
        content: 'Select some files';
        display: inline-block;
        border: 1px solid #606266;
        border-radius: 3px;
        color: #606266;
        padding: 5px 8px;
        white-space: nowrap;
        cursor: pointer;
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
    .el-table .el-table__cell {
        padding: 0;
    }
    .el-table th.el-table__cell.is-leaf {
        padding: 8px 0;
    }
    .el-col-24 {
        margin-bottom: 115px;
        .el-form-item__error {
            top: 230px;
        }
    }
    .el-upload-list {
        margin: 0;
    }
    .el-col-24:last-child {
        margin-bottom: 0;
        .el-form-item__error {
            top: 34px;
        }
    }
</style>