import React, { Component } from 'react';
import NewDocHeader from '../components/NewDocHeader/NewDocHeader';
import Footer from '../components/Footer/Footer';

import NewDocumentJSX from '../components/NewDocForm/NewDocumentJSX';

class NewDocument extends Component {


    render() {
        return (
            <div>
                <NewDocHeader/>
                <NewDocumentJSX/>
                <Footer/>
            </div>
        );
    }
}

export default NewDocument;