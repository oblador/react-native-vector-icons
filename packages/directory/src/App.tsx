import React, { useCallback, useLayoutEffect } from 'react';
import './App.css';

import IconFamilies from './generated/glyphmapIndex.json';

const WAITING_INTERVAL = 300;

type Match = { family: string, names: string[] };

const Icon = React.memo(({ family, name, ...props }: { family: string, name: string } & React.HTMLProps<HTMLSpanElement>) => (
  <span style={{ fontFamily: family }} {...props}>
    {String.fromCodePoint(IconFamilies[family as keyof typeof IconFamilies][name as keyof ((typeof IconFamilies)[keyof typeof IconFamilies])])}
  </span>
));

const FamiliesLinks = ({matches = []}) => {
  return (
    <div className="Family-Links-Container">
      <div className="Family-Links-Content">
        <h2 className="Family-Links-Title">Icon Families:</h2>
        <div className="Family-Links-List">
          {matches.map(match => {
            const { family } = match;

            return <a className="Family-Links-Link" href={`#${family}`}>{family}</a>;
          })}
        </div>
      </div>
    </div>
  )
}

const HeaderBar = () => {
  return (
    <div className="Header-Container">
      <div className="Header-Content">
        <h1 className="Header-Title">react-native-vector-icons directory</h1>
      </div>
    </div>
  );
};

const SearchBar = ({ onSubmit }: { onSubmit: (text?: string) => void }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (inputRef.current?.value) {
        onSubmit(inputRef.current.value);
      }
    },
    [inputRef, onSubmit]
  );

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      timerRef.current = setTimeout(
        () => onSubmit(inputRef.current?.value),
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

const renderIcon = (family: string, name: string) => (
  <div className="Result-Icon-Container" key={name}>
    <Icon family={family} name={name} className="Result-Icon" />
    <h4 className="Result-Icon-Name">{name}</h4>
  </div>
);

const renderMatch = ({ family, names }: Match) => (
  <div className="Result-Row" key={family}>
    <h2 className="Result-Title" id={family}>{family}</h2>

    <div className="Result-List">
      {names.map((name) => renderIcon(family, name))}
    </div>
  </div>
);

const renderNotFound = () => (
  <div className="Result-Row">
    <h2 className="Result-Title">Icon not found.</h2>
  </div>
);

const getMatches = (query: string) =>
  Object.keys(IconFamilies)
    .sort()
    .map((family) => {
      const icons = IconFamilies[family as keyof typeof IconFamilies];
      const names = Object.keys(icons);
      const results = names.filter((name) => name.indexOf(query) >= 0);
      return { family, names: results };
    })
    .filter(({ names }) => names.length);

const App = () => {
  const [matches, setMatches] = React.useState<Match[]>([]);
  const handleSubmit = useCallback((text: string = '') => {
    setMatches(getMatches(text));
  }, []);
  useLayoutEffect(() => handleSubmit(''), [handleSubmit]);

  return (
    <div className="App">
      <HeaderBar />
      <SearchBar onSubmit={handleSubmit} />
      <FamiliesLinks matches={matches} />
      <div className="Container">
        {matches.length === 0 ? renderNotFound() : matches.map(renderMatch)}
      </div>
    </div>
  );
};

export default App;