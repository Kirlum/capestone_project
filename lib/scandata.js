ScanData = new Mongo.Collection("scandata");
Patient = new Mongo.Collection("patient");



if (Meteor.isClient) {

  /////
  // template helpers
  /////

  Template.data_list.helpers({
    // if (Session.get("recentPat")) {
    //   recent_Pat: function(){
    //     return  ScanData.findOne({name:Session.get("recentPat")});
    //     // console.log("recent patient name" +recent_Pat);
    //   };
    //   } else {
      recent_Pat: function(){
        return {name: "No patient selected"};
        }
      // }
  });

	Template.scan_form.helpers({
		patient:function(){
			return Patient.find({}, {check:{search}});
		}
	});

  /////
  // template events
  /////


  Template.input_form_pat.events({
    "submit .js-save-input-form":function(event){

      var name = event.target.name.value;
      var first = event.target.first.value;
      var birth = event.target.birth.value;
      console.log("The name they entered is: "+name);

      if (Meteor.user()){
        Patient.insert({
          name: name,
          first: first,
          birth: birth,
          headshape: headshape,
          createdOn: new Date()
        });
        } else{
          alert("You have to log in first!");
        }
        Session.set("recentPat", name);
        console.log("Session: " +Session.get("recentPat"));
    }
  });

  Template.input_form_scan.events({
    "submit .js-save-scan-form":function(event){

      var date = event.target.date.value;
      var CI = event.target.CI.value;
      var DD = event.target.DD.value;
			var patient_id = recentPat;
      console.log("The date they entered is: "+date);

      if (Meteor.user()){
        ScanData.insert({
          date: date,
          CI: CI,
          DD: DD,
          createdOn: new Date()
        });
        } else{
          alert("You have to log in first!");
        }
        Session.set("recentPat", name);
        console.log("Session: " +Session.get("recentPat"));
    }
  });

  Template.search_form.events({
  	"submit .js-search-form":function(event){
  		// here is an example of how to get the name:
  		var search = event.target.search.value;
  		console.log("The search they entered is: "+search);
      Session.set("recentPat", search);
      console.log("Search: " +Session.get("recentPat"));
  		return false;// stop the form submit from reloading the page
  	}
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if (!Patient.findOne()){
    	console.log("No patient yet. Creating starter data.");
    	  Patient.insert({
    		name:"Müller",
    		firstname: "Max",
    		birth: "01.01.2000",
    		createdOn:new Date()
    	});
    }
  });
}

ScanData.allow({
	// we need to be able to update images for ratings.
	update:function(userId, doc){
		console.log("testing security on image update");
		if (Meteor.user()){// they are logged in
			return true;
		} else {// user not logged in - do not let them update  (rate) the image.
			return false;
		}
	},

	insert:function(userId, doc){
		console.log("testing security on image insert");
		if (Meteor.user()){// they are logged in
			return true;
		} else {// user not logged in - do not let them update  (rate) the image.
			return false;
		}
	},
	remove:function(userId, doc){
		return true;
	}
});

Patient.allow({
	// we need to be able to update images for ratings.
	update:function(userId, doc){
		console.log("testing security on image update");
		if (Meteor.user()){// they are logged in
			return true;
		} else {// user not logged in - do not let them update  (rate) the image.
			return false;
		}
	},

	insert:function(userId, doc){
		console.log("testing security on image insert");
		if (Meteor.user()){// they are logged in
			return true;
		} else {// user not logged in - do not let them update  (rate) the image.
			return false;
		}
	},
	remove:function(userId, doc){
		return true;
	}
});
