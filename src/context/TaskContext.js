import React, { createContext, useMemo, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [pastTasks, setPastTasks] = useState([]);

  // Filters & sorting
  const [statusFilter, setStatusFilter] = useState('all'); // all | active | done
  const [categoryFilter, setCategoryFilter] = useState(''); // '' means all
  const [titleQuery, setTitleQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt'); // createdAt | title | category | status
  const [sortDir, setSortDir] = useState('desc'); // asc | desc

  const addTask = (task) => {
    const t = {
      id: task.id ?? Date.now(),
      text: task.text ?? '',
      category: task.category ?? 'General',
      done: !!task.done,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setTasks(prev => [...prev, t]);
  };

  const removeTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    const removed = tasks.find(t => t.id === taskId);
    if (removed) setPastTasks(prev => [...prev, removed]);
  };

  const toggleDone = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, done: !t.done, updatedAt: Date.now() } : t));
  };

  const updateTask = (taskId, updates) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...updates, updatedAt: Date.now() } : t));
  };

  const clearFilters = () => { setStatusFilter('all'); setCategoryFilter(''); setTitleQuery(''); setSortBy('createdAt'); setSortDir('desc'); };

  const visibleTasks = useMemo(() => {
    let list = [...tasks];
    // filter
    if (statusFilter !== 'all') list = list.filter(t => statusFilter === 'done' ? t.done : !t.done);
    if (categoryFilter) list = list.filter(t => (t.category || '') === categoryFilter);
    if (titleQuery.trim()) {
      const q = titleQuery.toLowerCase();
      list = list.filter(t => (t.text || '').toLowerCase().includes(q));
    }
    // sort
    list.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      const av = sortBy === 'title' ? (a.text || '') :
                 sortBy === 'category' ? (a.category || '') :
                 sortBy === 'status' ? (a.done ? 1 : 0) :
                 (a.createdAt || 0);
      const bv = sortBy === 'title' ? (b.text || '') :
                 sortBy === 'category' ? (b.category || '') :
                 sortBy === 'status' ? (b.done ? 1 : 0) :
                 (b.createdAt || 0);
      if (av < bv) return -1 * dir;
      if (av > bv) return  1 * dir;
      return 0;
    });
    return list;
  }, [tasks, statusFilter, categoryFilter, titleQuery, sortBy, sortDir]);

  return (
    <TaskContext.Provider value={{
      tasks, pastTasks,
      addTask, removeTask, toggleDone, updateTask,
      statusFilter, setStatusFilter,
      categoryFilter, setCategoryFilter,
      titleQuery, setTitleQuery,
      sortBy, setSortBy, sortDir, setSortDir,
      visibleTasks, clearFilters,
    }}>
      {children}
    </TaskContext.Provider>
  );
};
