export const splitWithDotEachThreeCharacters = (givenNumber, useDecimal) => {
    const number = givenNumber || 0

    let numberString = number.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1x").replace(".", ",").replace(/x/g, ".")

    if(!useDecimal) {
        numberString = numberString.substring(0, numberString.length - 3)
    }

    return numberString
}