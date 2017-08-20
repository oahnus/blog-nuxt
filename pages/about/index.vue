<template>
  <section>
    <el-row :gutter="20" type="flex" class="row-bg" justify="center">
      <el-col :span="16" style="min-width: 1366px">
        <el-row>
          <page-header></page-header>
        </el-row>
        <el-row class="main-container">
          <!--main content-->

          <el-col style="padding: 5px">
            <el-card class="box-card">
              <!-- 个人简介 -->
              <el-row>
                <el-col :span="4" :offset="4">
                  <img :src="user.avatar_url" width="150px" style="border-radius: 20px"/>
                </el-col>
                <el-col :span="12">
                  <div style="font-size: 40px;font-weight: 700">{{user.name}}</div>
                  <div style="margin-top: 10px">{{user.bio === null ? '作者很懒, 什么也没有写' : user.bio}}</div>
                  <div><img src="../../assets/icon/location.png" style="width: 15px;margin-top: 10px"/> {{user.location}}</div>
                </el-col>
              </el-row>

              <el-row style="height: 50px;"></el-row>
              <el-row>
                <el-col :span="18" :offset="3" style="border: 2px solid;"></el-col>
              </el-row>

              <!-- 项目地址 -->
              <el-row>
                <el-col :span="18" :offset="3" style="margin-top: 20px" >
                  <div style="font-size: 20px;font-weight: 700;margin-bottom: 10px">Github Repository</div>
                  <el-row v-for="(row, index) in repos" :key="index">
                    <el-col v-for="repo in row" :key="repo.id" :span="6" style="padding: 5px;">
                      <div class="repository-card" @click="gotoRepositoryUrl(repo.html_url)">
                        <div class="lang-img">
                          <img :src="'/image/git-icon/' + repo.language + '.png'"/>
                        </div>
                        <div class="repository-name">{{cutDown(repo.name, 20)}}</div>
                        <div class="repository-lang">{{repo.language}}</div>
                        <div class="repository-desc">{{cutDown(repo.description, 30)}}</div>
                        <div class="repository-stat">
                          <span><img src="../../assets/icon/star.png"/>{{repo.stargazers_count}}</span>
                          <span><img src="../../assets/icon/watch.png"/>{{repo.watchers_count}}</span>
                          <span><img src="../../assets/icon/fork.png"/>{{repo.forks_count}}</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>

            </el-card>
          </el-col>

          <!--side bar-->
          <!--<el-col :span="6" style="padding: 5px">-->
            <!--&lt;!&ndash;<el-card class="box-card" :body-style="{padding: '20px'}">&ndash;&gt;-->
            <!--<side-bar></side-bar>-->
            <!--&lt;!&ndash;</el-card>&ndash;&gt;-->
          <!--</el-col>-->
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
    fetch ({ store }) {
      return Promise.all([
        store.dispatch('loadGithubUser'),
        store.dispatch('loadGithubRepositories')
      ])
    },
    computed: {
      repos () {
        return this.$store.state.github.repositories
      },
      user () {
        return this.$store.state.github.user
      },
      repositories () {
        return [
          [
            {name: '1,1'},
            {name: '1,2'},
            {name: '1,3'},
            {name: '1,4'}
          ],
          [
            {name: '2,1'},
            {name: '2,2'}
          ]
        ]
      }
    },
    methods: {
      cutDown (str, length) {
        return str ? (str.length > length ? str.substr(0, length) + '...' : str) : ''
      },
      canUseDOM () {
        return !!(typeof window !== 'undefined' && window.document && window.document.createElement)
      },
      gotoRepositoryUrl (url) {
        if (this.canUseDOM()) {
          window.location.href = url
        }
      }
    },
    created () {
    }
  }
</script>

<style scoped>
  .main-container {
    /*position: absolute;*/
    margin-top: 60px;
    margin-bottom: 60px;
  }
  .repository-card {
    border: 1px solid #eee;
    height: 250px;
    background: #eee;
    cursor: pointer;
    box-shadow: 1px 1px 5px #888888;
  }
  .repository-card:hover {
    background: #ccc;
  }

  .repository-card .lang-img {
    text-align: center;
  }
  .lang-img img {
    height: 50px;
    width: 50px;
    margin-top: 15px;
  }
  .repository-name {
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    margin-top: 3px;
    /*color: ;*/
  }
  .repository-lang {
    text-align: center;
    font-size: 16px;
    margin-top: 3px;
  }
  .repository-desc {
    margin: 10px 15px 0 15px;
  }
  .repository-stat {
    position: absolute;
    bottom: 10px;
    margin-left: 15px;
    text-align: center;
    width: 200px;
  }
  .repository-stat span {
    margin-right: 10px;
  }
  .repository-stat img {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
</style>
