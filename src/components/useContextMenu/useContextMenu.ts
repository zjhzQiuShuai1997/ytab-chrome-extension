import { onMounted, onUnmounted, ref } from 'vue';

export default function useContextMenu(containerRef: any) {
  const showMenu = ref(false);
  const x = ref(0);
  const y = ref(0);

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 获取容器和窗口的尺寸
    const containerRect = containerRef.value.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

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

    showMenu.value = true;
    x.value = menuX
    y.value = menuY
  };

  const closeMenu = () => {
    showMenu.value = false;
  };

  onMounted(() => {
    const div = containerRef.value;
    if (div) {
      div.addEventListener('contextmenu', handleContextMenu);
      window.addEventListener('click', closeMenu);
      window.addEventListener('contextmenu', closeMenu);
    }
  });

  onUnmounted(() => {
    const div = containerRef.value;
    if (div) {
      div.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('click', closeMenu);
      window.removeEventListener('contextmenu', closeMenu);
    }
  });

  return {
    showMenu,
    x,
    y
  };
}
