import axios from "axios"
import {useState, useEffect} from 'react'

const FetchTable = () => {
    const [testcaseData, setTestcaseData]= useState([])

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
                            else if(index==row.length-2) {
                                return (
                                        <td>
                                            <div class="dropdown">
                                                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Select
                                                </a>
                                                <ul class="dropdown-menu status">
                                                    <li>
                                                        <a class="dropdown-item" href="#">Pass</a>
                                                    </li>
                                                    <li>
                                                        <a class="dropdown-item" href="#">Fail</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>)
                            }
                            else if(index>1 && index<row.length-2)
                                return <td>{cols}</td>
                        })} 
                    </tr> )
            }))}
    return (
            <table class="table testcases">
                <thead>
                    <tr>
                        <th scope="col">Test Case Name</th>
                        <th scope="col">Estimate Time</th>
                        <th scope="col">Module</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tData()}
                </tbody>
            </table>
    )
}

export default FetchTable