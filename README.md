# 履歷工坊

一個以繁體中文使用者為主的履歷自傳編輯器：填寫資料、上傳照片、即時預覽，最後直接列印成 PDF。

線上使用：<https://aydenyee0118-ux.github.io/resume-studio-tw/>

## 主要功能

- 基本資料、照片、工作經歷、教育、技能、專案、證照與語言
- 量化成果、求職目標、社群／志工、到職時間、推薦人等選填加分項目
- 範例資料預載入，填寫時可直接修改
- 瀏覽器本機自動儲存，不需要登入或後端
- A4 預覽與瀏覽器列印／匯出 PDF
- GitHub Pages 工作流程已備妥

## 本機執行

```bash
npm install
npm run dev
```

## GitHub Pages

目前網站已部署在 `gh-pages` 分支，GitHub Pages 根目錄指向 `/`。若要更新線上版本，先執行 `npm run build`，再將 `dist` 內容發布到 `gh-pages` 分支。
