//adapted from http://zeroviscosity.com ; data from http://www.oceanplasma.org/documents/chemistry.html

'use strict';
const dataset = [
        { label: 'Chlorine', count: 55 }, 
        { label: 'Sodium', count: 30.6 },
        { label: 'Sulfate', count: 7.7 },
        { label: 'Magnesium', count: 3.65 },
        { label: 'Other elements', count: 3.05 }  
    ];

((d3) => {

    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(["#086788", "#07A0C3", "#F0C808", "#FFF1D0", "#DD1C1A"]);
    const donutWidth = 100;

//create elements
    const svg = d3.select('#piechart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

//define piechart radius and angles
    const arc = d3.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);
    const pie = d3.pie()
    .value((d) => {
        return d.count;
    })
    .sort(null);

//bind data
    const path = svg.selectAll('path')
    .data(pie(dataset))
    //make placeholders
    .enter()
    //add elements and data
    .append('path')
    .attr('d', arc)
    //fill with color
    .attr('fill', (d,i) => {
        return color(d.data.label);
    });

//make legend 
const legendRectSize = 18;
const legendSpacing = 4;

const legend = svg.selectAll('.legend')
    //get the data from color array
    .data(color.domain())
    .enter()
    .append('g')
    //give each 'g' element the class='legend' 
    .attr('class', 'legend')
    //pos everything
    .attr('transform', (d, i) =>{
        const height = legendRectSize + legendSpacing;
        const offset = height * color.domain().length / 2;
        const horz = -2 * legendRectSize;
        const vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
    })

//add color rect   
legend.append('rect')
  .attr('width', legendRectSize)
  .attr('height', legendRectSize)
  .style('fill', color)
  .style('stroke', color);

//add the text
legend.append('text')
  .attr('x', legendRectSize + legendSpacing)
  .attr('y', legendRectSize - legendSpacing)
  .text((d) => { return d; });

})(window.d3);