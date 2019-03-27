import React, { Component } from 'react';

import UserSelector from './UsersSelector';
import GroupUserSelector from './GroupUserSelector';



// api - group list
const API_TEST = 'https://reqres.in/api/users?page=2';
const API = 'http://localhost:8086/groups'
// api_add_user adress to add user to group
const API_ADD_USER = 'http://localhost:8086/groups/users';
const API_REMOVE_USER = 'http://localhost:8086/groups/users';
const API_REMOVE_GROUP = 'http://localhost:8086/group';
const DEFAULT_QUERY ='';

export default class GroupManagerData extends Component {
    constructor(props) {
        super(props);

        this.state={
            //value id from option which is user id
            userId: "",
            groupId: "",
            data: [], 
            isLoading: false,
            error: null,
            selectedOption: null,
            optionValue:"",
            show: false,
            isRemove: false,
            togglePermission: false,
        };
    };
    handleInputChange = (newValue) => {
        const optionValue = newValue.replace(/\W/g, '');
        this.setState({optionValue});
        return optionValue;
    };
    handleChange = (event,groupId) =>{
        const data = this.fetchGroups;
        this.setState({
            userId: event.target.value,
            groupId:groupId,
        });
//remove console.log for testing
        console.log('Option selected:',event.target.value,' Group id: ', groupId);
    }

//showing groups table with opions
    componentDidMount() {
        this.setState({ isLoading: true });
//setting auth for testing
        this.fetchGroups();    
    }

    fetchGroups = async () =>{
        console.log('ACTIVE');
        const token = localStorage.getItem('token');
        const res = await fetch(API, {
            method: 'GET',
            headers:{
                    'content-type':'Application/json',
                    'token':token,
            },
            })
            const statusCode = await res.status;
            const json =  await res.json();
            console.log(json);
           this.setState({
                data: json
            })
            this.setState({ isLoading: false });
    }

//options for selector
    

// adding user from selector
    addUsers = async (event) =>{
        event.preventDefault();
        const token = localStorage.getItem('token');
        try{
            const res = await fetch(API_ADD_USER, {
            method: 'PATCH',
            headers: {
                'token':token,
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "userid":this.state.userId,
                "groupid":this.state.groupId,
                "action":'add'
            }),
            })
            const statusCode = await res.status;
            return statusCode;
        }catch(err){console.log(err)};
        await this.fetchGroups();
      }

    removeUsers = async (event) =>{
        event.preventDefault();
        const token = localStorage.getItem('token');
        try{
            const res = await fetch(API_REMOVE_USER, {
            method: 'PATCH',
            headers: {
                'token':token,
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "userid":this.state.userId,
                "groupid":this.state.groupId,
                "action":'remove',
            }),
            })
            const statusCode = await res.status;
            return statusCode;
        }catch(err){console.log(err)};
      }

    removeGroup = async (event, groupId) =>{
        event.preventDefault();
        const token = localStorage.getItem('token');
        console.log(token);
        //const {isRemove} = this.state;
//placeholder for modal aditional confirmation state
        if(true){
            try{
            const res = await fetch(`http://localhost:8086/groups/` +groupId , {
                method: 'DELETE',
                headers: {
                    "token": token,
                    "content-type": "application/json"
                },
                /*body: JSON.stringify({
                    "groupId":groupId,
                }),*/
              })
      //remove console.log for testing
              console.log("You want to remove group with id: ",groupId);
              const statusCode = await res.status;
              return statusCode;
            }catch(err){console.log(err)};
        }
      }

    render(){
        const { data, isLoading, error } = this.state;
        const randomKeys = [];
        for (let i = 0; i < 50; i++) {
            randomKeys.push(Math.floor(Math.random() * 10000));
        }
        function row(){
        }
        if(error){
        return <tr><td><p>{error.message}</p></td></tr>;
        }
        if (isLoading) {
        return <tr><td><p>Kraunama ...</p></td></tr>;
        }
        if(data == null){
            return(
                <p>Server connection error...</p>
            )
        }else{
        return(
            data.map(data => 
                <tr>
                    <th scope='row'>{row()}</th>
                    <td>{data.name}</td>
                    <td><form className="table-form" onSubmit={this.addUsers}>
                        <select
                        name="user"
                        className="selectpicker" 
                        onChange={(e) => this.handleChange(e, data.id)}
                        >
                        {<UserSelector/>}
                        </select>
                    <input 
                    type="submit" 
                    className="btn btn-success" 
                    value="Pridėti narį"/>
                    </form>
                </td>
                <td><form className="table-form" onSubmit={(e) => this.removeUsers(e)}>
                <select 
                        name="user"
                        className="selectpicker" 
                        onChange={(e) => this.handleChange(e, data.id)}
                        >
                        <option disabled selected="selected"> Pasirinkite vartotoją</option>
                        {<GroupUserSelector groupMembersList={data.membersList}/>}
                        </select>
                    <input 
                    type="submit" 
                    className="btn btn-dark" 
                    value="Pašalinti narį"/>
                    </form>
                </td>
                <td>
                <input 
                    type="submit" 
                    onPointerDown={(e) => this.removeGroup(e, data.id)} 
                    className="btn btn-danger" 
                    value="Pašalinti padalinį"/>
                </td>
                <td>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" onPointerDown={(e) => this.togglePermission(e)} id="defaultCheck2"/>
                <label className="form-check-label" for="defaultCheck2" onPointerDown={(e) => this.togglePermission(e)}>
                Teisė dokumentą patvirtinti/atmesti
                </label>
                </div>
                </td>
                <td>
                <input 
                    type="submit" 
                    onPointerDown={(e) => this.submitRights(e, data.id)} 
                    className="btn btn-dark" 
                    value="Išsaugoti pasirinkimą"/>
                </td>
                </tr>
                )
        )}
    }

    togglePermission(e){
        e.preventDefault();
            if(this.state.togglePermission === false){
                this.setState({togglePermission:true})
                console.log("TRUE")
            }else if(this.state.togglePermission === true){
                this.setState({togglePermission:false})
                console.log("FALSE")
            }
    }
    submitRights = async(e, id) =>{
        e.preventDefault();
        const token = localStorage.getItem('token');
        const {togglePermission} = this.state;
        try{
            const res = await fetch( `http://localhost:8086/groups/${id}`, {
            method: 'PATCH',
            headers: {
                'token':token,
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "isEnabled":togglePermission
            }),
            })
            const statusCode = await res.status;
            return statusCode;
        }catch(err){console.log(err)};
    }

}