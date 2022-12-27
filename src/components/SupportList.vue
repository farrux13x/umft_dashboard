<template>
    <el-row class="mb-20">
        <h1>Murojatlar</h1>
    </el-row>
    <el-table :data="contacts.contact" height="481">
        <el-table-column label="№" prop="index" />
        <el-table-column label="Savol" prop="name" />
        <el-table-column label="Holati" >
            <template #default="scope">
                <el-button size="small" @click="status(scope.row._id)">{{scope.row.status}}</el-button>
            </template>
        </el-table-column>
        <el-table-column align="right">
            <template #default="scope">
                <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.row._id)">
                    <el-icon><Delete /></el-icon>
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- <pre>
        {{ contacts }}
    </pre> -->
</template>

<script>
import {mapActions,mapGetters} from 'vuex'

export default {
    data(){
        return{

        }
    },
    computed:{
        ...mapGetters([
            'contacts'
        ])
    },
    methods:{
        ...mapActions([
            'allContacts',
            'statusContacts',
            'delContacts'
        ]),
        status(id){
            this.statusContacts(id)
        },
        handleDelete(id){
            this.delContacts(id)
        }
    },
    mounted(){
        this.allContacts()
    }
}
</script>

<style lang="scss">
// .el-table__cell:last-child{
//     .cell {
//         display: flex;
//         justify-content: center;
//     }
// }
// .el-dialog {
//     margin: 25px auto;
// }
// .el-dialog__footer {
//     margin-top: unset;
// }
// .wrapper .el-table .el-button{
//     width: unset;
// }
</style>