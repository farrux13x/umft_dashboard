<template>
    <el-row justify="space-between" class="mb-20">
        <h1>Yo'nalishlar</h1>
        <el-button type="primary" @click="clear()">
            <el-icon>
                <Plus />
            </el-icon>
            Yo'nalish qo'shish
        </el-button>
    </el-row>
    <el-table :data="allDepartment.direction" >
        <el-table-column label="№" prop="index" />
        <el-table-column label="Rasm" >
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
    <el-dialog v-model="dialogVisible"  title="Yangi yo'nalish" width="100%">
        <el-form :model="form" ref="validate">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item prop="title" :rules="rules" label="Nomlanishi" >
                                <el-input v-model="name" placeholder="Nomlanishi" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item prop="slogan" :rules="rules" label="Slogan url">
                                <el-input v-model="form.slogan" placeholder="slogan" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="Yillik kontrakt narhi (mln)" prop="slogan" :rules="rules" >
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
                            <el-form-item label="Yillik kontrakt narhi (mln)" prop="price" :rules="rules" >
                                <el-input-number controls-position="right" v-model="form.price" />
                                
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item prop="kind" :rules="rules"  label="Yo'nalish turi">
                                <el-select v-model="form.kind" placeholder="Yo'nalish turi">
                                    <el-option label="kunduzgi" value="0" />
                                    <el-option label="sirtqi" value="1" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Qisqa matn" prop="desc" :rules="rules" >
                        <quill-editor ref="quillEditor" toolbar="full" contentType="html" v-model:content="form.desc">
                        </quill-editor>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Asosiy ta'lim imkoniyatlari" prop="advice" :rules="rules" >
                        <quill-editor ref="quillEditor" toolbar="full" contentType="html" v-model:content="form.advice">
                        </quill-editor>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Matni" >
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
            clear(){
                this.dialogVisible = true, 
                this.toggle = false
                this.form={}
                this.form.desc='', 
                this.form.advice= '', 
                this.form.poster='', 
                this.form.kind='', 
                this.form.slogan='', 
                this.form.text=''
            },
            handleRemove(file){
                this.del(file)
            },
            handleEdit(id){
                this.editDirection(id)
                .then(res =>{
                    console.log(res.data)
                    this.form = res.data
                    this.name = res.data.title
                    // this.img = res.data.poster
                    this.form.kind = res.data.kind == '0' ? 'kunduzgi' : 'sirtqi'
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
                this.$refs['validate'].validate((valid) => {
                    if (valid) {
                        if(this.img.length>0){
                            this.form.poster = this.img[0].response
                            this.dialogVisible = false
                            this.saveDirection(this.form)
                        }
                    }else{
                        this.dialogVisible = true
                        return false;
                    }
                });
            },
            add() {
                this.$refs['validate'].validate((valid) => {
                    if (valid) {
                        if(this.img.length>0){
                            this.form.poster = this.img[0].response
                            this.dialogVisible = false
                            this.department(this.form)
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
                this.form.slogan = val.split(' ').join('-').toLowerCase()
            }
        },
        mounted(){
            this.allDepartments()
        }
    }
</script>

<style lang="scss">
    .el-dialog {
        margin:0;
    }
</style>