import "../styles/Filters.css";

const Filters = ({ searchQuery, setSearchQuery, resultFilter, setResultFilter, venueFilter, setVenueFilter }) => {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search by opponent..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      <select value={resultFilter} onChange={(e) => setResultFilter(e.target.value)} className="filter">
        <option value="all">All Results</option>
        <option value="win">Wins</option>
        <option value="loss">Losses</option>
        <option value="draw">Draws</option>
      </select>
      <select value={venueFilter} onChange={(e) => setVenueFilter(e.target.value)} className="filter">
        <option value="all">All Venues</option>
        <option value="home">Home</option>
        <option value="away">Away</option>
      </select>
    </div>
  );
};

export default Filters;