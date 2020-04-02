export const toNumList = (strList) => {
    return strList.map(num => {
        if (num.trim() !== "") {
            return parseInt(num);
        }
    })
}