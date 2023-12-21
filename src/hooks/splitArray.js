function splitArray(array) {
  // khởi tạo ba array con rỗng
  let subarray1 = [];
  let subarray2 = [];
  let subarray3 = [];
  // tính độ dài lý tưởng của mỗi array con
  let ideal_length = Math.floor(array.length / 3);
  // lặp qua các phần tử của array và thêm vào array con
  for (let i = 0; i < array.length; i++) {
    let element = array[i];
    // nếu array con đầu tiên chưa đầy, thêm vào đó
    if (subarray1.length <= ideal_length) {
      subarray1.push(element);
    }
    // nếu không thì nếu array con thứ hai chưa đầy, thêm vào đó
    else if (subarray2.length <= ideal_length) {
      subarray2.push(element);
    }
    // nếu không thì thêm vào array con thứ ba
    else {
      subarray3.push(element);
    }
  }
  // trả về ba array con dưới dạng một list
  return {subarray1, subarray2, subarray3};
}

export default splitArray

