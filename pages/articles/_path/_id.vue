<template>
  <section>
    <el-row :gutter="20" type="flex" class="row-bg" justify="center">
      <el-col :span="16" style="min-width: 1366px">
        <el-row>
          <page-header></page-header>
        </el-row>
        <el-row class="main-container">
          <!--main content-->
          <el-col :span="18" style="padding: 5px">
            <div class="article-list">
              <el-card class="box-card"
                       :body-style="{padding: '20px'}"
                       v-for="article in articles"
                       :key="article.id">
                <el-row :gutter="20">
                  <article-entity :article="article"></article-entity>
                </el-row>
              </el-card>
              <load-more-button></load-more-button>
            </div>
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
  import ArticleEntity from '~/components/ArticleEntity.vue'
  import LoadMoreButton from '~/components/LoadMoreButton.vue'
  import PageFooter from '~/components/PageFooter.vue'

  export default {
    components: {
      PageHeader,
      SideBar,
      ArticleEntity,
      LoadMoreButton,
      PageFooter
    },
    data () {
      return {
        currentPage: 1
      }
    },
    fetch ({ store, route }) {
      let paths = route.path.split('/')

      let pathName = paths[paths.length - 2]
      switch (pathName) {
        case 'category':
          let categoryId = paths[paths.length - 1]
          return Promise.all([
            store.dispatch('loadArticlesByParams', {
              categoryId: categoryId,
              page: 1,
              limit: store.state.option.articleNumPerPage
            })
          ])
        case 'tag':
          let tagId = paths[paths.length - 1]
          return Promise.all([
            store.dispatch('loadArticlesByParams', {
              tagId: tagId,
              page: 1,
              limit: store.state.option.articleNumPerPage
            })
          ])
        case 'archive':
          let archive = paths[paths.length - 1]
          return Promise.all([
            store.dispatch('loadArticlesByArchive', {
              archive: archive,
              page: 1,
              limit: store.state.option.articleNumPerPage
            })
          ])
        default:
          return Promise.all([
            store.dispatch('clearArticles')
          ])
      }
//      return Promise.all([
//        store.dispatch('loadArticleDetail', {articleId: articleId})
//      ])
    },
    computed: {
      articles () {
        return this.$store.state.article.articles.data
      }
    },
    watch: {
      '$route' (to, from) {
        let vm = this
        let paths = to.path.split('/')

        let pathName = paths[paths.length - 2]
        switch (pathName) {
          case 'category':
            let categoryId = paths[paths.length - 1]
            vm.$store.dispatch('loadArticlesByParams', {
              categoryId: categoryId,
              page: 1,
              limit: vm.$store.state.option.articleNumPerPage
            })
            break
          case 'tag':
            let tagId = paths[paths.length - 1]
            vm.$store.dispatch('loadArticlesByParams', {
              tagId: tagId,
              page: 1,
              limit: vm.$store.state.option.articleNumPerPage
            })
            break
          case 'archive':
            let archive = paths[paths.length - 1]
            vm.$store.dispatch('loadArticlesByArchive', {
              archive: archive,
              page: 1,
              limit: vm.$store.state.option.articleNumPerPage
            })
            break
          default:
            vm.$store.dispatch('clearArticles')
            break
        }
      }
    },
    methods: {
      canLoadMore () {
        let page = this.$store.state.article.articles.currentPage
        let totalPage = this.$store.state.article.articles.totalPage
        return page !== 0 && totalPage !== 0 && page < totalPage
      }
    },
    created () {

    }
  }
</script>

<style scoped>
  .article-list .box-card{
    margin-bottom: 10px;
  }
  .main-container {
    /*position: relative;*/
    margin-top: 60px;
    margin-bottom: 60px;
  }
</style>
