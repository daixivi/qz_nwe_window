// back/db.js

const mysql = require('mysql2');

// 创建数据库连接
const connection = mysql.createConnection({
  host: 'localhost',           // 本地数据库
  user: 'root',                // MySQL 用户名（通常是 root）
  password: '123456',        // ✅ 替换成你自己的 MySQL 密码，比如 '123456'
  database: 'qz_lj_mysql'      // ✅ 你创建的数据库名
});

// 测试连接
connection.connect((err) => {
  if (err) {
    console.error('❌ 数据库连接失败:', err);
  } else {
    console.log('✅ 数据库连接成功！');
  }
});

// 导出连接对象
module.exports = connection;