import React, { Component } from 'react';

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      drivers: [],
      view: 1,
      addNew: false
    }
    this.switchViewPanel = this.switchViewPanel.bind(this);
    this.toggleAddNew = this.toggleAddNew.bind(this);
  }

  switchViewPanel(newView) {
    this.setState({ view: newView });
  }

  toggleAddNew() {
    this.setState({addNew: !this.state.addNew});
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
            <button onClick={this.toggleAddNew}>Add new</button><br />
            {this.state.addNew ? <textarea rows="7" cols="85" defaultValue='Add text'></textarea> : ""}
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