import React, { useEffect, useRef, useState } from 'react';
import Styles from "./shapes.module.scss";
import Data from "../../shapes.json";
import ColorCheckbox from './ColorCheckbox';
import ShapeCheckbox from './ShapeCheckbox';
import helper from './helper';

function Shapes(): JSX.Element {
  const [heading, setHeading] = useState<string>("All Items");
  const [shapesState, setShapesState] = useState<{[key: string]: boolean}>({
    circle: true,
    oval: true,
    star: true,
    square: true,
    rectangle: true,
    triangle: true,
    pentagon: true,
  });
  const [colorState, setColorState] = useState<{[key: string]: boolean}>({
    blue: true,
    red: true,
    green: true,
    yellow: true,
    orange: true,
    grey: true,
    purple: true
  })

  function filterCards(): void {
    const wrapper = document.getElementsByClassName('items')[0];
    Object.entries(shapesState).map(([key, value], _index, shapes) => {
      //console.log(key + " " + value)
      Object.entries(colorState).map(([color, boole], _index, colors) => {
        //console.log(key + " " + value)
        if (shapes.every(([k, v]) => v === false) || colors.every(([k, v]) => v === false)) {
          setShapesState(prevState => ({
            ...prevState,
            circle: true,
            oval: true,
            star: true,
            square: true,
            rectangle: true,
            triangle: true,
            pentagon: true,
          }))
          setColorState(prevState => ({
            ...prevState,
            blue: true,
            red: true,
            green: true,
            yellow: true,
            orange: true,
            grey: true,
            purple: true
          }))
        }
        helper(shapes, colors, setHeading)
      })
    })
  }

  useEffect(() => {
    filterCards()
  }, [shapesState, colorState])

  return (
    <main className={`${Styles.container}`}>
      <div>
        <h3 className="capitalize">filters</h3>
        <div className={`${Styles.box}`}>
          <p className={`${Styles.text} capitalize mb__10`}>shapes</p>
          <div className={`${Styles.flex} shapes-filter`}>
            {
              Object.entries(shapesState).map(([key, value], index, shapes) => (
                <ShapeCheckbox key={index} shape={key} isChecked={value} handleChange={setShapesState} />
              ))
            }
          </div>
        </div>
        <div className={`${Styles.box}`}>
          <p className={`${Styles.text} capitalize mb__10`}>colors</p>
          <div className={`${Styles.flex} color-filter`}>
            {
              Object.entries(colorState).map(([key, value], index, colors) => (
                <ColorCheckbox key={index} color={key} isChecked={value} handleChange={setColorState} />
              ))
            }
          </div>
        </div>
      </div>
      <div>
        <h4>{heading}</h4>
        <div className={`${Styles.grid__item} items`}>
          {
            Data.data.map(({ color, name, svg  }, index) => (
              <div key={index} className={`${Styles.grid__item_box} ${shapesState[name as keyof typeof shapesState] && colorState[color as keyof typeof colorState] === true ? "show" : "hide"}`}>
                <img src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`} alt={`${color} ${name}`} />
              </div>
            ))
          }
        </div>
      </div>
    </main>
  )
}

export default Shapes;