
         var margin = {top: 100, right: 50, bottom: 100, left: 700}, 
    		  margin2 = {top: 100, right: 10, bottom: 100, left: 50},
					margin0 = {top: 100, right: 10, bottom: 100, left: 50},
					width = 1100 - margin0.left - margin0.right,
					heightscreen = 700,
					height = heightscreen - margin.top - margin.bottom,
					height2 = heightscreen - margin2.top - margin2.bottom,
					width2 = 1560 - margin2.left - margin2.right;
          space  	= 100 //150
					margspace = 75 //50
					widthchr	= 50

				var parseGM = d3.time.format("%b %Y").parse;

				var y = d3.scale.linear().range([0,height]),
					y2 = d3.scale.linear().range([0,height2]), 
					x = d3.scale.linear().range([0,width]),
					x2 = d3.scale.linear().range([0,10]); 

				var yAxis = d3.svg.axis().scale(y).orient("left").tickSize(1),
					yAxis2 = d3.svg.axis().scale(y2).orient("left").tickSize(1),
					xAxis = d3.svg.axis().scale(x).orient("bottom");

			    
        var vbrush = d3.svg.brush()
  				.y(y2)
					.on("brush", brush);

        var pbrush = d3.svg.brush()
    			.y(y2)
					.on("brush", brushx4);

					
				var svg = d3.select("#mire").append("svg")
					.attr("width",  width + margin0.left + margin0.right)
					.attr("height", height+ margin0.top + margin0.bottom);

				var focus = svg.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				var context = svg.append("g")
					.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
					
					var div = d3.select("#mire").append("div")
					.attr("class", "tooltip")
					.style("opacity", 1e-6);
 