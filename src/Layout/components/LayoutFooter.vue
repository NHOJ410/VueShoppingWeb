<script setup>
import { ref } from 'vue'
import { Download } from '@element-plus/icons-vue'

import { useWowPlugin } from '@/composables/useWowPlugin.js' // wow.js插件

// wow.js插件效果
useWowPlugin()

// 下載連結 跳轉到Vue官網 
const downloadURL = () => {
  window.open('https://vuejs.org/')
}

// 客戶服務和關注我們部分
const msgData = ref([
  {
    title: '客戶服務',
    dataArr: [
      {
        title: '線上客服',
        svgName: 'customer-service',
      },
      {
        title: '問題反饋',
        svgName: 'problem',
      }
    ]
  },
  {
    title: '關注我們',
    dataArr: [
      {
        title: 'Vue',
        svgName: 'vueLogo',
      },
      {
        title: 'VueUse',
        svgName: 'VueUse',
      }
    ]
  },
])


// 底部大圖標部分
const footerIcon = ref([
  { name: '價格實惠', icon: 'footer01', href : '#' },
  { name: '配送迅速', icon: 'footer02', href : '#' },
  { name: '品質保證', icon: 'footer03', href : '#' },
  { name: '多樣選擇', icon: 'footer01', href : '#' },
  { name: '售後無憂', icon: 'footer02', href : '#' }
])

// 版權訊息部分
const copyrightData = ref([
  '關於我們', '幫助中心', '售後服務', '配送與驗收', '商務合作', '搜尋推薦', '友情連結'
])

</script>

<template>
  <footer class="app_footer">
    <!-- 客戶服務和關注我們部分 -->
    <div class="contact">
      <div class="container">
        <dl v-for="(item, index) in msgData" :key="index">
          <dt>{{ item.title }}</dt>
          <dd v-for="data in item.dataArr" :key="data.svgName" @click="downloadURL">
            <SVGItem :svgName="data.svgName" width="50px" height="50px"></SVGItem>{{ data.title }}
          </dd>
        </dl>
        <!-- 下載APP區域 -->
        <dl>
          <dt>下載APP</dt>
          <dd class="qrcode"><img class="qrcodeImg" src="@/assets/images/qrcode_vuejs.org.png" /></dd>
          <dd class="download">
            <span>立即掃描QRCode</span>
            <span>下載APP</span>
            <el-button type="primary" @click="downloadURL" :icon="Download" class="download-btn">下載連結</el-button>
          </dd>
        </dl>
        <!-- 電子郵件區域 -->
        <dl>
          <dt>電子郵件</dt>
          <dd class="gmail">
            <a href="mailto:ae411253@gmail.com">
              <SVGItem :svgName="'gmail'" :width="'100px'" :height="'100px'"></SVGItem>
            </a>
          </dd>
        </dl>
      </div>
    </div>

    <!-- 底部大圖標 和 版權信息部分 -->
    <div class="extra">
      <div class="container">
        <!-- 底部大圖標部分 -->
        <div class="slogan">
          <router-link  :to="`${item.href}`" v-for="(item, index) in footerIcon" :key="index">
            <i :class="`iconfont icon-${item.icon}`"></i>
            <span>{{ item.name }}</span>
          </router-link>
        </div>
        <!-- 版權信息 -->
        <div class="copyright">
          <div class="copyrightData">
            <router-link :to="`${item.href}`" v-for="(item, index) in copyrightData" :key="index">{{ item }}</router-link>
          </div>
          <p>CopyRight © Vue購物商城</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style  lang='scss' scoped>
// 底部聯繫我們部分
.app_footer {
  overflow: hidden;
  background-color: #f5f5f5;
  padding-top: 25px;

  .contact {
    background: #fff;

    .container {
      padding: 60px 0 40px 25px;
      display: flex;
    }

    dl {
      height: 190px;
      text-align: center;
      padding: 0 72px;
      border-right: 1px solid #f2f2f2;
      color: #999;


      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        border-right: none;
        padding-right: 0;
      }
    }

    // 標題
    dt {
      line-height: 1;
      font-size: 22px;
    }

    // 內容
    dd {
      margin: 36px 12px 0 0;
      float: left;
      width: 96px;
      height: 92px;
      padding-top: 10px;
      border: 1px solid #ededed;
      cursor: pointer;
    }

    .qrcode {
      width: 100px;
      height: 92px;
      border: 1px solid #ededed;

      .qrcodeImg {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .download {
      padding-top: 5px;
      font-size: 14px;
      width: auto;
      height: auto;
      border: none;

      span {
        display: block;
      }

      .download-btn {
        text-align: center;
        display: block;
        line-height: 1;
        margin-top: 15px;
        color: #fff;
        border-radius: 2px;
      }
    }

    // 電子郵件部分
    .gmail {
      color: #666;
      border: none;
    }
  }

  // 底部大圖標和版權訊息部分
  .extra {
    background: linear-gradient(to right, #2d5b6e, #376675, #2c5364);

    // 底部大圖標部分
    .slogan {
      padding: 60px 25px;
      border-bottom: 1px solid #868686;
      display: flex;
      justify-content: space-between;

      a {
        height: 58px;
        line-height: 58px;
        color: #fff;
        font-size: 28px;
        transition: all 0.2s linear;

        &:hover {
          transform: scale(1.4);
          color: $xtxColor;
        }

        i {
          font-size: 50px;
          vertical-align: middle;
          margin-right: 10px;
          font-weight: 100;
        }

        span {
          vertical-align: middle;
          text-shadow: 0 0 1px #333;
        }
      }
    }

    // 版權訊息部分
    .copyright {
      height: 170px;
      padding-top: 40px;
      text-align: center;
      color: #fff;
      font-size: 15px;

      .copyrightData {
        line-height: 1;
        margin-bottom: 40px;
        display: flex;
        justify-content: center;
        gap: 20px;

        a {
          color: #fff;
          line-height: 1;
          padding: 0 10px;
          transition: all 0.2s ease;
          font-size: 16px;
          font-style: normal;

          &:hover {
            transform: scale(1.4);
            color: $xtxColor;
          }

          &:last-child {
            border-right: none;
          }
        }
      }


    }
  }


}
</style>