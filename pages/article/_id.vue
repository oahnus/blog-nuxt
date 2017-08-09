<template>
  <section>
    <el-row :gutter="20" type="flex" class="row-bg" justify="center">
      <el-col :span="16" style="min-width: 1366px">
        <el-row>
          <page-header></page-header>
        </el-row>
        <el-row class="main-container">
          <!--main content-->
          <article-detail :article="article"></article-detail>
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
  import ArticleDetail from '~/components/ArticleDetail.vue'
  import PageFooter from '~/components/PageFooter.vue'

  export default {
    components: {
      PageHeader,
      SideBar,
      ArticleDetail,
      PageFooter
    },
    data () {
      return {
        review: '' // 评论内容
      }
    },
    fetch ({ store, route }) {
      let paths = route.path.split('/')
      let articleId = paths[paths.length - 1]
      return Promise.all([
        store.dispatch('loadArticleDetail', {articleId: articleId})
      ])
    },
    computed: {
      article () {
        if (this.$store.state.article.articleDetail.isSuccess) {
          return this.$store.state.article.articleDetail.data
        } else {
          this.$router.replace({path: '/404'})
        }
      }
    },
    watch: {
      '$route' (to, from) {
        let paths = to.path.split('/')

        let articleId = paths[paths.length - 1]
        this.$store.dispatch('loadArticleDetail', {articleId: articleId})
      }
    },
    methods: {
      chooseTag (tagId) {
        this.$router.push({'path': '/articles/tag/' + tagId})
      }
    },
    created () {
//      let vm = this
//      let paths = vm.$route.path.split('/')
//
//      let articleId = paths[paths.length - 1]
//      vm.$store.dispatch('loadArticleDetail', {articleId: articleId})
    }
  }
</script>

<style scoped>
  .main-container {
    /*position: relative;*/
    margin-top: 60px;
    margin-bottom: 60px;
  }
</style>
