import { useState } from "react"
import axios from "axios"

const AddForm = () => {

    const [testcase_name,setTestCaseName]= useState("")
    const [estimated_time,setEstimatedTime]= useState(0)
    const [module,setModule]= useState("")
    const [priority,setPriority]= useState("")
    const [status,setStatus]= useState("")

    const handlePost = () => {
        const requestBody= {
            "testcase_name": testcase_name,
            "estimated_time": estimated_time,
            "module": module,
            "priority": priority,
            "status": status
        }
        axios.post("http://localhost:3003/add-test",requestBody).then((response)=> {console.log(response) 
        window.location.reload()})
    }
    console.log(status)
    return (
        <div class="collapse" id="collapseExample">
  <form class="card card-body addForm">
    <center>
      <h1>Add new TestCase</h1>
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
                      <td><input type='text' placeholder="Name of Testcase" onChange={(e) => setTestCaseName(e.target.value)}/></td>
                      <td><input type='text' placeholder="Estimate Time in minutes" onChange={(e) => setEstimatedTime(e.target.value)}/></td>
                      <td><input type='text' placeholder="Module Name" onChange={(e) => setModule(e.target.value)}/></td>
                      <td><div class="dropdown">
                                                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {priority===""? "Select" : priority}
                                                </a>
                                                <ul class="dropdown-menu status">
                                                    <li>
                                                        <button class="dropdown-item" onClick={(e) => setPriority("Low")}>Low</button>
                                                    </li>
                                                    <li>
                                                        <button class="dropdown-item" onClick={(e) => setPriority("Medium")}>Medium</button>
                                                    </li>
                                                    <li>
                                                        <button class="dropdown-item" onClick={(e) => setPriority("High")}>High</button>
                                                    </li>
                                                </ul>
                                            </div></td>
                      <td><div class="dropdown">
                                                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {status===""? "Select" : status}
                                                </a>
                                                <ul class="dropdown-menu status">
                                                    <li>
                                                        <button class="dropdown-item" onClick={(e) => setStatus("Pass")}>Pass</button>
                                                    </li>
                                                    <li>
                                                        <button class="dropdown-item" onClick={(e) => setStatus("Fail")}>Fail</button>
                                                    </li>
                                                </ul>
                                            </div></td>
                    </tr>
                </tbody>
            </table>
            <input type="submit" onClick={handlePost}/>
            </center>
  </form>
</div>
    )
}

export default AddForm