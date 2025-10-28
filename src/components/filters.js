import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import CategorySelect from './CategorySelect';

const Filters = () => {
  const {
    statusFilter, setStatusFilter,
    categoryFilter, setCategoryFilter,
    titleQuery, setTitleQuery,
    sortBy, setSortBy, sortDir, setSortDir,
    clearFilters
  } = useContext(TaskContext);

  return (
    <div className="task-filters card" style={{padding:'12px', marginBottom:'16px'}}>
      <div style={{display:'grid', gridTemplateColumns:'repeat(5, minmax(0,1fr))', gap:'8px'}}>
        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="done">Done</option>
        </select>
        <CategorySelect value={categoryFilter} onChange={setCategoryFilter} includeAll />
        <input placeholder="Search title..." value={titleQuery} onChange={e=>setTitleQuery(e.target.value)} />
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)}>
          <option value="createdAt">Sort: Created</option>
          <option value="title">Sort: Title</option>
          <option value="category">Sort: Category</option>
          <option value="status">Sort: Status</option>
        </select>
        <select value={sortDir} onChange={e=>setSortDir(e.target.value)}>
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>
      <div style={{marginTop:'8px', textAlign:'right'}}>
        <button className="btn" onClick={clearFilters}>Reset</button>
      </div>
    </div>
  );
};

export default Filters;
