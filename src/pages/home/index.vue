<template>
  <div class="home">
    <div class="header">
      <span>豆瓣</span>
      <icon type="search"
            size="20"
            color="#00b600" />
      <button size="mini"
              :loading="isLoading"
              :disabled="isLoading"
              @click="ToApp"> 打开豆瓣App </button>
    </div>
    <div class="hot_movie"
         v-for="(cate,cateIndex) in commonCategory"
         :key="cateIndex">
      <div class="title">
        <span>{{cate.name}}</span>
        <span class="more_movie"
              @click="toMore(cate)">更多</span>
      </div>
      <scroll-view class="scroll-view_H"
                   scroll-x="true"
                   enable-flex
                   enable-back-to-top
                   style="width: 100%">
        <view class="scroll-view-item_H"
              v-for="(item,index) in cate.list"
              :key="index">
          <img :src="item.images.large"
               alt="">
          <p>{{item.title}}</p>
          <div class="grade">
            <div class="star"
                 v-if="item.rating.average>0">
              <img v-for="(val, i) in item.starNum"
                   :key="i"
                   src="../../../static/images/star.svg"
                   alt="">
              <img v-for="(val2, i2) in (5-item.starNum)"
                   :key="i2"
                   src="../../../static/images/unstar.svg"
                   alt="">
              <p>{{item.rating.average}}</p>
            </div>
            <div class="unstar"
                 v-else>
              <p>暂无评分</p>
            </div>
          </div>
        </view>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  data () {
    return {
      isLoading: false,
      hotMovieList: [],
      commonCategory: [
        {
          name: '影院热映',
          param: 'in_theaters',
          list: []
        },
        {
          name: 'TOP250',
          param: 'top250',
          list: []
        }
      ]
    }
  },
  created () {
    this.commonCategory.forEach(item => {
      this.getHotMovieData(item)
    })
  },
  methods: {
    getHotMovieData (cate) {
      request(
        {
          url: `https://api.douban.com/v2/movie/${cate.param}`
        }
      ).then(res => {
        let movieList = res.data.subjects
        movieList.forEach(val => {
          val.starNum = Math.ceil(val.rating.average / 2)
        })
        cate.list = movieList
      })
    },
    toMore (cate) {
      wx.navigateTo({ url: `/pages/more/main?param=${cate.param}&&title=${cate.name}` })
    },
    ToApp () {
      this.isLoading = true
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  .header {
    display: flex;
    align-items: center;
    height: 94rpx;
    border-bottom: 1rpx solid #eee;
    padding: 0 36rpx;
    span {
      font-size: 48rpx;
      color: #00b600;
      font-weight: bold;
    }
    icon {
      flex: 1;
      margin-left: 28rpx;
    }
    button {
      padding-top: 10rpx;
      padding-bottom: 10rpx;
      background-color: #42bd56;
      color: #fff;
      font-size: 25rpx;
      border-radius: 15rpx;
    }
  }
  .hot_movie {
    margin-bottom: 15rpx;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 87rpx;
      padding: 0 38rpx;
      span {
        font-size: 40rpx;
      }
      span.more_movie {
        color: #42bd56;
        font-size: 35rpx;
      }
    }
    .scroll-view_H {
      white-space: nowrap;
      margin-top: 12rpx;
    }
    .scroll-view-item_H {
      display: inline-block;
      width: 200rpx;
      margin-left: 20rpx;
      > img {
        width: 200rpx;
        height: 286rpx;
      }
      > p {
        font-size: 30rpx;
        margin-top: 20rpx;
        text-align: center;
        overflow: hidden;
        word-break: keep-all;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .grade {
      display: flex;
      justify-content: center;
      margin-top: 15rpx;
      .star,
      .unstar {
        display: flex;
        align-items: center;
        justify-content: center;
        > img {
          width: 20rpx;
          height: 20rpx;
        }
        > p {
          color: #ccc;
          margin-left: 5rpx;
          font-size: 25rpx;
        }
      }
    }
  }
}
</style>