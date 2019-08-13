<template>
  <div>
    <div id="wrapper">
      <SideMenu />
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <header-bar />
          <router-view class="adjustContentRight"></router-view>
        </div>
        <footer class="sticky-footer bg-white">
          <div class="container my-auto">
            <div class="copyright text-center my-auto">
              <span>Copyright © bazz tweet 2019</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
    <a class="scroll-to-top rounded" href="#page-top" style="display: none;">
      <i class="fas fa-angle-up"></i>
    </a>
  </div>
</template>
<script>
import HeaderBar from "@/components/Header";
import SideMenu from "@/components/SideMenu";

export default {
  name: "App",
  components: {
    HeaderBar,
    SideMenu
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
</style>
