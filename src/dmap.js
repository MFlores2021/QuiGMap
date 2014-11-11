function brush(){

	d3.selectAll("text#popup").remove(); 
	y.domain(vbrush.empty() ? y2.domain() : vbrush.extent());  
	
	var a1 = 0, b1=0;	
	
	//select item zoomed
	focus.selectAll("text").attr("dy", function(d) { if  (d.GM != a1) { a1 = d.GM; b1 = 0; return y(d.GM);}  else {  b1 += 1; return y(d.GM)+b1*8; } }).text(function(d) { if (y(d.GM)>-2 & y(d.GM)<height)  return d.name; });
	focus.selectAll("line").attr("y1", function(d) { if (y(d.GM)>=0 & y(d.GM)<height) return y(d.GM); });
	focus.selectAll("line").attr("y2", function(d) { if (y(d.GM)>=0 & y(d.GM)<height) return y(d.GM); });
		 
	// brush zoom polygon 
	ydomain = y.domain();	  
    constant = heightscreen/(valuemax*1.4);
	
	context.selectAll("polygon").attr("points", "75," + (d3.min(ydomain)*constant) + " 75," + (d3.max(ydomain)*constant) + " "+ (margin.left-151) + "," + height + " "+ (margin.left-151) + ",0 ")
	focus.select(".y.axis").call(yAxis); 
  	focus.attr("visibility", "unhidden");
	    
}

function brushx4(){

	d3.selectAll("text#popup").remove(); 
	y.domain(brush.empty() ? y2.domain() : brush.extent()); 
	
	//select item zoomed
	focus.selectAll("text").attr("dy", function(d) { return y(d.GM); }).text(function(d) { if (y(d.GM)>-2 & y(d.GM)<height)  return d.name; });
	focus.selectAll("line").attr("y1", function(d) { if (y(d.GM)>=0 & y(d.GM)<height) return y(d.GM); });
	focus.selectAll("line").attr("y2", function(d) { if (y(d.GM)>=0 & y(d.GM)<height) return y(d.GM); });
	   
	// brush zoom polygon 
	ydomain = y.domain();
    constant = heightscreen/(valuemax*1.4);
	context.selectAll("polygon").attr("points", "75," + (d3.min(ydomain)*constant) + " 75," + (d3.max(ydomain)*constant) + " 525," + (d3.max(ydomain)*constant) + " "+ (margin.left-61) + "," + height + " "+ (margin.left-61) + ",0 525," + (d3.min(ydomain)*constant) + " ")
    focus.select(".y.axis").call(yAxis); 
  	focus.attr("visibility", "unhidden");	    
}

function mouseover(d) {
};
	
function mouseoverx21(d) {

 	focus.selectAll("text").style("fill", "black") 
	d3.select(this).style("fill", "blue") ;
	d3.selectAll("text#popup").remove();   
	svg.classed("active", true);
	focus.selectAll("text").classed("inactive", function(p) { return p !== d; });
    focus.selectAll("linehorizontal").classed("inactive", function(p) { return p !== d; });
    svg.filter(function(p) { return p === d; }).each(moveToFront);

	// agrega texto popup
	focus.append("svg:text")
        .attr("x", 250)
        .attr("y", 90)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("Marker: " + d.name );  
		
	focus.append("svg:text")
        .attr("x", 250)
        .attr("y", 30)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("Chr: " + d.CHR ); 
	focus.append("svg:text")
        .attr("x", 250)
        .attr("y", 60)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("Position: " + d.GM ); 	
		
	focus.append("svg:text")
        .attr("x", 250)
        .attr("y", 120)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("Protocol: " + d.name ); 
		 
	focus.append("svg:a")
		.attr("xlink:href", "http://hpc.cip.cgiar.org/bioinformatics/JBrowse/?loc=chr0"+ d.CHR +":"+d.H_START+".."+d.H_END)
        .append("svg:text").attr("x", 250)
        .attr("y", 150)
		.attr("id", "popup")
		.attr("fill", "blue")
		.style("font-size", "12pt")
		.text("View on Genome Browser");
}
  
function mouseoverx2(d,markervalue) {

	d3.selectAll("text#popup").remove();
	svg.classed("active", true);
	focus.selectAll("text").classed("inactive", function(p) { return p !== d; });
    focus.selectAll("linehorizontal").classed("inactive", function(p) { return p !== d; });
    svg.filter(function(p) { return p === d; }).each(moveToFront);
	
	if (markervalue !== '') {	 
		var datax = d.filter(function(d) {
						return d.name == markervalue}); 	
	}
		
	// agrega texto popup
	focus.append("svg:text")
		.data(datax)
		.attr("x", 200)
		.attr("y", 0)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
		.text(function(d) { return "Marker: " + d.name; }); 
		
	focus.append("svg:text")
		.data(datax)
		.attr("x", 200)
		.attr("y", 30)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
		.text(function(d) { return "Chromosome: " + d.CHR; });  
	focus.append("svg:text")
		.data(datax)
		.attr("x", 200)
		.attr("y", 60)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
		.text(function(d) { return "Position: " + d.GM + " cM"; }); 
		
	focus.append("svg:text")
		.data(datax)
		.attr("x", 200)
		.attr("y", 90)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
		.text( function(d) { return "Protocol    : " + d.name; });  
		
	focus.append("svg:a")
		.attr("xlink:href", "http://hpc.cip.cgiar.org/bioinformatics/JBrowse/?loc="+d.SCAFF_ID+":"+d.H_START+".."+d.H_END)
		.append("svg:text").attr("x", 250)
		.attr("y", 180)
		.attr("id", "popup")
		.attr("fill", "blue") 
		.style("font-size", "12pt")
		.text("View on Genome Browser");
}
	
function onclickqtl(d) {
	context.select("brush").remove(); 
	context.select("brush").call(brush.extent([d.range.split('-')[0],d.range.split('-')[1]]));
	context.select("brush").call(brushx4); 
	d3.selectAll("text#popup").remove(); 
	focus.attr("visibility", "unhidden");

	posx = 180,
	posy = 20;
	
	// agrega texto popup for QTL			 
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", 0)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
		.style("fill", "blue") 
        .text("Trait: " + d.qtl );  
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("Chr:       "  + d.CHR ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*2)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("LG: " + d.LG ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*3)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("Population: " + d.population ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*4)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("Location: " + d.locality ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*5)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("Position (cM): " + d.peak ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*6)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("Marker interval: " + d.range ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*7)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("Interval (cM): " + d.marker_interval ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*8)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("DArT Markers involved: " )
		.on("click", clickx);
		
	var a= d.dart_markers_involved;
		
	function clickx() {
			alert(a);
	}
			
	focus.append("svg:text")
        .attr("x", posx + 170)
        .attr("y", posy*8)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("See "  )
		.style("cursor","pointer")
		.style("fill", "blue") 
		.on("click", clickx);
	
	
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*9)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("Interval (cM): " + d.dart_range ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*10)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("LOD : " + d.LOD ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*11)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("% : " + d.R2 ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*12)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("Dosage/Effect: " + d.dosage_effect ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*13)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("QTL present : " + d.qtl_present ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*14)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("QTL absent: " + d.qtl_absent ); 		
}

function onclickqtlx2(d) {
	context.select("brush").remove(); 
	context.select("brush").call(vbrush.extent([d.range.split('-')[0],d.range.split('-')[1]]));
	context.select("brush").call(brush); 
	d3.selectAll("text#popup").remove(); 
	focus.attr("visibility", "unhidden");

	posx = 180,
	posy = 20;
	
	// agrega texto popup for QTL			 
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", 0)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
		.style("fill", "blue") 
        .text("Trait: " + d.qtl );  
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("Chr:       "  + d.CHR ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*2)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("LG: " + d.LG ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*3)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("Population: " + d.population ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*4)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("Location: " + d.locality ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*5)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("Position (cM): " + d.peak ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*6)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("Marker interval: " + d.range ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*7)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("Interval (cM): " + d.marker_interval ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*8)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("DArT Markers involved: " )
		.on("click", clickx);
		
	var a= d.dart_markers_involved;
		
	function clickx() {
			alert(a);
	}
			
	focus.append("svg:text")
        .attr("x", posx + 170)
        .attr("y", posy*8)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("See "  )
		.style("cursor","pointer")
		.style("fill", "blue") 
		.on("click", clickx);
	
	
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*9)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("Interval (cM): " + d.dart_range ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*10)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("LOD : " + d.LOD ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*11)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("% : " + d.R2 ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*12)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("Dosage/Effect: " + d.dosage_effect ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*13)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("QTL present : " + d.qtl_present ); 
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*14)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("QTL absent: " + d.qtl_absent ); 		
}

//for QTL selected
function loadqtl(d,qtlselected) {

	focus.attr("visibility", "unhidden");  
	context.select("brush").call(brush); 
	d3.selectAll("text#popup").remove(); 	

	posx = 180,
	posy = 20;
	
	var dataxq = d.filter(function(d) {
		return d.random == qtlselected
	}); 	
	
	// agrega texto popup for QTL

	focus.append("svg:text")
		.data(dataxq)
        .attr("x", posx)
        .attr("y", 0)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
		.style("fill", "blue") 
		.text(function(d) { return "Trait: " + d.qtl; }); ;  
		
	focus.append("svg:text")
		.data(dataxq)
        .attr("x", posx)
        .attr("y", posy)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
		.text(function(d) { return "Chr: " + d.CHR ; }); ;   
		
	focus.append("svg:text")
       	.data(dataxq)
        .attr("x", posx)
        .attr("y", posy*2)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
		.text(function(d) { return "LG: " + d.LG ; }); ;  
		
	focus.append("svg:text")
       	.data(dataxq)
		.attr("x", posx)
        .attr("y", posy*3)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
		.text(function(d) { return "Population: " + d.population ; }); ;  
		
	focus.append("svg:text")
       	.data(dataxq)
        .attr("x", posx)
        .attr("y", posy*4)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
		.text(function(d) { return "Location: " + d.locality ; }); ;   
		
	focus.append("svg:text")
       	.data(dataxq)
        .attr("x", posx)
        .attr("y", posy*5)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
		.text(function(d) { return "Position (cM): " + d.peak ; }); ;  
		
	focus.append("svg:text")
       	.data(dataxq)
        .attr("x", posx)
        .attr("y", posy*6)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
		.text(function(d) { return "Marker interval: " + d.range; }); ;   
		
	focus.append("svg:text")
       	.data(dataxq)
        .attr("x", posx)
        .attr("y", posy*7)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
		.text(function(d) { return "Interval (cM): " + d.marker_interval; }); ;  
		
	focus.append("svg:text")
        .attr("x", posx)
        .attr("y", posy*8)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("DArT Markers involved: " );
		
	function clickx(d) {
		alert(d.dart_markers_involved);
	}
			
	focus.append("svg:text")
       	.data(dataxq)
        .attr("x", posx + 170)
        .attr("y", posy*8)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
        .text("Details "  )
		.style("cursor","pointer")
		.style("fill", "blue") 
		.on("click", clickx);
		
	focus.append("svg:text")
       	.data(dataxq)
        .attr("x", posx)
        .attr("y", posy*9)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
		.text(function(d) { return "Interval (cM): " + d.dart_range; }); ;  
		
	focus.append("svg:text")
       	.data(dataxq)
        .attr("x", posx)
        .attr("y", posy*10)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
		.text(function(d) { return "LOD : " + d.LOD ; }); ;   
		
	focus.append("svg:text")
       	.data(dataxq)
        .attr("x", posx)
        .attr("y", posy*11)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
		.text(function(d) { return "% : " + d.R2; }); ;   
		
	focus.append("svg:text")
        .data(dataxq)
        .attr("x", posx)
        .attr("y", posy*12)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
		.text(function(d) { return "Dosage/Effect: " + d.dosage_effect; }); ;   
		
	focus.append("svg:text")
        .data(dataxq)
        .attr("x", posx)
        .attr("y", posy*13)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
		.text(function(d) { return "QTL present : " + d.qtl_present; }); ;   
		
	focus.append("svg:text")
        .data(dataxq)
        .attr("x", posx)
        .attr("y", posy*14)
		.attr("id", "popup")
		.attr("fill", "black")
		.style("font-size", "12pt")
		.text(function(d) { return "QTL absent: " + d.qtl_absent; }); ;   		
}

// For QTL events
function mouseoverx() {
	div.transition()
	  .duration(500)
	  .style("opacity", 1);
}

function mousemovex(d,i){ 
	div.text(d.qtl)
	  .style("left", (450 + i*6)+ "px") 
	  .style("top",  (y2(d.range.split('-')[1])+400) + "px"); 
	  /* .style("left", (150+i*6)+ "px") 
	  .style("top",  (y2(d.range.split('-')[1])+90) + "px"); */
}

function mouseoutx() {
	div.transition()
	  .duration(500)
	  .style("opacity", 1e-6);
}
  
function mouseout(d) {
    svg.classed("active", false);	
	/*d3.select(this).style("fill", "black") 
    d3.select(this).style("stroke-width", 20);*/
}

function moveToFront() {
    this.parentNode.appendChild(this);
}
  
function onclick(d) {
	window.open("http://hpc.cip.cgiar.org/bioinformatics/JBrowse/?loc=chr0"+ d.CHR +":"+d.H_START+".."+d.H_END); 
	return false; 
}
	