<template>
  <section>
    <div class="article-list" v-if="!isNotFound">
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
    <div v-if="isNotFound">
      <el-card class="box-card">
        <div class="not-found-text">内容未找到</div>
        <img src="~assets/icon/not-found.jpg" class="not-found-img"/>
      </el-card>
    </div>
  </section>
</template>

<script>
  import ArticleEntity from '~/components/ArticleEntity.vue'
  import LoadMoreButton from '~/components/LoadMoreButton.vue'

  export default {
    components: {
      ArticleEntity,
      LoadMoreButton
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
        case 'keyword':
          let keyword = paths[paths.length - 1]
          return Promise.all([
            store.dispatch('loadArticlesByKeyword', {
              keyword: keyword,
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
      },
      isNotFound () {
        return this.$store.state.article.articles.data.length === 0
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
          case 'keyword':
            let keyword = paths[paths.length - 1]

            return Promise.all([
              vm.$store.dispatch('loadArticlesByKeyword', {
                keyword: keyword,
                page: 1,
                limit: vm.$store.state.option.articleNumPerPage
              })
            ])
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
  .not-found-img {
    margin-left: auto;
    margin-right: auto;
    width: 40%;
    display: block;
    margin-top: 20px;
  }
  .not-found-text {
    /*margin-left: auto;*/
    /*margin-right: auto;*/
    text-align: center;
    /*font-size: 30px;*/
    font: 20px/1.5 arial;
    letter-spacing: 10px;
  }
</style>
