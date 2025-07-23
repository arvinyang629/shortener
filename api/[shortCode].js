// 重定向处理
global.urlDatabase = global.urlDatabase || new Map();

module.exports = function handler(req, res) {
  const { shortCode } = req.query;
  
  // 从数据库获取原始URL
  const originalUrl = global.urlDatabase.get(shortCode);
  
  if (!originalUrl) {
    return res.status(404).json({ error: '短链接不存在' });
  }

  // 重定向到原始URL
  res.redirect(302, originalUrl);
};