import './Radio.css'

function RadioButton({selectedOption, setSelectedOption}) {

  // Handle radio button change
  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className='radio-container'>
      <h3>Are you Patient or HealthCare Provider</h3>

      <label>
        <input
          type="radio"
          value="patient"
          checked={selectedOption === 'patient'}
          onChange={handleOptionChange}
        />
        <span>Patient</span>
      </label>

      <label>
        <input
          type="radio"
          value="healthCareProvider"
          checked={selectedOption === 'healthCareProvider'}
          onChange={handleOptionChange}
        />
        <span>HealthCareProvider</span>
      </label>

      <p>Selected Option: {selectedOption}</p>
    </div>
  );
}

export default RadioButton;
