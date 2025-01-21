<template>
  <div class="search">
    <div class="select" @click="changeSearchApp">
      <div class="select-icon">
        <img :src="selectIcon" alt="" />
      </div>
      <div class="select-change">
        <svg
          t="1737364665639"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2626"
          width="12"
          height="12"
        >
          <path
            d="M878.592 250.88q29.696 0 48.128 11.264t24.576 29.696 0 41.472-26.624 45.568q-82.944 92.16-159.744 180.224t-148.48 164.864q-19.456 20.48-45.568 31.744t-53.76 11.776-53.248-8.704-43.008-28.672q-39.936-44.032-82.944-90.112l-88.064-92.16q-43.008-46.08-85.504-90.624t-79.36-86.528q-17.408-19.456-22.528-40.448t1.024-38.4 23.552-28.672 45.056-11.264q35.84 0 98.816-0.512t137.728-0.512l153.6 0 150.528 0 125.952 0 79.872 0z"
            p-id="2627"
            fill="#8a8a8a"
          ></path>
        </svg>
      </div>
    </div>
    <div class="input">
      <input
        v-model="searchText"
        class="input-box"
        placeholder="输入搜索内容"
        @keyup.enter="search"
      />
    </div>
    <div class="search-icon" @click="search">
      <svg
        t="1737365587017"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="6695"
        width="28"
        height="28"
      >
        <path
          d="M932.140361 933.699368c-32.619932 32.832779-85.518722 32.832779-118.160143 0L666.508491 785.285177c-60.631916 39.089273-132.315538 62.448284-209.680557 62.448284-215.337393 0-389.92571-175.666882-389.92571-392.398018C66.902224 238.617609 241.490541 62.936401 456.827935 62.936401c215.362976 0 389.926734 175.681208 389.926734 392.399041 0 77.862345-23.203468 149.993153-62.08194 211.024158l147.46661 148.413168C964.785875 847.630107 964.785875 900.845099 932.140361 933.699368zM456.827935 175.049828c-153.809061 0-278.522458 125.491109-278.522458 280.285614 0 154.805762 124.713396 280.284591 278.522458 280.284591 153.834644 0 278.521434-125.478829 278.521434-280.284591C735.350392 300.540937 610.662579 175.049828 456.827935 175.049828z"
          fill="#707070"
          p-id="6696"
        ></path>
      </svg>
    </div>
    <div class="box">
      <div ref="boxRef" class="list">
        <div
          v-for="item in selectList"
          :key="item.icon"
          class="item"
          @click="changeSearchIcon(item)"
        >
          <div class="item-img">
            <img :src="item.icon" alt="" />
          </div>
          <p
            style="
              text-align: center;
              font-size: 12px;
              line-height: 22px;
              color: #222;
            "
          >
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';

const activityKey = ref(0);
const searchText = ref('');
const selectList = ref<
  Array<{
    icon: string;
    name: string;
    url: string;
  }>
>([
  {
    name: '百度',
    icon: 'https://files.codelife.cc/itab/search/baidu.svg',
    url: 'https://www.baidu.com/s?wd='
  },
  {
    name: '必应',
    icon: 'https://files.codelife.cc/itab/search/bing.svg',
    url: 'https://cn.bing.com/search?q='
  },
  {
    name: 'Google',
    icon: 'https://files.codelife.cc/itab/search/google.svg',
    url: 'https://www.google.com/search?q='
  },
  {
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
const changeSearchIcon = (item: {
  icon: string;
  name: string;
  url: string;
}) => {
  activityKey.value = selectList.value.findIndex((el) => el.icon === item.icon);
};
</script>
<style scoped>
.search {
  width: 600px;
  height: 50px;
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
  background-color: rgba(225, 225, 225, 0.8);
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
