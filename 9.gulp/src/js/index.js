function test() {
    if (true) {
        var x = 0;
    }

    x += 1; // Default: 'x' used out of scope.
    console.log(x);
    // No warning when funcscope:true
}
test();