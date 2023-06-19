import FetchTable from "./components/FetchTable"
import SearchBar from "./components/SearchBar"
import Filter from "./components/Filter"
import AddTests from "./components/AddTests"
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
      <AddTests />
      </form>
    </div>
</nav>

        <AddForm />
        <FetchTable />
      </center>
    </>
  )
}

export default App