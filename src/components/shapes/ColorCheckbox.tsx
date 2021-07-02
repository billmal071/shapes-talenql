import React from 'react';
import Styles from "./shapes.module.scss";

export type Props = {
  color: string,
  isChecked: boolean,
  handleChange: React.Dispatch<React.SetStateAction<{
    [key: string]: boolean;
}>>
}

function ColorCheckbox({ color, isChecked, handleChange }: Props) {
  return (
    <>
      <label htmlFor={color} className={`${Styles.round} ${Styles[color]} ${isChecked ? 'highlighted' : 'unhighlighted'}`}>
        <input data-testid={color} type="checkbox" name={color} id={color}
          value={color} checked={isChecked} onChange={(e) => handleChange(prevState => ({
            ...prevState,
            [e.target.name]: e.target.checked
          }))}
        />
      </label>
    </>
  )
}

export default ColorCheckbox
