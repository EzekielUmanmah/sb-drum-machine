const { useState, useRef, useEffect, useContext } = React;
const { CSSTransition } = ReactTransitionGroup;

const clips = [
  { buttonID: 'Heater-1', audioID: 'Q', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { buttonID: 'Heater-6', audioID: 'W', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { buttonID: 'Dsc_Oh', audioID: 'E', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { buttonID: 'Kick_n_Hat', audioID: 'A', src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { buttonID: 'RP4_KICK_1', audioID: 'S', src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { buttonID: 'Cev_H2', audioID: 'D', src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
  { buttonID: 'Chord_1', audioID: 'Z', src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' },
  { buttonID: 'Chord_2', audioID: 'X', src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },
  { buttonID: 'Chord_3', audioID: 'C', src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },
];
const AppContext = React.createContext();

const Volume = () => {
  const [state, setState] = useContext(AppContext);
  const [{ refsArray, str, status, mute }] = [state];

  const [vol, setVol] = useState(50);
  const [volIcon, setVolIcon] = useState('fas fa-volume-off');

  const handleVolume = (val) => {
    const currentVol = Number.parseInt(val.target.value);
    setVol(currentVol);

    if (mute) {
      setState((state) => ({ ...state, mute: !mute }));
    }
    currentVol === 0
      ? setVolIcon('fas fa-volume-mute')
      : currentVol > vol
      ? setVolIcon('fas fa-volume-up')
      : currentVol < vol
      ? setVolIcon('fas fa-volume-down')
      : null;
    refsArray.current.map((x) => {
      x.volume = currentVol / 100;
      setState((state) => ({ ...state, str: 'Volume ' + currentVol }));
    });
    val.target.style.background =
      'linear-gradient(to right, #82CFD0 0%, #82CFD0 ' + currentVol + '%, #fff ' + currentVol + '%, white 100%)';
  };

  useEffect(() => {
    refsArray.current.map((audio) => {
      audio.volume = vol / 100;
    });
  }, []);

  return (
    <div className="volume">
      <i
        className={!mute ? volIcon : 'fas fa-volume-mute'}
        onClick={() => !status && setState((state) => ({ ...state, mute: !mute }))}
      ></i>
      <input id="slider" disabled={status} type="range" onInput={handleVolume} />
    </div>
  );
};

const Display = () => {
  const [state, setState] = useContext(AppContext);
  const [{ refsArray, str, status }] = [state];

  return (
    <div id="display">
      <h1>Beat Machine</h1>
      <p className="fade" style={status ? { background: '#E0E0E0' } : null}>
        {status ? null : str.replace(/[\W_]+/g, ' ')}
      </p>

      <CSSTransition appear in={status} timeout={500} classNames="display">
        <button className="power" onClick={() => setState((state) => ({ ...state, status: !state.status }))}>
          <i className="fas fa-power-off"></i>
        </button>
      </CSSTransition>
      <br />
      <Volume />
    </div>
  );
};
const DrumPads = () => {
  const [state, setState] = useContext(AppContext);
  const [{ refsArray, str, status, mute }] = [state];

  const play = (e) => {
    e.play();
    setState((state) => ({ ...state, str: e.parentElement.id }));
  };

  const onKeyPress = (e) => {
    const key = e.key.toUpperCase();
    state.refsArray.current.map((x) => {
      if (x.id === key) {
        x.play();
        setState((state) => ({ ...state, str: x.parentElement.id }));
        x.parentElement.classList.add('keydown');
      }
    });
  };
  const onKeyUp = (e) => {
    const key = e.key.toUpperCase();
    document.getElementById(key).parentElement.classList.remove('keydown');
  };
  useEffect(() => {
    status === false && document.addEventListener('keydown', onKeyPress);
    document.addEventListener('keyup', onKeyUp);
    return () => document.removeEventListener('keyup', onKeyUp);
    return () => document.removeEventListener('keydown', onKeyPress);
  }, [status]);

  return (
    <CSSTransition appear in={status} timeout={500} classNames="fade">
      <div className="container">
        {clips.map((clip, i) => {
          return (
            <button
              disabled={status}
              className="drum-pad"
              id={clip.buttonID}
              key={i}
              onClick={() => play(refsArray.current[i])}
            >
              <audio
                muted={mute}
                className="clip"
                id={clip.audioID}
                src={clip.src}
                ref={(ref) => (refsArray.current[i] = ref)}
              ></audio>
              {clip.audioID}
            </button>
          );
        })}
      </div>
    </CSSTransition>
  );
};

const Wrapper = () => {
  const [state, setState] = useState({
    str: 'Online',
    status: true,
    mute: false,
    refsArray: useRef([]),
  });

  return (
    <div id="drum-machine">
      <AppContext.Provider value={[state, setState]}>
        <DrumPads />
        <Display />
      </AppContext.Provider>
    </div>
  );
};

ReactDOM.render(<Wrapper />, document.getElementById('root'));
