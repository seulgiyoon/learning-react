import React, {useState} from 'react';

const IterationSample = () => {
  const [names, setNames] = useState([
    {id: 1, text: '강아지'}, 
    {id: 2, text: '고양이'}, 
    {id: 3, text: '염소'}
  ]);
  const [inputText, setInputText] = useState('');
  const [nextId, setNextId] = useState(4);

  const onChange = (e) => setInputText(e.target.value);
  
  const onKeyPress = (e) => {
    if(e.key === 'Enter') {
      const newName = names.concat(
        {id: nextId, text: inputText}
        );
        setNames(newName);
        setNextId(nextId + 1);
        setInputText('');
      }
    }
    
  const onRemove = (id) => {
    const filteredNames = names.filter(name => name.id !== id);
    setNames(filteredNames);
  }
  
  const animalList = names.map(name => (
    <li
      key={name.id} onDoubleClick={() => onRemove(name.id)}
    >{name.text}</li>
  ));

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <ul>{animalList}</ul>
    </div>
  );
};

export default IterationSample;