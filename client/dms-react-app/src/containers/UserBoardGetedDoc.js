import React, { Component } from 'react';
import UserNavbar from '../components/UserNavbar/UserNavbar';
import Footer from '../components/Footer/Footer';
import NewDocButton from '../components/NewDocButton/NewDocButton';
import GroupView from '../components/GroupView/GroupView';


class UserBoardGetedDoc extends Component {
    render() {
        return (
            <div className="UserBoardGetedDoc">
                <UserNavbar/>
                <NewDocButton/>
                <GroupView/>
                <Footer/>
            </div>
        );
    }
}

export default UserBoardGetedDoc;