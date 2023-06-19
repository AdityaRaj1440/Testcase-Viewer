import axios from "axios"
import {useState, useEffect} from 'react'

import UpdateForm from "./UpdateForm"

const FetchTable = () => {
    const [testcaseData, setTestcaseData]= useState([])
    const [updateRow, setUpdateRow]= useState([])

    useEffect(() => {
        axios.get('http://localhost:3003/').then(response => {
          console.log(response.data,testcaseData)
          console.log("response: ",response.data)
          if(testcaseData!==response.data){
            setTestcaseData(response.data)
          }
        })
    }, [])

    const tData= () => {
    return (
            testcaseData.map((row)=> {
                return (
                    <tr>
                        {row.map((cols, index)=> {
                            if(index==0) {
                                return (
                                    <td scope='row'>
                                        <div class='test-id'>
                                            TestId:&nbsp;&nbsp;{cols}
                                        </div>
                                        <div class= 'test-name'>
                                            {row[1]}
                                        </div>
                                        <div class= 'update-time'>
                                            Last Updated:&nbsp;&nbsp; {row[row.length-1]}
                                        </div>
                                    </td> )} 
                            else if(index>1 && index<=row.length-2)
                                return <td>{cols}</td>
                        })} 
                        <td><button data-bs-toggle="collapse" data-bs-target="#collapseUpdate" aria-expanded="false" aria-controls="collapseUpdate" onClick={(e)=> {setUpdateRow(row)}}>EDIT</button></td>
                    </tr> )
            }))}
    return (
            <>
            {updateRow.length>0?<UpdateForm updateRow={updateRow}/>:<></>}
            <table class="table testcases">
                <thead>
                    <tr>
                        <th scope="col">Test Case Name</th>
                        <th scope="col">Estimate Time</th>
                        <th scope="col">Module</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Status</th>
                        <th scope="col">Update</th>
                    </tr>
                </thead>
                <tbody>
                    {testcaseData.length==0?null:tData()}
                </tbody>
            </table>
            </>
    )
}

export default FetchTable