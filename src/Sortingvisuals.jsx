import React, { useEffect, useRef, useState } from 'react';
import './Sortingvisuals.css';
import {
  getMergeSortAnimations,
  getQuickSortAnimations,
  getHeapSortAnimations,
  getBubbleSortAnimations,
  getSelectionSortAnimations,
  getInsertionSortAnimations,
  getShellSortAnimations,
  getCountingSortAnimations,
  getRadixSortAnimations,
  getCocktailShakerSortAnimations,
} from './Sortingalgorithms';

const ALGORITHMS = {
  mergeSort: {
    name: 'Merge Sort', group: 'Divide & conquer',
    description: 'Splits the array into smaller parts, sorts them, then merges the sorted parts.',
    best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', stable: true,
    generate: getMergeSortAnimations,
  },
  quickSort: {
    name: 'Quick Sort', group: 'Divide & conquer',
    description: 'Partitions around a pivot and recursively sorts the values on either side.',
    best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)', stable: false,
    generate: getQuickSortAnimations,
  },
  heapSort: {
    name: 'Heap Sort', group: 'Selection',
    description: 'Builds a max heap, then repeatedly moves the largest value to the end.',
    best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)', stable: false,
    generate: getHeapSortAnimations,
  },
  bubbleSort: {
    name: 'Bubble Sort', group: 'Exchange',
    description: 'Compares neighbouring values and swaps them whenever they are out of order.',
    best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: true,
    generate: getBubbleSortAnimations,
  },
  selectionSort: {
    name: 'Selection Sort', group: 'Selection',
    description: 'Finds the smallest remaining value and places it into the next sorted position.',
    best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: false,
    generate: getSelectionSortAnimations,
  },
  insertionSort: {
    name: 'Insertion Sort', group: 'Insertion',
    description: 'Builds a sorted section one value at a time by shifting larger values right.',
    best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: true,
    generate: getInsertionSortAnimations,
  },
  shellSort: {
    name: 'Shell Sort', group: 'Insertion',
    description: 'Uses progressively smaller gaps to move out-of-place values efficiently.',
    best: 'O(n log n)', average: 'O(n^1.5)', worst: 'O(n²)', space: 'O(1)', stable: false,
    generate: getShellSortAnimations,
  },
  countingSort: {
    name: 'Counting Sort', group: 'Non-comparison',
    description: 'Counts occurrences of each integer and writes values back in sorted order.',
    best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n + k)', space: 'O(n + k)', stable: true,
    generate: getCountingSortAnimations,
  },
  radixSort: {
    name: 'Radix Sort', group: 'Non-comparison',
    description: 'Sorts non-negative integers digit by digit, from least significant to most significant.',
    best: 'O(nk)', average: 'O(nk)', worst: 'O(nk)', space: 'O(n + k)', stable: true,
    generate: getRadixSortAnimations,
  },
  cocktailShakerSort: {
    name: 'Cocktail Shaker Sort', group: 'Exchange',
    description: 'A two-way bubble sort that sweeps left-to-right and then right-to-left.',
    best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: true,
    generate: getCocktailShakerSortAnimations,
  },
};

const makeArray = (size) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);

const EMPTY_STATS = { comparisons: 0, swaps: 0, writes: 0 };

function applyEvent(values, event) {
  const next = values.slice();
  if (!event) return next;
  const [type, a, b] = event;

  if (type === 1 && Number.isInteger(a) && Number.isInteger(b)
      && a >= 0 && b >= 0 && a < next.length && b < next.length) {
    [next[a], next[b]] = [next[b], next[a]];
  } else if (type === 2 && Number.isInteger(a) && a >= 0 && a < next.length
      && Number.isFinite(b)) {
    next[a] = b;
  }
  return next;
}

function eventStat(type, stats) {
  if (type === 0) return { ...stats, comparisons: stats.comparisons + 1 };
  if (type === 1) return { ...stats, swaps: stats.swaps + 1 };
  if (type === 2) return { ...stats, writes: stats.writes + 1 };
  return stats;
}

export default function Sortingvisuals() {
  const [size, setSize] = useState(60);
  const [array, setArray] = useState(() => makeArray(60));
  const [algorithmId, setAlgorithmId] = useState('mergeSort');
  const [speed, setSpeed] = useState(65);
  const [events, setEvents] = useState([]);
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [stats, setStats] = useState(EMPTY_STATS);
  const [startedAt, setStartedAt] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  const algorithm = ALGORITHMS[algorithmId];
  const activeEvent = isPlaying && step < events.length ? events[step] : null;
  const progress = events.length ? Math.min(100, Math.round((step / events.length) * 100)) : 0;

  const clearPlayback = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetPlayback = (nextArray = array) => {
    clearPlayback();
    setArray(nextArray);
    setEvents([]);
    setStep(0);
    setIsPlaying(false);
    setIsPaused(false);
    setStats(EMPTY_STATS);
    setStartedAt(null);
    setElapsed(0);
  };

  useEffect(() => () => clearPlayback(), []);

  useEffect(() => {
    if (!isPlaying) return undefined;

    if (step >= events.length) {
      setIsPlaying(false);
      setIsPaused(false);
      setArray((current) => current.slice().sort((a, b) => a - b));
      setElapsed(startedAt ? Date.now() - startedAt : elapsed);
      return undefined;
    }

    const delay = Math.max(1, 101 - speed);
    timerRef.current = setTimeout(() => {
      const event = events[step];
      setArray((current) => applyEvent(current, event));
      setStats((current) => eventStat(event?.[0], current));
      setStep((current) => current + 1);
      if (startedAt) setElapsed(Date.now() - startedAt);
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, step, events, speed, startedAt, elapsed]);

  const start = () => {
    if (isPlaying || isPaused) return;
    if (array.length < 2) return;
    const workingCopy = array.slice();
    const generated = algorithm.generate(workingCopy);
    // The generators mutate their input, so always generate from a copy.
    // For arrays with more than one element, their return value is the event list.
    const safeEvents = Array.isArray(generated) && generated.length > 0 && Array.isArray(generated[0])
      ? generated
      : [];
    setEvents(safeEvents);
    setStep(0);
    setStats(EMPTY_STATS);
    setStartedAt(Date.now());
    setElapsed(0);
    setIsPaused(false);
    setIsPlaying(true);
  };

  const pause = () => {
    clearPlayback();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const resume = () => {
    if (isPaused && events.length) {
      setStartedAt((previous) => previous ?? Date.now());
      setIsPaused(false);
      setIsPlaying(true);
    }
  };

  const generateNewArray = () => resetPlayback(makeArray(size));

  const changeSize = (nextSize) => {
    setSize(nextSize);
    resetPlayback(makeArray(nextSize));
  };

  const changeAlgorithm = (nextId) => {
    setAlgorithmId(nextId);
    resetPlayback();
  };

  const elapsedLabel = elapsed < 1000
    ? `${elapsed} ms`
    : `${(elapsed / 1000).toFixed(1)} s`;

  const barGap = size > 100 ? 1 : size > 60 ? 2 : 4;

  return (
    <div className="sorting-app">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Sorting Lab home">
          <span className="brand-mark">S<span>.</span></span>
          <span className="brand-copy"><strong>sort<span>lab</span></strong><small>ALGORITHM PLAYGROUND</small></span>
        </a>
        <div className="topbar-right">
          <span className="live-dot" /> INTERACTIVE LEARNING
          <span className="topbar-version">REACT · VITE</span>
        </div>
      </header>

      <main className="page-content" id="top">
        <section className="hero">
          <div className="eyebrow"><span /> VISUALIZE THE LOGIC</div>
          <h1>Sorting, <span>made visible.</span></h1>
          <p>Explore how algorithms transform an unsorted array into order — one operation at a time.</p>
        </section>

        <section className="workspace">
          <aside className="sidebar panel">
            <div className="section-heading">
              <div><span className="section-kicker">01 / CHOOSE</span><h2>Algorithm</h2></div>
              <span className="count-pill">10 TOTAL</span>
            </div>
            <div className="algorithm-list" role="group" aria-label="Choose sorting algorithm">
              {Object.entries(ALGORITHMS).map(([id, item], index) => (
                <button
                  type="button"
                  key={id}
                  className={`algorithm-option ${algorithmId === id ? 'selected' : ''}`}
                  onClick={() => changeAlgorithm(id)}
                  disabled={isPlaying || isPaused}
                  aria-pressed={algorithmId === id}
                >
                  <span className="algorithm-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="algorithm-option-copy"><strong>{item.name}</strong><small>{item.group}</small></span>
                  {algorithmId === id && <span className="selected-mark">↗</span>}
                </button>
              ))}
            </div>
            <div className="sidebar-tip"><span className="tip-icon">✳</span><p><strong>Learning tip</strong><br />Try the same array with different algorithms to compare their behaviour.</p></div>
          </aside>

          <div className="main-column">
            <section className="visual-panel panel">
              <div className="visual-heading">
                <div>
                  <span className="section-kicker">02 / WATCH</span>
                  <h2>{algorithm.name}<span className="status-chip">{isPlaying ? (isPaused ? 'PAUSED' : 'RUNNING') : events.length && step >= events.length ? 'COMPLETE' : 'READY'}</span></h2>
                  <p>{algorithm.description}</p>
                </div>
                <button className="icon-button" type="button" title="Generate a new array" onClick={generateNewArray} disabled={isPlaying}>
                  <span>⟳</span>
                </button>
              </div>

              <div className="metrics-row">
                <div className="metric"><span>COMPARISONS</span><strong>{stats.comparisons.toLocaleString()}</strong><i className="metric-dot compare" /></div>
                <div className="metric"><span>SWAPS</span><strong>{stats.swaps.toLocaleString()}</strong><i className="metric-dot swap" /></div>
                <div className="metric"><span>WRITES</span><strong>{stats.writes.toLocaleString()}</strong><i className="metric-dot write" /></div>
                <div className="metric"><span>ELAPSED</span><strong>{elapsedLabel}</strong><i className="metric-dot time" /></div>
              </div>

              <div className="chart-topline">
                <span><span className="chart-live-dot" /> ARRAY VISUALIZATION</span>
                <span>{array.length} ITEMS <b>·</b> VALUES 10–99</span>
              </div>
              <div className="chart-stage" aria-label="Sorting array visualization">
                <div className="chart-gridlines"><i /><i /><i /><i /></div>
                <div className="bars" style={{ '--bar-gap': `${barGap}px` }}>
                  {array.map((value, index) => {
                    let stateClass = '';
                    if (activeEvent && activeEvent[0] === 0 && (activeEvent[1] === index || activeEvent[2] === index)) stateClass = 'bar-compare';
                    if (activeEvent && activeEvent[0] === 1 && (activeEvent[1] === index || activeEvent[2] === index)) stateClass = 'bar-swap';
                    if (activeEvent && (activeEvent[0] === 2 || activeEvent[0] === 3) && activeEvent[1] === index) stateClass = 'bar-write';
                    return (
                      <div className={`bar ${stateClass}`} key={index} title={`Index ${index}: ${value}`}>
                        <div className="bar-fill" style={{ height: `${Math.max(4, value)}%` }} />
                      </div>
                    );
                  })}
                </div>
                {!array.length && <div className="empty-chart">Generate an array to begin</div>}
              </div>

              <div className="legend">
                <span><i className="legend-swatch default" /> Unsorted</span>
                <span><i className="legend-swatch compare" /> Comparing</span>
                <span><i className="legend-swatch swap" /> Swapping</span>
                <span><i className="legend-swatch write" /> Writing</span>
              </div>

              <div className="progress-row">
                <div className="progress-track"><div className="progress-value" style={{ width: `${progress}%` }} /></div>
                <span>{progress}%</span>
              </div>

              <div className="playback">
                <div className="playback-actions">
                  <button type="button" className="button button-secondary" onClick={generateNewArray} disabled={isPlaying}>
                    <span>⤨</span> New array
                  </button>
                  {!isPlaying && !isPaused ? (
                    <button type="button" className="button button-primary" onClick={start}><span>▶</span> Start sorting</button>
                  ) : isPlaying ? (
                    <button type="button" className="button button-primary" onClick={pause}><span>Ⅱ</span> Pause</button>
                  ) : (
                    <button type="button" className="button button-primary" onClick={resume}><span>▶</span> Resume</button>
                  )}
                  <button type="button" className="button button-ghost" onClick={() => resetPlayback()} disabled={!events.length && !isPlaying && !isPaused}>
                    ↺ Reset
                  </button>
                </div>
                <div className="control-settings">
                  <label className="setting-control"><span>ARRAY SIZE</span>
                    <select value={size} onChange={(e) => changeSize(Number(e.target.value))} disabled={isPlaying || isPaused}>
                      <option value={30}>30 bars</option><option value={60}>60 bars</option><option value={100}>100 bars</option><option value={310}>310 bars</option>
                    </select>
                  </label>
                  <label className="setting-control speed-setting"><span>SPEED <b>{speed <= 30 ? 'SLOW' : speed >= 75 ? 'FAST' : 'NORMAL'}</b></span>
                    <input type="range" min="1" max="100" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
                  </label>
                </div>
              </div>
            </section>

            <section className="details-grid">
              <div className="panel detail-panel">
                <span className="section-kicker">03 / UNDERSTAND</span>
                <h3>Complexity profile</h3>
                <div className="complexity-list">
                  <div><span>Best case</span><strong>{algorithm.best}</strong></div>
                  <div><span>Average case</span><strong>{algorithm.average}</strong></div>
                  <div><span>Worst case</span><strong>{algorithm.worst}</strong></div>
                  <div><span>Auxiliary space</span><strong>{algorithm.space}</strong></div>
                </div>
              </div>
              <div className="panel detail-panel">
                <span className="section-kicker">QUICK FACTS</span>
                <h3>Algorithm profile</h3>
                <div className="fact-row"><span>Category</span><strong>{algorithm.group}</strong></div>
                <div className="fact-row"><span>Stable sort</span><strong className={algorithm.stable ? 'yes' : 'no'}>{algorithm.stable ? 'Yes' : 'No'}</strong></div>
                <div className="fact-row"><span>Progress</span><strong>{step.toLocaleString()} / {events.length.toLocaleString()} steps</strong></div>
                <p className="detail-note">Complexity describes how runtime or memory use grows as the input gets larger. Actual performance depends on the data and implementation.</p>
              </div>
            </section>
          </div>
        </section>
        <footer className="footer"><span>sortlab <b>•</b> Learn by watching every step.</span><span>BUILT FOR CURIOSITY <b>✳</b></span></footer>
      </main>
    </div>
  );
}
