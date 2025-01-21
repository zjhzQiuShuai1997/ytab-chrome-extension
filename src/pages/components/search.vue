<template>
  <div class="search">
    <div class="select" @click="changeSearchApp">
      <div class="select-icon">
        <img :src="selectIcon" alt="" />
      </div>
      <div class="select-change">
        <svg-icon name="bottom-arrow" size="12"></svg-icon>
      </div>
    </div>
    <div class="input">
      <input v-model="searchText" class="input-box" placeholder="输入搜索内容" @keyup.enter="search" />
    </div>
    <div class="search-icon" @click="search">
      <svg-icon name="search-icon" size="20"></svg-icon>
    </div>
    <div class="box">
      <div ref="boxRef" class="list">
        <div v-for="item in selectList" :key="item.icon" class="item" @click="changeSearchIcon(item)">
          <div class="item-img">
            <img :src="item.icon" alt="" />
          </div>
          <p style="
              text-align: center;
              font-size: 12px;
              line-height: 22px;
              color: #222;
            ">
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  interface SelectItem {
    id: number;
    icon: string;
    name: string;
    url: string;
  }


  const activityKey = ref(0);
  const searchText = ref('');
  const selectList = ref<SelectItem[]>([
    {
      id: 1,
      name: '百度',
      icon: 'https://files.codelife.cc/itab/search/baidu.svg',
      url: 'https://www.baidu.com/s?wd='
    },
    {
      id: 2,
      name: '必应',
      icon: 'https://files.codelife.cc/itab/search/bing.svg',
      url: 'https://cn.bing.com/search?q='
    },
    {
      id: 3,
      name: 'Google',
      icon: 'https://files.codelife.cc/itab/search/google.svg',
      url: 'https://www.google.com/search?q='
    },
    {
      id: 4,
      name: 'github',
      icon: 'https://files.codelife.cc/itab/search/github.svg',
      url: 'https://github.com/search?q='
    }
  ]);
  const boxRef = ref<HTMLElement>();
  const selectIcon = computed(() => {
    return selectList.value[activityKey.value].icon;
  });
  const search = () => {
    window.open(selectList.value[activityKey.value].url + searchText.value);
  };
  const changeSearchApp = () => {
    boxRef.value?.classList.toggle('list-active');
  };
  const changeSearchIcon = (item: SelectItem) => {
    activityKey.value = selectList.value.findIndex((el) => el.id === item.id);
    boxRef.value?.classList.toggle('list-active');
  };
</script>
<style lang="scss" scoped>
  .search {
    width: 600px;
    height: 45px;
    border-radius: 25px;
    border: 1px solid #ccc;
    background-color: rgba(225, 225, 225, 0.7);
    display: flex;
    justify-content: space-between;
    box-shadow: 0 0 10px 3px #0000001a;
    position: relative;
  }

  .select {
    width: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    cursor: pointer;
  }

  .select:hover {
    background-color: var(--alpha-bg);
  }

  .select-icon {
    width: 30px;
    height: 30px;
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .select-icon img {
    width: 25px;
    height: 25px;
    object-fit: cover;
  }

  .select-change {
    width: 25px;
    text-align: center;
    align-content: center;
  }

  .input {
    width: 480px;
    display: flex;
    align-items: center;
  }

  .input-box {
    width: 100%;
    height: 40px;
    outline: none;
    background-color: transparent;
    border: none;
  }

  .search-icon {
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search-icon:hover {
    background-color: var(--alpha-bg);
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
  }


  .box {
    width: 100%;
    position: absolute;
    z-index: 10;
    top: 60px;
    left: 0;
  }

  .list {
    padding: 10px;
    transition: 0.2s;
    border-radius: 25px;
    backdrop-filter: blur(8px);
    background-color: rgba(225, 225, 225, 0.8);
    box-shadow: 0 0 10px 3px #00000029;
    overflow: hidden;
    transform-origin: top;
    display: flex;
    transform: scaleY(0);
  }

  .list-active {
    transform: scaleY(1);
  }

  .item {
    width: 64px;
    padding: 6px 0;
    display: inline-block;
    cursor: pointer;
    position: relative;
    transition: background 0.2s;
    border-radius: 8px;
  }

  .item-img {
    color: rgba(225, 225, 225, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 30px;
    margin: 0 auto;
    height: 36px;
    width: 36px;
    border-radius: 8px;
    background-color: #fff;
  }

  .item-img img {
    width: 20px;
    height: 20px;
    object-fit: cover;
  }
</style>
