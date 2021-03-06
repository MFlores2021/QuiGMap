//////////////////////////////////////////////////////////
//
// Dmap 1.0
//
// Maintainer: Mirella Flores
// Authors: Mirella Flores, Hannele Lindquist-Kreuze, María Caraza Salas
// Reinhard Simon, Elisa Mihovilovich, Merideth Bonierbale
//
// Copyright: International Potato Center
// License: MIT
// Date: 2014-11-14
//
// Contains functions to display genetic maps using D3.js
// as a backend
//////////////////////////////////////////////////////////


function chr_select(chr,markervalue,datamarkers,dataqtl){

context.select("brush").remove();
    					context.select("brushid").remove();
							context.selectAll("brush").remove();
							context.selectAll("brushid").remove();
              
          
      	svg.append("defs").append("clipPath")
					.attr("id", "clip")
				  .append("rect")
					.attr("width", width)
					.attr("height", height);   
      		  
				focus.attr("visibility", "hidden");
				context.attr("visibility", "hidden");	
				 
				focus.append("rect")
					.attr("x", 0)
					.attr("y", 0)
					.attr("rx", 0)
					.attr("ry", 0)
					.attr("width", 75)
					.attr("height", height)
					.attr("fill",'#F2F7D2')	
					.attr("stroke","black")
					.attr("id","reglineTx2");		
          
          
					focus.select("reglineTx2").attr("visibility", "hidden");
          focus.select("reglineTx2").remove();
					context.attr("visibility", "unhidden");
					focus.selectAll("line").remove();
					focus.selectAll("text").remove();
					focus.select(".y.axis").remove();
					context.selectAll("line").remove();
					context.selectAll("text").remove();
					context.select(".y.axis").remove();
					context.selectAll("rect").remove();
					context.select("g").remove();
					context.selectAll("g").remove();
					context.selectAll("polygon").remove();
					
					context.append("rect")
						.attr("x", 0)
						.attr("y", -30)
						.attr("rx", 80)
						.attr("ry", 30)      
						.attr("width", 75)
						.attr("height", height + 60)
						.attr("fill",'transparent')
						.attr("stroke","black")
						.attr("id","reglineTx2");
						 
					d3.csv(datamarkers, function(data) {
						data.forEach(function(d) {
							d.GM = +d.GM; 
						});
						
						var data = data.filter(function(d) {
						return d.CHR == chr});  
						
						y.domain(d3.extent(data.map(function(d) { return d.GM; })));
						x.domain([0, d3.max(data.map(function(d) { return d.GM; }))]);
						y2.domain(y.domain());
						x2.domain(x.domain());

						valuemax  = d3.max(data, function(d) { return d.GM; });

						context.append("g") 
							.attr("id","yaxis")
							.attr("class", "y axis")
							.attr("width", 1)
							  .attr("height", 1)
							.attr("transform", "translate(0,0)") 
							.call(yAxis2);
							
						context.selectAll("line.horizontal")
							.data(data)
							.enter().append("svg:line")
							.attr("x1", 0)
							.attr("y1", function(d) { return y(d.GM); })
							.attr("x2", 75)
							.attr("y2", function(d) { return y(d.GM); })
							.style("stroke", function(d) { return d.color; }) 
							.style("stroke-width", 2);
							
						context.append("g")
							.attr("id","brushid")
							.attr("class", "brush")
							.call(vbrush)
							.selectAll("rect")
							.attr("fill", "#E7D681")
							.attr("width", 75);  
						  
						// Polygon for zoom
						context.append("polygon")
							.data(data)
							.attr("fill", "#E7D681") 
							.attr('opacity', 0.125)
							.style("stroke-width", 2);
							  
						// focus hidden when zoom is not available	  
										   
						context.append("text")
							.attr("id", "text-select")
							.attr("dx", 0)
							.attr("dy", -50)
							.style("font-size", "9pt")
							.text("Chromosome " + chr);	  
							  
						context.append("text")
							.attr("id", "text-select")
							.attr("dx", 0)
							.attr("dy", height+50)
							.text("Select and brush an area for zoom");
							  
						focus.append("g")
							.attr("class", "y axis")
							.attr("transform", "translate(0,0)")
							.call(yAxis);

						// Draw markers in focus zone
											
						focus.selectAll("linehorizontal")
							.data(data)
							.enter().append("line")
							.attr("class", "line")
							.attr("x1", 0)  
							.attr("y1", function(d) { return y2(d.GM); })
							.attr("x2", 75)
							.attr("y2", function(d) { return y2(d.GM); })
							.style("stroke", function(d) { return d.color; })
							.style("stroke-width", 2)
							.on("mouseover", mouseoverx21)
							.on("mouseout", mouseout)
							.on("click", onclick);

						var a = 0, b=0;
						focus.selectAll("text1")
							.data(data)
							.enter().append("text")
							.attr("dx", function(d,i) {  if  (d.GM != a) { a = d.GM; b = 0; return 75;}  else {  b += 1; return 75+b*5;  } })
							.on( "mouseover", mouseoverx21)
							.on("mouseout", mouseout)
							.on("click", onclick);
					});

					d3.csv(dataqtl, function(data) {
						if (data !== null) {
							var dataq = data.filter(function(d) {
								return d.GM1 != ''
							}); 
             
             dataq = data.filter(function(d) {
    							return d.CHR == chr
								}); 

							// draw QTL
								context.selectAll("line.vertical")
									.data(dataq)
									.enter().append("svg:line")
									.attr("x1", function(d,i) { return 85+i*6; }) 
									.attr("y1", function(d) { return y2(d.range.split('-')[0]); }) 
									.attr("x2", function(d,i) { return 85+i*6; })
									.attr("y2", function(d) { return y2(d.range.split('-')[1]); }) 
									.style("stroke", "#203455")   
									.style("stroke-width", 5)
									.style("cursor","pointer")
									.on("click", onclickqtlx2)			
									.on("mouseover", mouseoverx)
									.on("mousemove", mousemovex)
									.on("mouseout", mouseoutx);
												
						}
					});
				}
        
function chr_selectx4(chr,markervalue,datamarkers,dataqtl){
  context.select("brush").remove();
  						context.select("brushid").remove();
							context.selectAll("brush").remove();
							context.selectAll("brushid").remove();
              
    svg.append("defs").append("clipPath")
  				.attr("id", "clip")
					.append("rect")
					.attr("width", width)
					.attr("height", height);
          
    			focus.attr("visibility", "hidden");
				context.attr("visibility", "hidden");	
			
				//Create zoomed region				 
				focus.append("rect")
					.attr("x", 0)
					.attr("y", 0)
					.attr("rx", 0)
					.attr("ry", 0)      
					.attr("width", 75) 
					.attr("height", height)
					.attr("fill",'lightcoral')
					.attr("stroke","black")
					.attr("id","reglineTx4");		
          
          
  				//Clear previous objects
          focus.select("reglineTx4").attr("visibility", "hidden");
          focus.select("reglineTx4").remove();
          focus.select("reglineTx2").remove();
					focus.attr("visibility", "unhidden");
					context.attr("visibility", "unhidden");
					focus.selectAll("line").remove();
					focus.selectAll("text").remove();
					focus.select(".y.axis").remove();
					context.selectAll("line").remove();
					context.selectAll("text").remove();
					context.select(".y.axis").remove();
					context.selectAll("rect").remove();

					context.select("g").remove();
					context.selectAll("g").remove();
					context.selectAll("polygon").remove();

					//Create alleles
					context.append("rect")
						.attr("x", 0)
						.attr("y", -30)
						.attr("rx", 80)
						.attr("ry", 30)      
						.attr("width", widthchr+25)
						.attr("height", height + 60)
						.attr("fill",'transparent')
						.attr("stroke","black")
						.attr("id","reglineT");
						 
					context.append("rect")
						.attr("x", space+margspace)
						.attr("y", -30)
						.attr("rx", 80)
						.attr("ry", 30)      
						.attr("width", widthchr)
						.attr("height", height + 60)
						.attr("fill",'transparent')
						.attr("stroke","black")
						.attr("id","reglineT");
						 
					context.append("rect")
						.attr("x", space*2+margspace)
						.attr("y", -30)
						.attr("rx", 80)
						.attr("ry", 30)      
						.attr("width", widthchr)
						.attr("height", height + 60)
						.attr("fill",'transparent')
						.attr("stroke","black")
						.attr("id","reglineT");
						 
					context.append("rect")
						.attr("x", space*3+margspace)
						.attr("y", -30)
						.attr("rx", 80)
						.attr("ry", 30)      
						.attr("width", widthchr)
						.attr("height", height + 60)
						.attr("fill",'transparent')
						.attr("stroke","black")
						.attr("id","reglineT");
						 
					context.append("rect")
						.attr("x", space*4+margspace)
						.attr("y", -30)
						.attr("rx", 80)
						.attr("ry", 30)      
						.attr("width", widthchr)
						.attr("height", height + 60)
						.attr("fill",'transparent')
						.attr("stroke","black")
						.attr("id","reglineT");
						 
					d3.csv(datamarkers, function(data) {

						data.forEach(function(d) {
										d.GM = +d.GM; 
						});
						  
						var data  = data.filter(function(d) {
									return d.CHR == chr});  
						var dataq = data.filter(function(d) {
									return d.marker2 != ''}); 
						var data1 = data.filter(function(d) {
									return d.alelle == 1}); 
						var data2 = data.filter(function(d) {
									return d.alelle == 2}); 
						var data3 = data.filter(function(d) {
									return d.alelle == 3}); 
						var data4 = data.filter(function(d) {
									return d.alelle == 4}); 
							
						y.domain(d3.extent(data.map(function(d) { return d.GM; })));
						x.domain([0, d3.max(data.map(function(d) { return d.GM; }))]);
						y2.domain(y.domain());
						x2.domain(x.domain());
						  
						valuemax  = d3.max(data, function(d) { return d.GM; });

						//overall
						context.append("text")
							.attr("id", "text-select")
							.attr("dx", 20)
							.attr("dy", -40)
							.text("Overall");
							  
						context.append("g") 
							.attr("id","yaxis")
							.attr("class", "y axis")
							.attr("transform", "translate(0,0)") 
							.call(yAxis2);
							  
						//C1
						context.append("text")
							.attr("id", "text-select")
							.attr("dx", space+margspace+15)
							.attr("dy", -40)
							.text("C1");		  

						//C2
						context.append("text")
							.attr("id", "text-select")
							.attr("dx", space*2+margspace+15)
							.attr("dy", -40)
							.text("C2");

						//C3
						context.append("text")
							.attr("id", "text-select")
							.attr("dx", space*3+margspace+15)
							.attr("dy", -40)
							.text("C3");
							  
						//C4
						context.append("text")
							.attr("id", "text-select")
							.attr("dx", space*4+margspace+15)
							.attr("dy", -40)
							.text("C4");		  
						
						//draw markers
						context.selectAll("line.horizontal")
							.data(data)
							.enter().append("svg:line")
							.attr("x1", 0)
							.attr("y1", function(d) { return y(d.GM); })
							.attr("x2", widthchr+25)
							.attr("y2", function(d) { return y(d.GM); })
							.style("stroke", function(d) { return d.color; }) 
							.style("stroke-width", 2);		
						
						context.selectAll("line.horizontal")
							.data(data1)
							.enter().append("svg:line")
							.attr("x1", space+margspace)
							.attr("y1", function(d) { return y(d.GM); })
							.attr("x2", space+margspace+widthchr)
							.attr("y2", function(d) { return y(d.GM); })
							.style("stroke", function(d) { return d.color; }) 
							.style("stroke-width", 2);
							
						context.selectAll("line.horizontal")
							.data(data2)
							.enter().append("svg:line")
							.attr("x1", space*2+margspace)
							.attr("y1", function(d) { return y(d.GM); })
							.attr("x2", space*2+margspace+widthchr)
							.attr("y2", function(d) { return y(d.GM); })
							.style("stroke", function(d) { return d.color; }) 
							.style("stroke-width", 2);
							
						context.selectAll("line.horizontal")
							.data(data3)
							.enter().append("svg:line")
							.attr("x1", space*3+margspace)
							.attr("y1", function(d) { return y(d.GM); })
							.attr("x2", space*3+margspace+widthchr)
							.attr("y2", function(d) { return y(d.GM); })
							.style("stroke", function(d) { return d.color; })
							.style("stroke-width", 2);
							
						context.selectAll("line.horizontal")
							.data(data4) 
							.enter().append("svg:line")
							.attr("x1", space*4+margspace)
							.attr("y1", function(d) { return y(d.GM); })
							.attr("x2", space*4+margspace+widthchr)
							.attr("y2", function(d) { return y(d.GM); })
							.style("stroke", function(d) { return d.color; })
							.style("stroke-width", 2);
							
						//For brush			  
						context.append("g")
							.attr("id","brushid")
							.attr("class", "brush")
							.call(pbrush)
							.selectAll("rect")
							.attr("fill", "lightcoral")
							.attr("width", widthchr+25); 
							  
						//Polygon for zoom
						context.append("polygon")
							.data(data)
							.attr("fill", "lightcoral")
							.attr('opacity', 0.125)
							.style("stroke-width", 2);
							  
						//focus hidden when zoom is not available	  
						focus.attr("visibility", "hidden");
						  
						context.append("text")
							.attr("id", "text-select")
							.attr("dx", 0)
							.attr("dy", height+50)
							.text("Select and brush an area for zoom");
						
						//Draw axis in focus zone	
						focus.append("g")
							.attr("class", "y axis")
							.attr("transform", "translate(0,0)")
							.call(yAxis);

						//Draw markers in focus zone
						focus.selectAll("linehorizontal")
							.data(data)
							.enter().append("line")
							.attr("class", "line")
							.attr("x1", 0)  
							.attr("y1", function(d) { return y2(d.GM); })
							.attr("x2",  75) 
							.attr("y2", function(d) { return y2(d.GM); })
							.style("stroke", function(d) { return d.color; }) 
							.style("stroke-width", 2)	
							.on( "mouseover", mouseover) 
							.on("mouseout", mouseout)
							.on("click", onclick);

						//Text for marker in zoomed zone	
						focus.selectAll("text1")
							.data(data)
							.enter().append("text")
							.attr("dx", 75)
							.on( "mouseover", mouseoverx21)
							.on("mouseout", mouseout)
							.on("click", onclick);
							  
						
						//Select QTLs
						d3.csv(dataqtl, function(dataqtl) {
							if (dataqtl !== null) {
								var dataq = dataqtl.filter(function(d) {
									return d.trait_name != ''
								}); 
                dataq = dataqtl.filter(function(d) {
  								return d.CHR == chr
								}); 
									
								// draw QTL
								context.selectAll("line.vertical")
									.data(dataq)
									.enter().append("svg:line")
									.attr("x1", function(d,i) { return 85+i*6; }) //array.indexOf("India") 100)
									.attr("y1", function(d) { return y2(d.range.split('-')[0]); }) 
									.attr("x2", function(d,i) { return 85+i*6; })
									.attr("y2", function(d) { return y2(d.range.split('-')[1]); }) 
									.style("stroke", "#203455")   
									.style("stroke-width", 5)
									.style("cursor","pointer")
									.on("click", onclickqtl)			
									.on("mouseover", mouseoverx)
									.on("mousemove", mousemovex)
									.on("mouseout", mouseoutx);								

							}
						});
					});
				}

////////////////////
//
// helper functions
//
////////////////////

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
  constant = height/valuemax; 
	
	context.selectAll("polygon").attr("points", "75," + (d3.min(ydomain)*constant) + " 75," + (d3.max(ydomain)*constant) + " "+ (margin.left-50) + "," + height + " "+ (margin.left-50) + ",0 ")
	focus.select(".y.axis").call(yAxis); 
  focus.attr("visibility", "unhidden");
	    
}

function brushx4(){

	d3.selectAll("text#popup").remove(); 
	y.domain(pbrush.empty() ? y2.domain() : pbrush.extent()); 
	
	//select item zoomed
	focus.selectAll("text").attr("dy", function(d) { return y(d.GM); }).text(function(d) { if (y(d.GM)>-2 & y(d.GM)<height)  return d.name; });
	focus.selectAll("line").attr("y1", function(d) { if (y(d.GM)>=0 & y(d.GM)<height) return y(d.GM); });
	focus.selectAll("line").attr("y2", function(d) { if (y(d.GM)>=0 & y(d.GM)<height) return y(d.GM); });
	   
	// brush zoom polygon 
	ydomain = y.domain();

   constant = height/valuemax;

	context.selectAll("polygon").attr("points", "75," + ((d3.min(ydomain))*constant) + " 75," + (d3.max(ydomain)*constant) + " 525," + (d3.max(ydomain)*constant) + " "+ (margin.left-53) + "," + height + " "+ (margin.left-53) + ",0 525," + (d3.min(ydomain)*constant) + " ")
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
		.attr("xlink:href", "http://JBrowse/?loc=chr0"+ d.CHR +":"+d.H_START+".."+d.H_END)
        .append("svg:text").attr("x", 250)
        .attr("y", 150)
		.attr("id", "popup")
		.attr("fill", "blue")
		.style("font-size", "12pt")
		.text("View on JBrowse");
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
		.attr("xlink:href", "http://JBrowse/?loc="+d.SCAFF_ID+":"+d.H_START+".."+d.H_END)
		.append("svg:text").attr("x", 250)
		.attr("y", 180)
		.attr("id", "popup")
		.attr("fill", "blue") 
		.style("font-size", "12pt")
		.text("View on JBrowse");
}
	
function onclickqtl(d) {
 focus.select("reglineTx2").remove();
	context.select("brush").remove(); 
	context.select("brush").call(pbrush.extent([d.range.split('-')[0],d.range.split('-')[1]]));
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
	focus.select("reglineTx2").remove();
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
	  .style("left", (400 + i*6)+ "px") 
	  .style("top",  (y2(d.range.split('-')[1])) + "px"); 
}

function mouseoutx() {
	div.transition()
	  .duration(500)
	  .style("opacity", 1e-6);
}
  
function mouseout(d) {
    svg.classed("active", false);	
}

function moveToFront() {
    this.parentNode.appendChild(this);
}
  
function onclick(d) {
	window.open("http://JBrowse/?loc=chr0"+ d.CHR +":"+d.H_START+".."+d.H_END); 
	return false; 
}
	