import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // ✅ Correct import

const Tasks = () => {
  const authState = useSelector(state => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = {
      url: "/tasks",
      method: "get",
      headers: { Authorization: authState.token }
    };
    fetchData(config, { showSuccessToast: false }).then(data => {
      if (data && data.tasks) {
        setTasks(data.tasks);
      }
    });
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  const handleDelete = (id) => {
    const config = {
      url: `/tasks/${id}`,
      method: "delete",
      headers: { Authorization: authState.token }
    };
    fetchData(config).then(() => fetchTasks());
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Your Task List', 14, 22);
    doc.setFontSize(12);
    doc.setTextColor(100);

    const tableColumn = ["#", "Description"];
    const tableRows = tasks.map((task, index) => [index + 1, task.description]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save('tasks.pdf');
  };

  return (
    <div className="my-2 mx-auto max-w-[700px] py-4">
      <div className="flex justify-between items-center">
        {tasks.length > 0 && <h2 className='my-2 ml-2 md:ml-0 text-xl'>Your tasks ({tasks.length})</h2>}
        {tasks.length > 0 && (
          <button
            onClick={generatePDF}
            className="bg-green-500 text-white hover:bg-green-600 font-medium rounded-md px-4 py-2"
          >
            Download PDF
          </button>
        )}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div>
          {tasks.length === 0 ? (
            <div className='w-[600px] h-[300px] flex items-center justify-center gap-4'>
              <span>No tasks found</span>
              <Link to="/tasks/add" className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2">
                + Add new task
              </Link>
            </div>
          ) : (
            tasks.map((task, index) => (
              <div key={task._id} className='bg-white my-4 p-4 text-gray-600 rounded-md shadow-md'>
                <div className='flex'>
                  <span className='font-medium'>Task #{index + 1}</span>

                  <Tooltip text="Edit this task" position="top">
                    <Link to={`/tasks/${task._id}`} className='ml-auto mr-2 text-green-600 cursor-pointer'>
                      <i className="fa-solid fa-pen"></i>
                    </Link>
                  </Tooltip>

                  <Tooltip text="Delete this task" position="top">
                    <span className='text-red-500 cursor-pointer' onClick={() => handleDelete(task._id)}>
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  </Tooltip>
                </div>
                <div className='whitespace-pre'>{task.description}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Tasks;
