"use strict"; //ES6 的模块自动采用严格模式，不管你有没有在模块头部加上

let stars = (num) => {
    /**let arrStars = [
        { 'star': '' },
        { 'star': '' },
        { 'star': '' },
        { 'star': '' },
        { 'star': '' }
    ];**/
    let arrStars = [];
    for (let i = 0; i < 5; i++) {
        arrStars.push({ 'star': '' });
    }
    //console.log(this.$data); //return;
    //this.$set(this.$data, 'arrStars', arrStars )
    let max = 10;
    if (num % 2 == 1) {
        //小数分评价-如：0.5、1.5、2.5、3.5、4.5
        let full = (num - 1) / 2;
        let none = (max - num - 1) / 2;
        for (let i = 0; i < full; i++) {
            arrStars[i].star = 'icon-star-full fc-ffc939'; //满星
        }
        for (let i = full + 1; i < max / 2; i++) {
            arrStars[i].star = 'icon-star-none fc-aaa'; //空星(灰)
        }
        arrStars[full].star = 'icon-star-half fc-ffc939'; //半星
    } else {
        //整数分评价-如1、2、3、4、5
        let full = num / 2;
        let none = (max - num) / 2;
        for (let i = 0; i < full; i++) {
            arrStars[i].star = 'icon-star-full fc-ffc939'; //满星
        }
        for (let i = full; i < max / 2; i++) {
            arrStars[i].star = 'icon-star-none fc-aaa'; //空星(灰)
        }
    }
    return arrStars;
}

export default stars;