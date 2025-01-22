<template>
  <div class="container">
    <div class="slide-box">
      <SliderBar @change-current-item="handleCurrentItemChange" />
    </div>
    <div class="main">
      <useContextMenu :menu-list="[
        { label: '添加' },
        { label: '编辑' },
        { label: '删除' },
        { label: '查看' },
        { label: '复制' },
      ]" @select="handleSelect">
        <div class="search-box">
          <SearchComponent />
        </div>
      </useContextMenu>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useUserStore } from '@/store';
  import useContextMenu from '@/components/useContextMenu/index.vue'
  import SearchComponent from './components/search.vue';
  import SliderBar from './components/slider-bar.vue';

  const userStore = useUserStore();
  console.log('userStore:', userStore);

  const handleCurrentItemChange = <T>(item: T, index: number,) => {
    console.log('item:', item);
  }

  const handleSelect = (item: any) => {
    console.log('item:', item);
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
    height: 100%;
  }

  .search-box {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 160px;
  }
</style>
