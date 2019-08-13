<template>
  <ul
    class="adjustContentTop adjustContentLeft navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
    <a
      class="sidebar-brand d-flex align-items-center justify-content-center"
      href="#"
    >
      <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-laugh-wink"></i>
      </div>
      <div class="sidebar-brand-text mx-3">Bazz Tweet</div>
    </a>
    <hr class="sidebar-divider my-0" />
    <router-link
      v-for="(menu, index) in menus"
      :key="index"
      tag="li"
      :to="menu.to"
      class="nav-item"
      replace
      exact
      exact-active-class="active"
      ><a class="nav-link" href="#">
        <i class="fas fa-fw fa-folder"></i>
        <span>{{ menu.title }}</span></a
      >
    </router-link>
  </ul>
</template>
<script>
import { ARTICLES, VIDEOS } from "@/constants/route";

export default {
  name: "SideMenu",
  data: () => {
    return {
      menus: [
        { title: "Articles", to: ARTICLES.path },
        { title: "Videos", to: VIDEOS.path }
      ]
    };
  }
};
</script>
