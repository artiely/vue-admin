<template>
  <div class="skeleton-loader skeleton-wrapper">
    <div class="loading">
      <div class="loading__square" />
      <div class="loading__square" />
      <div class="loading__square" />
      <div class="loading__square" />
      <div class="loading__square" />
      <div class="loading__square" />
      <div class="loading__square" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Skeleton'
}
</script>

<style>
@-webkit-keyframes square-animation {
  0% {
    left: 0;
    top: 0;
  }
  10.5% {
    left: 0;
    top: 0;
  }
  12.5% {
    left: 32px;
    top: 0;
  }
  23% {
    left: 32px;
    top: 0;
  }
  25% {
    left: 64px;
    top: 0;
  }
  35.5% {
    left: 64px;
    top: 0;
  }
  37.5% {
    left: 64px;
    top: 32px;
  }
  48% {
    left: 64px;
    top: 32px;
  }
  50% {
    left: 32px;
    top: 32px;
  }
  60.5% {
    left: 32px;
    top: 32px;
  }
  62.5% {
    left: 32px;
    top: 64px;
  }
  73% {
    left: 32px;
    top: 64px;
  }
  75% {
    left: 0;
    top: 64px;
  }
  85.5% {
    left: 0;
    top: 64px;
  }
  87.5% {
    left: 0;
    top: 32px;
  }
  98% {
    left: 0;
    top: 32px;
  }
  100% {
    left: 0;
    top: 0;
  }
}
@keyframes square-animation {
  0% {
    left: 0;
    top: 0;
  }
  10.5% {
    left: 0;
    top: 0;
  }
  12.5% {
    left: 32px;
    top: 0;
  }
  23% {
    left: 32px;
    top: 0;
  }
  25% {
    left: 64px;
    top: 0;
  }
  35.5% {
    left: 64px;
    top: 0;
  }
  37.5% {
    left: 64px;
    top: 32px;
  }
  48% {
    left: 64px;
    top: 32px;
  }
  50% {
    left: 32px;
    top: 32px;
  }
  60.5% {
    left: 32px;
    top: 32px;
  }
  62.5% {
    left: 32px;
    top: 64px;
  }
  73% {
    left: 32px;
    top: 64px;
  }
  75% {
    left: 0;
    top: 64px;
  }
  85.5% {
    left: 0;
    top: 64px;
  }
  87.5% {
    left: 0;
    top: 32px;
  }
  98% {
    left: 0;
    top: 32px;
  }
  100% {
    left: 0;
    top: 0;
  }
}
@-webkit-keyframes hue-rotate {
  0% {
    -webkit-filter: hue-rotate(0deg);
    filter: hue-rotate(0deg);
  }
  100% {
    -webkit-filter: hue-rotate(360deg);
    filter: hue-rotate(360deg);
  }
}
@keyframes hue-rotate {
  0% {
    -webkit-filter: hue-rotate(0deg);
    filter: hue-rotate(0deg);
  }
  100% {
    -webkit-filter: hue-rotate(360deg);
    filter: hue-rotate(360deg);
  }
}
.skeleton-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #000;
}
.loading {
  position: relative;
  width: 96px;
  height: 96px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-animation: hue-rotate 10s linear infinite both;
  animation: hue-rotate 10s linear infinite both;
}

.loading__square {
  position: absolute;
  top: 0;
  left: 0;
  width: 28px;
  height: 28px;
  margin: 2px;
  border-radius: 2px;
  background: #07a;
  background-image: linear-gradient(45deg, #fa0 40%, #0c9 60%);
  background-image: -moz-linear-gradient(#fa0, #fa0);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  -webkit-animation: square-animation 10s ease-in-out infinite both;
  animation: square-animation 10s ease-in-out infinite both;
}
.loading__square:nth-of-type(0) {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.loading__square:nth-of-type(1) {
  -webkit-animation-delay: -1.4285714286s;
  animation-delay: -1.4285714286s;
}
.loading__square:nth-of-type(2) {
  -webkit-animation-delay: -2.8571428571s;
  animation-delay: -2.8571428571s;
}
.loading__square:nth-of-type(3) {
  -webkit-animation-delay: -4.2857142857s;
  animation-delay: -4.2857142857s;
}
.loading__square:nth-of-type(4) {
  -webkit-animation-delay: -5.7142857143s;
  animation-delay: -5.7142857143s;
}
.loading__square:nth-of-type(5) {
  -webkit-animation-delay: -7.1428571429s;
  animation-delay: -7.1428571429s;
}
.loading__square:nth-of-type(6) {
  -webkit-animation-delay: -8.5714285714s;
  animation-delay: -8.5714285714s;
}
.loading__square:nth-of-type(7) {
  -webkit-animation-delay: -10s;
  animation-delay: -10s;
}
</style>
