<template>
  <section id="home">
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="16" style="min-width: 1366px">
        <el-row>
          <page-header></page-header>
        </el-row>
        <el-row>
          <div class="error">
            <div class="text">404</div>
            <div class="text">Not Found</div>
          </div>
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
  import PageFooter from '~/components/PageFooter.vue'

  export default {
    components: {
      PageHeader,
      PageFooter
    },
    props: ['error'],
    layout: 'blog' // 你可以为错误页面指定自定义的布局
  }
</script>

<style scoped>
  .text {
    font-size: 60px;
  }

  .error {
    text-align: center;
    margin-top: 30%;
  }
</style>
