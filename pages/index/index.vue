<style scoped="">
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 250px;
    margin: 0;
    text-align: center;
    /*background: url("http://qiniu.cuiqingcai.com/wp-content/uploads/2015/02/wallpaper_5226849-1.jpg");*/
  }

  .carousel-article-title {
    position: fixed;
    bottom: 30px;
    left: 30px;
    border: 1px solid rgba(0,0,0,0.2);
    color: #999;
    padding: 5px;
    background:rgba(0,0,0,0.2) none repeat scroll !important;
  }

  .carousel-article-title span {
    opacity: 1;
    color: white;
    cursor: pointer;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .article-list .box-card {
    margin-top: 10px;
  }
</style>

<template>
  <section class="container">
    <el-card class="box-card" :body-style="{padding: '0px'}">
      <el-col :span="19">
        <el-carousel :interval="4000" arrow="always">
          <el-carousel-item v-for="article in hotArticles" :key="article.id">
            <div style="position: relative;text-align: center">
              <h2 class="carousel-article-title"><span @click="gotoArticleContent(article.id)">{{ article.title }}</span></h2>
              <img style="display: block;cursor: pointer;" :src="article.coverImg" width="100%" @click="gotoArticleContent(article.id)"/>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="5" style="padding-left: 5px;max-height: 50px">
        <el-row v-for="article in hotArticles.slice(0, 3)" :key="article.id">
          <img :src="article.coverImg ? article.coverImg : '/static/image/cover/3.png'"
               width="100%" height="100" @click="gotoArticleContent(article.id)" style="cursor: pointer;"/>
        </el-row>
      </el-col>
    </el-card>

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

      }
    },
    fetch ({ store }) {
      return Promise.all([
        store.dispatch('loadArticles', {page: 0, limit: store.state.option.articleNumPerPage})
      ])
    },
    computed: {
      hotArticles () {
        return this.$store.state.article.hotArticles.data
      },
      articles () {
        return this.$store.state.article.articles.data
      }
    },
    methods: {
      gotoArticleContent (articleId) {
        let vm = this
        vm.$router.push({path: '/article/' + articleId})
      }
    }
  }
</script>
