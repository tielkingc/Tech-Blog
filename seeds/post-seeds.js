const { Post } = require('../models');

const postdata = [
  {
    title: 'Donec posuere metus vitae ipsum.',
    post_content: 'klfm,ng;lkfdng;lkdkfng;kldfmng;koijuinhgk;mfngljkhfdbgnbdfljkhgbdnfbsdajhlfbjhfbjhasdbfjahdsbf',
    user_id: 1
  },
  
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
