// https://codepen.io/billyysea/pen/whjbK

let rawColors = [
    '#00000c 0%,#00000c 100%',
    '#020111 85%,#191621 100%',
    '#020111 60%,#20202c 100%',
    '#020111 10%,#3a3a52 100%',
    '#20202c 0%,#515175 100%',
    '#40405c 0%,#6f71aa 80%,#8a76ab 100%',
    '#4a4969 0%,#7072ab 50%,#cd82a0 100%',
    '#757abf 0%,#8583be 60%,#eab0d1 100%',
    '#82addb 0%,#ebb2b1 100%',
    '#94c5f8 1%,#a6e6ff 70%,#b1b5ea 100%',
    '#b7eaff 0%,#94dfff 100%',
    '#9be2fe 0%,#67d1fb 100%',
    '#90dffe 0%,#38a3d1 100%',
    '#57c1eb 0%,#246fa8 100%',
    '#2d91c2 0%,#1e528e 100%',
    '#2473ab 0%,#1e528e 70%,#5b7983 100%',
    '#1e528e 0%,#265889 50%,#9da671 100%',
    '#1e528e 0%,#728a7c 50%,#e9ce5d 100%',
    '#154277 0%,#576e71 30%,#e1c45e 70%,#b26339 100%',
    '#163C52 0%,#4F4F47 30%,#C5752D 60%,#B7490F 80%, #2F1107 100%',
    '#071B26 0%,#071B26 30%,#8A3B12 80%,#240E03 100%',
    '#010A10 30%,#59230B 80%,#2F1107 100%',
    '#090401 50%,#4B1D06 100%',
    '#00000c 80%,#150800 100%',
    '#00000c 0%,#00000c 100%',
]

// let gradientStep = 0
// let gradientSpeed = 0.002
// let colors = [
// ]

function createGradientArray(rawColors) {
    let gradientArray = []
    rawColors.forEach(color => {
        let gradientSubArray = []
        let gradDivisions = color.split(',');
        gradDivisions.forEach(gradient => {
            console.log(gradient)
            gradient = gradient.replace(/[^0-9a-fA-F ]/gi, '')
            let colorPosition = gradient.split(' ')
            let colorRed = colorPosition[0].slice(0,2)
            let colorGreen = colorPosition[0].slice(2,4)
            let colorBlue = colorPosition[0].slice(4,6)
            let position = colorPosition[1]
            gradientSubArray.push({
                'r' : parseInt('0x'+colorRed),
                'g' : parseInt('0x'+colorGreen),
                'b' : parseInt('0x'+colorBlue),
                'p' : Number(position)
            })
        })
        gradientArray.push(gradientSubArray)
    })
    return gradientArray
}

console.log(createGradientArray(rawColors))

// function animateGradient() {
    
// }

// function makeArr(startValue, stopValue, cardinality) {
//     var arr = [];
//     var step = (stopValue - startValue) / (cardinality - 1);
//     for (var i = 0; i < cardinality; i++) {
//       arr.push(startValue + (step * i));
//     }
//     return arr;
// }