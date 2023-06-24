<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <div class="name">
          <div class="title">计算机白丁的个人网站</div>
          <div class="tips">{{title}}</div>
        </div>
      </div>
      <el-form label-position="top" :rules="rules" :model="ruleForm" ref="loginForm" class="login-form">
        <el-form-item label="账号*" prop="username">
          <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码*" prop="password">
          <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱*" prop="email" v-if="!haveAccount">
          <el-input type="text" v-model.trim="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电话*" prop="phone" v-if="!haveAccount">
          <el-input type="text" v-model.trim="ruleForm.phonenum" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item v-if="haveAccount">
          <el-button type="primary" link style="margin-bottom:10px" @click="registerAccount">还没有账户?</el-button>
          <el-button style="width: 100%" type="primary" @click="submitForm">立即登录</el-button>
          <el-checkbox v-model="checked" @change="!checked">下次自动登录</el-checkbox>
        </el-form-item>

        <el-form-item v-else>
          <el-tooltip
                  effect="dark"
                  :content="warningsubmit"
                  placement="bottom"
          >
          <el-button style="width: 100%;margin:5px" type="primary" @click="submitRegisterForm">注册</el-button>
          </el-tooltip>
          <el-tooltip
                  effect="dark"
                  :content="warningauth"
                  placement="bottom"
          >
          <el-button style="width: 100%;margin:5px;" type="primary" @click="submitRegisterForm">再次授权</el-button>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 登录页
import { reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'
import { localSet } from '../utils'
import login from '../apis/login'
import { register } from '../apis/login'
import { ElMessage } from 'element-plus'
// import { useStore } from 'vuex'

export default {
  name: 'Login',
  setup() {
    const loginForm = ref(null)
    const haveAccount = ref(true)
    const store = useStore()
    const state = reactive({
      ruleForm: {
        username: '',
        password: '',
          email:'',
          phonenum:''
      },
        warningsubmit:"初次注册请点击进入授权码验证环节!",
        warningauth:"初次注册无须点击,此按钮会再次发送用户授权邮件!",
      checked: true,
        title:"登陆",
      rules: {
        username: [
          { required: 'true', message: '账户不能为空', trigger: 'blur' }
        ],
        password: [
          { required: 'true', message: '密码不能为空', trigger: 'blur' }
        ]
      }
    })

    const submitForm = async () => {
        // 执行登录操作
      loginForm.value.validate((valid) => {
        if (valid) {
          login({
              ctxBody: {
              name: state.ruleForm.username || '',
              password: state.ruleForm.password
          }
          }).then(res => {
            if (res.code == 200&&res.status==0) {
                // localSet('token', res.data.token)
                localSet('token', res.data.data);
                localSet('user', state.ruleForm.username);
                window.location.href = '/'
            } else {
                ElMessage({
                message: res.msg,
                type: 'warning',
                })
            }
          })
        } else {
          console.log('error login!!')
          return false;
        }
      })
    }

    const submitRegisterForm =  async () => {
          // this.$router.push({path: '/activate'});

        // 执行注册账户操作
      loginForm.value.validate((valid) => {
        if (valid) {
          register({
              ctxBody: {
                  name: state.ruleForm.username,
                  password: state.ruleForm.password,
                  email: state.ruleForm.email,
                  phonenum: state.ruleForm.phonenum
              }
          }).then(res => {
            if (res.code == 200) {
                ElMessage({
                message: res.msg,
                type: 'success',
                })
                haveAccount.value = true
                localSet('user', state.ruleForm.username);
                window.location.href = '/#/activate'
                // setTimeout(() => {
                //     haveAccount = true
                // }, 4000);
            } else {
                ElMessage({
                message: res.msg,
                type: 'warning',
                })
            }
          })
        } else {
              ElMessage({
                            message: "error register",
            type: 'warning',
            })
          return false;
        }
      })
          // this.$router.push({path: '/activate'});
    }

    const resetForm = () => {
      loginForm.value.resetFields();
    }

    return {
      ...toRefs(state),
      haveAccount,
      loginForm,
      submitForm,
      submitRegisterForm,
      resetForm
    }
  },


  methods: {
    registerAccount() {
        this.haveAccount = false;
        this.title="注册";
    }
  }
}
</script>

<style scoped>
  .login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 5px;
    background-color: #fff;
    /* background-image: linear-gradient(25deg, #077f7c, #3aa693, #5ecfaa, #7ffac2); */
  }
  .login-container {
    width: 420px;
    height: 650px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
  }
  .head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 20px 0;
  }
  .head img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  .head .title {
    font-size: 28px;
    color: #409EFF;
    font-weight: bold;
  }
  .head .tips {
    font-size: 12px;
    color: #999;
  }
  .login-form {
    width: 70%;
    margin: 0 auto;
  }
</style>
<style>
  .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  /*.login-form .el-form-item {*/
    /*margin-bottom: 12px;*/
  /*}*/
</style>