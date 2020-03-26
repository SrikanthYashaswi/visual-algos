export const toNumList = (strList) => {
    let array = [];
    strList.map(num => {
        if(num.trim() !== ""){
            array.push( parseInt(num));
        }
    })
    return array;
}