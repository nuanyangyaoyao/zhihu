<template>
  <div class="login">
    <Navi class="navi" />
    <div class="box">
      <div class="login-box">
        <div class="tietle">登录知乎日报</div>

        <div class="from">
          <van-form @submit="login">
            <van-field
              v-model="loginUserInfo.phone"
              name="手机号"
              label="手机号"
              placeholder="手机号"
              autocomplete="off"
              class="copy"
            />
            <van-field
              v-model="loginUserInfo.password"
              :type="!isOpenLogin ? 'password' : 'text'"
              name="密码"
              label="密码"
              placeholder="密码"
              :right-icon="!isOpenLogin ? 'closed-eye' : 'eye-o'"
              autocomplete="off"
              @click-right-icon="toggleLoginPasssword"
              class="copy"
            />
            <div class="login-btn">
              <van-button round block color="#0C34BA" native-type="submit"
                >登录</van-button
              >
            </div>
          </van-form>
          <div class="login-btn">
            <van-button round block type="default" @click="showPopup"
              >注册</van-button
            >
          </div>
        </div>

        <!-- 弹出层注册 -->
        <van-popup v-model="show" position="bottom">
          <div class="enroll-box">
            <div class="enroll-title">注册</div>
            <van-form @submit="enroll">
              <van-field
                v-model="registerUserInfo.phone"
                name="手机号"
                label="手机号"
                placeholder="手机号"
                autocomplete="off"
                class="zc"
              />
              <van-field
                v-model="registerUserInfo.password"
                :type="!isOpenEnroll ? 'password' : 'text'"
                name="密码"
                label="密码"
                placeholder="密码"
                :right-icon="!isOpenEnroll ? 'closed-eye' : 'eye-o'"
                autocomplete="off"
                @click-right-icon="toggleResgiterPasssword"
                class="zc"
              />
              <van-field
                v-model="registerUserInfo.nickName"
                type="text"
                name="昵称"
                label="昵称"
                placeholder="昵称"
                autocomplete="off"
                class="zc"
              />

              <div class="login-btn">
                <van-button round block color="#0C34BA" native-type="submit"
                  >注册</van-button
                >
              </div>
            </van-form>
          </div>
        </van-popup>

        <div class="login-font">
          <div class="mode">
            <div class="mode-left">
              <div class="img-box">
                <img class="auto-img" :src="iconimg" alt="" />
              </div>
              <div class="mode-box" @click="modelBrn">{{mode.title}}</div>
            </div>

            <div class="mode-right">
              <div class="img-box">
                <img class="auto-img" :src="szimg" alt="" />
              </div>
              <div class="mode-box" @click="skiUp">设置</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navi from "../components/Navi.vue";
export default {
  name: "Login",

  components: {
    Navi,
  },

  data() {
    return {
      dark: false,
      show: false,
      mode:{
        title:'夜间模式',
      },
      iconimg:require('../assets/moon.png'),
      szimg:require('../assets/setup.png'),
      loginUserInfo: {
        phone: "",
        password: "",
      },
      registerUserInfo: {
        phone: "",
        password: "",
        nickName: "",
      },

      //查看注册密码
      isOpenEnroll: false,

      //查看登录密码
      isOpenLogin: false,
    };
  },

  created(){
    if (this.$root.draklin) {
        this.mode.title = '日间模式';
        this.szimg = require('../assets/moon.png');
        this.iconimg = require('../assets/moon.png');
        window.document.documentElement.setAttribute("data-theme", "light");
      } else {
        this.mode.title = '夜间模式';
        this.iconimg = require('../assets/moon.png');
        this.szimg = require('../assets/setup.png');
        window.document.documentElement.setAttribute("data-theme", "dark");
      }
  },

  methods: {
    mounted() {
        window.document.documentElement.setAttribute("data-theme", "dark");
      },
    skiUp() {
      this.$router.push({ name: "Setup" });
    },

    showPopup() {
      this.show = !this.show;
    },

    toggleResgiterPasssword() {
      this.isOpenEnroll = !this.isOpenEnroll;
    },

    //切换登录密码可见状态
    toggleLoginPasssword() {
      this.isOpenLogin = !this.isOpenLogin;
    },

    enroll() {
      if (this.registerUserInfo.phone == "") {
        this.$toast("请输入手机号");
      } else {
        if (this.registerUserInfo.password == "") {
          this.$toast("请输入密码");
        } else {
          if (this.registerUserInfo.nickName == "") {
            this.$toast("请输入昵称");
          } else {
            if (this.registerUserInfo.phone < 7) {
              this.$toast("账户要大于七位数");
            } else {
              var bookJson = JSON.stringify(this.registerUserInfo);
              localStorage.setItem("enroll", bookJson);
              this.$toast("注册成功");
              this.$root.username = this.registerUserInfo.nickName;
              this.registerUserInfo.phone = "";
              this.registerUserInfo.password = "";
              this.registerUserInfo.nickName = "";
              this.$root.islock = true;
            }
          }
        }
      }
    },

    modelBrn() {
      this.dark = !this.dark;
      this.$root.draklin = this.dark
      if (!this.$root.draklin) {
        this.mode.title = '夜间模式';
        this.iconimg = require('../assets/moon.png');
        this.szimg = require('../assets/setup.png');
        window.document.documentElement.setAttribute("data-theme", "dark");
      } else {
        this.mode.title = '日间模式';
        this.szimg = require('../assets/setup0.png');
        this.iconimg = require('../assets/light.png');
        window.document.documentElement.setAttribute("data-theme", "light");
      }
    },

    login() {
      var eri = localStorage.getItem("enroll");
      var b = JSON.parse(eri);
      if (this.loginUserInfo.phone == "") {
        return alert("账号不能为空");
      } else {
        if (this.loginUserInfo.password == "") {
          return alert("密码不能为空");
        } else {
          if (
            this.loginUserInfo.phone == b.phone &&
            this.loginUserInfo.password == b.password
          ) {
            setTimeout(() => {
              this.$toast("登陆成功");
			  this.$root.islock = true;
              this.$router.push({ name: "Home" });
            }, 1000);
          } else {
            return alert("密码或用户名错误");
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/common/common";

.navi{
  @include background_color("background_color"); 
  @include font_color("text-color");
  transition: background 1s , color 0.6s;
}
.copy{
  @include background_color("background_color"); 
  transition: background 1s , color 0.6s;
}
// /deep/ .van-cell{
//   background-color: #2d2d2d;
// }

// /deep/ .van-nav-bar .van-icon{
//   color: #616554;
// }

.box {
  padding: 100px 20px;
  @include background_color("background_color");
  transition: background 1s , color 0.6s;
}
.login-btn {
  margin-top: 20px;
}
.login-font {
  margin-top: 70px;
  .mode {
    display: flex;
    padding: 10px 20px;
    .mode-left {
      margin-right: auto;
      .img-box {
        width: 32px;
        height: 32px;
        padding-left: 10px;
      }
    }
    .mode-box {
      padding: 10px 3px;
      text-align: center;
      // color: #616554;
      @include font_color("semode-color");
      transition: background 1s , color 0.6s;
    }
  }
}
.enroll-title {
  font-size: 16px;
  padding: 15px;
}

.enroll-box{
  @include background_color("background_color");
  transition: background 1s , color 0.6s;
}

.tietle {
  // color: #616554;
  @include font_color("text-color");
  transition: background 1s , color 0.6s;
  text-align: center;
  line-height: 24px;
  font-size: 24px;
  padding: 15px 5px;
}
</style>
