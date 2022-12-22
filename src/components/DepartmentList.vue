<template>
    <el-row justify="space-between" class="mb-20">
        <h1>Yo'nalishlar</h1>
        <el-button type="primary" @click="dialogVisible = true, form={desc:'',advice: '',poster:'',text:''}">
            <el-icon>
                <Plus />
            </el-icon>
            Yangi yo'nalish qo'shish
        </el-button>
    </el-row>
    <el-dialog v-model="dialogVisible" title="Yangi yo'nalish" width="100%">
        <el-form :model="form">

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="Nomlanishi">
                                <el-input v-model="name" placeholder="Nomlanishi" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="Slogan url">
                                <el-input v-model="form.slogan" placeholder="slogan" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="Yillik kontrakt narhi (mln)">
                                <el-upload
                                ref="upload"
                                    v-model:file-list="img"
                                    class="upload-demo"
                                    :on-remove="handleRemove"
                                    :action="`${url}/direction/poster`"
                                    :limit="1"
                                    :auto-upload="true"
                                >
                                    <el-button type="primary">Click to upload</el-button>
                                    <!-- <template #tip>
                                    <div class="el-upload__tip">
                                        jpg/png files with a size less than 500KB.
                                    </div>
                                    </template> -->
                                </el-upload>

                            </el-form-item>
                        </el-col>
                        <!-- <pre>{{ form.poster.raw }}</pre> -->
                        <!-- <pre>{{ img}}</pre> -->
                        <el-col :span="24">
                            <el-form-item label="Yillik kontrakt narhi (mln)">
                                <el-input-number controls-position="right" v-model="form.price" />
                                
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="Yo'nalish turi">
                                <el-select v-model="form.kind" placeholder="Yo'nalish turi">
                                    <el-option label="kunduzgi" value="0" />
                                    <el-option label="sirtqi" value="1" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Qisqa matn">
                        <quill-editor ref="quillEditor" toolbar="full" contentType="html" v-model:content="form.desc">
                        </quill-editor>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Asosiy ta'lim imkoniyatlari">
                        <quill-editor ref="quillEditor" toolbar="full" contentType="html" v-model:content="form.advice">
                        </quill-editor>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Matni">
                        <quill-editor ref="quillEditor" toolbar="full" contentType="html" v-model:content="form.text">
                        </quill-editor>
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
    <el-table :data="allDepartment.direction" height="481">
            <el-table-column label="№" prop="index" />
            <el-table-column label="Rasm" prop="poster">
                <template #default="scope">
                    <img class="table__img" :src="`${url}/${scope.row.poster}`" alt="">
                    <!-- {{format(scope.row.poster)}} -->
                </template>
            </el-table-column>
            <el-table-column label="Yo'nalish nomi" prop="title" />
            <el-table-column label="URI" prop="slogan" />
            <el-table-column label="Yillik kontrakt" prop="price" />
            <el-table-column label="O'qish turi" prop="kind" />
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
                form: {
                    title: '',
                    slogan: '',
                    poster: '',
                    price: 0,
                    kind: '',
                    desc: '',
                    advice: '',
                    text: ''
                }
            }
        },
        components: {
            QuillEditor
        },
        computed: {
        ...mapGetters([
            'url',
            'allDepartment'
        ])
        },
        methods: {
            // ...mapMutations([
            //     'socketChatMessage',
            //     'socketOtherMutation',
            //     'socketViewing'
            // ]),
            ...mapActions([
                'department',
                'allDepartments',
                "delDepartment",
                "del",
                'editDirection',
                'saveDirection'
            ]),
            handleRemove(file){
                this.del(file)
            },
            handleEdit(id){
                this.editDirection(id)
                .then(res =>{
                    this.form = res.data
                    console.log(res.data)
                    // this.img = res.data.response
                    this.dialogVisible = true
                    this.toggle = true
                })
            },
            handleSuccess(response, uploadFile){
                this.img = response
                this.center.logo = URL.createObjectURL(uploadFile.raw)
            },
            handleDelete(id){
                this.delDepartment(id)
            },
            change(){
                this.saveDirection(this.form)
                this.dialogVisible = false
                this.form = {}
            },
            add() {
                if(this.img.length>0){
                    this.form.poster = this.img[0].response
                    this.dialogVisible = false
                    console.log(this.img)
                    this.department(this.form)
                }
            }
        },
        watch:{
            name(val){
                // console.log(val)
                this.form.title = val
                this.form.slogan = val.split(' ').join('-')
            }
        },
        mounted(){
            this.allDepartments()
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
    .el-dialog {
        margin:0;
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
    // .el-table--fit{
    //     .el-table__body-wrapper{
    //     }
    // }
    .el-table .el-table__cell {
        padding: 0;
    }
    .el-table th.el-table__cell.is-leaf {
        padding: 8px 0;
    }
    .el-dialog__footer {
        margin-top: 130px;
    }
</style>