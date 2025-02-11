<template>
  <div class="footer">
    <div class="footer-box">
      <div class="footer-box_title" :title="footerText">{{ footerText }}</div>
      <div class="footer-box_copy">
        222
        <!-- <svg-icon name="复制"></svg-icon> -->
      </div>
      <div class="footer-box_refresh" @click="getTianGouText"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const footerText = ref('');
const tinaGouApi = ref('http://api.kekc.cn/api/tiangou');
const httpRequest = new XMLHttpRequest();

const getTianGouText = () => {
  try {
    httpRequest.open('GET', tinaGouApi.value, true);
    httpRequest.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    httpRequest.send();
    httpRequest.addEventListener('load', () => {
      footerText.value = httpRequest.response;
    });
  } catch (error) {
    console.log('error', error);
  }
};

onMounted(() => {
  getTianGouText();
});
</script>
<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  &-box {
    width: 450px;
    display: flex;
    padding: 10px 25px;
    &_title {
      width: 400px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      // text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
      //   margin-right: 5px;
    }
    &_copy {
      width: 20px;
      display: none;
      margin-right: 5px;
    }
    &:hover {
      cursor: pointer;
      background-color: rgba($color: #000000, $alpha: 0.1);
      &_title {
        width: 400px;
        margin-right: 5px;
      }
      .footer-box_copy {
        display: block;
      }
    }
  }
}
</style>
