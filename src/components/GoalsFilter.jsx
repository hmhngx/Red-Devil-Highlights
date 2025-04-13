import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import "../styles/GoalsFilter.css";

const GoalsFilter = ({ goalsSlider, setGoalsSlider, minGoals, setMinGoals, maxGoals, setMaxGoals }) => {
  return (
    <div className="goals-filter">
      <label>Total Goals (Max: {goalsSlider})</label>
      <Slider
        min={0}
        max={10}
        value={goalsSlider}
        onChange={setGoalsSlider}
        trackStyle={{ backgroundColor: '#a52a2a', height: 5 }}
        handleStyle={{ borderColor: '#a52a2a', backgroundColor: '#fff' }}
        railStyle={{ backgroundColor: '#555', height: 5 }}
      />
      <div className="min-max-inputs">
        <input
          type="number"
          placeholder="Min Goals"
          value={minGoals}
          onChange={(e) => setMinGoals(e.target.value)}
          className="min-max"
        />
        <input
          type="number"
          placeholder="Max Goals"
          value={maxGoals}
          onChange={(e) => setMaxGoals(e.target.value)}
          className="min-max"
        />
      </div>
    </div>
  );
};

export default GoalsFilter;