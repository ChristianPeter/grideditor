(function($, window, document) {
  
  var $grid;
  var model = {
  	elements: [],
  	lines: []
  };
  var isSelectionMode = false;
  var isSelect = true;
  
  var mode = 'S'; // E for Element L for Line S for Selection
  $.fn.grideditor = function(options){
  	$grid = $(this);
  	initGrid();
  	
  	
  	$grid.find('td').mousedown(function(event){
  		event.preventDefault();
  		if (mode === 'S'){
  			$grid.find('td').removeClass('selection');
	  		isSelectionMode = true;
			isSelect = true;
			$(this).toggleClass("selection");  			
  		}
  		else if (mode ==='E'){
  			// toggle this, the X+1 and Y+1 neighbors
			isSelect = !$(this).hasClass('draw-element');
			var nodes = [$(this)];
			nodes.push($(this).next());
			var $other = $(this).parent().next();
			$other = $other.find("td[data-col='"+$(this).data('col')+"']");
			nodes.push($other);
			$other = $other.next();
			nodes.push($other);
			
			$.each(nodes, function(){
				isSelect ? $(this).addClass("draw-element") : $(this).removeClass("highlight");
			});
  		}
  		else if (mode === 'L'){
  			// TODO: currently just a backup
  			isSelectionMode = true;
			isSelect = !$(this).hasClass('selection');
			$(this).toggleClass("selection");  	
  		}

	});
	
	$grid.find('td').mouseenter(function(event){
		if (mode === 'S'){
			if (isSelectionMode) {
				if (isSelect){
					$(this).addClass("selection");
				}
				else {
					$(this).removeClass("selection");
				}
			}					

		}
	});
	
	$(document).mouseup(function(ev) {
		isSelectionMode = false;
	});
	
	$("input:radio[name=tool]").click(function() {
	    var value = $(this).val();
	    mode = value;
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