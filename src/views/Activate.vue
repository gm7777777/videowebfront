<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <div class="name">
          <div class="title">计算机白丁的个人网站</div>
          <div class="tips">我们已经向您的邮箱发送了一封含有6位验证码的邮件<br>请在以下填入框内填入验证码，激活账号</div>
        </div>
      </div>
      <el-row  class="demo-radius radiusgap">
        <el-space :size="size" spacer="|">
          <el-input style="margin-left:5px; "
                  v-model="data1"
                  class="w-2 m-2"
                  size="large"
                    maxlength="1"
                    type="tel"
                    input-style="font-size:25px;color:black;"
          />
          <el-input
                  v-model="data2"
                  class="w-2 m-2"
                  size="large"
                  maxlength="1"
                  type="tel"
                  input-style="font-size:25px;color:black;"
          />
          <el-input
                  v-model="data3"
                  class="w-2 m-2"
                  size="large"
                  maxlength="1"
                  type="tel"
                  input-style="font-size:25px;color:black;"
          />
          <el-input
                  v-model="data4"
                  class="w-2 m-2"
                  size="large"
                  maxlength="1"
                  type="tel"
                  input-style="font-size:25px;color:black;"
          />
          <el-input
                  v-model="data5"
                  class="w-2 m-2"
                  size="large"
                  maxlength="1"
                  type="tel"
                  input-style="font-size:25px;color:black;"
          />
          <el-input
                  v-model="data6"
                  class="w-2 m-2"
                  size="large"
                  maxlength="1"
                  type="tel"
                  input-style="font-size:25px;color:black;"
          />
        </el-space>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Activate',
  data(){
    return {
        data1:"",
        data2:"",
        data3:"",
        data4:"",
        data5:"",
        data6:"",
    }
  },
  watch:{
    data6(val){
        if(this.data1!=null&&this.data2!=null&&this.data3!=null&&this.data4!=null&&this.data5!=null&&this.data6!=null){

        }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
 .radiusgap{
   /*width:400px;*/
   border: 1px solid #ccc;
   border-top-right-radius: 15px;border-top-left-radius: 15px;
   border-bottom-left-radius: 15px;border-bottom-right-radius: 15px;
 }
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
height: 400px;
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
.login-form .el-form-item {
  margin-bottom: 12px;
}
</style>