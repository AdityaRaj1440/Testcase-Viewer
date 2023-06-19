import axios from "axios"
import { useEffect, useState } from "react"

const UpdateForm = ({updateRow}) => {

    console.log("Mic Testing",updateRow)
    console.log("empty or not:",updateRow.length)

    const [testcase_name,setTestCaseName]= useState()
    const [estimated_time,setEstimatedTime]= useState(updateRow[2])
    const [module,setModule]= useState(updateRow[3])
    const [priority,setPriority]= useState(updateRow[4])
    const [status,setStatus]= useState(updateRow[5])

    useEffect(() => {
        const element=document.getElementById("anchor-name")
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
      
    const handlePatch= () => {
        const patchBody= {
            "test_id": updateRow[0],
            "modify_data": "testcase_name= '"+testcase_name+  "', estimated_time="+estimated_time+ ", module= '" +module+ "', priority= '"+ priority+  "',status= '"+ status+"'"
        }
        console.log("patchBody",patchBody)
        axios.patch("http://localhost:3003/update-test", patchBody).then((response)=> {
            window.location.reload()
        })
    }

    const handleDelete= () => {
        const test_id= updateRow[0]
        axios.delete("http://localhost:3003/delete-test/"+test_id).then((response)=> {
        window.location.reload()
        })
    }
    
    if(updateRow.length==0)
        return <></>

    return (
        <form class="card card-body addForm" id= "collapseUpdate">
            <center>
                <h1 id="anchor-name">Modify Testcase</h1>
                <table class="table testcases">
                    <thead>
                        <tr>
                            <th scope="col">Test Case Name</th>
                            <th scope="col">Estimate Time (in minutes)</th>
                            <th scope="col">Module</th>
                            <th scope="col">Priority</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td scope='row'>
                                <div class='test-id'>
                                    TestId:&nbsp;&nbsp;{updateRow[0]}
                                </div>
                                <div class= 'test-name'>
                                    <input type='text' name="testCaseName" placeholder={updateRow[1]} onChange={(e) => setTestCaseName(e.target.value)}/>
                                </div>
                                <div class= 'update-time'>
                                    Last Updated:&nbsp;&nbsp; {updateRow[updateRow.length-1]}
                                </div>
                            </td>
                            <td><input type='text' placeholder={updateRow[2]} onChange={(e) => setEstimatedTime(e.target.value)}/></td>
                            <td><input type='text' placeholder={updateRow[3]} onChange={(e) => setModule(e.target.value)}/></td>
                            <td>
                                <div class="dropdown">
                                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {priority}
                                    </a>
                                    <ul class="dropdown-menu status">
                                        <li class="dropdown-item" onClick={(e) => setPriority("Low")}>Low</li>
                                        <li class="dropdown-item" onClick={(e) => setPriority("Medium")}>Medium</li>
                                        <li class="dropdown-item" onClick={(e) => setPriority("High")}>High</li>
                                    </ul>
                                </div>
                            </td>
                            <td>
                                <div class="dropdown">
                                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {status}
                                    </a>
                                    <ul class="dropdown-menu status">
                                        <li class="dropdown-item" onClick={(e) => setStatus("Pass")}>Pass</li>
                                        <li class="dropdown-item" onClick={(e) => setStatus("Fail")}>Fail</li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="button" value="Update" onClick={handlePatch}/>
                <input type="button" value="Delete" onClick={handleDelete} />
                <input type="button" value="Cancel" onClick={()=> {window.location.reload()}}/>
            </center>
        </form>
    )
}

export default UpdateForm