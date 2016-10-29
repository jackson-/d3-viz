

$(document).ready(function(){

var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  var barData = [{
    'x': 1,
    'y': 5,
    'text':'first'
  }, {
    'x': 20,
    'y': 20,
    'text':'second'
  }, {
    'x': 40,
    'y': 10,
    'text':'third'
  }, {
    'x': 60,
    'y': 40,
    'text':'fourth'
  }, {
    'x': 80,
    'y': 5,
    'text':'fifth'
  }, {
    'x': 100,
    'y': 60,
    'text':'sixth'
  }];

  var vis = d3.select('#visualisation'),
    WIDTH = 1000,
    HEIGHT = 500,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    },
    xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right], 0.1).domain(barData.map(function(d) {
      return d.x;
    })),

    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,
      d3.max(barData, function(d) {
        return d.y;
      })]),

    xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(5)
      .tickSubdivide(true),

    yAxis = d3.svg.axis()
      .scale(yRange)
      .tickSize(5)
      .orient("left")
      .tickSubdivide(true);

  vis.append('svg:g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
    .call(xAxis);

  vis.append('svg:g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
    .call(yAxis);




vis.selectAll('rect')
  .data(barData)
  .enter()
  .append('svg:rect')
  .attr('x', function(d) { // sets the x position of the bar
    return xRange(d.x);
  })
  .attr('y', function(d) { // sets the y position of the bar
    return yRange(d.y);
  })
  .attr('width', xRange.rangeBand()) // sets the width of bar
  .attr('height', function(d) {      // sets the height of bar
    return ((HEIGHT - MARGINS.bottom) - yRange(d.y));
  })
  .text(function(d) { return d.text; })
  .attr('fill', 'grey')
  .on("mouseover", function(d,i) {
    d3.select(this)
        .append("text")
        .text( d.text)
        .attr("x", d.x)
        .attr("y", d.y)
        .attr("width", 100)
        .attr("height", 100)
        .attr("z-index", 1000);
    });

    });