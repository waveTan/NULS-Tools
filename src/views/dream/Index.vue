<template>
  <div class="w1200 dream">

    <div class="typer-content fl">
      <!-- 动态变化的内容-->
      <p class="typer-dynamic" v-for="(letter,index) in strList" :key="index">
        <span class="cut">
          <span class="word" v-for="(letter,index) in words" :key="index">{{letter}}</span>
        </span>
      </p>
    </div>

    <div class="fr typer_img">
      <img :src="imgUrl" width="300">
    </div>
  </div>
</template>

<script>
  import {dreamText} from './text'

  export default {
    data() {
      return {
        words: [],//字母数组push，pop的载体
        strList: [],//str初始化
        letters: [],//str分解后的字母数组
        order: 1,//表示当前是第几句话
        imgUrl: '',
      }
    },
    created() {
      this.strList = dreamText
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
      async begin() {
        for (let item of this.strList) {
          console.log(item);
          this.imgUrl = item.img;
          this.letters = item.text.split("");
          for (let i in this.letters) {
            setTimeout(await this.write(i), i * 100);
          }
          //sleep();
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
  .dream {
    margin: 2rem auto 0;
    /* position: absolute;
     z-index: 90;
     background: url('https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1876884466,1157960341&fm=26&gp=0.jpg') no-repeat fixed top;*/
    .typer-content {
      z-index: 100;
      position: absolute;
      width: 66%;
      .typer-dynamic {
        position: relative;
        padding: 1rem 4rem;
        .cut {
          color: @thePink;
          font-size: 13px;
        }
        .typer-cursor {
          position: absolute;
          height: 20px;
          width: 3px;
          background-color: @thePink;
          animation: flash 1.5s linear infinite;
        }
      }
    }
    .typer_img {
      //border: 1px solid #17202e;
      width: 33%;
      height: 500px;
    }
  }

</style>

