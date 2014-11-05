(function($, window, document) {
  
  var $grid;
  var model = {
  	elements: [],
  	lines: []
  };
  var isSelectionMode = false;
  var isSelect = true;
  var elementCount = 0;
  
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
		    	drawElement(this);
		    
		  });
	}
  	function drawElement(elt){
  			var $cell = $grid.find("tr[data-row="+elt.y+"] > td[data-col="+elt.x+"]");
		    $cell.html(elt.data);
		    $cell.attr('colspan',elt.w).attr('rowspan',elt.h);
		    $cell.addClass('node');
		    
		    // add detail data:
		    $cell.data('detail', elt.detail);
		    $cell.data('detailHeader', elt.detailHeader);
		    $cell.data('id', elt.id);
		    // find neighbours and kill em
		    $cell.next().remove();
		    var neigh = $cell.parent().next().find("td[data-col="+elt.x+"]"); //;.remove().next().remove();
		    var nn = neigh.next();//neigh.remove();
		    neigh.remove();
		    nn.remove();
  	
  }
  function processNodeClick(node){
  	
  }
  
  function handleNewElement(that){
  	
  	var elt = { w:2, h:2, data:"<div>test</div>", 
  				detail: "detail", 
  				detailHeader : "header"};
  	elt.x = that.data('col');
	elt.y = that.data('row');
	elt.id = elementCount++;
	if (checkArea(elt)){
		model.elements.push(elt);
		return elt;
	}
	else {
		//alert('collsion detected');
	}
  }
  
  function handleSelectNode(that){
  	$grid.find('td').removeClass('highlight');
  	that.addClass('highlight');
  	$('#debug').text('Selected: ' + that.data('id'));
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
		$grid.on('mousedown', 'td.node', function(event){
			if (mode === 'S'){
				handleSelectNode($(this));
			}
		});
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
			var newElt = handleNewElement($(this));
			drawElement(newElt);
			//updateGrid();
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
	
	$('#btn1').on('click', function(){
		$('#debug').text(JSON.stringify(model));
	});

	}
	
})(jQuery, window, document);