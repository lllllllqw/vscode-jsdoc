const foo = [];

// Arrow function
const bar = (baz: string) => {
  return baz;
};

// Function Declare
function func (arg1: number) {

  // Inner function
  function innerFunc (arg2: number) {
    return arg1 + arg2;
  }
}

// Anonymous function
var anonymousFnc = function () {
  return '';
};

class MyClass {
  // Member function
  public myFunc (arg1: number) {
    return arg1;
  }

  // Member function with arrow function
  public myFunc2 = (arg1: number) => {
    return arg1;
  };
}

