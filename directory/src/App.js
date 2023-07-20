import './App.css';

/* eslint-disable react/prop-types, jsx-a11y/label-has-associated-control */
import * as React from 'react';

import IconFamilies from './generated/glyphmapIndex.json';

const WAITING_INTERVAL = 300;

const Icon = React.memo(({ family, name, ...props }) => (
  <span style={{ fontFamily: family }} {...props}>
    {String.fromCodePoint(IconFamilies[family][name])}
  </span>
));

const HeaderBar = () => {
  return (
    <div className="Header-Container">
      <div className="Header-Content">
        <h1 className="Header-Title">react-native-vector-icons directory</h1>
      </div>
    </div>
  );
};

const SearchBar = ({ onSubmit }) => {
  const inputRef = React.useRef();
  const timerRef = React.useRef(null);
  const handleSubmit = React.useCallback(
    e => {
      e.preventDefault();
      onSubmit(inputRef.current.value);
    },
    [inputRef, onSubmit]
  );

  const handleChange = React.useCallback(
    e => {
      e.preventDefault();
      clearInterval(timerRef.current);

      timerRef.current = setTimeout(
        () => onSubmit(inputRef.current.value),
        WAITING_INTERVAL
      );
    },
    [timerRef, inputRef, onSubmit]
  );

  return (
    <div className="Search-Container">
      <div className="Search-Content">
        <form className="Search-Form" onSubmit={handleSubmit}>
          {/* Clicking the Label focuses the cursor onto the form input */}
          <label htmlFor="Search-Input" className="Search-Label">
            <Icon family="FontAwesome" name="search" className="Search-Icon" />
          </label>
          <input
            type="text"
            id="Search-Input"
            className="Search-Input"
            ref={inputRef}
            onChange={handleChange}
            placeholder="Search for an icon..."
          />
        </form>
      </div>
    </div>
  );
};

const renderIcon = (family, name) => (
  <div className="Result-Icon-Container" key={name}>
    <Icon family={family} name={name} className="Result-Icon" />
    <h4 className="Result-Icon-Name">{name}</h4>
  </div>
);

const renderMatch = match => {
  const { family, names } = match;
  return (
    <div className="Result-Row" key={family}>
      <h2 className="Result-Title">{family}</h2>

      <div className="Result-List">
        {names.map(name => renderIcon(family, name))}
      </div>
    </div>
  );
};

const renderNotFound = () => (
  <div className="Result-Row">
    <h2 className="Result-Title">Icon not found.</h2>
  </div>
);

const getMatches = query =>
  Object.keys(IconFamilies)
    .sort()
    .map(family => {
      const icons = IconFamilies[family];
      const names = Object.keys(icons);
      const results = names.filter(name => name.indexOf(query) >= 0);
      return { family, names: results };
    })
    .filter(({ names }) => names.length);

const App = () => {
  const [matches, setMatches] = React.useState([]);
  const handleSubmit = React.useCallback(text => {
    setMatches(getMatches(text));
  });
  React.useLayoutEffect(() => handleSubmit(''), []);

  return (
    <div className="App">
      <HeaderBar />
      <SearchBar onSubmit={handleSubmit} />
      <div className="Container">
        {matches.length === 0 ? renderNotFound() : matches.map(renderMatch)}
      </div>
    </div>
  );
};

export default App;
