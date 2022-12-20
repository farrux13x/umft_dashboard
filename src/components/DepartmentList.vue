<template>
    <el-button @click="dialogVisible = true">
        Yangi yo'nalish qo'shish
    </el-button>

    <el-dialog v-model="dialogVisible" title="Yangi yo'nalish" width="97%" >

        <el-form :model="form" >
        <el-form-item label="Nomlanishi">
            <el-input v-model="form.name" placeholder="Nomlanishi" />
        </el-form-item>
        <el-form-item label="Slogan url">
            <el-input v-model="form.url" placeholder="slogan" />
        </el-form-item>
        <el-form-item label="Rasm">
            <input type="file" class="custom-file-input" />
        </el-form-item>
        <el-form-item label="Rasm">
        </el-form-item>
        <!-- <el-form-item label="Yillik kontrakt narhi (mln)"> -->
            <!-- <el-input-number
                v-model="form.num"
                :min="1"
                :max="10"
                /> -->
        <!-- </el-form-item> -->
        <el-form-item label="Yo'nalish turi">
            <el-select v-model="form.region" placeholder="Yo'nalish turi">
                <el-option label="kunduzgi" value="0" />
                <el-option label="kechgi" value="1" />
            </el-select>
        </el-form-item>
        <el-form-item label="Yo'nalish turi">
            <el-input
                v-model="form.textarea"
                :rows="2"
                type="textarea"
                placeholder="Please input"
            />
        </el-form-item>
    </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                form: {
                    name: '',
                    num: '',
                    textarea:'',
                    region: ''
                }
            }
        },
    }
</script>

<style lang="scss">
.custom-file-input::-webkit-file-upload-button {
  display: none;
}
.custom-file-input::before {
  content: 'Select some files';
  display: inline-block;
//   background: linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #606266;
  border-radius: 3px;
  color:#606266;
  padding: 5px 8px;
//   outline: none;
  white-space: nowrap;
//   -webkit-user-select: none;
  cursor: pointer;
//   text-shadow: 1px 1px #fff;
//   font-weight: 700;
//   font-size: 10pt;
}
// .custom-file-input:hover::before {
//   border-color: black;
// }
// .custom-file-input:active::before {
//     box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04),0px 8px 20px rgba(0, 0, 0, 0.08);
// //   background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
// }
</style>