import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getTasks, createTask } from '../services/taskService';
import jsPDF from 'jspdf';

export default function Tasks() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await getTasks(user.token);
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    tasks.forEach((t, i) => { doc.text(`${i+1}. ${t.title} - ${t.status}`, 10, 10 + (i * 10)); });
    doc.save('tasks.pdf');
  };

  return (
    <div>
      <button onClick={downloadPDF}>Download Tasks PDF</button>
      {/* Add form & task list here */}
    </div>
  );
}
