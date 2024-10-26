<script setup>
</script>

<template>
  <footer class="app_footer">
  <!-- 聯繫我們 -->
  <div class="contact">
    <div class="container">
      <dl>
        <dt>客戶服務</dt>
        <dd><i class="iconfont icon-kefu"></i> 線上客服</dd>
        <dd><i class="iconfont icon-question"></i> 問題反饋</dd>
      </dl>
      <dl>
        <dt>關注我們</dt>
        <dd><i class="iconfont icon-weixin"></i> WeChat</dd>
        <dd><i class="iconfont icon-weibo"></i>WeiBo</dd>
      </dl>
      <dl>
        <dt>下載APP</dt>
        <dd class="qrcode"><img src="@/assets/images/qrcode.jpg" /></dd>
        <dd class="download">
          <span>掃描二維碼</span>
          <span>立刻下載APP</span>
          <a href="#">下載連結</a>
        </dd>
      </dl>
      <dl>
        <dt>電子郵件</dt>
        <dd class="gmail">
          <a href="mailto:ae411253@gmail.com"><SVGItem :svgName="'gmail'" :width="'100px'" :height="'100px'"></SVGItem></a>
        </dd>
      </dl>
    </div>
  </div>

  <!-- 底部大圖標 和 版權信息部分 -->
  <div class="extra">
    <div class="container">
      <div class="slogan">
        <a href="#">
          <i class="iconfont icon-footer01"></i>
          <span>價格實惠</span>
        </a>
        <a href="#">
          <i class="iconfont icon-footer02"></i>
          <span>配送迅速</span>
        </a>
        <a href="#">
          <i class="iconfont icon-footer03"></i>
          <span>品質保證</span>
        </a>
      </div>
      <!-- 版權信息 -->
      <div class="copyright">
        <p>
          <a href="#">關於我們</a>
          <a href="#">幫助中心</a>
          <a href="#">售後服務</a>
          <a href="#">配送與驗收</a>
          <a href="#">商務合作</a>
          <a href="#">搜尋推薦</a>
          <a href="#">友情連結</a>
        </p>
        <p>CopyRight © Vue購物商城</p>
      </div>
    </div>
  </div>
</footer>
</template>

<style scoped lang='scss'>

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

      .iconfont {
        font-size: 36px;
        display: block;
        color: #666;
      }

      &:hover {
        .iconfont {
          color: $xtxColor;
        }
      }

      &:last-child {
        margin-right: 0;
      }
    }

    .qrcode {
      width: 92px;
      height: 92px;
      padding: 7px;
      border: 1px solid #ededed;
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

      a {
        display: block;
        line-height: 1;
        padding: 10px 25px;
        margin-top: 5px;
        color: #fff;
        border-radius: 2px;
        background-color: $xtxColor;
      }
    }
     
    // 電子郵件部分
    .gmail {
      color: #666;
      border: none;
    }
  }
  
  // 底部大圖標部分
  .extra {
    background: linear-gradient(to right, #2d5b6e, #376675, #2c5364);
  }
  
  .slogan {
    height: 178px;
    line-height: 58px;
    padding: 60px 100px;
    border-bottom: 1px solid #868686;
    display: flex;
    justify-content: space-between;

    a {
      height: 58px;
      line-height: 58px;
      color: #fff;
      font-size: 28px;

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

    p {
      line-height: 1;
      margin-bottom: 20px;
    }

    a {
      color: #fff;
      line-height: 1;
      padding: 0 10px;
      border-right: 1px solid #fff;

      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>