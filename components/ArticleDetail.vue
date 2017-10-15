<template>
  <section>
    <el-col>
      <!-- 面包屑 -->
      <el-card class="box-card" :body-style="{padding: '10px'}">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }" class="breadcrumb-item">
            <img class="icon" src="../assets/icon/homepage.png">
            首页
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/articles/category/' + article.articlePreview.category.id}" class="breadcrumb-item">
            {{article.categoryName}}
          </el-breadcrumb-item>
          <el-breadcrumb-item class="breadcrumb-item">
            {{article.title}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-card>
      <!-- 文章头 -->
      <el-card class="box-card" :body-style="{padding: '20px'}" style="padding-left: 20px">
        <el-row class="article-title" :gutter="20">
          {{article.title}}
        </el-row>
        <el-row class="article-info" :gutter="20">
          <img class="icon" src="../assets/icon/author.png"><div class="author">{{article.articlePreview.user.nickname}}</div>
          <img class="icon" src="../assets/icon/time.png"><div>{{createTimeFormat}}</div>
          <img class="icon" src="../assets/icon/view.png"><div>{{article ? article.articlePreview.viewAmount : 0}}</div>
          <img class="icon" src="../assets/icon/comment.png"><div>{{article ? article.articlePreview.commentAmount : 0}} 评论</div>
        </el-row>
        <el-row :gutter="20" class="tag-list">
          <el-tag class="tag"
                  type="primary"
                  :key="tag.id"
                  v-for="tag in article.articlePreview.tags"
                  @click.native="chooseTag(tag.id)">
            {{tag.name}}
          </el-tag>
        </el-row>
      </el-card>
      <!-- 文章内容 -->
      <el-card class="box-card" :body-style="{padding: '20px'}">
        <a :id="'top'"></a>
        <div v-html="article.content" class="markdown-body"></div>
      </el-card>
      <div class="back-top"><a :href="'#top'" style="text-decoration: none">Top</a></div>

       <!-- comment -->
      <el-card class="box-card comment-input" :body-style="{padding: '20px'}">
        <div class="label">评论 (共{{article.articlePreview.commentAmount}}条)</div>
        <el-row>
          <el-col :span="1">
            <img class="avatar" :src="userAvatar">
          </el-col>
          <el-col :span="16" :offset="2">
            <el-input
              size="large"
              placeholder="请输入内容"
              v-model="comment">
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" size="large" @click="commitComment">提  交</el-button>
          </el-col>
        </el-row>
      </el-card>

      <!--<el-card class="box-card comment-list" :body-style="{padding: '20px'}" v-if="article.comments.length > 0">-->
        <!--<div class="label">最新评论</div>-->
          <!--<hr style="border-color: red;"/>-->
            <!--<div v-for="(comment, index) in article.comments">-->
            <!--<el-row>-->
              <!--<el-col :span="1">-->
                <!--<img class="avatar" :src="comment.fromUser.avatar" style="margin-top: 5px">-->
              <!--</el-col>-->
              <!--<el-col :span="20" :offset="2">-->
                <!--<el-row :gutter="10" class="comment-header">-->
                  <!--<div style="float: left;color: red;font-size: 18px;cursor: pointer">-->
                    <!--{{comment.fromUser.nickname}}-->
                  <!--</div>-->
                <!--<div style="float: right;color: #bbb">{{ commentTimeFormat(comment.createTime) }}</div>-->
              <!--</el-row>-->
              <!--<el-row :gutter="20" style="margin-top: 10px;font-size: 16px">-->
                <!--<div>{{comment.content}}</div>-->
              <!--</el-row>-->
              <!--<el-row>-->
                <!--<el-col :offset="16" class="comment-footer">-->
                  <!--<span>赞同({{comment.approval}})</span>-->
                  <!--<span>反对({{comment.against}})</span>-->
                  <!--<span>回复</span>-->
                  <!--<span v-if="comment.fromUser.id === currentUser.id"-->
                    <!--style="color: red" @click="deleteComment(comment.id)">删除</span>-->
                  <!--</el-col>-->
                <!--</el-row>-->
              <!--</el-col>-->
            <!--</el-row>-->
          <!--<hr/>-->
        <!--</div>-->
      <!--</el-card>-->
    </el-col>
  </section>
</template>

<script>
  import moment from 'moment'
  import validate from '../plugins/validate'

  export default {
    data () {
      return {
        comment: ''
      }
    },
    props: {
      article: {}
    },
    computed: {
      createTimeFormat () {
        let vm = this
        if (vm.article) {
          return moment(vm.article.articlePreview.createTime).fromNow() +
            moment(vm.article.articlePreview.createTime).format('(YYYY-MM-DD)')
        } else {
          return ''
        }
      },
      userAvatar () {
        let user = null
        if (this.canUseDOM()) {
          user = JSON.parse(window.localStorage.getItem('user'))
        }
        if (user) {
          return user.avatar
        } else {
          return '/static/image/avatar/default.jpg'
        }
      },
      currentUser () {
        if (this.canUseDOM()) {
          return JSON.parse(window.localStorage.getItem('user')) || {}
        } else {
          return {}
        }
      }
    },
    methods: {
      canUseDOM () {
        return !!(typeof window !== 'undefined' && window.document && window.document.createElement)
      },
      commitComment () {
        console.log('button', 'click')
        let vm = this
        let user = null
        if (vm.canUseDOM()) {
          user = JSON.parse(window.localStorage.getItem('user'))
        }
        if (!user) {
          vm.$message.warning('请登录后再评论')
          return
        }

        if (validate.isBlank(vm.comment)) {
          vm.$message.warning('评论内容不能为空')
          return false
        }
        let form = {}
        form.articleId = vm.article.id
        form.toUserId = vm.article.userId
        form.fromUserId = user.id
        form.content = vm.comment
        form.type = 1

        console.log('[评论]', form)
        vm.$store.dispatch('submitComment', form)
          .then(body => {
            if (body.errcode === 0) {
              form.fromUser = user
              form.approval = 0
              form.against = 0
              vm.article.comments.push(form)
              vm.$message.success('评论成功')
            } else {
              vm.$message.warning(body.msg)
            }
          }, error => {
            console.log('[error]', error)
            vm.$message.error(error)
          })
      },
      commentTimeFormat (date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      deleteComment (commentId) {
        console.log('[评论ID]', commentId)
      },
      chooseTag (tagId) {
        this.$router.push({'path': '/articles/tag/' + tagId})
      }
    },
    created () {
//      console.log(this.article)
    }
  }
</script>

<style scoped>
  .comment-header {

  }
  .comment-footer {
    margin-top: 10px;
  }
  .comment-footer span {
    font-size: 14px;
    color: #999;
    margin-right: 5px;
    cursor: pointer;
  }
  .comment-input {
    margin-top: 10px;
  }
  .comment-input .label{
    margin-bottom: 10px;
    font-size: 20px;
    margin-left: 20px;
  }
  .comment-input .el-input,.el-button {
    height: 42px;
  }
  .comment-input .avatar {
    width: 42px;
    height: 42px;
    border: 1px solid #bbb;
    margin-left: 20px;
    /*border-radius: 10px;*/
    cursor: pointer;
  }
  .comment-list {
  }
  .comment-list .avatar {
    width: 42px;
    height: 42px;
    border: 1px solid #bbb;
    margin-left: 20px;
    cursor: pointer;
  }
  .comment-list .label {
    font-size: 20px;
    margin-left: 20px;
    margin-bottom: 10px;
  }
  .back-top {
    height: 40px;
    width: 40px;
    line-height: 40px;
    border-radius: 4px;
    background-color: #1088e9;
    color: #fff;
    text-align: center;
    float: right;
    margin-top: -45px;
    margin-right: -45px;
    z-index: 10;
  }
  .icon {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 1px;
  }
  .breadcrumb-item {
    /*display: inline;*/
    vertical-align: middle;
  }
  .article-info div{
    margin-right: 25px;
    display: inline;
  }
  .article-info {
    margin-top: 10px;
  }
  .article-title {
    font-size: 25px;
  }
  .tag {
    margin-right: 10px;
    cursor: pointer;
  }
  .tag-list {
    margin-top: 10px;
  }
</style>
