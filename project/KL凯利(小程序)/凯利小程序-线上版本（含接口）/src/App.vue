<script>
export default {
  created() {
    
  }
};
</script>


<style lang="scss">
@import '../static/css/common.css';
@import '../static/css/iconfont.css';

page{
  min-height:100%;
}
.btn-reset{
  background-color:transparent;
  border: none;
  margin: 0;
  padding: 0;
  line-height:1.5;
  font-size: 20rpx;
}
.btn-reset::after{
  border: none;
}
$mainColor: #7fb414;
$subColor: #414d28;
$viceColor: #fff;
.main-color {
  color: $mainColor;
}
.main-bg {
  background-color: $mainColor;
}
.sub-color {
  color: $subColor;
}
.sub-bg {
  background-color: $subColor;
}

/*字体设置*/
@mixin fz($size){
    font-size: $size;
}

/**10像素到40像素的字体,用法:fz20 **/
@for $i from 10 through 200 {
  .fz#{$i},.iconfont.fz#{$i} { font-size: $i+rpx; }
}
/**需要统一阿里字体图标的行高
.iconfont {
  line-height: 1;
}**/
.fc-666{
  color: #666;
}
.fc-fff{
  color: #fff;
}
.fc-ccc{
  color: #ccc;
}
.fc-999{
  color: #999;
}
.fc-aaa{
  color:#aaa;
}
.fc-bbb{
  color:#bbb;
}
.fc-b2{
  color:#b2b2b2;
}
.fc-ba{
  color: #bababa;
}
.fc-ffc939{
  color: #ffc939;
}
.bg-fff{
  background-color: #fff;
}
.bg-888{
  background-color: #888;
}
.delete-line{
  display: inline-block;
  text-decoration: line-through;
}
.flex-center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-between{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

    
.main-padding-lr{
  padding-left: 28rpx;
  padding-right: 28rpx;
}
.margin-top{
  margin-top: 20rpx;
}
.margin-btm{
  margin-bottom: 20rpx;
}
.border-btm{
  border-bottom: 1rpx solid #ededed;
}
.border-top{
  border-top: 1rpx solid #ededed;
}



.scale-1px{
  position: relative;
  border:none;
}
.scale-1px::before{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  border-width: 1rpx;
  border-style: solid;
  border-color: #999;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 200%;
  height: 200%;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  -webkit-transform-origin: left top;
  transform-origin: left top;
}
.border-left-1px,.border-right-1px{
  position: relative;
  border:none;
}
.border-left-1px::before,.border-right-1px::after{
  content: '';
  display: block;
  width: 1rpx;
  background-color: #999;
  position: absolute;
  top: 0;
  bottom: 0;
  transform: scaleX(0.5);
}
.border-left-1px::before{
  left: 0;
}
.border-right-1px::after{
  right: 0;
}
.position-relative{
  position: relative;
}
.position-absolute{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.pic-bg{
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjYxMnB4IiBoZWlnaHQ9Ijc5MnB4IiB2aWV3Qm94PSIwIDAgNjEyIDc5MiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNjEyIDc5MiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Zz4NCgkJPGRlZnM+DQoJCQk8cmVjdCBpZD0iU1ZHSURfMV8iIHg9IjAuODg1IiB5PSIxODAuMDcyIiB3aWR0aD0iNjExLjExIiBoZWlnaHQ9IjYxMS45MjgiLz4NCgkJPC9kZWZzPg0KCQk8Y2xpcFBhdGggaWQ9IlNWR0lEXzJfIj4NCgkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzFfIiAgb3ZlcmZsb3c9InZpc2libGUiLz4NCgkJPC9jbGlwUGF0aD4NCgkJPHBhdGggY2xpcC1wYXRoPSJ1cmwoI1NWR0lEXzJfKSIgZmlsbD0iI0Q2RDZENiIgZD0iTTYxMS4xNDYsNzY0LjU1NmMtMTAuNDc2LTEyMy45NTItOTUuMTQ5LTIyNi41Mi0yMDkuOTM4LTI2My42MTkNCgkJCWM0OC4wMS0zMC45ODcsNzkuODcxLTg0LjY3Miw3OS44NzEtMTQ2LjIxMmMwLTk2LjQ1OC03OC41NjMtMTc0LjU4My0xNzUuMDE3LTE3NC41ODNjLTk2LjQ1OCwwLTE3NS4wMiw3OC4xMjYtMTc1LjAyLDE3NC41ODMNCgkJCWMwLDYxLjU0MSwzMS44NiwxMTUuMjI1LDc5Ljg3MSwxNDYuMjEyQzk2LjU2MSw1MzguMDM2LDExLjQ1Miw2NDAuNjA0LDAuOTc2LDc2NC41NTZjMCwyLjE4Ni0wLjQzNiwzLjkzLDAsNi45ODcNCgkJCWMwLjg3MywxMC45MDgsMTAuNDc2LDE5LjY0LDIxLjM4OCwxOS42NGg1NjYuOTU4YzEwLjkxMiwwLDIwLjUxNi04LjczMSwyMS4zODgtMTkuNjQNCgkJCUM2MTEuNTgyLDc2OC40ODUsNjExLjE0Niw3NjYuNzQxLDYxMS4xNDYsNzY0LjU1Nkw2MTEuMTQ2LDc2NC41NTZ6IE02MTEuMTQ2LDc2NC41NTYiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==);
  background-color: #f5f5f5;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center 100%;
  border-radius: 100%;
}


</style>
