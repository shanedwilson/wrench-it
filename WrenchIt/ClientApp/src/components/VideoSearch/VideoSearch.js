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
    }

    render() {
        const { searchValue } = this.state;

        return(
            <div className="search-bar ui segment">
                <SearchField
                placeholder="Search YouTube For DIY Videos"
                onChange={ this.handleChange }
                searchText=""
                classNames="test-class w-50"
                onEnter={this.formSubmit}
                value={searchValue}
                />
                {/* <form onSubmit={this.formSubmit} className="ui form">
                    <div className="field">
                        <label htmlFor="video-search">Video Search</label>
                        <input
                            onChange={this.handleChange}
                            name="video-search"
                            type="text"
                            value={searchValue}
                            />
                    </div>
                </form> */}
            </div>
        )
    }
}

export default LinksSearch;
