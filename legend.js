// The svg  
const colorThresholds = [30, 60, 90, 120, 150, 180, 200];
// const dataThresholds = [100, 1000, 10000, 50000, 100000, 500000, 1000000].reverse;
const dataThresholds = [1000000, 500000, 100000, 50000, 10000, 10000, 100];


const range = d3.select("#my_scale")
    .attr("width", 120)
    .attr("height", 350);

const rangeScale = d3.scaleThreshold()
    // .domain([30, 60, 90, 120, 150, 180, 200])
    .domain(colorThresholds)
    .range(d3.schemeGreens[8]);

var rects = range.selectAll("rect")
    .data(colorThresholds);

rects.enter()
    .append("rect")
    .attr("y", (d, i) => {
        return 300 - (i * 50);
    })
    .attr("x", 30)
    .attr("width", 15)
    .attr("height", 50)
    .attr("fill", (d, i) => {
        return rangeScale(colorThresholds[i]);
    });

rects.enter()
    .append("line")
    .attr("y1", (d, i) => {
        return (i * 50);
    })
    .attr("y2", (d, i) => {
        return (i * 50);
    })
    .attr("x1", 30)
    .attr("x2", 60)
    .attr("stroke", "gray")
    .attr("height", 15);

rects.enter()
    .append("text")
    .attr("y", (d, i) => {
        return (i * 50) + 20;
    })
    .attr("x", 55)
    .text((d, i) => {
        if (i === 0) {
            return `${(dataThresholds[i]/1000 )}+`;
        } else if (i === 6) {
            return `${(dataThresholds[i]/1000 )}k Cases`;
        } else {
            return `${(dataThresholds[i]/1000 )}`;
        }
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "15")
    .attr("font-weight", "lighter")
    .attr("fill", "gray");