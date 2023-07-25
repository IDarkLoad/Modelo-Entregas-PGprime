import React, { useState } from 'react';
import './styles.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [deliveryType, setDeliveryType] = useState('');
  const [entregarEm, setEntregarEm] = useState('');

  // Mapear modelos para cada marca
  const brandModels = {
    Audi: ['A1', 'A3', 'A4', 'Q3', 'Q5'],
    BMW: ['Série 1', 'Série 3', 'Série 5', 'X1', 'X3'],
    Dodge: ['Challenger', 'Charger', 'Durango', 'RAM 1500'],
    Jaguar: ['F-Pace', 'XE', 'XF', 'XJ'],
    'Land Rover': ['Evoque', 'Discovery Sport', 'Range Rover Velar', 'Range Rover Sport'],
    Volvo: ['XC40', 'XC60', 'XC90', 'S60', 'S90'],
  };

  // Função para obter os modelos com base na marca selecionada
  function getModels(selectedBrand) {
    return brandModels[selectedBrand] || [];
  }

  function addTask(event) {
    event.preventDefault();

    if (!brand || !model || !deliveryType || !entregarEm) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const newTask = { brand, model, deliveryType, entregarEm };
    setTasks([...tasks, newTask]);
    setBrand('');
    setModel('');
    setDeliveryType('');
    setEntregarEm('');
  }

  function editTask(index) {
    const taskToEdit = tasks[index];
    setBrand(taskToEdit.brand);
    setModel(taskToEdit.model);
    setDeliveryType(taskToEdit.deliveryType);
    setEntregarEm(taskToEdit.entregarEm);
    deleteTask(index);
  }

  function deleteTask(index) {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  }

  function markAsCompleted(index) {
    const taskToComplete = tasks[index];
    deleteTask(index);
    setCompletedTasks([...completedTasks, taskToComplete]);
  }

  return (
    <div className="container">
      <h1>Controle de Entregas de Carros</h1>

      <form onSubmit={addTask}>
        <label htmlFor="brand">Marca:</label>
        <select id="brand" value={brand} onChange={(e) => { setBrand(e.target.value) }} required>
          <option value="" disabled>Selecione uma marca</option>
          <option value="Audi">Audi</option>
          <option value="BMW">BMW</option>
          <option value="Dodge">Dodge</option>
          <option value="Jaguar">Jaguar</option>
          <option value="Land Rover">Land Rover</option>
          <option value="Volvo">Volvo</option>
        </select>
        <label htmlFor="model">Modelo:</label>
        <select id="model" value={model} onChange={(e) => setModel(e.target.value)} required>
          <option value="" disabled>Selecione um modelo</option>
          {getModels(brand).map((model) => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
        <label htmlFor="deliveryType">Tipo de Entrega:</label>
        <select id="deliveryType" value={deliveryType} onChange={(e) => setDeliveryType(e.target.value)} required>
          <option value="" disabled>Selecione o tipo de entrega</option>
          <option value="Caminhão Fechado">Caminhão Fechado</option>
          <option value="Cegonha">Cegonha</option>
          <option value="Motorista">Motorista</option>
        </select>
        <label htmlFor="entregarEm">Entregar em:</label>
        <input type="text" id="entregarEm" value={entregarEm} onChange={(e) => setEntregarEm(e.target.value)} required placeholder="Insira o local de entrega" />
        <button type="submit">Adicionar Tarefa de Entrega</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Tipo de Entrega</th>
            <th>Entregar em</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.brand}</td>
              <td>{task.model}</td>
              <td>{task.deliveryType}</td>
              <td>{task.entregarEm}</td>
              <td>
                <button onClick={() => editTask(index)}>Editar</button>
                <button onClick={() => deleteTask(index)}>Excluir</button>
                <button className="completed-btn" onClick={() => markAsCompleted(index)}>Concluído</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="completed-tasks">
        <h2>Tarefas Concluídas</h2>
        <ul>
          {completedTasks.map((task, index) => (
            <li key={index}>{task.brand} {task.model} ({task.deliveryType}) - Entregar em: {task.entregarEm}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;


