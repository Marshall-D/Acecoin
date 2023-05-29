import InputMask from 'react-input-mask';

function MonthInput(props) {
  let mask = 'mM';
  let formatChars = {
    'm': '[0-1]',
    'M': '[0-9]'
    
  };

  let beforeMaskedValueChange = (newState, oldState, userInput) => {
    let { value } = newState;

    let dateParts = value.split('-');
    let monthPart = dateParts[0];

    // Conditional mask for the 2nd digit of month based on the first digit
    if(monthPart.startsWith('1'))
      formatChars['M'] = '[0-2]'; // To block 13, 15, etc.
    else
      formatChars['M'] = '[1-9]'; // To allow 05, 08, etc - but blocking 00.

    

    return {value, selection: newState.selection};
  }
  return (
    <InputMask
      mask={mask}
      value={props.value}
      onChange={props.onChange}
      formatChars={formatChars}
      beforeMaskedValueChange={beforeMaskedValueChange}>
    </InputMask>
  );
}
export default MonthInput