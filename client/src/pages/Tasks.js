import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Tasks() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');

  const fetchTasks = async () => {
    const res = await getTasks(user.token);
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableData = tasks.map(t => [t.title, t.description, t.deadline, t.assignedTo, t.status]);
    doc.autoTable({ head: [['Title', 'Description', 'Deadline', 'Assigned To', 'Status']], body: tableData });
    doc.save('tasks.pdf');
  };

  return (
    <div>
      <input type="text" placeholder="Search tasks" onChange={(e) => setSearch(e.target.value)} />
      <button onClick={downloadPDF}>Download Tasks PDF</button>
      <ul>
        {tasks.filter(t => t.title.includes(search)).map(t => (
          <li key={t._id}>{t.title} - {t.status}</li>
        ))}
      </ul>
    </div>
  );
}