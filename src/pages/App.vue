<template>
  <div class="container">
    <div class="slide-box">
      <SliderBar @change-current-item="handleCurrentItemChange" />
    </div>
    <div class="main" @contextmenu="onContextMenu">
      <div class="search-box">
        <SearchComponent />
      </div>
      <div class="content-app">
        <AppList />
      </div>
      <Footer class="footer" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive, h } from 'vue';
import type { MenuOptions } from '@imengyu/vue3-context-menu';
import ContextMenu from '@imengyu/vue3-context-menu';
import { useUserStore } from '@/store';
import SearchComponent from './components/search.vue';
import SliderBar from './components/slider-bar.vue';
import AppList from './components/app-list.vue';
import Footer from './components/footer.vue';

const userStore = useUserStore();
console.log('userStore:', userStore);

const handleCurrentItemChange = <T>(item: T, index: number) => {
  console.log('🚀 ~ item:', item);
};

const menuContainer = ref<HTMLElement>();
const menuData = reactive<MenuOptions>({
  items: [
    {
      label: '添加图表',
      icon: h('img', {
        src: 'https://imengyu.top/assets/images/test/icon.png',
        style: {
          width: '20px',
          height: '20px'
        }
      }),
      divided: true,
      onClick: () => alert('Click Simple item')
    },
    {
      label: '换壁纸',
      children: [
        {
          label: 'Back',
          onClick: () => {
            console.log('You click Back');
          }
        },
        { label: 'Forward', disabled: true },
        {
          label: 'Reload',
          divided: true,
          icon: 'icon-reload-1',
          onClick: () => {
            alert('You click Reload');
          }
        },
        {
          label: 'Save as...',
          icon: 'icon-save',
          onClick: () => {
            alert('You click Save as');
          }
        },
        {
          label: 'Print...',
          icon: 'icon-print',
          onClick: () => {
            alert('You click Print');
          }
        },
        { label: 'View source', icon: 'icon-terminal' },
        { label: 'Inspect' }
      ]
    },
    {
      label: '本地搜索',
      clickClose: false,
      onClick: () => {
        menuData.items![4].hidden = !menuData.items![4].hidden;
      }
    },
    {
      label: '立即备份',
      icon: 'icon-reload-1'
    },
    {
      label: '设置',
      svgIcon: '#icon-clock'
    },
    {
      label: '编辑',
      svgIcon: '#icon-multiply',
      svgProps: {
        fill: '#f60'
      }
    }
  ],
  iconFontClass: 'iconfont',
  customClass: 'class-a',
  zIndex: 9999,
  minWidth: 230,
  x: 0,
  y: 0
});

const onContextMenu = (e: any) => {
  // prevent the browser's default menu
  e.preventDefault();

  const scaledPosition = ContextMenu.transformMenuPosition(
    e.target as HTMLElement,
    e.offsetX,
    e.offsetY,
    menuContainer.value
  );

  menuData.getContainer = menuContainer.value;
  menuData.x = scaledPosition.x;
  menuData.y = scaledPosition.y;
  console.log(scaledPosition.x, scaledPosition.y);

  // show our menu
  ContextMenu.showContextMenu(menuData as MenuOptions);
};

onMounted(() => {});
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

.content-app {
  width: auto;
  height: auto;
  padding: 0 40px;
  box-sizing: border-box;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
