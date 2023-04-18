const Filter = ({ newFilter, setNewFilter }) => {
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };
  return (
    <div>
      find countries:
      <input value={newFilter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
