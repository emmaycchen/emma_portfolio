# emma_portfolio

Emma Chen | Design × Growth 個人作品集首頁。
目標：把 Figma 的 `Mainpage` 設計稿 1:1 還原成 Next.js 頁面（`app/page.tsx`）。

## Tech stack
- Next.js (App Router) + TypeScript + Tailwind CSS（先檢查 package.json 的 Tailwind 版本：v4 用 `globals.css` 的 `@theme`，v3 用 `tailwind.config.ts`）
- `framer-motion`：Scroll Reveal、Hero Parallax
- `lenis`：Smooth Scroll
- `next/font/google`：Roboto、Afacad
- 不要自行加入其他 UI / 動畫 library，要加之前先問我

## Commands
- `npm run dev` 開發
- `npm run lint` / `npm run build`：每完成一個區塊都要跑，必須零錯誤

## Figma Layer → Component 對照
Figma 檔案：Mainpage frame（連結由我在 prompt 提供）。Layer 名稱大小寫可能不同，請先用 `get_metadata` 列出 Mainpage 的子 layer 再對照，對不上時問我，不要猜。

| Figma Layer | Component |
|---|---|
| navbar | `components/Navbar.tsx` |
| hero | `components/Hero.tsx` |
| welcome | `components/Welcome.tsx` |
| methodology | `components/GrowthHacking.tsx` |
| challenge | `components/Challenges.tsx` |
| how-i-can-help | `components/Services.tsx` |
| who-I-work-with | `components/WhoIWorkWith.tsx` |
| how-it-works | `components/Process.tsx` |
| footer | `components/Footer.tsx`（「READY TO GET STARTED?」CTA 區塊若在 footer layer 內就一起做；若是獨立 layer，另建 `CTA.tsx`） |

`app/page.tsx` 只負責依序組合這些 component，不放樣式細節。

## Design tokens
色票只能用這四個（設定成 Tailwind theme color，不要在 component 內寫死 hex）：

| Token | Hex | 用途參考 |
|---|---|---|
| `orange` | `#FF5A34` | 強調色、按鈕、Process 卡片 |
| `cream` | `#F3ECDA` | 頁面淺色背景 |
| `navy` | `#053D5E` | 深色區塊、標題文字 |
| `sage` | `#BBBEA9` | Challenges 卡片背景 |
| `navy-deep` | `#011C25` | Methodology / Services 的 pill 背景（Footer 深藍若為同色則重用） |

Figma 若出現色票以外的顏色（例如更深的 footer 藍、白、黑），先檢查 Figma variables，加進 token 並在回報時標示，不要自行發明顏色。

## Typography
- 內文與標題：**Roboto**（300 / 400 / 500 / 700）
- Navbar 與 CTA（按鈕、CTA 區塊）：**Afacad**，`font-size: 20px`（Tailwind `text-xl`）
- 用 `next/font/google` 載入，輸出 CSS variable（`--font-roboto`、`--font-afacad`），Tailwind 設定 `font-sans` = Roboto、`font-afacad` = Afacad
- 其餘字級、行高、字距照 Figma

## Assets（全部在 `public/img/`，不要改檔名、不要移動）
- Logo：`logo_trans.png`
- Hero 背景影片：`tree_sky.mov`
  - `.mov` 多數瀏覽器無法穩定播放，請用 ffmpeg 轉成 `tree_sky.mp4`（H.264、無音軌、`-movflags +faststart`），再另外輸出一張 `hero_poster.jpg` 當 poster
  - `<video autoPlay muted loop playsInline>`，使用 `poster`，並設定 `preload="metadata"`
- Challenges icons（sub-title → 檔名）：
  - Not enough time or tech skills → `clock-24.svg`
  - Limited budget → `saving-piggy.svg`
  - No online visibility → `globe-search.svg`
  - Outdated tools → `tools.svg`
  - No marketing strategy → `money-idea.svg`
- Footer icons：email、LinkedIn、GitHub、WhatsApp。檔名與名稱對應，先 `ls public/img` 確認；找不到就回報，不要用其他 icon 代替
- Who I Work With 照片：`market_JP.jpg`、`market_FR.jpg`、`bar_SH.jpg`、`flower_bike.jpg`、`foodstand.jpg`、`yoga.jpg`
  - 疊放順序依此排列，最後一張 `yoga.jpg` 在最上層（對應設計稿最上面那張）
- 圖片一律用 `next/image`，並寫有意義的 `alt`；icon svg 若為裝飾用，`alt=""`

## Motion / Effects
**a) Scroll Reveal**：Framer Motion `whileInView`（`initial` → `whileInView`，`viewport={{ once: true, amount: 0.2 }}`），各區塊標題、卡片可 stagger。封裝成可重用的 `components/ui/Reveal.tsx`。

**b) Card Hover**：純 Tailwind（`transition`、`hover:-translate-y-1`、`hover:shadow-*` 等），不使用任何 JS library。適用 Challenges、Services、Process 卡片。

**c) Hero Parallax**：背景影片比內容捲得慢。用 Framer Motion `useScroll` + `useTransform`，背景 `y` 約 0 → 30%，外層 `overflow-hidden`，影片需略放大避免露邊。

**d) Smooth Scroll**：Lenis。做成 client component `components/SmoothScroll.tsx`，在 `app/layout.tsx` 包住 children。偵測到 `prefers-reduced-motion` 時不啟用。

**e) Who I Work With 照片堆疊動畫**：參考 `reference/stacking-cards.html`（我提供的範例）。
- 機制：外層 section 設很高的高度（約 400–600vh），內層 `position: sticky; top: 0; height: 100vh`；用捲動進度 `p` 驅動每張照片：從畫面下方滑入，帶一點擺動旋轉，到位後停在各自微小的傾斜角度，露出後面照片的邊緣。第一張一開始就在場上，其餘進場前 `visibility: hidden`
- 用 `useScroll({ target, offset })` + `useTransform` 實作，不要用 scroll event listener
- 版面：左側照片堆疊（sticky），右側是四個客群文字（Small B2B firms / Entrepreneurs / Service owners / SME brand e-commerce），版面依 Figma
- 行動版：標題在上、照片堆在下
- `prefers-reduced-motion`：取消 sticky 與動畫，改成簡單的照片 grid
- 動畫邏輯寫成可重用的 component，之後 Process 區塊想套用同樣效果可直接重用
- 範例檔裡的顏色（`#063d5c`、`#ff5a36` 等）僅為示範，一律改用本文件的色票

所有動畫都要尊重 `prefers-reduced-motion`。

## 實作規則
- Figma `get_design_context` 的輸出只是**參考**：不要直接貼上，改寫成乾淨的 flex / grid + Tailwind，不要用大量 absolute 定位和任意 px 值
- 文字內容照 Figma 原文，不要改寫、不要自行加文案
- 設計稿只有桌機版：自行推導平板與手機版（斷點用 Tailwind 預設 `md`、`lg`），手機版不得橫向捲動
- 語意化 HTML：`<header>`、`<nav>`、`<main>`、`<section>`、`<footer>`，標題層級正確（頁面只有一個 `h1`）
- 只有需要互動或動畫的 component 才加 `'use client'`
- 不要動 `public/img/` 內既有檔案（轉檔輸出的新檔案除外）
- 不要自行 git commit，除非我要求

## 工作流程
1. 一次只做一個區塊，完成後跑 `npm run lint`，用截圖與 Figma 截圖比對並修正落差
2. 每階段結束停下來給我檢查，等我確認再繼續
3. 遇到 Figma 與本文件衝突、缺檔案、或設計有疑問時，先問我
