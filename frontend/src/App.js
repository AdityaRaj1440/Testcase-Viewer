import FetchTable from "./components/FetchTable"
import SearchBar from "./components/SearchBar"
import Filter from "./components/Filter"
import AddTests from "./components/AddTests"
import UpdateTest from "./components/UpdateTest"
import AddForm from "./components/AddForm"


const App = () => {
  return (
    <>
      <div id='topPane'>
      </div>
      
      <center>
        {/* <AddForm /> */}
        <SearchBar />

      <nav class="navbar navbar-expand-lg nav">
  <div class="container-fluid">
  <Filter />
      <form class="d-flex">
      <AddTests /> <UpdateTest />
      </form>
    </div>
</nav>

{/* <div class="collapse" id="collapseExample">
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
                      <td><input type='text' placeholder="Name of Testcase"/></td>
                      <td><input type='text' placeholder="Estimate Time in minutes"/></td>
                      <td><input type='text' placeholder="Module Name"/></td>
                      <td><div class="dropdown">
                                                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Select
                                                </a>
                                                <ul class="dropdown-menu status">
                                                    <li>
                                                        <a class="dropdown-item" href="#">Low</a>
                                                    </li>
                                                    <li>
                                                        <a class="dropdown-item" href="#">Medium</a>
                                                    </li>
                                                    <li>
                                                        <a class="dropdown-item" href="#">High</a>
                                                    </li>
                                                </ul>
                                            </div></td>
                      <td><div class="dropdown">
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
                                            </div></td>
                    </tr>
                </tbody>
            </table>
            <input type="submit"/>
            </center>
  </form>
</div> */}
        <AddForm />
        <FetchTable />
      </center>
    </>
  )
}

export default App