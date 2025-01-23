<template>
  <ul v-draggable="[
    list,
    {
      animation: 150,
      ghostClass: 'ghost',
      onUpdate,
      onStart
    }
  ]" class="app-list">
    <li class="app-item icon-size-1x1" v-for="(item, index) in list" :key="item.id" :data-id="item.id">
      <div class="app-item-icon">
        <img :src="item.icon" alt="app-icon" />
      </div>
      <p class="app-item-name one-ellipsis">{{ item.name }}</p>
    </li>
  </ul>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { vDraggable } from 'vue-draggable-plus';

  const list = ref([
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

  function onStart() {
    console.log('start');
  }

  function onUpdate() {
    console.log('update');
  }
</script>

<style lang="scss" scoped>
  img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .app-list {
    position: relative;
    display: grid;
    padding-top: 2vh;
    -webkit-user-select: none;
    user-select: none;
    grid-template-columns: repeat(auto-fill, var(--icon-size));
    grid-template-rows: repeat(auto-fill, var(--icon-size));
    grid-auto-flow: dense;
    grid-gap: var(--icon-gap-x) var(--icon-gap-y);
    box-sizing: border-box;
    justify-content: center;
    padding-bottom: 50px;

    .app-item {
      list-style-type: none;
      position: relative;
      grid-column: span 1;
      grid-row: span 1;
      height: 100%;
      user-select: none;
      -webkit-user-select: none;
      box-sizing: border-box;
      opacity: var(--icon-opacity);
      width: calc(var(--icon-size) + var(--icon-gap-y));
      height: calc(var(--icon-size) + var(--icon-gap-x));
      border-radius: var(--icon-radius);

      .app-item-icon {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: var(--icon-radius);
        font-size: 12px;
        box-shadow: 0 0 5px #0000001a;
        transition: transform 0.2s;
        cursor: pointer;
      }

      .app-item-name {
        width: calc(100% + var(--icon-gap-y));
        margin-left: calc(var(--icon-gap-y) / 2 * -1);
        display: var(--icon-name);
        margin-top: 6px;
        text-align: center;
        color: var(--icon-nameColor);
        font-size: var(--icon-nameSize);
        line-height: 1.1;
        filter: drop-shadow(0px 2px 7px rgba(0, 0, 0, 0.8));
      }
    }

    .icon-size-1x1 {
      width: var(--icon-size);
      height: var(--icon-size);
    }
  }
</style>
