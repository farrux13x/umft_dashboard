<template>
    <div class="common-layout">
        <el-container class="auth">
            <el-aside class="auth__left">
                <div class="auth__top">
                    <img src="@/assets/logo.png" alt="">
                </div>
                <el-form 
                    @submit.prevent="send"
                    label-position="top">
                    <el-form-item label="Login">
                        <el-input v-model="login" />
                    </el-form-item>
                
                    <el-form-item label="Parol">
                        <el-input type="password" show-password v-model="password" @keypress.enter="send"/>
                    </el-form-item>
                    <el-button type="success" @click="send">Kirish</el-button>
                </el-form>

            </el-aside>
            <el-main class="auth__right">
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            login:'',
            password:'',
        }
    },
    methods: {
        // send(){
        //     if (this.login.length>2 && this.password.length>3){
        //         this.$store.dispatch('login',{
        //             login: this.login,
        //             password: this.password
        //         })
        //     }
            
        // },
        
    },
    mounted(){
        // this.$store.commit('layout','auth-layout')
    }
    
}
</script>

<style lang="scss" scoped>
@import '../styles/view/auth.scss';
</style>