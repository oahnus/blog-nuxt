<template>
  <div class="side-bar">
    <!-- 登录 -->
    <el-card class="box-card" :body-style="{padding: '20px'}" v-if="!isLogin">
      <!-- 登录 注册 -->
      <div slot="header" class="clearfix">
        <span style="line-height: 20px;">登录</span>
        <span style="line-height: 20px;">注册</span>
      </div>
      <el-row :gutter="20">
        <div class="login-dialog">
          <el-input placeholder="请输入邮箱" v-model="email">
            <template class="input-label" slot="prepend">  邮    箱    </template>
          </el-input>
          <el-input placeholder="请输入密码" type="password" v-model="password">
            <template slot="prepend">  密    码    </template>
          </el-input>
          <el-input placeholder="请重复输入密码" v-if="isRegister" v-model="password2">
            <template slot="prepend">确认密码</template>
          </el-input>
          <el-row type="flex" justify="center" style="margin-top: 15px">
            <el-button v-if="!isRegister" style="margin-right: 20px" @click="login">登 录</el-button>
            <el-button v-if="isRegister" style="margin-right: 20px">提 交</el-button>
            <el-button v-if="isRegister" @click="isRegister = false">取 消</el-button>
            <el-button v-if="!isRegister" @click="isRegister = true">注 册</el-button>
          </el-row>
        </div>
      </el-row>
    </el-card>

    <!-- 用户信息-->
    <el-card class="box-card" :body-style="{padding: '20px'}" v-if="isLogin">
      <div slot="header" class="clearfix">
        <span style="line-height: 20px;">用户信息</span>
        <a class="logout" @click="logout">注销</a>
      </div>
      <el-row :gutter="20">
        <div class="user-avatar">
          <img :src="user.avatar">
        </div>
        <div class="user-nickname">
          {{user.nickname}}
        </div>
        <div class="user-description">
          {{user.description}}
        </div>
        <!--<div style="margin-top: 5px;margin-left: auto;margin-right: auto;display: block;width: 70px">-->
          <!--<span style="font-size: 14px;margin-right: 10px">金币</span>-->
          <!--<img src="../assets/icon/gold.png" style="width: 12px">12-->
        <!--</div>-->
      </el-row>
    </el-card>
    <!-- 一言 -->
    <el-card class="box-card" :body-style="{padding: '20px'}">
      <div slot="header" class="clearfix">
        <span style="line-height: 20px;">Hitokoto</span>
      </div>
      <el-row :gutter="20">
        <div class="hitokoto-text">
          {{hitokoto.hitokoto}}
        </div>
      </el-row>
      <el-row style="justify-content: flex-end;display: flex">
        <div class="hitokoto-text">
          ----{{hitokoto.from}}
        </div>
      </el-row>
      <el-row>
        <el-progress :percentage="percentage"
                     :stroke-width="3"
                     :show-text="false"
                     class="progress-bar">
        </el-progress>
      </el-row>
    </el-card>
    <!-- 标签 -->
    <el-card class="box-card" :body-style="{padding: '20px'}">
      <div slot="header" class="clearfix">
        <span style="line-height: 20px;">标签</span>
      </div>
      <el-row :gutter="20">
        <el-tag v-for="tag in tags"
                type="primary"
                class="tag"
                :key="tag.id"
                @click.native="chooseTag(tag.id)">
          {{tag.name}}({{tag.articleNum}})
        </el-tag>
      </el-row>
    </el-card>
    <!-- 归档 -->
    <el-card class="box-card" :body-style="{padding: '20px'}">
      <div slot="header" class="clearfix">
        <span style="line-height: 20px;">归档</span>
      </div>
      <el-row :gutter="20">
        <el-tag v-for="archive in archives"
                type="primary"
                class="tag"
                :key="archive"
                @click.native="chooseArchive(archive)">
          {{ archive ? archive.substr(0, 4) + '年' + archive.substr(4) + '月' : ''}}
        </el-tag>
      </el-row>
    </el-card>
  </div>
</template>

<script>

  export default {
    fetch ({ store }) {
      return Promise.all([
        store.dispatch('loadUserFromStorage'),
        store.dispatch('loadHitokoto')
      ])
    },
    data () {
      return {
        articles: [],
        email: '',
        password: '',
        password2: '',
        isRegister: false,
        percentage: 0
      }
    },
    computed: {
      isLogin () {
        return this.$store.state.auth.auth.isLogin
      },
      user () {
        return this.$store.state.auth.auth.user
      },
      tags () {
        return this.$store.state.tag.data
      },
      archives () {
        return this.$store.state.archive.data
      },
      hitokoto () {
        return this.$store.state.hitokoto.hitokoto.data
      }
    },
    methods: {
      canUseDOM () {
        return !!(typeof window !== 'undefined' && window.document && window.document.createElement)
      },
      countDown () {
        let vm = this
        setTimeout(() => {
          if (vm.percentage === 100) {
            vm.$store.dispatch('loadHitokoto')
            vm.percentage = 0
            vm.countDown()
          } else {
            vm.percentage = vm.percentage + 0.5
            vm.countDown()
          }
        }, 125)
      },
      chooseTag (tagId) {
        let vm = this
        vm.$router.replace({path: '/articles/tag/' + tagId})
      },
      chooseArchive (archive) {
        let vm = this
        vm.$router.replace({path: '/articles/archive/' + archive})
      },
      login () {
        let vm = this
        vm.$store.dispatch('userLogin', {
          email: vm.email,
          password: vm.password
        }).then(() => {
          vm.$message.success('Login success')
        }, error => {
          vm.$message.error(error)
        })
      },
      logout () {
        this.$store.dispatch('userLogout')
      }
    },
    mounted () {
      let vm = this
      if (vm.canUseDOM()) {
        let user = JSON.parse(window.localStorage.getItem('user'))
        let token = JSON.parse(window.localStorage.getItem('token'))
        if (user && token) {
          let time = new Date(window.localStorage.getItem('time'))
          if (new Date().getTime() - time.getTime() > 86400000) {
            vm.$store.dispatch('userLogout')
          } else {
            vm.$store.dispatch('loadUserFromStorage', {data: {user: user, token: token}})
          }
        }
      }
    },
    created () {
      let vm = this
      vm.$store.dispatch('loadHitokoto')
      vm.countDown()
    }
  }
</script>

<style scoped>
  .hitokoto-text {
    font-size: 14px;
    color: #666;
    margin: 0 10px 10px 10px;
  }
  .progress-bar {
    margin-top: 5px;
  }
  .tag {
    margin-left: 10px;
    margin-top: 10px;
    font-size: 16px;
    border-radius: 2px;
    cursor: pointer;
    width: 40%;
  }
  .side-bar .box-card {
    margin-bottom: 10px;
  }
  .logout {
    line-height: 20px;
    float: right;
    cursor: pointer;
  }
  .logout:hover {
    color: red;
  }
  .user-avatar img{
    width: 100px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    border: 1px solid #eee;
  }
  .user-nickname {
    margin-top: 5px;
    display: flex;
    justify-content: center;
    /*background: red;*/
    font-size: 18px;
    cursor: pointer;
    /*font-weight: 500;*/
  }
  .user-nickname:hover {
    color: red;
  }
  .user-description {
    margin-top: 5px;
    font-size: 14px;
    color: #aaa;
    margin-left: 10%;
    margin-right: 10%;
  }
</style>
<style>
  #home > div > div > div.main-container.el-row > div.el-col.el-col-6 > div > div:nth-child(1) > div.el-card__body > div > div > div > div {
    width: 55px;
  }
</style>
