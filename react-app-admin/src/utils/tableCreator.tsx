import React from "react";

const createTableHead = (arr : Array<string>) => {
    return (
        <thead>
            <tr>
                {arr.map(el => <th scope='col'>{el}</th>)}
            </tr>
        </thead>
    );
}

const createRow = (index: number, data: Array<string>) => {
    return (
        <tr>
            <th>{index}</th>
            {data.map(el => <td>{el}</td>)}
        </tr>
    );
}

const createTable = (dataArr: Array<any>) => {
    return (
        <table className="table table-striped table-sm">
        {createTableHead(['#'].concat(Object.keys(dataArr[0])))}
        <tbody>
        {dataArr.map((el,index) => createRow(index+1,Object.values(el)))}
        </tbody>
    </table>
    );
}
export {  createTable };

