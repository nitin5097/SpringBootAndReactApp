import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class GroupList extends Component {

  constructor(props) {
    super(props);
    this.state = {groups: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/groups')
      .then(response => response.json())
      .then(data => this.setState({groups: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/group/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedGroups = [...this.state.groups].filter(i => i.id !== id);
      this.setState({groups: updatedGroups});
    });
  }

  render() {
    const {groups, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const groupList = groups.map(group => {
    
      return <tr key={group.id}>
        <td style={{whiteSpace: 'nowrap'}}>{group.name}</td>
		<td style={{whiteSpace: 'nowrap'}}>{group.lastName}</td>
		<td>{group.age}</td>
		<td>{group.favColor}</td>
		<td>{group.hobbies}</td>
        
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/groups/" + group.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(group.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/groups/new">Add Person</Button>
          </div>
          <h3 align="center">Person List</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">First Name</th>
              <th width="20%">Last Name</th>
              <th width="15%">Age</th>
			  <th width="20%">Favorite Color</th>
			  <th width="25%">Hobbies</th>
              
            </tr>
            </thead>
            <tbody>
            {groupList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default GroupList;