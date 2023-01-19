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
// @import './styles/app.scss';
@import './styles/main.scss';
@import './styles/lib/class.scss';
    .ql-toolbar.ql-snow {
        width: 100%;
    }
    .ql-toolbar.ql-snow+.ql-container.ql-snow {
        width: 100%;
    }
    .wrapper .el-table .el-button {
        width: unset;
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
    .el-table th.el-table__cell.is-leaf {
        padding: 8px 0;
    }
    .ques.el-dialog {
        margin:0 auto;
    }
    .pag.el-dialog {
        margin: 20px auto;
    }
    .ques{
        .el-dialog__footer {
            margin-top: 110px;
        }
    }
    .quil.el-col-24 {
            margin-bottom: 99px;
        }
    .el-form-item__error {
        top: 209px;
    }
    .el-col-12:first-child {
        .el-form-item__error {
                top: 100%;
        }
    }
    .el-container {
    .el-main {
        --el-main-padding: 0px;
    }
    .el-badge__content {
        border-width: 0px;
    }
    .el-badge__content.is-fixed::selection{
        background: #7352FF;
    }
    .el-badge {
        width: 100%;
        .el-badge__content.is-fixed {
            position: absolute;
            top: 10px;
            right: 20px;
            font-family: 'Mulish';
            font-weight: 500;
            font-size: 10px;
            line-height: 18px;
            text-align: center;
            letter-spacing: 0.777778px;
            color: #FFFFFF;
            background: #7352FF;
            padding: 0px 5px;
            border-radius: 50%;
        }
    }
}
</style>
