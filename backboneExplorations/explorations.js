//create backbone model to store data about each waypoint/stop in route
var Waypoint = Backbone.Model.extend({
	defaults : {
		locationName :  "",
		latLon       :  "", //use google.maps.LatLng to generate LatLng object??
		
		//add other defualt data members
	},
	initialize : function () {
		// is this possible? --> latLon = new google.maps.LatLng(locationName);
		this.fetch();
	},
	del : function () {
		this.destroy({success: function() {
			console.log("model destroyed");
		}});
	},
	replaceName : function (str) {
		this.set("locationName" , str);
		this.save();
	},
	//add other methods
});

//create backbone View for Waypoint model
var WaypointView = Backbone.View.extend({
	render : function () {
		var locationName = this.model.get("locationName");
		var delBtn = "<button id=delBtn>Delete</button>";
		this.$el.html("<div>" + locationName + delBtn + "</div>");
	},
	initialize : function () {
		this.model.on("change", this.render, this);
	},
	events : {
		"click #delBtn"        : "delete" 
		//"keypress #nameInput"  : "updateOnEnter",
		// add other events for view
	},
	delete : function () {
    	this.model.del();
    },
    updateOnEnter : function (e) {
		if(e.keyCode == 13) {
			this.replaceName();
		}
	},
	replaceName : function () {
		var str = this.$el.find("#nameInput").val();
		this.model.replaceName(str);
	},

    //add other methods
});

//create backbone collection for Waypoints 
var WaypointCollection = Backbone.Collection.extend({
	model      : Waypoint,
	url        : "/", // <------------------------------------------------CHECK
	initialize : function () {
		this.fetch();
	}
});

//create backbone view to display collection of waypoints/stops
var WaypointCollectionView = Backbone.View.extend({
	render : function () {
		var locationNameInput = '<input id=locationNameInput type="text" value="" />';
		var addBtn = "<button id='addBtn'>Add Waypoint</button>";
		var goBtn = "<button id='goBtn'>Find Best Route!</button>"; 
		var div = '<div id="waypoint-list"></div>';
        this.$el.html(div + locationNameInput + goBtn);
	},
	initialize : function () {
		this.listenTo(this.collection, 'add', this.addOne),
		this.listenTo(this.collection, 'remove', this.removeOne)
	},
	events : {
		"click #addBtn" : "addToCollection",
	},
	addToCollection : function () {
		// create new model, save to server and add to colleciton, triggers 'add' event in collection 
		this.collection.create({
			//model properties set and view created/appended in 'addOne' method, called in 'add' event listener
		});
	},
	addOne : function (model) {
		//set new model porperties 
        model.set({locationName : "Enter waypoint here..."});

        // create view for new model
        var view = new WaypointView({model : model});
        
        //render new view
        view.render();

        //append new view to list of waypoints (colleciton view's div)
        this.$("#waypoint-list").append(view.$el);
	},
	removeOne : function (input) {
		//remove view from collection, triggers 'remove' event in collection
		input.remove();
	},
	//add other methods
});



var waypointCollection, waypointCollectionView;

$(document).ready( function () {

	var waypointCollection = new WaypointCollection();
	var waypointCollectionView = new WaypointCollectionView({collection : waypointCollection});
	waypointCollectionView.render();

/*!!!!!!!!!!!!!!!!!!!! MAKE SURE #listdiv MATCHES IN HTML !!!!!!!!!!!!!!!!*/
	$("#listdiv").append(waypointCollectionView.$el);

});