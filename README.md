# SpinMeal — 餐點轉盤 MVP

SpinMeal 是一個「早餐／午餐／晚餐輪盤」的 mobile-first 網頁 MVP：選擇餐別後轉動輪盤，隨機得到一筆餐點建議。可查看紀錄、在「我的餐點」管理選項。

## 技術棧

- **Next.js 14**（App Router）+ **TypeScript**
- **Tailwind CSS**（無額外 UI 框架）
- 資料：**localStorage**（使用者餐點、轉盤紀錄、預設主題），MVP 無後端

## 安裝與執行

```bash
npm install
npm run dev    # http://localhost:3000
npm run build
npm start
```

## 專案架構

- **app/**：首頁（轉盤 + 問候）、紀錄、我的餐點
- **components/**：Tabs、MealCard、Wheel、Nav、ThemeModal、StarterPackSeed
- **lib/**：types、filter、random、storage、meals、theme、greeting
- **data/**：starterPack、seedMeals

## 資料與持久化

- **使用者餐點**：`spinmeal-user-meals`，首頁轉盤僅使用此清單。
- **轉盤紀錄**：`spinmeal-history`。
- **主題**：`spinmeal_theme`（`milkTea` | `babyBlueLemon` | `monoClean`），切換後全站套用並保留。

## 主題切換

首頁右上角齒輪圖示可開啟「外觀設定 / Theme」，提供三種主題：

- **奶茶 (預設)**：米色、淺棕、淡粉
- **Baby Blue + Lemon**：淺藍背景、藍色主色
- **簡約灰階**：灰白背景、灰色主色

選擇後會寫入 localStorage 並立即套用至整站。

## 授權

MIT。
