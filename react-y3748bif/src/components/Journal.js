import React, { useState } from 'react';

export default function Journal() {
  const [mode, setMode] = useState('journal'); // 'journal' or 'dream'
  const [entry, setEntry] = useState('');
  const [lens, setLens] = useState('jungian'); // for dreams
  const [pastEntries, setPastEntries] = useState([]);
  const [interpretation, setInterpretation] = useState(null);
  const [xp, setXp] = useState(0);
  const [showToast, setShowToast] = useState(false);

  function awardXP(amount) {
    setXp((prev) => prev + amount);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
  }

  function saveJournalEntry() {
    if (!entry.trim()) return;
    const interp = interpretJournal(entry);
    const dated = {
      text: entry,
      date: new Date().toLocaleDateString(),
      interp,
      type: 'journal',
    };
    setPastEntries([dated, ...pastEntries]);
    setInterpretation(interp);
    setEntry('');
    awardXP(50);
  }

  function saveDreamEntry() {
    if (!entry.trim()) return;
    const interp = interpretDream(entry, lens);
    const dated = {
      text: entry,
      date: new Date().toLocaleDateString(),
      interp,
      type: 'dream',
      lens,
    };
    setPastEntries([dated, ...pastEntries]);
    setInterpretation(interp);
    setEntry('');
    awardXP(60);
  }

  // --- Journal interpretation: reflects patterns back, doesn't diagnose ---
  function interpretJournal(text) {
    const lower = text.toLowerCase();
    const themes = [];

    if (lower.match(/tired|exhausted|drained|burnout/))
      themes.push('fatigue and depletion');
    if (lower.match(/proud|accomplished|won|crushed it/))
      themes.push('achievement and momentum');
    if (lower.match(/angry|frustrated|pissed|annoyed/))
      themes.push('unresolved friction');
    if (lower.match(/scared|anxious|worried|nervous/))
      themes.push('anticipation of a threat, real or imagined');
    if (lower.match(/lonely|isolated|alone/))
      themes.push('a need for connection');
    if (themes.length === 0) themes.push('steady, observational reflection');

    return `This entry seems to center on ${themes.join(
      ' and '
    )}. Consider what specifically triggered this today, and whether it's a one-time event or a pattern worth tracking over the next few entries.`;
  }

  // --- Dream interpretation: two lenses, framed as reflective tools, not fact ---
  function interpretDream(text, lensType) {
    const lower = text.toLowerCase();

    if (lensType === 'freudian') {
      if (lower.match(/fall|falling/))
        return 'A falling dream, in this framework, is often read as a loss of control or a fear of failure in waking life — something you feel is slipping from your grip.';
      if (lower.match(/chase|chased|running/))
        return 'Being chased is commonly interpreted here as avoidance — an unresolved impulse or feeling you are running from rather than confronting directly.';
      if (lower.match(/water|ocean|drown/))
        return 'Water frequently symbolizes the emotional or unconscious self in this tradition — turbulent water may point to emotional overwhelm beneath a calm surface.';
      return 'This dream may reflect an underlying desire or tension not fully expressed in waking life. What feeling came up strongest in the dream — that feeling is usually the real subject.';
    } else {
      if (lower.match(/fall|falling/))
        return 'In this framework, falling can represent a surrender to the unconscious — a call to release control and trust an unfolding process rather than resist it.';
      if (lower.match(/chase|chased|running/))
        return 'Being pursued is often read as an encounter with the "shadow" — a disowned part of yourself seeking integration, not defeat.';
      if (lower.match(/water|ocean|drown/))
        return 'Water here symbolizes the collective unconscious — depth, mystery, and transformation. It may be inviting you toward deeper self-understanding.';
      return 'This dream may be presenting a symbol from your personal unconscious seeking integration. Ask what part of yourself the central figure or image might represent.';
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      {showToast && <div className="xp-toast">+XP EARNED</div>}

      <h1 className="screen-title">Field Journal</h1>
      <div className="mini-xp-bar">
        <div
          className="mini-xp-fill"
          style={{ width: Math.min(xp, 100) + '%' }}
        ></div>
      </div>

      <div className="journal-tabs">
        <div
          className={`journal-tab ${mode === 'journal' ? 'active' : ''}`}
          onClick={() => {
            setMode('journal');
            setInterpretation(null);
          }}
        >
          JOURNAL
        </div>
        <div
          className={`journal-tab ${mode === 'dream' ? 'active' : ''}`}
          onClick={() => {
            setMode('dream');
            setInterpretation(null);
          }}
        >
          DREAM LOG
        </div>
      </div>

      {mode === 'dream' && (
        <div className="lens-toggle">
          <button
            className={`lens-btn ${lens === 'freudian' ? 'active' : ''}`}
            onClick={() => setLens('freudian')}
          >
            FREUDIAN LENS
          </button>
          <button
            className={`lens-btn ${lens === 'jungian' ? 'active' : ''}`}
            onClick={() => setLens('jungian')}
          >
            JUNGIAN LENS
          </button>
        </div>
      )}

      <textarea
        className="journal-entry"
        placeholder={
          mode === 'journal'
            ? "Log today's thoughts, wins, and battles..."
            : 'Describe the dream — key images, feelings, people...'
        }
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />

      <button
        className="save-btn"
        onClick={mode === 'journal' ? saveJournalEntry : saveDreamEntry}
      >
        {mode === 'journal' ? 'SAVE ENTRY' : 'INTERPRET DREAM'}
      </button>

      {interpretation && (
        <div className="interpretation-card">
          <span className="interpretation-label">
            {mode === 'dream' ? `${lens} interpretation` : 'reflection'}
          </span>
          {interpretation}
          <div className="disclaimer">
            This is a reflective tool for self-exploration, not a clinical or
            definitive interpretation.
          </div>
        </div>
      )}

      {pastEntries.map((e, i) => (
        <div key={i} className="past-entry">
          <strong>
            {e.date} {e.type === 'dream' ? `· ${e.lens}` : ''}
          </strong>
          <p>{e.text}</p>
        </div>
      ))}
    </div>
  );
}
