import React from 'react';

class LinksSearch extends React.Component{
    state= {
        searchValue: '',
    }

    handleChange = (e) => {
        this.setState({ searchValue: e.target.value });
    }

    formSubmit = (e) => {
        const {searchValue} = this.state;
        e.preventDefault();
        this.props.handleFormSubmit(searchValue);
    }

    render() {
        const { searchValue } = this.state;

        return(
            <div className="search-bar ui segment">
                <form onSubmit={this.formSubmit} className="ui form">
                    <div className="field">
                        <label htmlFor="video-search">Video Search</label>
                        <input
                            onChange={this.handleChange}
                            name="video-search"
                            type="text"
                            value={searchValue}
                            />
                    </div>
                </form>
            </div>
        )
    }
}

export default LinksSearch;
