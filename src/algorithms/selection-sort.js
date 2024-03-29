import { swap } from "./helpers";
const SelectionSort = (array, position, steps, colors) => {

    let colorKey = colors[colors.length - 1].slice();

    for (let i = 0; i < array.length; i++) {
        let min = i
		for (let j = i+1; j < array.length; j++) {
            

            if (array[j] < array[min]) {
                min = j
            }
            steps.push(array.slice());

            colorKey[j] = 1;
            colorKey[i] = 1;
            colors.push(colorKey.slice());
            colorKey[j] = 0;
            colorKey[i] = 0;

            // colorKey[min] = 1;
            // colors.push(colorKey.slice());
            // colorKey[min] = 0;
            
        }
            // if (min !== i) {
        array = swap (array, i, min)
        colorKey[i] = 2;
        steps.push(array.slice());
        colors.push(colorKey.slice());
    // }
	}
    colors[colors.length - 1] = new Array(array.length).fill(2);
    // return;
};


export default SelectionSort;
