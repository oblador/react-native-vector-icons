import {
  type ChangeEvent,
  type FormEvent,
  type HTMLProps,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import './App.css';

import IconFamilies from './generated/glyphmapIndex.json';

const WAITING_INTERVAL = 300;
const COPIED_FEEDBACK_DURATION = 1800;

type Match = { family: string; names: string[] };
type CopiedIcon = { family: string; name: string } | null;

const Icon = memo(function Icon({
  family,
  name,
  ...props
}: { family: string; name: string } & HTMLProps<HTMLSpanElement>) {
  return (
    <span style={{ fontFamily: family }} {...props}>
      {String.fromCodePoint(
        IconFamilies[family as keyof typeof IconFamilies][
          name as keyof (typeof IconFamilies)[keyof typeof IconFamilies]
        ],
      )}
    </span>
  );
});

const FamiliesLinks = ({ matches = [] }: { matches: Match[] }) => (
  <div className="Family-Links-Container">
    <div className="Family-Links-Content">
      <h2 className="Family-Links-Title">Icon Families:</h2>
      <div className="Family-Links-List">
        {matches.map((match) => {
          const { family } = match;

          return (
            <a key={family} className="Family-Links-Link" href={`#${family}`}>
              {family}
            </a>
          );
        })}
      </div>
    </div>
  </div>
);

const HeaderBar = () => (
  <div className="Header-Container">
    <div className="Header-Content">
      <h1 className="Header-Title">react-native-vector-icons directory</h1>
    </div>
  </div>
);

const SearchBar = ({ onSubmit }: { onSubmit: (text?: string) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (inputRef.current?.value) {
        onSubmit(inputRef.current.value);
      }
    },
    [onSubmit],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      timerRef.current = setTimeout(() => onSubmit(inputRef.current?.value), WAITING_INTERVAL);
    },
    [onSubmit],
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

const IconCard = memo(function IconCard({
  copied,
  family,
  name,
  onCopy,
}: {
  copied: boolean;
  family: string;
  name: string;
  onCopy: (family: string, name: string) => Promise<void>;
}) {
  return (
    <button
      type="button"
      className="Result-Icon-Container"
      aria-label={`Copy ${name} icon name`}
      title={copied ? `${name} copied` : `Copy ${name}`}
      onClick={() => void onCopy(family, name)}
    >
      <Icon family={family} name={name} className="Result-Icon" />
      <span className="Result-Icon-Name">{name}</span>
      <span className={`Result-Icon-Feedback${copied ? ' is-copied' : ''}`} aria-hidden={copied ? undefined : true}>
        {copied ? (
          <span role="status" aria-live="polite">
            Copied!
          </span>
        ) : (
          'Click to copy'
        )}
      </span>
    </button>
  );
});

const renderMatch = (
  { family, names }: Match,
  copiedIcon: CopiedIcon,
  onCopy: (family: string, name: string) => Promise<void>,
) => (
  <div className="Result-Row" key={family}>
    <h2 className="Result-Title" id={family}>
      {family}
    </h2>

    <div className="Result-List">
      {names.map((name) => (
        <IconCard
          key={name}
          copied={copiedIcon?.family === family && copiedIcon.name === name}
          family={family}
          name={name}
          onCopy={onCopy}
        />
      ))}
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
  const [matches, setMatches] = useState<Match[]>([]);
  const [copiedIcon, setCopiedIcon] = useState<CopiedIcon>(null);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSubmit = useCallback((text = '') => {
    setMatches(getMatches(text));
  }, []);
  const handleCopy = useCallback(async (family: string, name: string) => {
    if (!navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(name);
    } catch {
      return;
    }

    setCopiedIcon({ family, name });
    if (copiedTimerRef.current) {
      clearTimeout(copiedTimerRef.current);
    }
    copiedTimerRef.current = setTimeout(() => {
      setCopiedIcon(null);
      copiedTimerRef.current = null;
    }, COPIED_FEEDBACK_DURATION);
  }, []);

  useEffect(
    () => () => {
      if (copiedTimerRef.current) {
        clearTimeout(copiedTimerRef.current);
      }
    },
    [],
  );
  useLayoutEffect(() => handleSubmit(''), [handleSubmit]);

  return (
    <div className="App">
      <HeaderBar />
      <SearchBar onSubmit={handleSubmit} />
      <FamiliesLinks matches={matches} />
      <div className="Container">
        {matches.length === 0 ? renderNotFound() : matches.map((match) => renderMatch(match, copiedIcon, handleCopy))}
      </div>
    </div>
  );
};

export default App;
