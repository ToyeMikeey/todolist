import { useState, useEffect } from 'react';
import './App.css';

let idCounter = 0;

function App() {
  const [listItem, setListItem] = useState(() => {
    const savedList = JSON.parse(localStorage.getItem('listItem'));
    return savedList || [];
  });
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem('listItem', JSON.stringify(listItem));
  }, [listItem]);

  useEffect(() => {
    const savedIdCounter = localStorage.getItem('idCounter');
    if (savedIdCounter !== null) {
      idCounter = parseInt(savedIdCounter, 10);
    } else {
      idCounter = 0;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('idCounter', idCounter);
  }, [listItem]);

  const EnterItem = () => {
    if (inputValue !== "") {
      const newItem = {
        text: inputValue,
        id: idCounter++,
        isChecked: false,
      };
      setListItem([...listItem, newItem]);
      setInputValue('');
      localStorage.setItem('idCounter', idCounter); 
    }
  };

  const removeItem = (id) => {
    setListItem(listItem.filter(item => item.id !== id));
  };

  const toggleCheck = (id) => {
    setListItem(listItem.map(item =>
      item.id === id
        ? { ...item, isChecked: !item.isChecked }
        : item
    ));
  };

  const clearAll = () => {
    setListItem([]);
    localStorage.removeItem('listItem'); 
  };

  return (
    <div className='con'>
      <div className='enter'>
        <input
          value={inputValue}
          id='listEntry'
          placeholder='Click to type'
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button id='bttn' onClick={EnterItem}>Enter</button>
        <button id='bttn' style={{ backgroundColor: 'red' }} onClick={clearAll}>Clear All</button>
      </div>
      <div>
        {listItem.map((item) => (
          <div className='list-display' key={item.id}>
            <input
              type='checkbox'
              className='check-item'
              checked={item.isChecked}
              onChange={() => toggleCheck(item.id)}
            />
            <h1 style={{ textDecoration: item.isChecked ? 'line-through' : 'none' }}>
              {item.text}
            </h1>
            <button className='close-button' onClick={() => removeItem(item.id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
