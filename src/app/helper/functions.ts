/**
 * Search in a nested Array for a specific item
 * @param {Array} arr array containing the items.
 * @param {string} searchString string that should be searched for.
 */
export function findNestedArrayItemIndex(
  arr: Array<Array<string>>,
  searchString: string
): { column: number; row: number } | undefined {
  for (let i = 0; i < arr.length; i++) {
    for (let y = 0; y < arr[i].length; y++) {

      if (arr[i][y] === searchString) {
        return { row: i, column: y };
      }
    }
  }
  return undefined;
}

/**
 * Shuffles array in place.
 * @param {Array} a array containing the items.
 */
export function shuffle(a: Array<any>) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    // swap id's (position)
    x.id = j;
    a[j].id = i;
    // swap positions
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
