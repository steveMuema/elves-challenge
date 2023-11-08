const fs = require('fs');

//To efficiently sort the food calories brought by each elf
function mergeSort(listOfCalories) {
  //check if the input is empty
  if (listOfCalories.length <= 1) {
    return listOfCalories;
  }
  // initialize the merge sort algorithm
  const middle = Math.floor(listOfCalories.length / 2);
  const left = listOfCalories.slice(0, middle);
  const right = listOfCalories.slice(middle);

  return merge(
    mergeSort(left),
    mergeSort(right)
  );
}
  
  // define the merge function
  function merge(left, right) {
    let result = [];
    let i = 0;
    let j = 0;
  
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
  
    return result.concat(left.slice(i)).concat(right.slice(j));
  }
  
//read input from the food calories file
fs.readFile('food_calories.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
  
    const lines = data.split(/\n\s*\n/);
    const sortedValues = mergeSort(lines.map(line => line.trim()));
  
    let maxSums = Array(3).fill(-Infinity);
    let maxIndices = Array(3).fill(undefined);
  
    sortedValues.forEach((value, index) => {
      const valueSum = value.split('\n').reduce((acc, curr) => acc + parseInt(curr), 0);
  
      if (valueSum > maxSums[0]) {
        maxSums[2] = maxSums[1];
        maxIndices[2] = maxIndices[1];
        maxSums[1] = maxSums[0];
        maxIndices[1] = maxIndices[0];
        maxSums[0] = valueSum;
        maxIndices[0] = index + 1;
      } else if (valueSum > maxSums[1]) {
        maxSums[2] = maxSums[1];
        maxIndices[2] = maxIndices[1];
        maxSums[1] = valueSum;
        maxIndices[1] = index + 1;
      } else if (valueSum > maxSums[2]) {
        maxSums[2] = valueSum;
        maxIndices[2] = index + 1;
      }
    });
    const totalSum = maxSums.reduce((acc, curr) => acc + curr, 0);
    console.log(`Total sum of the calories by the top three elves is: ${totalSum}`);
  });