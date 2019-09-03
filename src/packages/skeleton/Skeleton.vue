<template>
  <div class="load-wrapp">
    <div class="load-7">
      <div class="square-holder">
        <div class="square"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Skeleton'
}
</script>
<style lang="less" scoped>
.load-wrapp {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.square {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: #4b9cdb;
}

.load-7 .square {
  animation: loadingG 2.5s cubic-bezier(0.17, 0.37, 0.43, 0.67) infinite;
}

@keyframes loadingG {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(370px, 0) rotate(360deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}
</style>
