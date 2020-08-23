const url = "././samples.json"
console.log(url)


function init() {
    d3.json(url).then(function(data) {
        console.log(data);
        var names = data.names;
        console.log(names)
        names.forEach(function(id) {
            initDropdown = d3.selectAll("#selDataset")
                .append("option")
                .text(id)
                .property("value", id);
        });

        var firstName = names[0];
        console.log(names[0])
        buildPlots("940");
        buildMetadata("940");
    });
}

function optionChanged(newValue) {
    console.log("new value", newValue)
    buildPlots(newValue);
    buildMetadata(newValue);
}


function buildMetadata(name) {
    d3.json(url).then(function(data) {
        console.log(data)
        var dataSet = data.metadata.filter(item => item.id == name);
        var result = dataSet[0];

        var meta = d3.select("#sample-metadata");
        meta.html("");

        Object.entries(result).forEach(([key, value]) => {
            meta.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}

function buildPlots(sampleName) {
    d3.json(url).then(function(data) {
    
        var dataSet = data.samples.filter(item => item.id == sampleName);
        
        var values = dataSet[0].sample_values;
        var ids = dataSet[0].otu_ids;
        var labels = dataSet[0].otu_labels;
        var trace = {
            x: ids,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
                size: values,
                color: ids,
                colorscale: "Earth"
            }
        };

        var bubbleData = [trace];

        var layout = {
            title: "an individual's demographic information",
            width: "1000",
            height: "800",
            xaxis: { title: "otu_ids" },
            yaxis: { title: "Sample Values" }

        };

        Plotly.newPlot("bubble", bubbleData, layout);
        console.log("id", ids)


        var yticks = ids.slice(0, 10).map(otu => `OTU ${otu}`).reverse();
        console.log("yticks", yticks)
        console.log("id", ids)


        var prepbardata = {
            type: 'bar',
            orientation: 'h',
            x: values.slice(0, 10).reverse(),
            text: labels.slice(0, 10).reverse(),
            y: yticks

        };

        var barData = [prepbardata];

        var config = {
            title: "top 10 OTUs",
            margin: { t: 50, l: 100 },
            xaxis: { title: "sample_values" },
            yaxis: { title: "otu_ids" }
            

        };

        Plotly.newPlot('bar', barData, config)


    });

}

          // idea for the additional gauge
// var data2 = [
//	{
//		//domain: { x: [0, 1], y: [0, 1] },
//		value: data,
//		title: { text: "Belly Button Washing Frequency" },
//		type: "indicator",
//		mode: "gauge+number"

// axis: { range: [0, 9]},
//                steps: [ { range: [0, 1] },
//                    { range: [2, 3] },
//                    { range: [4, 5] },
//                    { range: [6, 7] },
 //                   { range: [8, 9] }
//	}
//];

//var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
//Plotly.newPlot('myDiv', data, layout);

init();

