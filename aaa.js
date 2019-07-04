const bcrypt = require('bcryptjs');
async function fn(){
  const salt = await bcrypt.genSalt(10);
  // 使用盐对密码进行加密
  const password = await bcrypt.hash('123456', salt);
  console.log(password)
}
fn();