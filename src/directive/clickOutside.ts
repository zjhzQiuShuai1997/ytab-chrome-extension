// 在文件顶部添加类型声明扩展
declare global {
  interface HTMLElement {
    clickOutsideEvent?: (event: MouseEvent) => void;
  }
}

export default {
  mounted(el: HTMLElement, binding: any) {
    // 定义事件处理函数
    el.clickOutsideEvent = function (event) {
      // 如果点击的目标不在元素内部并且存在绑定的方法，则调用该方法
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    // 添加事件监听器
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  beforeUnmount(el) {
    // 移除事件监听器以避免内存泄漏
    document.body.removeEventListener('click', el.clickOutsideEvent);
  }
};
