/**
 * Created by xudao on 16/11/14.
 */
require(['services/service', 'util/util', 'util/template'], function(service, util, template) {
   var data = {
      title: '标签',
      list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
   };

   //get source form html
   service.getHtml().then(function(body){
      document.querySelector('.template').innerHTML = body;
      service.getName('xudao').then(function(val){
         console.log(val);
         var html = template('test', data);
         document.getElementById('app').innerHTML = html;
      });
   }, function(error){
      console.log(error);
   });

   document.getElementById('button').addEventListener('click', function(){
      clickDom();
   });

   function clickDom(){
      data.list = data.list.concat(['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他', '哈哈']);
      var html = template('test', data);
      document.getElementById('app').innerHTML = html;
   }
});
