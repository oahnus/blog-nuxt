<template>
  <div>
    <div class="article-entity">
      <el-row>
        <el-col :span="6">
          <img class="icon" src="../assets/icon/catrgoty.png">
          <span class="category" @click="getArticleByCategory">&nbsp;{{ article.categoryName}}&nbsp;</span>
        </el-col>
        <el-col :span="18">
          <div class="title" @click="gotoArticleContent">{{ article.title }}</div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 10px">
        <el-col :span="6">
          <img class="cover" @click="gotoArticleContent" :src="article.coverImg" />
        </el-col>
        <el-col :span="18">
          <p class="summary">{{ article.summary }}</p>
        </el-col>
      </el-row>

      <el-row>
        <el-col :offset="13">
          <div class="statistics">
            <img class="icon" src="../assets/icon/author.png"><div class="author">{{article.author}}</div>
            <img class="icon" src="../assets/icon/time.png"><div>{{createTime}}</div>
            <img class="icon" src="../assets/icon/view.png"><div>{{article.statistics.viewNum}}</div>
            <img class="icon" src="../assets/icon/comment.png"><div>{{article.statistics.commentNum}} 评论</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    data () {
      return {
      }
    },
    computed: {
      createTime () {
        let vm = this
        return moment(vm.article.statistics.createTime).fromNow()
      }
    },
    props: {
      article: {}
    },
    methods: {
      gotoArticleContent () {
        let vm = this
        vm.$router.push({path: '/article/' + vm.article.id})
      },
      getArticleByCategory () {
        let vm = this
        let categoryId = vm.article.categoryId
        vm.$router.push({path: '/articles/category/' + categoryId})
      }
    },
    created () {

    }
  }
</script>

<style scoped>
  .category {
    font-size: 16px;
    cursor: pointer;
    border: 1px double;
    background: red;
    color: white;
  }
  .title {
    /*margin-left: 20px;*/
    font-size: 22px;
    color: green;
    cursor: pointer;
  }
  .cover {
    width: 100%;
    cursor: pointer;
  }
  .summary {
    font-size: 16px;
    color: #888;
  }
  .icon {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 1px;
  }
  .author {
    cursor: pointer;
    color: #1c8de0;
  }
  .statistics div {
    margin-right: 15px;
    display: inline;
  }
</style>

