<template>
  <div>
    <loading :show="loading" />
    <div id="wrapper">
      <side-menu v-show="showSideMenu" />
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <header-bar @click="showSideMenu = !showSideMenu" />
          <router-view></router-view>
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
import { mapState } from "vuex";

import HeaderBar from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import Loading from "@/components/Loading";

export default {
  name: "App",
  components: {
    HeaderBar,
    SideMenu,
    Loading
  },
  data: () => {
    return {
      showSideMenu: true
    };
  },
  computed: {
    ...mapState("common", ["loading"])
  }
};
</script>
