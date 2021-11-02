import { useState } from "react";

function useInputState(initialValue) {
  const [value, setValue] = useState(initialValue);

  const update = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return [value, update, reset];
}

export default useInputState;
