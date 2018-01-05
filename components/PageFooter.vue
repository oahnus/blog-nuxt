<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!--<a class="sitemap-btn" href="/sitemap.xml" target="_blank">SITEMAP</a>-->
        <a href="https://github.com/oahnus/blog-nuxt" target="_blank">GitHub</a>
        <span> - </span>
        <span>Powered By </span>
        <a href="https://vuejs.org/" target="_blank">Vue.js</a>
        <span>、</span>
        <a href="https://nuxtjs.org" target="_blank">Nuxt.js</a>
        <span> and solitude. Dsigned By </span>
        <router-link to="/about">Oahnus</router-link>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    methods: {

    },
    created () {
    }
  }
</script>

<style scoped>
  footer {
    background-color: white;
    position: fixed;
    width: 100%;
    /*max-width: 1366px;*/
    /*min-width: 1024px;*/
    bottom: 0;
    left: 0;
    z-index: 999;
    margin-top: 60px;
  }

  .container {
    max-width: 1366px;
    min-width: 1024px;
    margin-left: auto;
    margin-right: auto;
  }

  .footer-content {
    padding: 1em;
    font-size: .9em;
    text-align: center;
    text-transform: uppercase;
  }
</style>
