function find_max(nums) {
    let max_num = Number.NEGATIVE_INFINITY; // smaller than all other numbers
    for (let num of nums) {
        if (num > max_num) {
            num = max_num
        }
    }
    return max_num;
}

const nums = [1, 4, 5, 6]
console.log(find_max(nums))

