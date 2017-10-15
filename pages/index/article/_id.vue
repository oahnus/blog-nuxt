<template>
  <section>
    <article-detail :article="article"></article-detail>
  </section>
</template>

<script>

  import ArticleDetail from '~/components/ArticleDetail.vue'

  export default {
    components: {
      ArticleDetail
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
        return this.$store.state.article.articleDetail.data
//        if (this.$store.state.article.articleDetail.isSuccess) {
//          return this.$store.state.article.articleDetail.data
//        } else {
//          this.$router.replace({path: '/404'})
//        }
      }
    },
    watch: {
//      '$route' (to, from) {
//        let paths = to.path.split('/')
//
//        let articleId = paths[paths.length - 1]
//        this.$store.dispatch('loadArticleDetail', {articleId: articleId})
//      }
    },
    methods: {
      chooseTag (tagId) {
        this.$router.push({'path': '/articles/tag/' + tagId})
      }
    },
    created () {
      let vm = this
      let paths = vm.$route.path.split('/')

      let articleId = paths[paths.length - 1]
      vm.$store.dispatch('loadArticleDetail', {articleId: articleId})
    }
  }
</script>

<style scoped>

</style>
