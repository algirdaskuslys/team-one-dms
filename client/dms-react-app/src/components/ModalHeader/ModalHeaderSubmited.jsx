import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../ModalHeader/ModalHeader.css'

class ModalHeader extends Component {
    render() {
        return (
            <div>
                <h4>Dokumento peržiūra</h4>
            <span className="modalBtn">
                <Button variant="danger" type="submit" onClick={this.props.modalIsOpen}>
                     X
                </Button>
            </span>    
            </div>
        );
    }
}

export default withRouter(ModalHeader);