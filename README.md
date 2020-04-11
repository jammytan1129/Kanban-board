# Kanban Board
[TOC]
## Introduction
- 看板系統(Kanban board)是為了讓團隊能視覺化正在運行的流程，以利團隊觀察各個階段的狀態，並進一步改善流程，是一種流程改善的工具。
- Demo影片：[Kanban](https://youtu.be/DjlNKnv3VAc)

## Tools
Kanban board是一款網頁系統，使用以下工具進行開發：
- [Vue.js](https://vuejs.org/)
- [Node.js](https://nodejs.org/en/)
- [AJAX](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started)
- [mongoDB](https://www.mongodb.com/)

## 系統主要功能
- 註冊/登入/登出
- 修改個人資料
- 新增看板，每個帳號可擁有多個看板
- 以帳號邀請組員加入看板
- 新增Stage，設定Stage的WIP（限制卡片數量），修改名稱及標籤顏色，並且可以以拖曳的方式改變Stage的位置
- 新增卡片，修改卡片內容（卡片名稱、敘述、留言、卡片指派/認領及標籤），也可以以拖曳的方式改變卡片位置（同一個Stage或跨Stage）

## 操作畫面
操作畫面主要分4個部分：
### 註冊/登入/登出及個人資料
- 註冊畫面
![](https://i.imgur.com/UxOe5Dz.png)
- 登入畫面
![](https://i.imgur.com/7URQJ8g.png)
- 修改個人資料（點擊右上方頭像可修改個人資料及登出）
![](https://i.imgur.com/pldWoEb.jpg)

### 所有看板畫面
- 所有看板
![](https://i.imgur.com/cZhq3U4.jpg)
- 新增看板
![](https://i.imgur.com/MGn28Ig.png)

### 看板及Stage
- 看板首頁（預設3個Stage）
![](https://i.imgur.com/U2YwwH1.jpg)
- 邀請組員
![](https://i.imgur.com/0GbasJC.png)
- Stage功能（修改標題可點擊標題2次）
![](https://i.imgur.com/pIQGY72.jpg)
- Stage拖曳更改位置
![](https://i.imgur.com/PFQtRPD.jpg)
- 新增Stage
![](https://i.imgur.com/2Uk7OLX.jpg)
- 修改Stage顏色
![](https://i.imgur.com/cfyiUaP.jpg)

### 卡片功能
- 新增卡片
![](https://i.imgur.com/ly4V3iD.jpg)
- 修改卡片內容
![](https://i.imgur.com/dZWHMQn.jpg)
- 卡片指派/認領
![](https://i.imgur.com/RmJw4aT.jpg)
- 卡片標籤
![](https://i.imgur.com/ctGERum.jpg)
- 卡片敘述及留言
![](https://i.imgur.com/EPFZMoU.jpg)
