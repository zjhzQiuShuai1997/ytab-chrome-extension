<template>
  <svg aria-hidden="true" :class="svgClass" :style="getStyle">
    <use :xlink:href="symbolId" :fill="props.color" />
  </svg>
</template>

<script lang="ts">
  import type { CSSProperties } from 'vue'
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'svg-icon'
  })
</script>
<script lang="ts" setup>
  import { computed } from 'vue'
  const props = defineProps({
    prefix: {
      type: String,
      default: 'icon'
    },
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#333'
    },
    className: {
      type: String,
      default: ''
    },
    size: {
      type: [Number, String],
      default: 16
    },
    width: {
      type: [Number, String],
      default: ''
    },
    height: {
      type: [Number, String],
      default: ''
    }
  })
  const symbolId = computed(() => `#${props.prefix}-${props.name}`)
  const svgClass = computed(() => {
    if (props.className) {
      return `svg-icon ${props.className}`
    }
    return 'svg-icon'
  })

  const getStyle = computed((): CSSProperties => {
    const { size, width, height } = props
    let s = `${size}`
    s = `${s.replace('px', '')}px`
    return {
      width: width ? width : s,
      height: height ? height : s
    }
  })
</script>

<style>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.1em;
    /* 因icon大小被设置为和字体大小一致，而span等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
    fill: currentColor;
    /* 定义元素的颜色，currentColor是一个变量，这个变量的值就表示当前元素的color值，如果当前元素未设置color值，则从父元素继承 */
    overflow: hidden;
  }
</style>
