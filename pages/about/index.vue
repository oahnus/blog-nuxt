<template>
  <section>
    <el-row :gutter="20" type="flex" class="row-bg" justify="center">
      <el-col :span="16" style="min-width: 1366px">
        <el-row>
          <page-header></page-header>
        </el-row>
        <el-row class="main-container">
          <!--main content-->

          <el-col style="padding: 5px">
            <el-card class="box-card">
              <!-- 个人简介 -->
              <el-row>
                <el-col :span="4" :offset="4">
                  <img :src="user.avatar_url" width="150px" style="border-radius: 20px"/>
                </el-col>
                <el-col :span="12">
                  <div style="font-size: 40px;font-weight: 700">{{user.name}}</div>
                  <div>{{user.bio === null ? '作者很懒, 什么也没有写' : user.bio}}</div>
                  <div>Location: {{user.location}}</div>
                </el-col>
              </el-row>

              <el-row style="height: 50px;"></el-row>
              <el-row>
                <el-col :span="18" :offset="3" style="border: 2px solid;"></el-col>
              </el-row>

              <!-- 项目地址 -->
              <el-row>
                <el-col :span="18" :offset="3" style="border: 1px solid;margin-top: 20px">
                  
                </el-col>
              </el-row>
            </el-card>
          </el-col>

          <!--side bar-->
          <!--<el-col :span="6" style="padding: 5px">-->
            <!--&lt;!&ndash;<el-card class="box-card" :body-style="{padding: '20px'}">&ndash;&gt;-->
            <!--<side-bar></side-bar>-->
            <!--&lt;!&ndash;</el-card>&ndash;&gt;-->
          <!--</el-col>-->
        </el-row>

        <el-row>
          <page-footer></page-footer>
        </el-row>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import PageHeader from '~/components/PageHeader.vue'
  import SideBar from '~/components/SideBar.vue'
  import PageFooter from '~/components/PageFooter.vue'
  export default {
    components: {
      PageHeader,
      SideBar,
      PageFooter
    },
    data () {
      return {

      }
    },
    fetch ({ store }) {
      return Promise.all([
        store.dispatch('loadGithubUser')
      ])
    },
    computed: {
      user () {
        return this.$store.state.github.user
      }
    },
    methods: {

    },
    created () {

    }
  }
</script>

<style scoped>
  .main-container {
    /*position: absolute;*/
    margin-top: 60px;
    margin-bottom: 60px;
  }
</style>
