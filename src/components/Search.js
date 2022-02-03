import react, { Component } from "react";

class Search extends Component {
  
    constructor(props){
        super(props);
        this.state = {value: '', loading: false}

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.fetchApi();
        event.preventDefault();
    }

    
    async fetchApi() {
        this.setState({value: this.state.value, loading:true});
        await fetch("http://localhost:4000/cities")
            .then(res => res.json())
            .then((result) => this.props.setSearchResult(result));
        this.setState({value: '', loading: false});
        this.props.setSelectedCity(null);
    }
    
  
    render() {
    return (
        <form id="searchForm" onSubmit={this.handleSubmit}>
          <label htmlFor="header-search">
            <span className="visually-hidden">Chercher les topics : </span>
          </label>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            id="searchTerm"
            placeholder="Ex: Covid, Sport ... "
          />
          <button id="searchButton" type="submit">Chercher</button>
          {this.state.loading ? <div class="loaderSearch"/> : <div class="blankLoader"/>}
        </form>
      );
  }
}

export default Search;
