const SearchBar = () => {
    return (
        <div class='searchBar'>
            <input type='search' class='search' placeholder="Search issue.."></input>
            <button class='searchButton btn btn-outline-secondary'>
                <i class="bi bi-search"></i>
            </button>
        </div>
    )
}

export default SearchBar