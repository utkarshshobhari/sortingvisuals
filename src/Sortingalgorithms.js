/**
 * Sorting Algorithm Implementations for Sorting Visualizer
 *
 * Provides animation-event-based sorting algorithms that can be visualized
 * in the Sortingvisuals React component. Each algorithm produces a sequence
 * of animation events that describe comparisons, swaps, writes, and other
 * operations needed for visualization.
 *
 * Animation event format: [operationType, ...details]
 * - operationType: 0=comparison, 1=swap, 2=write, 3=highlight, 4=merge, 5=placement
 * - Details vary by operation type
 *
 * All algorithms operate on arrays and produce animations arrays.
 * The calling component renders based on these animation steps.
 */

/**
 * Get merge sort animations.
 * Returns array of animation steps describing the merge sort process.
 * Each step is [i, j] for comparison/highlight or [k, value] for write/height update.
 *
 * @param {number[]} array - The array to sort
 * @returns {number[][]} Animation steps sequence
 */
export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

/**
 * Helper function for recursive merge sort split + merge.
 *
 * @param {number[]} mainArray - The main array being sorted
 * @param {number} startIdx - Starting index
 * @param {number} endIdx - Ending index
 * @param {number[]} auxiliaryArray - Copy used for merging
 * @param {number[]} animations - Animation steps accumulator
 */
function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

/**
 * Merge two sorted subarrays [startIdx..middleIdx] and [middleIdx+1..endIdx].
 * Produces animation events for comparisons, swaps/writes, and merges.
 *
 * The duplicate [i, j] pushes from the original implementation have been removed.
 * Instead, we generate meaningful events:
 * - [i, j] for comparison events
 * - [k, auxiliaryArray[i]] or [k, auxiliaryArray[j]] for write events
 * - Merge boundary events
 *
 * @param {number[]} mainArray - The main array being sorted (updated in place)
 * @param {number} startIdx - Start of left subarray
 * @param {number} middleIdx - End of left subarray / start of right subarray - 1
 * @param {number} endIdx - End of right subarray
 * @param {number[]} auxiliaryArray - Copy used for merging
 * @param {number[]} animations - Animation steps accumulator
 */
function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;

  while (i <= middleIdx && j <= endIdx) {
    // Comparison event: comparing auxiliaryArray[i] and auxiliaryArray[j]
    animations.push([0, i, j]); // 0 = comparison, i and j are indices

    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // Write event: place auxiliaryArray[i] at position k
      animations.push([2, k, auxiliaryArray[i]]); // 2 = write, k is target index, value is new height
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // Write event: place auxiliaryArray[j] at position k
      animations.push([2, k, auxiliaryArray[j]]); // 2 = write, k is target index, value is new height
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  // Copy remaining elements from left subarray
  while (i <= middleIdx) {
    animations.push([0, i, i]); // Comparison of i with itself (still a comparison event)
    animations.push([2, k, auxiliaryArray[i]]); // Write event
    mainArray[k++] = auxiliaryArray[i++];
  }

  // Copy remaining elements from right subarray
  while (j <= endIdx) {
    animations.push([0, j, j]); // Comparison of j with itself
    animations.push([2, k, auxiliaryArray[j]]); // Write event
    mainArray[k++] = auxiliaryArray[j++];
  }
}

/**
 * Get quick sort animations.
 * Returns array of animation steps describing the quick sort process.
 * Uses last-element pivot partitioning.
 *
 * @param {number[]} array - The array to sort
 * @returns {number[][]} Animation steps sequence
 */
export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

/**
 * Recursive quick sort helper.
 *
 * @param {number[]} array - The array to sort
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @param {number[]} animations - Animation steps accumulator
 */
function quickSortHelper(array, low, high, animations) {
  if (low < high) {
    const pivotIndex = partition(array, low, high, animations);
    quickSortHelper(array, low, pivotIndex - 1, animations);
    quickSortHelper(array, pivotIndex + 1, high, animations);
  }
}

/**
 * Partition function for quick sort.
 * Uses last element as pivot.
 *
 * @param {number[]} array - The array to partition
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @param {number[]} animations - Animation steps accumulator
 * @returns {number} Pivot final position
 */
function partition(array, low, high, animations) {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    // Comparison event: comparing array[j] with pivot
    animations.push([0, j, high]); // 0 = comparison, j vs pivot index

    if (array[j] <= pivot) {
      i++;
      // Swap event: swap array[i] and array[j]
      animations.push([1, i, j]); // 1 = swap, i and j indices
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Place pivot in correct position
  animations.push([1, i + 1, high]); // 1 = swap, place pivot
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  return i + 1;
}

/**
 * Get heap sort animations.
 * Returns array of animation steps describing the heap sort process.
 * Builds a max heap and repeatedly extracts the maximum.
 *
 * @param {number[]} array - The array to sort
 * @returns {number[][]} Animation steps sequence
 */
export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;

  // Build max heap
  buildHeap(array, animations);

  // Extract elements one by one
  for (let i = array.length - 1; i > 0; i--) {
    // Swap root (max) with last element
    animations.push([1, 0, i]); // 1 = swap, swap root with element at i
    [array[0], array[i]] = [array[i], array[0]];

    // Heapify the reduced heap
    heapify(array, 0, i, animations);
  }

  return animations;
}

/**
 * Build a max heap from the array.
 *
 * @param {number[]} array - The array to build heap from
 * @param {number[]} animations - Animation steps accumulator
 */
function buildHeap(array, animations) {
  const n = array.length;
  // Start from last parent node and heapify each going up
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, i, n, animations);
  }
}

/**
 * Heapify a subtree rooted at index i.
 *
 * @param {number[]} array - The array containing the heap
 * @param {number} i - Index of root of subtree
 * @param {number} n - Size of the heap
 * @param {number[]} animations - Animation steps accumulator
 */
function heapify(array, i, n, animations) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // Compare with left child
  if (left < n) {
    animations.push([0, left, largest]); // 0 = comparison
    if (array[left] > array[largest]) {
      largest = left;
    }
  }

  // Compare with right child
  if (right < n) {
    animations.push([0, right, largest]); // 0 = comparison
    if (array[right] > array[largest]) {
      largest = right;
    }
  }

  // If largest is not root, swap and continue heapifying
  if (largest !== i) {
    animations.push([1, i, largest]); // 1 = swap
    [array[i], array[largest]] = [array[largest], array[i]];
    heapify(array, largest, n, animations);
  }
}

/**
 * Get bubble sort animations.
 * Returns array of animation steps describing the bubble sort process.
 * Repeatedly steps through the list, swaps adjacent elements if out of order.
 *
 * @param {number[]} array - The array to sort
 * @returns {number[][]} Animation steps sequence
 */
export function getBubbleSortAnimations(array) {
  const animations = [];
  const n = array.length;

  for (let i = 0; i < n; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      // Comparison event: comparing adjacent elements array[j] and array[j+1]
      animations.push([0, j, j + 1]); // 0 = comparison

      if (array[j] > array[j + 1]) {
        // Swap event: swap adjacent elements
        animations.push([1, j, j + 1]); // 1 = swap
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
      }
    }

    // If no two elements were swapped by inner loop, then break
    if (!swapped) break;
  }

  return animations;
}

/**
 * Get selection sort animations.
 * Returns array of animation steps describing the selection sort process.
 * Selects the minimum element from unsorted portion and swaps it with the first unsorted element.
 *
 * @param {number[]} array - The array to sort
 * @returns {number[][]} Animation steps sequence
 */
export function getSelectionSortAnimations(array) {
  const animations = [];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // Find minimum element in unsorted portion
    for (let j = i + 1; j < n; j++) {
      // Comparison event: comparing array[j] with array[minIdx]
      animations.push([0, j, minIdx]); // 0 = comparison

      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }

    // Swap found minimum with first unsorted element
    if (minIdx !== i) {
      animations.push([1, i, minIdx]); // 1 = swap
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
    }
  }

  return animations;
}

/**
 * Get insertion sort animations.
 * Returns array of animation steps describing the insertion sort process.
 * Builds the final sorted array one item at a time by shifting larger elements.
 *
 * @param {number[]} array - The array to sort
 * @returns {number[][]} Animation steps sequence
 */
export function getInsertionSortAnimations(array) {
  const animations = [];
  const n = array.length;

  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;

    // Move elements of array[0..i-1] that are greater than key to one position ahead
    while (j >= 0 && array[j] > key) {
      // Comparison event: comparing array[j] with key
      animations.push([0, j, i]); // 0 = comparison, j vs current position

      // Shift element right: write animation for position j+1
      animations.push([2, j + 1, array[j]]); // 2 = write, shift array[j] to j+1
      array[j + 1] = array[j];
      j--;
    }

    // Place key in its correct position
    animations.push([2, j + 1, key]); // 2 = write, place key
    array[j + 1] = key;
  }

  return animations;
}

/**
 * Get shell sort animations.
 * Returns array of animation steps describing the shell sort process.
 * Generalization of insertion sort that allows exchange of elements far apart.
 *
 * @param {number[]} array - The array to sort
 * @returns {number[][]} Animation steps sequence
 */
export function getShellSortAnimations(array) {
  const animations = [];
  const n = array.length;

  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Do a gapped insertion sort for this gap size.
    // The first gap elements at gap gap and so on remain at their first gap position
    for (let i = gap; i < n; i += 1) {
      // Add current element to the array elements at gap position
      // Save array[i] in a temporary variable and save position to check against
      let temp = array[i];
      let j;

      for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
        // Comparison event: comparing array[j - gap] with temp
        animations.push([0, j - gap, i]); // 0 = comparison

        // Shift array[j-gap] to position j
        animations.push([2, j, array[j - gap]]); // 2 = write, shift element
        array[j] = array[j - gap];
      }

      // Put temp (the original array[i]) in its correct location
      animations.push([2, j, temp]); // 2 = write, place temp
      array[j] = temp;
    }
  }

  return animations;
}

/**
 * Get counting sort animations.
 * Returns array of animation steps describing the counting sort process.
 * Non-comparison sort that works by counting occurrences of each value.
 *
 * @param {number[]} array - The array to sort (must contain non-negative integers)
 * @param {number} [maxValue] - Maximum value in the array (auto-detected if not provided)
 * @returns {number[][]} Animation steps sequence
 */
export function getCountingSortAnimations(array, maxValue) {
  const animations = [];

  if (array.length === 0) return animations;

  // Determine max value if not provided
  let max = maxValue;
  if (max === undefined || max === null) {
    max = Math.max(...array);
  }

  // If max is negative or very small, fall back to comparison-based sort
  if (max < 0) {
    // Fall back to insertion sort for negative values
    return getInsertionSortAnimations(array.slice());
  }

  // Count occurrences of each value
  const count = new Array(max + 1).fill(0);

  // Store count of each element
  for (let i = 0; i < array.length; i++) {
    animations.push([0, array[i], i]); // 0 = comparison/recording event
    count[array[i]]++;
  }

  // Change count[i] so that count[i] now contains actual position of this element in output array
  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }

  // Build output array (in reverse to maintain stability)
  const output = new Array(array.length);

  for (let i = array.length - 1; i >= 0; i--) {
    animations.push([3, count[array[i]] - 1, array[i]]); // 3 = highlight/placement event
    output[count[array[i]] - 1] = array[i];
    count[array[i]]--;
  }

  // Copy output back to original array
  for (let i = 0; i < array.length; i++) {
    animations.push([2, i, output[i]]); // 2 = write, copy output back
    array[i] = output[i];
  }

  return animations;
}

/**
 * Get radix sort animations.
 * Returns array of animation steps describing the radix sort process.
 * Non-comparison sort that processes integer digits from least significant to most significant.
 *
 * @param {number[]} array - The array to sort (non-negative integers)
 * @returns {number[][]} Animation steps sequence
 */
export function getRadixSortAnimations(array) {
  const animations = [];

  if (array.length === 0) return animations;

  // Check for negative numbers - radix sort typically works with non-negative integers
  const hasNegative = array.some(num => num < 0);
  if (hasNegative) {
    // Fall back to radix sort on absolute values or use merge sort
    return getMergeSortAnimations(array.slice());
  }

  // Find the maximum number to know number of digits
  let max = Math.max(...array);

  // Do counting sort for every digit position
  // exponential = 10^i where i is current digit position
  let exp = 1;

  while (Math.floor(max / exp) > 0) {
    // Perform counting sort for this digit position
    radixCountingSort(array, animations, exp);
    exp *= 10;
  }

  return animations;
}

/**
 * Radix sort counting sort for a specific digit position.
 *
 * @param {number[]} array - The array to sort
 * @param {number[]} animations - Animation steps accumulator
 * @param {number} exp - Exponent representing current digit position (1, 10, 100, ...)
 */
function radixCountingSort(array, animations, exp) {
  const n = array.length;
  const output = new Array(n);
  const count = new Array(10).fill(0); // 10 possible digits (0-9)

  // Store count of occurrences of each digit
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(array[i] / exp) % 10;
    animations.push([0, i, digit]); // 0 = comparison/recording digit
    count[digit]++;
  }

  // Change count[i] so that count[i] now contains actual position of this digit in output array
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Build the output array (in reverse for stability)
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(array[i] / exp) % 10;
    animations.push([3, count[digit] - 1, digit]); // 3 = highlight/placement
    output[count[digit] - 1] = array[i];
    count[digit]--;
  }

  // Copy back to original array
  for (let i = 0; i < n; i++) {
    animations.push([2, i, output[i]]); // 2 = write
    array[i] = output[i];
  }
}

/**
 * Get cocktail shaker sort animations.
 * Returns array of animation steps describing the cocktail shaker sort process.
 * A bidirectional bubble sort that traverses the list in both directions.
 *
 * @param {number[]} array - The array to sort
 * @returns {number[][]} Animation steps sequence
 */
export function getCocktailShakerSortAnimations(array) {
  const animations = [];
  const n = array.length;

  let swapped = true;
  let start = 0;
  let end = n - 1;

  while (swapped) {
    // Reset the swapped flag for the next pass
    swapped = false;

    // Traverse from left to right (like a bubble sort)
    for (let i = start; i < end; i++) {
      // Comparison event: comparing array[i] and array[i+1]
      animations.push([0, i, i + 1]); // 0 = comparison

      if (array[i] > array[i + 1]) {
        // Swap event: swap adjacent elements
        animations.push([1, i, i + 1]); // 1 = swap
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
      }
    }

    // If no elements were swapped, then array is sorted
    if (!swapped) break;

    swapped = false;
    end--;

    // Traverse from right to left
    for (let i = end - 1; i >= start; i--) {
      // Comparison event: comparing array[i] and array[i+1]
      animations.push([0, i, i + 1]); // 0 = comparison

      if (array[i] > array[i + 1]) {
        // Swap event: swap adjacent elements
        animations.push([1, i, i + 1]); // 1 = swap
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
      }
    }

    start++;
  }

  return animations;
}