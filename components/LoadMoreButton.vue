<template>
  <section>
    <el-button
      type="primary"
      @click="loadMore"
      class="loadMore"
      v-if="canLoadMore"
      v-loading.fullscreen.lock="fullscreenLoading">
      显示更多
    </el-button>
    <el-button
      type="primary"
      class="loadMore"
      v-if="!canLoadMore"
      :disabled="true">
      没有更多了
    </el-button>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        fullscreenLoading: false,
        canLoadMore: true
      }
    },
    methods: {
      canUseDOM () {
        return !!(typeof window !== 'undefined' && window.document && window.document.createElement)
      },
      loadMore () {
        let vm = this
//        vm.fullscreenLoading = true
        let page = vm.$store.state.article.articles.currentPage
        page = page + 1
//        if (vm.canUseDOM()) {
//          window.alert(page)
//        }
        vm.$store.dispatch('loadArticles', {page: page, limit: vm.$store.state.option.articleNumPerPage})
        let totalPage = vm.$store.state.article.articles.totalPage

        vm.canLoadMore = page !== 0 && totalPage !== 0 && page < totalPage
        vm.fullscreenLoading = false
      }
    },
    created () {
      let page = this.$store.state.article.articles.currentPage
      let totalPage = this.$store.state.article.articles.totalPage
      this.canLoadMore = page !== 0 && totalPage !== 0 && page < totalPage
    }
  }
</script>

<style scoped>
  .loadMore {
    min-width: 100px;
    width: 100px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
  }
</style>
