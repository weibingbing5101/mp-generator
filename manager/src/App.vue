<template>
  <div id="app">
    <div id="nav">
      <router-link to="/floor">楼层管理</router-link> |
      <router-link to="/page">页面管理</router-link> |
      <router-link to="/ci">mp-ci</router-link>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.content {
  padding: 24px;
}
</style>