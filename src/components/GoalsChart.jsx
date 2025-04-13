import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../styles/GoalsChart.css';

const GoalsChart = ({ matches }) => {
  const chartData = matches.map(match => ({
    name: new Date(match.fixture.date).toLocaleDateString(),
    goals: match.goals.home + match.goals.away,
  }));

  return (
    <div className="chart-section">
      <h2>Goals per Match</h2>
      <LineChart width={800} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="goals" stroke="#a52a2a" />
      </LineChart>
    </div>
  );
};

export default GoalsChart;