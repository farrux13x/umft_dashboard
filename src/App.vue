<template>
  <admin-layout/>
</template>

<script>
import AdminLayout from '@/layout/adminLayout.vue';
export default{
  components:{
    AdminLayout
  }
}
</script>

<style lang="scss">
@import './styles/reset.scss';
@import './styles/grid.scss';
@import './styles/main.scss';
@import './styles/lib/class.scss';

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
        margin:0 auto;
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
    .el-dialog__footer {
        margin-top: 110px;
    }
    .el-form-item__error {
        top: 209px;
    }
    .el-col-12:first-child {
        .el-form-item__error {
                top: 100%;
        }
    }
</style>
