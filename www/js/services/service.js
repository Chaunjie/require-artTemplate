/**
 * Created by xudao on 16/11/14.
 */
define(['../util/fetch'], function (xhr) {
    function backPromise(res, type) {
        var method = 'json';
        switch (type){
            case 'html':
                method = 'text';
                break;
            case 'json':
                method = 'json';
                break;
            default:
                method = 'json';
                break;
        }

        return new Promise(function (resolve, reject) {
            return res.then(function (response) {
                return response[method]().then(function (json) {
                    resolve(json);
                }, function(err){
                    reject(err);
                });
            })
        });

    }

    return {
        getName: function (nickname) {
            return backPromise(
                xhr.fetch("http://www.mayfou.com/index.php?g=interface&m=meifou&a=getUser&appver=40100&client=html5&pk=99D6B47A6034543318A73BD4ED0A017F&timestamp=1479461606&userid=1710718", {
                    method: 'GET'
                })
            );
        },
        getHtml: function(){
            return backPromise(
                xhr.fetch("./modal.html"),
                'html'
            );
        }
    };

});
