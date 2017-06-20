import React, { Component } from 'react';
import axios from 'axios';

class AdminRow extends Component {
  // constructor(props) {
  //   super(props);
  // }
  showId() {
    console.log(this.props._id);
  }
  render() {
    return (
      <tr>
        <td>{this.props.text}</td>
        <td><button onClick={this.props.onEdit}>Edit</button></td>
        <td><button onClick={this.props.onDelete}>Delete</button></td>
      </tr>
    )
  }
}

class AdminForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsText: this.props.newsText || 'Add new message',
      newsTitle: 'Message title'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.newsTitle === "" || this.state.newsText === "") {
      return;
    }
    this.props.OnSubmit({ title: this.state.newsTitle, message: this.state.newsText });
    this.setState({ newsTitle: 'Message title', newsText: 'Enter message' });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            Title:
            <input type='text' name="newsTitle" value={this.state.newsTitle} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Text:
              <textarea
              rows="7"
              cols="85"
              value={this.state.newsText}
              onChange={this.handleChange}
              name="newsText"
            />
          </label>
        </div>
        <button onClick={this.props.OnCancel}>Cancel</button>
        <input type='submit' value='Submit' />
      </form>
    )
  }
}

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      drivers: [],
      view: 1,
      addNew: false,
      editMessage: false,
      editMessageId: '',
      submitSuccess: false
    }
    this.switchViewPanel = this.switchViewPanel.bind(this);
    this.toggleAddNew = this.toggleAddNew.bind(this);
    this.handleNewsSubmit = this.handleNewsSubmit.bind(this);
  }

  switchViewPanel(newView) {
    this.setState({ view: newView });
  }

  toggleAddNew() {
    this.setState({ addNew: !this.state.addNew, submitSuccess: false });
  }

  handleNewsSubmit(data) {
    axios.post(this.props.apiPath + '/news', { author: 'Admin', text: data.message, title: data.title })
      .then((res) => {
        console.log('Data saved');
        this.setState({ submitSuccess: true, addNew: false });
      });
  }

  handleNewsDelete(id) {
    // console.log(this.props.apiPath + '/news/' + id);
    axios.delete(this.props.apiPath + '/news/' + id).then(res => {
      console.log('Id ' + id + ' deleted');
    })
  }

  handleNewsEdit(id) {
    if (id === false) {
      this.setState({ editMessage: false, editMessageId: '' });
      return;
    }
    this.setState({ editMessage: true, editMessageId: id });
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
        <td><button>Edit</button></td>
        <td><button>Delete</button></td>
      </tr>
      )
    });

    switch (this.state.view) {
      case 1:     //news admin
        let newsList = (<table>
          <thead>
            <tr>
              <th colSpan="3">News List</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((item, index) => {
              return (<AdminRow
                key={item._id}
                _id={item._id}
                text={item.title}
                onDelete={this.handleNewsDelete.bind(this, item._id)}
                onEdit={this.handleNewsEdit.bind(this, index)}
              />);
            })
            }
          </tbody>
        </table>);

        element = (
          <div>
            {this.state.addNew ? <AdminForm
              OnCancel={this.toggleAddNew.bind(this)}
              OnSubmit={this.handleNewsSubmit.bind(this)} />
              :
              <div>
                <button onClick={this.toggleAddNew}>Add new message</button>
                {this.state.submitSuccess ? <div>Form submitted successfully</div> : ""}
                {newsList}
              </div>
            }
          </div>);
        if (this.state.editMessage) {
          element = (<div>
            <AdminForm
              OnCancel={this.handleNewsEdit.bind(this, false)}
              newsText={this.props.data[this.state.editMessageId].text}
            />
          </div>);
        }
        break;
      case 2:         //drivers admin
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