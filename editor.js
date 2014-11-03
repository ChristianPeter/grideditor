(function($, window, document) {
  
  var $grid;
  var model = {
  	elements: [],
  	lines: []
  };
  var isSelectionMode = false;
  var isSelect = true;
  
  var mode = 'E'; // E for Element L for Line
  $.fn.grideditor = function(options){
  	$grid = $(this);
  	initGrid();
  	
  	
  	$grid.find('td').mousedown(function(event){
  		isSelectionMode = true;
		//$(".highlight").removeClass("highlight"); // clear previous selection
		event.preventDefault(); // this prevents text selection from happening
		isSelect = !$(this).hasClass('highlight');
		$(this).toggleClass("highlight");

	});
	
	$grid.find('td').mouseenter(function(event){			
		if (isSelectionMode) {
			if (isSelect){
				$(this).addClass("highlight");
			}
			else {
				$(this).removeClass("highlight");
			}
				

		}
	});
	
	$(document).mouseup(function(ev) {
		isSelectionMode = false;
	});
  };
  
  function processNodeClick(node){
  	
  }
  
  function initGrid(){
		var table = "<table class='grid-table'>";  		
		for (var y = 0; y < 24; y++){
		    table += "<tr data-row='"+ y + "'>";
		    for (var x = 0; x < 24; x++){
		      table += "<td data-col='" + x + "' data-row='"+ y + "'>";
		      table += "X";
		      table += "</td>";
		    }
		    table += "</tr>";
		    
		}		  
		table += "</table>";		  
  		$grid.html(table);		
	}

})(jQuery, window, document);