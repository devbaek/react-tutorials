import React, {Component} from "react";

class PhoneInfo extends Component {
  static defaultProps = {
    info: {
      name: 'name',
      phone: '010-0000-0000',
      id: 0,
    }
  };

  state = {
    editing: false,
    name: '',
    phone: '',
  };

  handleRemove = () => {
    const {info, onRemove} = this.props;
    onRemove(info.id);
  };
  handleToggleEdit = () => {
    const {editing} = this.state;
    this.setState({editing: !editing})
  };
  handleChange = (e) => {
    const {name, value} = e.target;
    console.log('name', name, 'value', value);
    console.log(e.target);
    this.setState({
      [name]: value
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    // 수정 상태가 아니고, info 값이 같다면 리렌더링 안함
    if (!this.state.editing
      && !nextState.editing
      && nextProps.info === this.props.info) {
      return false;
    }
    // 나머지 경우엔 리렌더링함
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    const {info, onUpdate} = this.props;
    if (!prevState.editing && this.state.editing) {
      this.setState({
        name: info.name,
        phone: info.phone,
      })
    }

    if (prevState.editing && !this.state.editing) {
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone
      });
    }

  }

  render() {
    console.log('rendering PhoneInfo' + this.props.info.id);
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px',
    };
    const {editing} = this.state;

    if (editing) {
      return (
        <div style={style}>
          <div>
            <input
              value={this.state.name}
              name="name"
              placeholder="name"
              onChange={this.handleChange}/>
          </div>
          <div>
            <input
              value={this.state.phone}
              name="phone"
              placeholder="phone"
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleToggleEdit}>Update</button>
          <button onClick={this.handleRemove}>Remove</button>
        </div>
      );
    }
    const {
      name, phone
    } = this.props.info;

    return (
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{phone}</div>
        <button onClick={this.handleToggleEdit}>Update</button>
        <button onClick={this.handleRemove}>Remove</button>
      </div>
    )
  }
}

export default PhoneInfo;