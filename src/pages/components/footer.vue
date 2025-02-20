<template>
  <div class="footer">
    <div class="footer-box">
      <div class="footer-box_title" :title="footerText">{{ footerText }}</div>
      <div class="footer-box_copy" @click="copyText">
        <svg-icon name="copy"></svg-icon>
      </div>
      <div class="footer-box_copy" @click="getTianGouText">
        <svg-icon name="refresh"></svg-icon>
      </div>
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
const copyText = () => {
  navigator.clipboard.writeText(footerText.value);
  // const input = document.createElement('input');
  // input.value = footerText.value; // 将要复制的文本放入输入框
  // document.body.appendChild(input);
  // input.select(); // 选择文本
  // document.execCommand('copy'); // 执行复制命令
  // document.body.removeChild(input); // 移除临时输入框
  // console.log('Text copied to clipboard');
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
    width: 550px;
    display: flex;
    padding: 10px 25px;
    &_title {
      width: 500px;
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
      cursor: pointer;
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
