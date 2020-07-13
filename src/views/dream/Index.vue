<template>
  <div class="w1200 dream">

    <div class="typer-content fl">
      <!-- 动态变化的内容-->
      <div class="typer-dynamic" v-for="(letter,index) in strList" :key="index">
        <!--{{letter}}-->
        <div class="cut fl">
          <span class="word" v-for="(item,keys) in letter.text" :key="keys">{{item}}</span>
        </div>
        <div class="fr gif">
          <img :src="letter.img" width="150">
        </div>
      </div>
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
  .dream {
    margin: 2rem auto 0;
    .typer-content {
      z-index: 100;
      position: absolute;
      .typer-dynamic {
        position: relative;
        padding: 1rem 4rem;
        .cut {
          color: #999;
          font-size: 14px;
          line-height: 22px;
          width: 80%;
        }
        .gif {
          width: 20%;
        }
      }
    }
  }

</style>

