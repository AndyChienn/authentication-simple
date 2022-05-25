# authenticatication-simple


## 介紹
簡易登入頁面
### 功能

基本功能：

- 根據種子資料
- 測試是否能夠使用帳號密碼順利登入

## 開始使用

1. 請先確認有安裝 node.js 與 npm
2. 將專案 clone 到本地
3. 在本地開啟之後，透過終端機進入資料夾，輸入：

   ```bash
   npm install
   ```
4.MongoDB 路由設定(終端機)
   ```bash
   export MONGODB_URI="<根據自己的MONGODB_URI及帳號密碼做設定>"
   ```

5.使用以下方法使種子資料初始化
   ```bash
   npm run seed
   ```
   ```bash
   node models/seeds/users.js
   ```

6. 安裝及設置完畢後，繼續輸入：

   ```bash
   npm run start
   ```

7. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址

   ```bash
   Listening on http://localhost:3000
   ```

8. 暫停使用

   ```bash
   ctrl + c
   ```
## 開發工具

- Node.js 14.16.0
- Express 4.18.1
- Express-Handlebars 3.1.0
- Bootstrap 4.3.1
- Font-awesome 5.10.0

- MongoDB
- mongoose 6.3.4