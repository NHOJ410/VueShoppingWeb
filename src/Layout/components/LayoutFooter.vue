<script setup>
import { ref } from 'vue'
import { Download } from '@element-plus/icons-vue'

import { useWowPlugin } from '@/composables/useWowPlugin.js' // wow.js插件

// wow.js插件效果
useWowPlugin()

// 下載連結 跳轉到 github儲存庫 
const downloadURL = () => {
  window.open('https://github.com/NHOJ410/VueShoppingWeb')
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
  { name: '價格實惠', icon: 'money-dollar', href: '#' },
  { name: '配送迅速', icon: 'clock-fast', href: '#' },
  { name: '品質保證', icon: 'car', href: '#' },
  { name: '多樣選擇', icon: 'choose', href: '#' },
  { name: '售後無憂', icon: 'good', href: '#' }
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
        <!-- SVG部分 -->
        <dl v-for="(item, index) in msgData" :key="index">
          <dt>{{ item.title }}</dt>
          <dd v-for="data in item.dataArr" :key="data.svgName" @click="downloadURL">
            <SVGItem :svgName="data.svgName" width="50px" height="50px"></SVGItem>{{ data.title }}
          </dd>
        </dl>
        <!-- 下載APP區域 -->
        <dl>
          <dt>下載APP</dt>
          <dd class="qrcode"><img class="qrcodeImg" src="@/assets/images/LayoutFooter/qrcode.png" /></dd>
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
          <router-link :to="`${item.href}`" v-for="(item, index) in footerIcon" :key="index">
            <i :class="`iconfont icon-${item.icon}`"></i>
            <span>{{ item.name }}</span>
          </router-link>
        </div>
        <!-- 版權信息 -->
        <div class="copyright">
          <div class="copyrightData">
            <router-link :to="`${item.href}`" v-for="(item, index) in copyrightData" :key="index">{{ item
              }}</router-link>
          </div>
          <p>CopyRight © Vue購物商城</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang='scss' scoped>
.app_footer {
  overflow: hidden;
  background-color: #f5f5f5;
  padding-top: 25px;

  // 課服服務和關注我們部分
  .contact {
    background: #fff;

    .container {
      padding: 60px 0 40px 25px;
      display: flex;

      // 每一項 ( 右邊 邊框線部分)
      dl {
        height: 190px;
        text-align: center;
        padding: 0 72px;
        border-right: 1px solid #f2f2f2;
        color: $infoColor;

        &:first-child {
          padding-left: 0;
        }

        &:last-child {
          border-right: none;
          padding-right: 0;
        }

        // 標題
        dt {
          line-height: 1;
          font-size: $thirdFontSize;
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
        
        // 下載APP區域
        .qrcode {
          width: 102px;
          height: 102px;
          border: 1px solid #ededed;
          padding: 0;

          .qrcodeImg {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .download {
          font-size: $miniFontSize - 2px;
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
        font-size: $thirdFontSize + 4px;
        transition: all 0.2s linear;
        
        &:hover {
          transform: scale(1.2);
          color: $mainColor;
        }

        i {
          font-size: $bigFontSize;
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
      font-size: $miniFontSize;

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
          font-size: $miniFontSize;
          font-style: normal;

          &:hover {
            transform: scale(1.4);
            color: $mainColor;
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