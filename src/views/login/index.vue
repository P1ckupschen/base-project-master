<template>
  <div class="login">
    <div class="login-box">
      <div class="top">
        <div class="logo">
          <button @click="sendTest()">测试按钮</button>
          <!-- <img
            src="~@/assets/img/login-logo.png"
            alt=""
          > -->
        </div>
      </div>
      <div class="mid">
        <el-form
          :model="form"
          label-position="top"
          size="large"
          :rules="rules"
          hide-required-asterisk
          :show-message="false"
          ref="loginRef"
          @keyup.enter="login"
        >
          <el-form-item :label="$t('login.username')" prop="username">
            <el-input
              v-model="form.username"
              :placeholder="$t('login.username_placeholder')"
              prefix-icon="User"
            />
          </el-form-item>
          <el-form-item :label="$t('login.password')" prop="password">
            <el-input
              v-model="form.password"
              :placeholder="$t('login.password_placeholder')"
              prefix-icon="Lock"
              type="password"
            />
          </el-form-item>
          <el-form-item>
            <div class="item-btn">
              <!-- <input
                type="button"
                value="登录"
                @click="login"
              > -->
              <el-button type="primary" auto-insert-space @click="login">{{
                $t('login.sign_in')
              }}</el-button>
            </div>

            <!-- <el-button plain type="default" auto-insert-space @click="reset">{{
              $t('common.reset')
            }}</el-button> -->
          </el-form-item>
        </el-form>
      </div>
      <div class="bottom">
        Copyright © 2024
      </div>
    </div>
    <Verify
      ref="verifyRef"
      :captcha-type="'blockPuzzle'"
      :img-size="{width:'400px',height:'200px'}"
      @success="login"
    />
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
import axios from 'axios'

const router = useRouter()
const userStore = useUserStore()

const loginRef = ref(null)
const form = reactive({
  username: undefined,
  password: undefined,
  remember: false
})
const rules = reactive({
  username: [{ required: true, trigger: 'blur' }],
  password: [{ required: true, trigger: 'blur' }]
})

// const reset = () => {
//   loginRef.value.resetFields()
// }

const login = () => {
  loginRef.value.validate(valid => {
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

const sendTest = () => {
  axios.get('/backend/demo', null).then(res => {
    console.log(res)
  })
}

getCookie()
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('../../assets/images/login-bg.png') no-repeat;
  background-size: cover;
  position: fixed;
  .login-box {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    padding-top: 10%;
    .top {
      margin-bottom: 30px;
      text-align: center;
      .logo {
        font-size: 0;
        max-width: 50%;
        margin: 0 auto;
      }
      &:deep(.company) {
        font-size: 16px;
        margin-top: 10px;
      }
    }
    .mid {
      font-size: 14px;
      .item-btn {
        width: 410px;
        margin-top: 20px;
        button {
          border: 0;
          width: 100%;
          height: 40px;
          background: #1f87e8;
          color: #fff;
          border-radius: 3px;
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 10%;
      width: 100%;
      color: #999;
      font-size: 12px;
      text-align: center;
    }
  }
}
.info {
  width: 410px;
}
:deep(.login-captcha) {
  height: 40px;
}
</style>
