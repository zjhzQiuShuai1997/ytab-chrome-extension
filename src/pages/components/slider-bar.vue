<template>
  <div class="app-sidebar-body">
    <div class="slide-top">
      <div class="slide-top-avatar">
        <img
          :src="imgUrl || 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp'"
          alt="" />
      </div>
    </div>
    <div class="app-sidebar-group">
      <ul class="app-sidebar-ul">
        <li class="app-group-item" v-for="(item, index) in leftGroupList" :key="item.id"
          @click="handleCurrentItem(item, index)">
          <i class="app-group-item-icon">
            <svg-icon :name="item.icon"></svg-icon>
          </i>
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>
    <div class="slide-bottom">
      <button class="slide-bottom-button">
        <svg-icon name="setting-two"></svg-icon>
      </button>
    </div>
  </div>
</template>

<script setup lang='ts'>
  import { ref, onMounted, defineEmits } from 'vue'
  import { getAppList } from '@/api/api';

  interface AppList {
    id: number;
    name: string;
    icon: string;
    [key: string]: any
  }

  const imgUrl = ref('');

  const leftGroupList = ref<AppList[]>([
    {
      id: 1,
      name: '主页',
      icon: 'reduce-one',
    },
    {
      id: 2,
      name: '程序员',
      icon: 'reduce-one',
    },
    {
      id: 3,
      name: '设计',
      icon: 'reduce-one',
    },
    {
      id: 4,
      name: '产品',
      icon: 'reduce-one',
    },
    {
      id: 5,
      name: '摸鱼',
      icon: 'reduce-one',
    },
    {
      id: 6,
      name: 'AI',
      icon: 'reduce-one',
    },
  ]);
  const getAppListData = async () => {
    try {
      const res = await getAppList();
      console.log('res', res);
    } catch (error) {
      console.log('获取app出错：', error);
    }
  };


  const $emit = defineEmits(['change-current-item'])
  const handleCurrentItem = (item: AppList, index: number) => {
    $emit('change-current-item', item, index);
  }

  onMounted(() => {
    // imgUrl.value = userStore.avatar;
    // getAppListData();
  });
</script>

<style lang='scss' scoped>
  .app-sidebar-body {
    width: var(--sidebar-width);
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // filter: blur(5px);
    backdrop-filter: blur(6px);
    transition: transform 0.2s;
    color: rgba(var(--img-text), .6);
    -webkit-backdrop-filter: blur(6px);
    background-color: rgba(var(--img-bg), var(--sidebar-opacity));
    font-size: 12px;
    text-align: center;

    .slide-top {
      margin: 40px auto;
      cursor: pointer;
    }

    .slide-top-avatar {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      overflow: hidden;
    }

    .slide-top-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .slide-bottom {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .slide-bottom-button {
      width: 35px;
      height: 35px;
      background-color: rgba(0, 0, 0, 0.1);
      border: none;
      cursor: pointer;
      border-radius: 4px;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px auto 40px;
    }

    .app-sidebar-group {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;

      .app-group-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 4px 0;
        height: 50px;
        transition: background .3s;
        cursor: pointer;
      }

      .app-group-item-icon:hover {
        transform: scale(1.1);
      }
    }
  }

  // .slide ::before {
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  //   background-color: rgba(0, 0, 0, 0.1);
  // }

</style>