<template>
  <div id="header">
    <div class="con">
        <el-menu theme="dark" class="nav-bar" mode="horizontal" @select="handleSelect">
          <el-menu-item index="oahnus">Oahnus</el-menu-item>
          <el-menu-item index="home">首页</el-menu-item>
          <el-menu-item index="tech">技术</el-menu-item>
          <!--<el-menu-item index="">随笔</el-menu-item>-->
          <!--<el-menu-item index="">杂记</el-menu-item>-->
          <el-menu-item index="about">关于</el-menu-item>
          <el-menu-item index="" style="float: right;">
            <el-input
              placeholder="搜索"
              icon="search"
              v-model="searchInput"
              @keyup.enter.native="search"
              :on-icon-click="search">
            </el-input>
          </el-menu-item>
          <!--<el-menu-item index="7" style="float: right;" @click="dialogFormVisible = true">登录</el-menu-item>-->
        </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        searchInput: ''
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        let vm = this
        console.log(key)
        switch (key) {
          case 'oahnus':
          case 'home':
            vm.$router.push({path: '/'})
            break
          case 'tech':
            vm.$router.push({path: '/articles/category/1'})
            break
          case 'about':
            vm.$router.push({path: '/about'})
            break
        }
      },
      search () {
        let vm = this
        if (vm.searchInput.length > 20) {
          vm.$message.warning('关键字不能超过20个字符')
          return false
        }
        vm.$router.push({path: '/articles/keyword/' + vm.searchInput})
      }
    }
  }
</script>

<style scoped>
  .con {
    max-width: 1366px;
    min-width: 1024px;
    margin-left: auto;
    margin-right: auto;
  }
  .login-dialog {
    width: 40%;
    min-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
  .nav-bar li {
    margin-left: 25px;
    font-size: 18px;
  }
  #header {
    position: fixed;
    width: 100%;
    background: #324157;
    /*max-width: 1366px;*/
    top: 0;
    left: 0;
    z-index: 999;
  }
</style>
