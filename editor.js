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
  		if (mode === 'L'){
	  		isSelectionMode = true;
			//$(".highlight").removeClass("highlight"); // clear previous selection
			event.preventDefault(); 
			isSelect = !$(this).hasClass('highlight');
			$(this).toggleClass("highlight");  			
  		}
  		else if (mode ==='E'){
  			// toggle this, the X+1 and Y+1 neighbors
  			event.preventDefault(); 
			isSelect = !$(this).hasClass('highlight');
			var nodes = [$(this)];
			nodes.push($(this).next());
			var $other = $(this).parent().next();
			$other = $other.find("td[data-col='"+$(this).data('col')+"']");
			nodes.push($other);
			$other = $other.next();
			nodes.push($other);
			
			$.each(nodes, function(){
				isSelect ? $(this).addClass("highlight") : $(this).removeClass("highlight");
			});
  		}

	});
	
	$grid.find('td').mouseenter(function(event){
		if (mode === 'L'){
			if (isSelectionMode) {
				if (isSelect){
					$(this).addClass("highlight");
				}
				else {
					$(this).removeClass("highlight");
				}
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