export const shellSort=(list)=>{
    let changes=[];
    changes.push({ list: [...list], indexChanges: [0, 0] });
    let gap=Math.floor(list.length/2);
    for(let i=gap;i>0;i=Math.floor(i/2)){
        for(let j=i;j<list.length;j++){
            let temp=list[j];
            let k;
            for(k=j;k>=i && list[k-i]>temp;k=k-i){
                list[k]=list[k-i];
            }
            list[k]=temp;
            changes.push({ list: [...list], indexChanges: [i, k] });
        }
    }
    return changes;
}
