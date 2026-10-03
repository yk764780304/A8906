# 部署到 GitHub Pages（甜甜工作台 PWA）

本目录已包含全部上线文件，你只需 3 步即可获得**永久有效、可当 APP 用**的链接。

## 目录内容

```
index.html       ← 整改后的工作台（已注入 PWA 引用）
manifest.json    ← 应用名称/图标/全屏配置
sw.js            ← 离线缓存 Service Worker
icon-192.png     ← PWA 图标
icon-512.png     ← PWA 图标
```

## 第一步：在 GitHub 建仓库

1. 打开 https://github.com → 右上角 **+** → **New repository**
2. Repository name 填 `sweet-desk`（或你喜欢的名字）
3. 选 **Public**（Private 无法用免费 Pages）
4. 不要勾 "Add a README" → 点 **Create repository**

## 第二步：把本目录文件推上去

在**你自己的电脑**上操作（本环境无法登录你的 GitHub）：

```bash
# 进入本目录（github_deploy）后
git init
git add .
git commit -m "甜甜工作台 PWA"
git branch -M main
git remote add origin https://github.com/你的用户名/sweet-desk.git
git push -u origin main
```

> 如果提示没有 git 权限，先装 GitHub CLI 或配置 SSH key；也可直接在 GitHub 网页上把 5 个文件拖拽上传（效果一样）。

## 第三步：开启 GitHub Pages

1. 仓库页 → **Settings** → 左侧 **Pages**
2. Source 选 **Deploy from a branch**
3. Branch 选 **main** → 文件夹选 **/ (root)** → **Save**
4. 等 1~2 分钟，页面顶部会出现你的永久链接：

```
https://你的用户名.github.io/sweet-desk/
```

## 第四步：当 APP 使用（手机）

- **安卓 Chrome/Edge**：打开链接 → 右上角 ⋮ → **安装应用 / 添加到主屏幕**
- **iPhone Safari**：打开链接 → 分享 → **添加到主屏幕**

之后桌面出现"甜甜工作台"图标，点开**全屏无地址栏**，**断网也能打开**（仅实时天气需联网，属正常）。

## 更新内容

以后改了页面，重新 `git add . && git commit && git push` 即可，链接不变。
若改动了 sw.js 缓存逻辑，记得把 `sw.js` 里的 `CACHE` 版本号 `sweet-desk-v1` 改成 `v2` 让用户拿到新缓存。

## 备注

- 本套文件已通过本地验证：ServiceWorker 已激活、Manifest 合法、无 JS 报错。
- 当前 workbuddy 沙箱云链接依赖会话在线会失效，本 GitHub 链接才是永久方案。
