import React, {Component} from 'react';
import PhoneForm from "./components/PhoneForm";
import PhoneInfoList from "./components/PhoneInfoList";

class App extends Component {
  id = 2;
  state = {
    information: [
      {
        id: 0,
        name: '하호호',
        phone: '010-0000-0000',
      },
      {
        id: 1,
        name: '하히히',
        phone: '010-1111-1111',
      },
    ],
    keyword: '',
  };
  handleChange = (e) => {
    this.setState({
      keyword: e.target.value
    })
  };
  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data})
    });
    console.log(data);
  };
  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  };
  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => id === info.id
          ? { ...id, ...data}
          : {info}
      )
    })
  };
  render() {
    const { information, keyword } = this.state;
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1
    );
    return (
      <div>
        <PhoneForm
          onCreate={this.handleCreate}
        />
        <input
          placeholder="search by name"
          onChange={this.handleChange}
          value={keyword}
        />
        <PhoneInfoList
          data={filteredList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
