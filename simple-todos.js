Tasksdb = new Mongo.Collection("tasks");

if (Meteor.isClient) {
    Template.body.helpers({
        resolutions:function(){
            if(Session.get("session_hide")){
                return Tasksdb.find({checked:{$ne:true}});
            }
            else{
                return Tasksdb.find();
            }
        },
        hideFinished: function(){
            return Session.get("session_hide"); 
        }
    });

    Template.body.events({
        'submit .new-resolution':function(event){
            var title = event.target.title.value;
            Tasksdb.insert({
                title : title,
                createdAt : new Date()
            });
            event.target.title.value = ""; // event.target name is "title"'s value
            return false;
        },


        'change .hide-finished': function(event){
            Session.set("session_hide",event.target.checked);
        }


    });

    Template.resolution.events({
        'click .toggle-checked': function(){
            Tasksdb.update(this._id,{$set:{checked:!this.checked}});
        },

        'click .delete': function(){
            Tasksdb.remove(this._id);
        }
    });
}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
