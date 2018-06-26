/**
* << Spoiler Alert >>
* Dummy breadcrumb that doesn't navigate to anywhare
*/

import React, { Component } from 'react';

import './../css/Breadcrumb.css';

class Breadcrumb extends Component {
    render() {
        return (
            <div>
                <ul id="breadcrumb">
                    {this.props.list.map(site => {
                        return(
                            <li key={site.name} className={site.actual ? 'navigation-actual' : ''}>
                                <p>{site.name}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        )
    }
}

export default Breadcrumb;
