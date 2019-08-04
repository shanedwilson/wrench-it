import React from 'react';
import SearchField from 'react-search-field';

class LinksSearch extends React.Component{
    state= {
        searchValue: '',
    }

    handleChange = (value) => {
        this.setState({ searchValue: value });
    }

    formSubmit = (e) => {
        const {searchValue} = this.state;
        this.props.handleFormSubmit(searchValue);
        this.setState({ searchValue: "" })
    }

    render() {
        const { searchValue } = this.state;

        return(
            <div className="search-bar text-center">
                <SearchField
                placeholder="Search YouTube For DIY Videos"
                onChange={ this.handleChange }
                searchText=""
                classNames="test-class w-50"
                onEnter={this.formSubmit}
                value={searchValue}
                />
            </div>
        )
    }
}

export default LinksSearch;
