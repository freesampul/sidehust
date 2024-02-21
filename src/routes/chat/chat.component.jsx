import React, { useState } from 'react';

// Define the options and their sub-texts
const optionsData = [
  { id: 1, text: "Option 1", subTexts: ["Sub 1.1", "Sub 1.2"] },
  { id: 2, text: "Option 2", subTexts: ["Sub 2.1", "Sub 2.2"] },
  { id: 3, text: "Option 3", subTexts: ["Sub 2.1", "Sub 2.2"] },
  { id: 4, text: "Option 4", subTexts: ["Sub 2.1", "Sub 2.2"] },
  { id: 5, text: "Option 5", subTexts: ["Sub 2.1", "Sub 2.2"] },
  { id: 6, text: "Option 6", subTexts: ["Sub 2.1", "Sub 2.2"] },
  { id: 7, text: "Option 7", subTexts: ["Sub 2.1", "Sub 2.2"] },
  { id: 8, text: "Option 8", subTexts: ["Sub 2.1", "Sub 2.2"] },
  { id: 9, text: "Option 9", subTexts: ["Sub 2.1", "Sub 2.2"] },
  { id: 10, text: "Option 10", subTexts: ["Sub 2.1", "Sub 2.2"] },
  { id: 11, text: "Option 11", subTexts: ["Sub 2.1", "Sub 2.2"] },
  { id: 12, text: "Option 12", subTexts: ["Sub 2.1", "Sub 2.2"] },
  { id: 13, text: "Option 13", subTexts: ["Sub 10.1", "Sub 10.2"] },
];

const Chat = () => {
    const [displayedOptions, setDisplayedOptions] = useState(optionsData.slice(0, 10));
    const [page, setPage] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState([]);
  
    const handleSelectOption = (optionId) => {
      const option = optionsData.find(opt => opt.id === optionId);
      if (option) {
        setSelectedOptions([...selectedOptions, option]);
      }
    };
  
    const handleMoreOptions = () => {
      const nextPage = page + 1;
      setPage(nextPage);
      const nextOptions = optionsData.slice(nextPage * 10, (nextPage + 1) * 10);
      setDisplayedOptions([...displayedOptions, ...nextOptions]);
    };
  
    return (
      <div style={{ height: '500px', overflowY: 'scroll' }}>
        {selectedOptions.length === 0 && (
          <>
            {displayedOptions.map((option) => (
              <div key={option.id} style={{ margin: '10px', padding: '10px', border: '1px solid black', cursor: 'pointer' }}
                onClick={() => handleSelectOption(option.id)}>
                {option.text}
              </div>
            ))}
            {displayedOptions.length < optionsData.length && (
              <button onClick={handleMoreOptions}>More Options</button>
            )}
          </>
        )}
        {selectedOptions.map((option, index) => (
          <div key={option.id} style={{ margin: '10px', padding: '10px', border: '1px solid blue', backgroundColor: '#f0f0f0' }}>
            <div>{option.text}</div>
            {option.subTexts.map((subText, subIndex) => (
              <input key={subIndex} type="text" value={subText} readOnly style={{ display: 'block', margin: '10px 0' }}/>
            ))}
          </div>
        ))}
      </div>
    );
  };
  

export default Chat;
