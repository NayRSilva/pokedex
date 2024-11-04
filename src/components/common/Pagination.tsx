import React, { useState, useEffect } from 'react';
// Not used
interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  totalPages,
}) => {
  const [inputValue, setInputValue] = useState<number>(page);

  // Sync inputValue with page prop when page changes
  useEffect(() => {
    setInputValue(page);
  }, [page]);

  // Handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setInputValue(newValue);
  };

  // Handle submitting input to go to specific page
  const handleGoToPage = () => {
    if (inputValue >= 1 && inputValue <= totalPages) {
      setPage(inputValue);
    } else {
      alert(`Please enter a number between 1 and ${totalPages}`);
    }
  };

  // Trigger handleGoToPage on Enter key press
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleGoToPage();
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Handle Enter key
          min={1}
          max={totalPages}
          style={{ width: '60px', textAlign: 'center' }}
        />
        <button onClick={handleGoToPage}>Go</button>
      </div>
    </div>
  );
};

export default Pagination;
