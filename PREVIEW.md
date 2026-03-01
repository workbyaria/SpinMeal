# 預覽 / Preview

## 如何開啟預覽

1. **在 Cursor 裡開終端機**  
   選單：`Terminal` → `New Terminal`，終端機會在專案目錄（SpinBite）。

2. **啟動開發伺服器**  
   輸入並執行：
   ```bash
   npm run dev
   ```

3. **用瀏覽器開網址**  
   看到 `Ready in ...` 後，在瀏覽器開啟：
   - **http://localhost:3000**

   Cursor 內預覽：`Ctrl+Shift+P`（或 `Cmd+Shift+P`）→ 輸入 `Simple Browser` → 選「Simple Browser: Show」→ 網址填 `http://localhost:3000`。

## 若無法預覽

- **埠號被佔用**：若出現 `Port 3000 is in use`，先關掉其他正在跑 `npm run dev` 的終端機，或關閉佔用 3000 的程式後再執行一次。
- **路徑有中文**：請在 Cursor 的**內建終端機**（專案資料夾內）執行 `npm run dev`，不要用系統 PowerShell 切到「桌面」路徑，避免編碼問題。
- **畫面空白或錯誤**：刪除快取後重啟：
  ```bash
  rm -r .next
  npm run dev
  ```
  （Windows PowerShell：`Remove-Item -Recurse -Force .next` 再 `npm run dev`。）
