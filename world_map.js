// The svg
const svg = d3.select("#map_view"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection
const path = d3.geoPath();
const projection = d3.geoMercator()
    .scale(165)
    .center([0, 20])
    .translate([width / 2, height / 2]);


// returns a single element
let date = document.getElementById("datePicker").value;

let countryName;
// let cases;

let tip = d3.tip().attr('class', 'd3-tip')
    .html((d) => {
        let text = `<strong>Country:</strong> <span style='color:white'> ${countryName}</span><br>`;
        return text;
    });

svg.call(tip);

const dates = {};
let countries = {};

// Load external data and boot
const geoAndFulldata = [
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
    d3.csv("./full_data.csv",
        (d) => {
            if (!dates[d.date]) {
                dates[d.date] = {};
                //if (dates[d.date][d.location] == "USA") { dates[d.date][d.location]= "United States"};
                dates[d.date][d.location] = +d["total_cases"];

            } else if (dates[d.date] && d.location) {
                dates[d.date][d.location] = +d["total_cases"];
            }
            //if (dates[d.date][d.location] == "USA") { dates[d.date][d.location]= "United States"};
                // if (d.location == "England") {
                //     dates[d.date]["United Kingdom"] = +d["total_cases"];
                // } else if (d.location == "USA") {
                //     dates[d.date]["United States"] = +d["total_cases"];
                // } else {
                //     dates[d.date][d.location] = +d["total_cases"];
                // }
                // switch (d.location) {
                //     case "USA":
                //         dates[d.date]["United States"] = +d["total_cases"];
                //     case "England":
                //         dates[d.date]["United Kingdom"] = +d["total_cases"];
                //     default:
                //         dates[d.date][d.location] = +d["total_cases"];

                // }
        }),
]

//add geoAndFulldata as dependency task,dependecy is sth depend on it, Promise is a class
//better approach: to process dependecy and data, asynchonously. after data processing, use callbackk
//to update view. 
Promise.all(geoAndFulldata).then((data) => {
    countries = data[0];
    ready();
}).catch((error) => {
    console.log(error);
});


// Data and color scale
const colorScale = d3
  .scaleThreshold()
  .domain([100, 1000, 10000, 50000, 100000, 500000, 1000000])
//   .domain([1500000, 1200000, 1000000, 800000, 500000, 300000, 200000].reverse)
  .range(d3.schemeGreens[8]);


let map = svg;

let mouseOver = function (d) {
    countryName = d.properties.name;
    // cases = Math.floor(d.total / 100000);
    // if (countryName == "USA") { 
    //     countryName ="United States";
    // } d is from d3 combining geolocation and fulldata

    d3.selectAll(".Country")
        .transition()
        .duration(200)
        .style("opacity", 0.5);
    d3.select(this)
        .transition()
        .duration(200)
        .style("opacity", 1);

    tip.show();
};

let mouseLeave = function (d) {
    countryName = null;
    // cases = null;
    if (countryName == "USA") { countryName = "United States"; }

    d3.selectAll(".Country")
        .transition()
        .duration(200)
        .style("opacity", 0.8);
    d3.select(this)
        .transition()
        .duration(200)
        .style("opacity", 0.8);

    tip.hide(d);
};

function ready() {
    // Draw the map
    map = svg.append("g")
        .selectAll("path")
        .data(countries.features)  //coresponds to d3 Json file ln 33,148
        .enter()
        .append("path")
        // draw each country
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        // set the color of each country
        .attr("fill", function (d) {
            d.total = dates[date][d.id] || 0;
            return colorScale(d.total);
        })
        .style("stroke", "white")
        .attr("class", function (d) { return "Country"; })
        .style("opacity", 0.8)
        .on("mouseover", mouseOver)
        .on("mouseleave", mouseLeave);

}

//1.get country data 2.loop through contries get cases of this country 3. change color
const updateMap = (date) => {
    //console.log(date) below is ln 125
    map._groups[0].forEach((country) => {
        total = dates[date][country.__data__.properties.name] || 0;
        country.setAttribute("fill", colorScale(total));
    });
};


document.getElementById("datePicker").addEventListener("change", (e) => {
    updateMap(e.currentTarget.value);
    document.getElementById("date").innerHTML = `Date: ${e.currentTarget.value}`;
});

//timeLapse onclick event

document.getElementById("myButton").addEventListener("click", (e) => {
    //document.getElementById("datePicker").value = "2019-12-31"
    playThrough(e.currentTarget.value);
});

let loopEvent;
const playThrough = () => {
    if (loopEvent) {
        //pause
        window.clearInterval(loopEvent);
        loopEvent = null;
        document.getElementById("myButton").value = "Time Lapse";
    } else { //play
        if (Date.parse(document.getElementById("datePicker").value) < Date.parse("2020-09-06")) {
            increment();
            document.getElementById("myButton").value = "Pause";
            loopEvent = setInterval(increment, 500);
        } else {
            //invalid date
            document.getElementById("datePicker").value = "2019-12-31";
            increment();
            document.getElementById("myButton").value = "Pause";
            loopEvent = setInterval(increment, 500);
        }
    }
};

const increment = () => {

    let date = document.getElementById("datePicker").value;
    if (Date.parse(date) < Date.parse("2020-09-06")) {
        //continue
        document.getElementById("datePicker").value = nextDateOf(date);
        timeLapse();
    } else {
        //stop
        timeLapse();
        window.clearInterval(loopEvent);
        document.getElementById("myButton").value = "Time Lapse";
        loopEvent = null;
        document.getElementById("datePicker").value = "2019-12-31";
    }
};

function nextDateOf(today) {
    if (today == "2020-03-08") {
        return "2020-03-09";
    }
    var nextDate = new Date(today);
    nextDate.setDate(nextDate.getDate() + 1);
    return JSON.stringify(nextDate).substring(1,11);
}

//updat map
const timeLapse = () => {
    let date = document.getElementById("datePicker").value;
    //console.log(date)
    document.getElementById("date").innerHTML = `Date: ${date}`;
    map._groups[0].forEach((country) => {
        total = dates[date][country.__data__.properties.name] || 0;
        country.setAttribute("fill", colorScale(total));
    });
};



// document.getElementById("music").addEventListener("click", (e) => {
//     let music = document.getElementById("music");
//     if (music.paused) {
//         music.play();
//     }
// });




// dateTimeReviver = function (key, value) {
//     var a;
//     if (typeof value === 'string') {
//         a = /\/Date\((\d*)\)\//.exec(value);
//         if (a) {
//             return new Date(+a[1]);
//         }
//     }
//     return value;
// }
// JSON.parse(JSON.stringify(2020-01-11), dateTimeReviver);