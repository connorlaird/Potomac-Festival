// Start the chain of functions that populate the race results section
$(document).ready(function() {
    loadResults('js/race_results.json');
});

/**
 * Populates the #results-container element with the
 * headers and tables.
 * @param the JSON data of race results
 */
function populateTables(data) {
    // Load the data

    // Output an error message if there was a problem
    if (data == false) {
		$('#results-container').append("<p>Failed to load race results.</p>");
    }

    // All is well, find the #results-container element and populate
    else {
        for (var key in data) {
            $('#results-container').append("<div class='row'><div class='col-md-4 col-md-offset-4'><h3>" + data[key]["Year"] + " Race Results</h3></div></div>");

			// Init variables
            var cols = GetColumns(data[key]['Long']);
            var row = $("<div class='row'></div>");
            var table = CreateTable(data[key]['Long'], cols);
            var col = $("<div class='col-md-5 col-md-offset-1'></div>");

			// Add the long boat results
            col.append("<h2>Long Boat</h2>");
            col.append(table);
            row.append(col);

			// Add the short boat results
            table = CreateTable(data[key]['Short'], cols);
            col = $("<div class='col-md-5'></div>");
            col.append("<h2>Short Boat</h2>");
            col.append(table);
            row.append(col);

            $('#results-container').append(row);
        }
    }


}

/**
 * Makes the HTTP request to load an json file
 */
function loadResults(fileLoc) {
    request = new XMLHttpRequest();
    request.open('GET', fileLoc, true);
    var result;
    // Modify the onload function
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            populateTables(JSON.parse(request.responseText));

        } else {
            // We reached our target server, but it returned an error
            populateTables(false);

        }
    };

    // Modify the onerror funciton
    request.onerror = function() {

        // There was a connection error of some sort
        populateTables(false);
    };

    request.send();
}


/**
 * Parses the JSON and populates and html table element
 * @param obj - The JSON race data
 * @param cols - an array of column names for the table head
 * @return The table as a JQuery HTML container
 */
function CreateTable(obj, cols) {
    var table = $('<table class="table"></table>');
    var th = $('<tr></tr>');
    for (var i = 0; i < cols.length; i++) {
        th.append('<th>' + cols[i] + '</th>');
    }
    table.append(th);
    console.log(obj.length)
    for (var j = 0; j < obj['Rank'].length; j++) {
        var tr = $('<tr></tr>');
        for (var k = 0; k < cols.length; k++) {
            var columnName = cols[k];
            tr.append('<td>' + obj[columnName][j] + '</td>');
        }
        table.append(tr);
    }
    return table;
}


/**
 * Populate and array with the columns, used to generate the <hr>'s
 * @return an array of the keys in a json object
 */
function GetColumns(table) {
    var columns = new Array();
    for (var column in table) {
        columns.push(column);
    }
    return columns;
}

/**
 * Toggles the hidden status of the line slides
 */
function changeLineSlide(active) {
    $(".line-slide").addClass("hidden");
    var selector = "#" + active;
    $(selector).removeClass("hidden");
}