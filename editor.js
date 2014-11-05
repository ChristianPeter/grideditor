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
  	initEvents();
  	
  	  };
  
  function updateGrid(){
  	$grid.find('tr').remove();
  	initGridContent($grid.children('table:first'));
  	initElements(model.elements);
  	/*
  	$grid.find('td').removeClass('draw-element');//.html('');
  	$.each(model.elements, function(){
  		var $cell = $grid.find("tr[data-row="+this.y+"] > td[data-col="+this.x+"]");
		$cell.html(this.data);
		$cell.addClass('draw-element');
  	});
  	*/
}
  
  
  function initElements(elts){
		 // add elts
		  $.each(elts, function(){
		    //alert(this.x);
		    var $cell = $grid.find("tr[data-row="+this.y+"] > td[data-col="+this.x+"]");
		    $cell.html(this.data);
		    $cell.attr('colspan',this.w).attr('rowspan',this.h);
		    $cell.addClass('node');
		    
		    // add detail data:
		    $cell.data('detail', this.detail);
		    $cell.data('detailHeader', this.detailHeader);
		    // find neighbours and kill em
		    $cell.next().remove();
		    var neigh = $cell.parent().next().find("td[data-col="+this.x+"]"); //;.remove().next().remove();
		    var nn = neigh.next();//neigh.remove();
		    neigh.remove();
		    nn.remove();
		    
		  });
	}
  function processNodeClick(node){
  	
  }
  
  function handleNewElement(that){
  	
  	var elt = { w:2, h:2, data:"<div>test</div>", 
  				detail: "detail", 
  				detailHeader : "header"};
  	elt.x = that.data('col');
	elt.y = that.data('row');
	if (checkArea(elt)){
		model.elements.push(elt);		
	}
	else {
		//alert('collsion detected');
	}
  }
  
  function checkArea(elt){
  	var result = true;
  	$.each(model.elements, function(){
  		var dx = Math.abs(this.x - elt.x);
  		var dy = Math.abs(this.y - elt.y);
  		if(dx < 2 && dy < 2) result = false;
  	});
  	return result;
  }
  
  function initGridContent($table){
  		    var table = "";
  			for (var y = 0; y < 24; y++){
		    table = "<tr data-row='"+ y + "'>";
		    for (var x = 0; x < 24; x++){
		      table += "<td data-col='" + x + "' data-row='"+ y + "'>";
		      table += "&nbsp;";
		      table += "</td>";
		    }
		    table += "</tr>";
		    $table.append($(table));
		}		  
  }
  function initGrid(){
		var table = "<table class='grid-table'>";  		
		table += "</table>";		  
  		var $table = $(table);
  		$grid.append($table);		

		initGridContent($table);
	}
	function initEvents(){
		$grid.on('mousedown', 'td:not(.node)', function(event){
		event.preventDefault();
  		if (mode === 'S'){
  			$grid.find('td').removeClass('selection');
	  		isSelectionMode = true;
			isSelect = true;
			$(this).toggleClass("selection");  			
  		}
  		else if (mode ==='E'){
  			// toggle this, the X+1 and Y+1 neighbors  			
			handleNewElement($(this));
			updateGrid();
			/*
			isSelect = !$(this).hasClass('draw-element');
			var nodes = [$(this)];
			nodes.push($(this).next());
			var $other = $(this).parent().next();
			$other = $other.find("td[data-col='"+$(this).data('col')+"']");
			nodes.push($other);
			$other = $other.next();
			nodes.push($other);
			
			$.each(nodes, function(){
				isSelect ? $(this).addClass("draw-element") : $(this).removeClass("draw-element");
			});
			*/
  		}
  		else if (mode === 'L'){
  			// TODO: currently just a backup
  			isSelectionMode = true;
			isSelect = !$(this).hasClass('selection');
			$(this).toggleClass("selection");  	
  		}
  	});
  
	
	$grid.on('mouseenter', 'td:not(.node)', function(event){
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

	}
	
})(jQuery, window, document);