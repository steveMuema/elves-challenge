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

  //split the calories based on the newline and call the merge sort algorithm
  const lines = data.split(/\n\s*\n/);
  const sortByElf = mergeSort(lines.map(line => line.trim()));
  let totalFoodCalories = -Infinity;
  let indexByElf;
  sortByElf.forEach((value, index) => {
    const valueSum = value.split('\n').reduce((acc, curr) => acc + parseInt(curr), 0);

    if (valueSum > totalFoodCalories) {
      totalFoodCalories = valueSum;
      indexByElf = index + 1;
    }
  });

  console.log(`Maximum number of food by calories is ${totalFoodCalories} from elf ${indexByElf}`);
});