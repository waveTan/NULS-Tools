<template>
  <div class="typer">
    <div class="typer-content">
      <!-- 动态变化的内容-->
      <p class="typer-dynamic">
          <span class="cut">
            <span class="word" v-for="(letter,index) in words" :key="index">{{letter}}</span>
          </span>
        <!-- 模拟光标-->
        <span class="typer-cursor"></span>
      </p>
    </div>
  </div>
</template>

<script>
  import {dreamText} from './text'

  export default {
    data() {
      return {
        words: [],//字母数组push，pop的载体
        str: "",//str初始化
        letters: [],//str分解后的字母数组
        order: 1,//表示当前是第几句话
      }
    },
    created() {
      this.str = dreamText
    },
    mounted() {
      this.begin()
    },
    watch: {  //监听order值的变化，改变str的内容
      order(old, newV) {
        console.log(old, newV);
        if (this.order % 4 === 1) {
          this.str = "By Punk!"
        }
        else if (this.order % 4 === 2) {
          this.str = "looking for a job. "
        }
        else if (this.order % 4 === 3) {
          this.str = "a front-end programmer."
        }
        else {
          this.str = "coding the web..."
        }

      }
    },
    methods: {
      //开始输入的效果动画
      begin() {
        this.letters = this.str.split("");
        for (let i = 0; i < this.letters.length; i++) {
          setTimeout(this.write(i), i * 1000);
        }
      },
      //输入字母
      write(i) {
        return () => {
          this.words.push(this.letters[i]);
        }
      },

    },
  }
</script>


<style scoped lang="less">
  @thePink: #c1c1c1;
  .typer {
    margin-top: 2%;
    box-sizing: border-box;
    width: 650px;
    height: 400px;
    position: absolute;
    z-index: 90;
    background: url('https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1876884466,1157960341&fm=26&gp=0.jpg') no-repeat fixed top;
    .typer-content {
      font-size: 14px;
      display: flex;
      flex-direction: row;
      letter-spacing: 2px;
      z-index: 100;
      position: absolute;
    }
  }

  .typer-dynamic {
    position: relative;
  }

  .cut {
    color: @thePink;
  }

  .typer-cursor {
    position: absolute;
    height: 100%;
    width: 3px;
    top: 0;
    right: -10px;
    background-color: @thePink;
    animation: flash 1.5s linear infinite;
  }
</style>

