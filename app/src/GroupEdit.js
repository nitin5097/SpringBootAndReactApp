import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class GroupEdit extends Component {

  emptyItem = {
    name: '',
    lastName: '',
    age: '',
    favColor: '',
    hobbies: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const group = await (await fetch(`/api/group/${this.props.match.params.id}`)).json();
      this.setState({item: group});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/group', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/groups');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Person' : 'Add Person'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
		
		<div className="row">
          <FormGroup className="col-md-4 mb-3">
            <Label for="name">First Name</Label>
            <Input type="text" name="name" id="name" value={item.name || ''}
                   onChange={this.handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup className="col-md-4 mb-3">
            <Label for="lastName">Last Name</Label>
            <Input type="text" name="lastName" id="lastName" value={item.lastName || ''}
                   onChange={this.handleChange} autoComplete="lastName"/>
          </FormGroup>
		</div>  
		 
		<div className="row">
          <FormGroup className="col-md-4 mb-3">
            <Label for="age">Age</Label>
            <Input type="text" name="age" id="age" value={item.age || ''}
                   onChange={this.handleChange} autoComplete="age"/>
          </FormGroup>
          
            <FormGroup className="col-md-4 mb-3">
              <Label for="favColor">Favorite Color</Label>
              <Input type="text" name="favColor" id="favColor" value={item.favColor || ''}
                     onChange={this.handleChange} autoComplete="favColor"/>
            </FormGroup>
		</div>	
		<div className="row">
            <FormGroup className="col-md-8 mb-3">
              <Label for="hobbies">Hobbies</Label>
              <Input type="text" name="hobbies" id="hobbies" value={item.hobbies || ''}
                     onChange={this.handleChange} autoComplete="hobbies"/>
            </FormGroup>
        </div>  
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/groups">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(GroupEdit);