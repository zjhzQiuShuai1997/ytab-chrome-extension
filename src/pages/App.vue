<template>
  <div class="container">
    <div class="slide">
      <div class="slide-top">
        <div class="slide-top-avatar">
          <img :src="imgUrl" alt="" />
        </div>
      </div>
      <div class="slide-bottom">
        <button class="slide-bottom-button">
          <img
            src="../assets/setting-two.svg"
            style="color: white"
            class="logo"
          />
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const imgUrl = ref(
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp'
);
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background: #888;
}
.slide {
  width: 55px;
  height: 90vh;
  padding: 5vh 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.slide ::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
}
.slide-top {
  padding-left: 10px;
  padding-right: 10px;
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
}
</style>
