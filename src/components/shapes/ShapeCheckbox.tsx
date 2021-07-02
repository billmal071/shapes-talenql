import React from 'react';
import Styles from "./shapes.module.scss";

export type Props = {
  shape: string,
  isChecked: boolean,
  handleChange: React.Dispatch<React.SetStateAction<{
    [key: string]: boolean;
}>>
}

function ShapeCheckbox({ shape, isChecked, handleChange }: Props) {
  return (
    <>
      <label htmlFor={shape} className={`${Styles.checkbox} ${isChecked ? 'selected' : 'unselected'}`}>
        {shape}<input data-testid={shape} type="checkbox" name={shape} id={shape}
          value={shape} checked={isChecked} onChange={(e) => handleChange(prevState => ({
            ...prevState,
            [e.target.name]: e.target.checked
          }))
          }
        />
      </label>
    </>
  )
}

export default ShapeCheckbox
