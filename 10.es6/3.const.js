//常量一旦定义之后引用地址不能再修改
//const MY_NAME = 'zfpx';
//MY_NAME = 'zfpx2';

//虽然引用地址不能再修改了，但它的值是可以值改的
const STUDENTS = ['张三','李四'];
STUDENTS.push('王五');
STUDENTS.pop();
console.log(STUDENTS);

{
    const STUDENTS = ['王五'];
}
{
    const STUDENTS = ['赵六'];
}
console.log(STUDENTS);