const fs = require('fs');		
const command = process.argv[2]; 

//Utilities to calcualte min max and average values
function getMinValue(arr) {
	return Math.min.apply({}, arr);
}
function getMaxValue(arr) {
	return Math.max.apply({}, arr);
}
function getAverageValue(arr) {
	const sum = arr.reduce((a, b) => parseInt(a)+parseInt(b), 0);
	return sum/arr.length;
}


if (command === 'record') { // it will record the numeric values to file
	const fileName = process.argv[3];
	if (/.?(\.txt)$/.test(fileName)) {
		fs.appendFile(fileName, process.argv.slice(4).join(',') + ',', function (err) {
			if (err) {
				console.log('Something went wrong');
			}
		})
	} else {
		console.log('Invalid file name provided');
	}
} else if (command === 'summary') { // it will summarize the values and display min and max values 
	const fileName = process.argv[3];
	fs.readFile(fileName, 'utf8', function(err, data) {
		if (err) {
			console.log('Something went wrong');
		} else {
			let dataArr = data.split(',');
			dataArr.splice(dataArr.length-1, 1);
			console.log(`#of Entries\t${dataArr.length}\nMin.value\t${getMinValue(dataArr)}\nMax.value\t${getMaxValue(dataArr)}\nAvg.value\t${getAverageValue(dataArr)}`);
		}
	})
} else if (command === 'help') { // it will display the help message in the console
	console.log('Help message printed');
} else {
	console.log('Unknown command, please run help command for all details');
}
