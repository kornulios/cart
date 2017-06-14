import React, { Component } from 'react';
import axios from 'axios';

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      drivers: [],
      view: 1,
      addNew: false,
      newsText: 'Add new message here',
      submitSuccess: false
    }
    this.switchViewPanel = this.switchViewPanel.bind(this);
    this.toggleAddNew = this.toggleAddNew.bind(this);
    this.handleNewsSubmit = this.handleNewsSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  switchViewPanel(newView) {
    this.setState({ view: newView });
  }

  toggleAddNew() {
    this.setState({ addNew: !this.state.addNew, submitSuccess: false });
  }

  handleNewsSubmit(event) {
    event.preventDefault();
    const message = this.state.newsText;
    axios.post('http://localhost:3001/api/news', { author: 'KHead', text: message, title: 'New message' })
      .then((res) => {
        console.log('Data saved');
        this.setState({submitSuccess: true, addNew: false, newsText: 'Add text here'});
      });
  }

  handleChange(event) {
    this.setState({ newsText: event.target.value });
  }

  componentDidMount() {
    fetch('/api/drivers')
      .then(res => res.json())
      .then(drivers => {
        this.setState({ drivers })
      })
  }

  render() {
    let element = (<div>Admin panel element</div>);
    const AdminNavBar = () => (
      <div className='admin-panel-left'>
        <ul>
          <li><a href='#' onClick={() => this.switchViewPanel(1)}>News</a></li>
          <li><a href='#' onClick={() => this.switchViewPanel(2)}>Drivers</a></li>
          <li><a href='#' onClick={() => this.switchViewPanel(3)}>Schedules</a></li>
        </ul>
      </div>
    )
    const drivers = this.state.drivers.map((val, id) => {
      return (<tr key={val._id}>
        <td>{val.name}</td>
        <td>  <button>Edit</button></td>
        <td>  <button>Delete</button></td>
      </tr>
      )
    });

    switch (this.state.view) {
      case 1:
        element = (
          <div>
            <p>News list. </p>

            {this.state.addNew ?
              <form onSubmit={this.handleNewsSubmit}>
                <div>
                  <textarea
                    rows="7"
                    cols="85"
                    value={this.state.newsText}
                    onChange={this.handleChange}
                  />
                </div>
                <button onClick={this.toggleAddNew}>Cancel</button>
                <input type='submit' value='Submit' />
              </form>
              :
              <button onClick={this.toggleAddNew}>Add new</button>
            }
            {this.state.submitSuccess ? <div>Form submitted successfully</div> : ""}
          </div>);
        break;
      case 2:
        element = (<table className='admin-table'><tbody>{drivers}
          <tr>
            <td><button>Add new</button></td>
          </tr>
        </tbody></table>);
        break;
      case 3:
        break;
      default:
        break;
    }

    return (
      <div>
        <h3> Welcome to admin panel</h3>
        <AdminNavBar />
        <div className='admin-panel-right'>
          {element}
        </div>
      </div>
    )
  }
}

export default AdminPanel;