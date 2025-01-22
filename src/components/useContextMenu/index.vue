<template>
  <div class="context-menu-box" ref="contextMenuRef">
    <slot></slot>
    <Teleport to="body">
      <Transition @before-enter="handleBeforeEnter" @enter="handleEnter" @afterEnter="handleAfterEnter">
        <div v-if="showMenu" class="context-menu" :style="formatStyle({ x, y, windowWidth, windowHeight })">
          <div class="menu-list">
            <!-- 添加菜单的点击事件 -->
            <div @click="handleClick(item)" class="menu-item" v-for="(item, i) in menuList" :key="item.label">
              {{ item.label }}
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineProps, onMounted, nextTick, watchEffect } from 'vue';
  import { useContextMenu, formatStyle } from './useContextMenu';

  const props = defineProps({
    menuList: {
      type: Array,
      default: () => [],
    },
  });

  const contextMenuRef = ref<HTMLElement | null>(null);
  const emit = defineEmits(['select']);
  const { x, windowWidth, y, windowHeight, showMenu } = useContextMenu(contextMenuRef);

  // 在组件挂载后初始化 contextMenuRef
  onMounted(() => {
  });

  // 菜单的点击事件
  function handleClick(item: any) {
    // 选中菜单后关闭菜单
    showMenu.value = false;
    // 并返回选中的菜单
    emit('select', item);
  }

  function handleBeforeEnter(el) {
    el.style.opacity = 0;
    el.style.height = 0;
  }

  async function handleEnter(el) {
    await nextTick(); // 确保 DOM 更新完成
    el.style.opacity = 1;
    el.style.height = 'auto';
    const h = el.clientHeight;
    el.style.height = 0;
    requestAnimationFrame(() => {
      el.style.height = h + 'px';
      el.style.transition = '.5s ease-out';
    });
  }

  function handleAfterEnter(el) {
    el.style.transition = 'none';
  }
</script>

<style lang="scss" scoped>
  .context-menu-box {
    width: 100%;
    height: 100%;
  }

  .context-menu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    max-width: 300px;
    /* 设置最大宽度 */
    transition: opacity .5s ease-out;
    overflow: hidden;
    /* 隐藏溢出内容 */
  }

  .context-menu .menu-list {
    display: flex;
    flex-direction: column;
  }

  .context-menu .menu-item {
    margin: 0;
    padding: 7px 16px;
    box-sizing: border-box;
    cursor: pointer;
    white-space: nowrap;
    /* 防止文字换行 */
  }

  .context-menu .menu-item:hover {
    background: #eee;
  }
</style>
