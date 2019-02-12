import React, { Component } from 'react';
import UserNavbar from '../components/UserNavbar';
import Footer from '../components/Footer';
import NewDocButton from '../components/NewDocButton';
import GroupView from '../components/GroupView';
import Pagening from '../components/Pagening';

class UserBoard extends Component {
    render() {
        return (
            <div className="UserBoard">
                <UserNavbar/>
                <NewDocButton/>
                <GroupView/>
                <Pagening/>
                <Footer/> 
            </div>
        );
    }
}

export default UserBoard;