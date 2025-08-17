export default function checkControlNum(arr) {
  const controlNum = arr.pop();

  const dubledNumbers = [];
  for (let i = arr.length - 1; i >= 0; i -= 2) {
    dubledNumbers.push(arr[i] * 2);
    arr[i] = 0;
  }
  const result = [];

  for (let i = 0; i < dubledNumbers.length; i++) {
    if (dubledNumbers[i] >= 10) {
      const splitedNumbers = dubledNumbers[i].toString().split("").map(Number);
      result.push(...splitedNumbers);
    } else {
      result.push(dubledNumbers[i]);
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      result.push(arr[i]);
    }
  }
  const sum = result.reduce((acc, item) => acc + item);
  const checkDigit = 10 - (sum % 10);

  return checkDigit === controlNum;
}
