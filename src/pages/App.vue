<template>
  <div class="container">
    <div class="slide-box">
      <SliderBar @change-current-item="handleCurrentItemChange" />
    </div>
    <div class="main" ref="menuContainer" @contextmenu="onContextMenu">
      <div class="search-box">
        <SearchComponent />
      </div>
      <div class="app-list">
        <AppList />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, reactive, useTemplateRef } from 'vue';
  import { useUserStore } from '@/store';
  import SearchComponent from './components/search.vue';
  import SliderBar from './components/slider-bar.vue';
  import AppList from './components/app-list.vue';
  import ContextMenu from '@imengyu/vue3-context-menu';
  import type { MenuOptions } from '@imengyu/vue3-context-menu';

  const userStore = useUserStore();
  console.log('userStore:', userStore);

  const handleCurrentItemChange = <T>(item: T, index: number,) => {
    console.log('item:', item);
  }

  const menuContainer = useTemplateRef<HTMLElement>('menuContainer');
  const menuData = reactive<MenuOptions>({
    items: [
      {
        label: "添加",
        icon: "icon-reload-1",
        svgIcon: "#icon-multiply",
        svgProps: {
          fill: '#f60',
        },
        onClick: () => {
          console.log("You click Back");
        },
        children: [],
      },
      {
        label: '布局',
        clickClose: false,
        onClick: () => {
          menuData.items![4].hidden = !menuData.items![4].hidden;
        },
      },
    ],
    iconFontClass: 'iconfont',
    customClass: "class-a",
    zIndex: 3,
    minWidth: 150,
    x: 0,
    y: 0,
    getContainer: () => menuContainer.value as HTMLElement,
  });

  const onContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    const scaledPosition = ContextMenu.transformMenuPosition(event.target as HTMLElement, event.offsetX, event.offsetY, menuContainer.value as HTMLElement);

    menuData.getContainer = menuContainer.value as HTMLElement
    menuData.x = scaledPosition.x; 
    menuData.y = scaledPosition.y;
    ContextMenu.showContextMenu(menuData as MenuOptions)
  }



  onMounted(() => { });
</script>
<style scoped>
  .container {
    width: 100%;
    height: 100%;
    max-width: 100%;
    padding: 0;
    margin: 0;
    background: var(--main-bg);
    display: flex;
  }

  .slide-box {
    width: var(--sidebar-width);
    z-index: 2;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .main {
    width: 100%;
    height: 100vh;
  }

  .search-box {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 160px;
  }
</style>
