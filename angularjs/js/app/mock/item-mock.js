angular.module('module-item',[])
  .factory('ItemProvider',function(){
    var items = [
      {
        id:1,
        name:'Todo Item 1 of AngularJS',
        done: false,
        list:{
                id:1,
                name:'Learn AngularJS'
              }
      },
      {
        id:2,
        name:'Todo Item 2 of AngularJS',
        done: true,
        list:{
                id:1,
                name:'Learn AngularJS'
              }
      },
      {
        id: 3,
        name:'Todo Item 1 of Django',
        done: false,
        list:{
                id:2,
                name:'Learn Django'
              }
      },
      {
        id: 4,
        name:'Todo Item 2 of Django',
        done: true,
        list:{
                id:2,
                name:'Learn Django'
              }
      }
    ];

    var itemProvider=function(){};

    itemProvider.prototype.get = function(params, cb) {
      for (i=0;i<items.length;i++){
        if (items[i].id == params.id){
          return cb(items[i]);
        }
      }
    };

    itemProvider.prototype.query = function(params, cb) {
      itemsByList = [];
      for (i=0;i<items.length;i++){
        if (items[i].list.id == params.list){
          itemsByList.push(items[i]);
        }
      }
      return cb(itemsByList);
    };

    itemProvider.prototype.save = function(item,cb) {
      if (item.id){
        this.get(item.id,function(oldItem){
          oldItem.name = item.name;
          oldItem.list = item.list;
          oldItem.done = item.done;
          return cb(oldItem);
        });
      }else{
        var new_id = items.length+1;
        var new_item = { id:new_id,
          name:item.name,
          done: false,
          list: item.list
        };
        items.push(new_item);
        return cb(new_item);
      }
    };

    itemProvider.prototype.remove = function(id,cb) {
      for (i=0;i<items.length;i++){
        if (items[i].id == id){
          items.splice(i,1);
          return cb();
        }
      }
    };

    var service = {
        getInstance:function(){ return new itemProvider(); }
    };

    return service;
  })
  .service('ItemService', ['ItemProvider',function(ItemProvider){
      return ItemProvider.getInstance();
  }]);