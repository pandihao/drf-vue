<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter="submitForm()"
                    >
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="login">登录</el-button>
                </div>
                <!--<p class="login-tips">Tips : 用户名和密码随便填。</p>-->
            </el-form>
        </div>
    </div>
</template>

<script>

    // import { ElMessage } from 'element-plus'
    // import {setToken,setUserName} from "../utils/auth";

    export default {
    data() {
        return {
            param: {
                username: "admin",
                password: "123456"
            },
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            }
        };
    },
    created() {
        this.$store.commit("clearTags");
    },
    methods: {
        login(){

            const useraccount={
                username: this.param.username,
                password : this.param.password
            };

            this.$store.dispatch('user/login', useraccount)
                .then(() => {
                    this.$router.push({ path:  '/'})

                }).catch(() => {
                // console.log(error.response.data);
                })

            // this.axios.post(`${this.$store.state.baseApi}/api/oauth/login/`,useraccount)
            //     .then(response => {
            //         let res_code = response.data['res_code']
            //         const user_token = response.data['token']
            //         if(res_code === '10000'){
            //             setToken(user_token)
            //             setUserName(this.param.username)
            //             this.$message.success('登陆成功')
            //             this.$router.push('/')
            //
            //         }
            //         else {
            //             this.$message.error("请输入账号和密码");
            //             return false;
            //         }
            //     })
            //     .catch(error =>  {
            //         console.log("catch error");
            //         console.log(error.response.data);
            //         this.$message.error("用户名或者密码错误");
            //     })
        },
        // submitForm() {
        //     this.$refs.login.validate(valid => {
        //         if (valid) {
        //             this.$message.success("登录成功");
        //             // localStorage.setItem("ms_username", this.param.username);
        //             setToken(this.param.username)
        //             this.$router.push("/");
        //         } else {
        //             this.$message.error("请输入账号和密码");
        //             return false;
        //         }
        //     });
        // }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>