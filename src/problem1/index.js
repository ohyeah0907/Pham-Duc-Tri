var sum_to_n_a = function(n) {
    // your code here
    const result = Array.from({length: n}, (_, i) => i + 1).reduce((acc, cur) => acc + cur, 0);

    return result;
};

var sum_to_n_b = function(n) {
    // your code here
    let result = 0;
    for (let i = 1; i <= n; i++) {
        result += i;
    }

    return result;
};

var sum_to_n_c = function(n) {
    // your code here
    // Gauss formula
    return n * (n + 1) / 2;
};