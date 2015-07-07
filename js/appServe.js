var Day = Backbone.Model.extend({
    defaults : {"event" : ""},
    addEvent : function(str) {
      this.set("event", str);
      this.save();
    }
});

var DayView = Backbone.View.extend({
  listOpt : function() {
    var select = '<select id="dayOpt" name="day"></select>';
    $('#addEvent').append(select);
    for(var i = 1; i < 32; i++) {
      var option = document.createElement('option');
      option.text = option.value = i;
      $("#dayOpt").append(option);
    }
  },
    render: function() {
      var evt = this.model.get("event");
      var text = '<input type="text" placeholder="Type here..." name="input"></input>'
      var btn = '<button type="submit" id="1">Add Event</button>';
      this.listOpt();
      this.$el.html(text + btn + '<p>Event Day: '+evt+'</p>');
    },
    printCal : function(cal) {
  	var table = document.createElement('table');
  	var td;
  	for(var i = 0; i<35; i++) {
  		if(i%7===0) {
  			tr = document.createElement('tr');
  			table.appendChild(tr);
  		}
  		td = document.createElement('td');
  		td.innerHTML = '___';
  		tr.appendChild(td);
	   }
	    document.body.appendChild(table);
    }
})

$(document).ready(function() {

  var dayModel = new Day();

  var dayView = new DayView({model:dayModel});
  dayView.render();
  dayView.printCal();

  dayModel.on('change', function() {
    dayView.render();
    dayView.printCal();
  });

  // dayView.$el.on("click","#1", function () {
  //     var mod = dayView.model;
  //     var evt = mod.get("event");
  //     var input = $('input')[0].value;
  //     mod.set("event",input);
  // });

  $("#addEvent").append(dayView.$el);

});
