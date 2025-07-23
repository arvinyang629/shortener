# 简单短链接服务

一个基于 Vercel 的免费短链接服务，简单易用且完全免费。

## 功能特点

- ✅ 完全免费
- ✅ 简单易用的网页界面
- ✅ API 接口支持
- ✅ 自动生成短码
- ✅ 一键复制功能

## 部署步骤

### 1. 准备工作
确保你有 GitHub 账号和 Vercel 账号（可以用 GitHub 登录 Vercel）

### 2. 上传到 GitHub
```bash
git init
git add .
git commit -m "初始化短链接服务"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

### 3. 部署到 Vercel
1. 访问 [vercel.com](https://vercel.com)
2. 用 GitHub 账号登录
3. 点击 "New Project"
4. 选择你刚创建的 GitHub 仓库
5. 点击 "Deploy"

### 4. 完成！
部署完成后，你会得到一个免费的域名，比如：
`https://your-project.vercel.app`

## 使用方法

### 网页界面
直接访问你的域名，在输入框中粘贴长链接，点击生成即可。

### API 接口
```bash
# 生成短链接
curl -X POST https://your-project.vercel.app/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/very/long/url"}'

# 访问短链接（自动重定向）
curl https://your-project.vercel.app/abc123
```

## 注意事项

- 当前版本使用内存存储，重启后数据会丢失
- 如需持久化存储，建议集成数据库服务
- Vercel 免费版有一定的请求限制，适合个人使用

## 升级建议

如果需要更稳定的生产环境，可以考虑：
- 集成 Redis 或数据库
- 添加访问统计功能
- 自定义短码功能
- 批量生成功能