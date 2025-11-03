
////export default Home;
//import React, { useContext, useState } from "react";
////import Header from "../components/Header";
//import CategorySelect from "../components/CategorySelect";
//import TaskCard from "../components/TaskCard";
//import TaskForm from "../components/TaskForm";
//import { TaskContext } from "../context/TaskContext";
//import "../styles/App.css";

//const Home = () => {
//    const { tasks, addTask, deleteTask } = useContext(TaskContext);
//    const [filter, setFilter] = useState("All");
//    const filteredTasks = tasks.filter((t) => {
//        if (filter === "All") return true; // show everything
//        if (filter === "General") return !t.done; // only unfinished
//        return t.category === filter; // show only tasks in the selected category
//    });




//    // Filter tasks by category
//    //const filteredTasks =
//    //    filter === "All" ? tasks : tasks.filter((t) => t.category === filter);

//    return (
//        <>
//            <div className="container">
//                {/* Add Task Form (using context addTask) */}
//                <TaskForm addTask={addTask} />

//                {/* Category Filter */}
//                {/*<CategorySelect filter={filter} setFilter={setFilter} />*/}
//                <CategorySelect value={filter} onChange={setFilter} includeAll />

//                {/* Task List Display */}
//                <div className="task-list">
//                    <h2>📝 Current Tasks</h2>
//                    {filteredTasks.length === 0 ? (
//                        <p>No tasks yet. Please add some!</p>
//                    ) : (
//                        filteredTasks.map((task) => (
//                            <TaskCard key={task.id} task={task} onDelete={deleteTask} />
//                        ))
//                    )}
//                </div>

//                {/* Calendar View (from your first version) */}
//                <div className="calendar-view">
//                    <h3>📅 Calendar View</h3>
//                    {tasks.length === 0 ? <p>No tasks yet</p> : <p>Coming soon...</p>}
//                </div>
//            </div>
//        </>
//    );
//};

//export default Home;
import React, { useContext, useState } from "react";
import CategorySelect from "../components/CategorySelect";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { TaskContext } from "../context/TaskContext";
import "../styles/App.css";

const Home = () => {
    const { tasks, addTask, deleteTask } = useContext(TaskContext);
    const [filter, setFilter] = useState("All");

    // Filter tasks by category
    const filteredTasks = tasks.filter((t) => {
        if (filter === "All") return true;
        if (filter === "General") return !t.done;
        return t.category === filter;
    });

    return (
        <div className="home-container">
            {/* Add Task Form */}
            <div className="task-form-section">
                <TaskForm addTask={addTask} />
            </div>

            {/* Category Filter */}
            <div className="category-select-section">
                <CategorySelect value={filter} onChange={setFilter} includeAll />
            </div>

            {/* Task List Display */}
            <div className="task-list-section">
                <h2>📝 Current Tasks</h2>
                {filteredTasks.length === 0 ? (
                    <p>No tasks yet. Please add some!</p>
                ) : (
                    filteredTasks.map((task) => (
                        <TaskCard key={task.id} task={task} onDelete={deleteTask} />
                    ))
                )}
            </div>

            {/* Calendar View */}
            <div className="calendar-view-section">
                <h3>📅 Calendar View</h3>
                {tasks.length === 0 ? <p>No tasks yet</p> : <p>Coming soon...</p>}
            </div>
        </div>
    );
};

export default Home;
