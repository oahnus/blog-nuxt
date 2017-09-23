<template>
  <section id="home">
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="16" style="min-width: 1366px">
        <el-row>
          <page-header></page-header>
        </el-row>
        <el-row class="main-container">
          <!--main content-->
          <el-col :span="18" style="padding: 5px">
            <nuxt-child/>
          </el-col>

          <!--side bar-->
          <el-col :span="6" style="padding: 5px">
            <!--<el-card class="box-card" :body-style="{padding: '20px'}">-->
            <side-bar></side-bar>
            <!--</el-card>-->
          </el-col>
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
  created () {
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style scoped>
  #home {
    overflow-x:hidden;
    background: #eee;
  }
  .main-container {
    /*position: absolute;*/
    margin-top: 60px;
    margin-bottom: 60px;
  }
</style>
