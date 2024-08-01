<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="form"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">中医大数据后台管理系统</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="form.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          ref="password"
          v-model="form.password"
          placeholder="Password"
          name="password"
          tabindex="2"
          type="password"
          auto-complete="on"
          clearable
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="login"
      >
        登录
      </el-button>

      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div> -->
    </el-form>
  </div>
</template>

<script setup>
import Cookies from 'js-cookie'
import { encrypt, decrypt } from '@/utils/jsencrypt'
import md5 from 'js-md5'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import useUserStore from '@/stores/modules/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

const loginForm = ref(null)
const form = reactive({
  username: undefined,
  password: undefined,
  remember: false
})
const loginRules = reactive({
  username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
})

// const reset = () => {
//   loginRef.value.resetFields()
// }

const login = () => {
  loginForm.value.validate(valid => {
    if (valid) {
      setCookie()
      var formData = {}
      Object.assign(formData, form)
      // formData.password = md5('ABCDEFGHIJKLMN' + formData.password)
      formData.password = md5(formData.password)
      // formData.password = encrypt(form.password)
      userStore.login(formData).then(() => {
        router.push('/')
      })
    } else {
      ElMessage.error('用户名或密码不规范')
    }
  })
}

const setCookie = () => {
  if (form.remember) {
    Cookies.set('remember', form.remember, { expires: 7 })
    Cookies.set('username', form.username, { expires: 7 })
    Cookies.set('password', encrypt(form.password), { expires: 7 })
  } else {
    Cookies.remove('remember')
    Cookies.remove('username')
    Cookies.remove('password')
  }
}

const getCookie = () => {
  form.remember = !!Cookies.get('remember')
  form.username = Cookies.get('username') || undefined
  form.password = decrypt(Cookies.get('password')) || undefined
}

getCookie()
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #283443;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
