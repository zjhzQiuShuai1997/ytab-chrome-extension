import { onMounted, onUnmounted, ref } from 'vue';

/**
 * 自定义右键上下文菜单钩子函数
 * @param containerRef 容器元素的引用
 * @returns 返回控制菜单显示、窗口尺寸和菜单位置的状态
 */
export function useContextMenu(containerRef: any) {
  // 控制菜单是否显示
  const showMenu = ref(false);
  // 菜单显示位置坐标
  const x = ref(0);
  const y = ref(0);

  // 获取窗口的尺寸
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  /**
   * 处理右键点击事件，显示上下文菜单
   * @param e 鼠标事件
   */
  const handleContextMenu = (e: MouseEvent) => {
    // 阻止默认的上下文菜单行为
    e.preventDefault();
    // 阻止事件冒泡
    e.stopPropagation();

    // 获取容器和窗口的尺寸
    const containerRect = containerRef.value?.getBoundingClientRect();

    // 计算菜单的位置
    let menuX = e.clientX;
    let menuY = e.clientY;

    // 获取菜单元素的尺寸
    const menuElement = document.querySelector('.context-menu') as HTMLElement;
    if (menuElement) {
      const menuWidth = menuElement.offsetWidth;
      const menuHeight = menuElement.offsetHeight;

      // 调整菜单位置以防止超出屏幕边界
      if (menuX + menuWidth > windowWidth) {
        menuX = windowWidth - menuWidth;
      }
      if (menuY + menuHeight > windowHeight) {
        menuY = windowHeight - menuHeight;
      }

      // 确保菜单不超出容器边界
      if (menuX < containerRect.left) {
        menuX = containerRect.left;
      }
      if (menuY < containerRect.top) {
        menuY = containerRect.top;
      }
    }

    // 设置菜单显示状态为true
    showMenu.value = true;
    // 设置菜单的横坐标
    x.value = menuX;
    // 设置菜单的纵坐标
    y.value = menuY;
  };

  /**
   * 关闭上下文菜单
   */
  const closeMenu = () => {
    // 设置菜单显示状态为false
    showMenu.value = false;
  };

  /**
   * 组件挂载时，添加事件监听器
   */
  onMounted(() => {
    const div = containerRef.value;
    if (div) {
      // 为容器添加右键点击事件监听器
      div.addEventListener('contextmenu', handleContextMenu);
      // 为窗口添加点击事件监听器，用于关闭菜单
      window.addEventListener('click', closeMenu);
      // 为窗口添加右键点击事件监听器，用于关闭菜单
      window.addEventListener('contextmenu', closeMenu);
    }
  });

  /**
   * 组件卸载时，移除事件监听器
   */
  onUnmounted(() => {
    const div = containerRef.value;
    if (div) {
      // 移除容器的右键点击事件监听器
      div.removeEventListener('contextmenu', handleContextMenu);
      // 移除窗口的点击事件监听器
      window.removeEventListener('click', closeMenu);
      // 移除窗口的右键点击事件监听器
      window.removeEventListener('contextmenu', closeMenu);
    }
  });

  // 返回控制菜单显示、窗口尺寸和菜单位置的状态
  return {
    showMenu,
    windowWidth,
    windowHeight,
    x,
    y
  };
}

/**
 * 格式化样式以确保菜单在屏幕范围内显示
 * 此函数根据给定的坐标和窗口尺寸计算菜单的最终位置
 * 它确保菜单不会超出窗口的边界，如果超出，则调整到窗口边缘
 *
 * @param data 包含菜单初始位置和窗口尺寸的对象
 * @param data.x 菜单初始横坐标
 * @param data.y 菜单初始纵坐标
 * @param data.windowWidth 窗口宽度
 * @param data.windowHeight 窗口高度
 * @returns 返回一个包含调整后的菜单位置的对象
 */
export function formatStyle(data: {
  x: number;
  y: number;
  windowWidth: number;
  windowHeight: number;
}) {
  // 解构赋值，提取传入的坐标和窗口尺寸
  const { x, y, windowWidth, windowHeight } = data;

  // 初始化菜单的左上角坐标
  let left = x;
  let top = y;

  // 如果菜单超出屏幕宽度
  if (x >= windowWidth - 150) {
    // 调整菜单的左坐标到窗口右边缘
    left = windowWidth - 80;
  }

  // 如果菜单超出屏幕高度
  if (y >= windowHeight - 150) {
    // 调整菜单的上坐标到窗口下边缘
    top = windowHeight - 80;
  }

  // 返回调整后的菜单位置，单位为像素
  return { left: `${left}px`, top: `${top}px` };
}
