import React, { Component, PropTypes } from 'react';
import './App.css';
import Entypo from '../../glyphmaps/Entypo.json';
import EvilIcons from '../../glyphmaps/EvilIcons.json';
import FontAwesome from '../../glyphmaps/FontAwesome.json';
import Foundation from '../../glyphmaps/Foundation.json';
import Ionicons from '../../glyphmaps/Ionicons.json';
import MaterialCommunityIcons from '../../glyphmaps/MaterialCommunityIcons.json';
import MaterialIcons from '../../glyphmaps/MaterialIcons.json';
import SimpleLineIcons from '../../glyphmaps/SimpleLineIcons.json';
import Octicons from '../../glyphmaps/Octicons.json';
import Zocial from '../../glyphmaps/Zocial.json';

const IconFamilies = {
  Entypo,
  EvilIcons,
  FontAwesome,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
  Octicons,
  Zocial,
};

class Icon extends Component {
  static propTypes = {
    family: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  render() {
    return (
      <span style={{ fontFamily: this.props.family }} {...this.props}>
        {String.fromCharCode(IconFamilies[this.props.family][this.props.name])}
      </span>
    );
  }
}

const HeaderBar = (props) => {
  return (
    <div className="Header-Container">
      <div className="Header-Content">
        <h1 className="Header-Title">
          react-native-vector-icons directory
        </h1>
      </div>
    </div>
  );
};

class SearchBar extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.inputRef.value);
  };

  render() {
    return (
      <div className="Search-Container">
        <div className="Search-Content">
          <form onSubmit={this.handleSubmit}>
            <Icon family="FontAwesome" name="search" className="Search-Icon" />
            <input
              ref={ref => this.inputRef = ref}
              placeholder="Search for an icon"
              type="text"
              className="Search-Input" />
          </form>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      matches: [],
    };
  }

  componentDidMount() {
    this.handleSubmit('');
  }

  handleSubmit = (text) => {
    let matches = [];
    Object.keys(IconFamilies).forEach((family) => {
      const icons = IconFamilies[family];
      const names = Object.keys(icons);
      const results = names.filter(name => name.indexOf(text) >= 0);
      if (results.length) {
        matches = [...matches, { family, names: results }];
      }
    });

    this.setState({ matches });
  };

  renderFamily(familyName) {
    return (
      <div>
        {Object.keys(IconFamilies[familyName]).map(iconName => (
          <Icon key={iconName + familyName} family={familyName} name={iconName} />
        ))}
      </div>
    );
  }

  renderMatch = (match) => {
    const { family, names } = match;
    return (
      <div className="Result-Row" key={family}>
        <h2 className="Result-Title">{family}</h2>

        <div className="Result-List">
          {names.map(name => this.renderIcon(family, name))}
        </div>
      </div>
    );
  };

  renderIcon(family, name) {
    return (
      <div className="Result-Icon-Container" key={name}>
        <Icon
          family={family}
          name={name}
          className="Result-Icon"
        />
        <h4 className="Result-Icon-Name">
          {name}
        </h4>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <HeaderBar />
        <SearchBar onSubmit={this.handleSubmit} />
        <div className="Container">
          {this.state.matches.map(this.renderMatch)}
        </div>
      </div>
    );
  }
}

export default App;
