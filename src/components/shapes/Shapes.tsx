import React, { useEffect, useState } from 'react';
import Styles from "./shapes.module.scss";
import Data from "../../shapes.json";
import ColorCheckbox from './ColorCheckbox';
import ShapeCheckbox from './ShapeCheckbox';

function Shapes(): JSX.Element {
  const [heading, setHeading] = useState<string>("All Items");
  const [shapesState, setShapesState] = useState({
    circle: true,
    oval: true,
    star: true,
    square: true,
    rectangle: true,
    triangle: true,
    pentagon: true,
  });
  const [colorState, setColorState] = useState({
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
    Object.entries(shapesState).map(([key, value], _index, arr1) => {
      //console.log(key + " " + value)
      Object.entries(colorState).map(([color, boole], _index, arr2) => {
        //console.log(key + " " + value)

        if (!value || !boole) {
          //console.log(key)
          for (let classes of wrapper.children) {
            //console.log(classes.classList)
            if (classes.classList.contains(key) && classes.classList.contains(color)) {
              //console.log(classes)
              classes.classList.add('hide');
              classes.classList.remove('show');
            }
          }
        } else if (value || boole) {
          for (let classes of wrapper.children) {
            //console.log(classes.classList)
            if (classes.classList.contains(key) && classes.classList.contains(color)) {
              //console.log(classes)
              classes.classList.add('show');
              classes.classList.remove('hide');
            }
          }
        }
        if (arr1.every(([k, v]) => v === false) || arr2.every(([k, v]) => v === false)) {
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
          for (let classes of wrapper.children) {
            classes.classList.add('show');
            classes.classList.remove('hide');
          }
        }
        if (arr1.every(([k, v]) => v === true) && arr2.every(([k, v]) => v === true)) {
          setHeading("All Items");
        } else if ((arr1.every(([k, v]) => v === true) && arr2.some(([k, v]) => v === false)) || (arr1.some(([k, v]) => v === false) && arr2.every(([k, v]) => v === true))) {
          setHeading("Multiple items")
          if (arr1.every(([k, v]) => v === true) && arr2.filter(([k, v], _index, _arr) => v === true).length === 1) {
            const color = arr2.filter(([k, v], _index, _arr) => v === true)[0][0];
            setHeading(`All ${color} items`)
          } else if (arr2.every(([k, v]) => v === true) && arr1.filter(([k, v], _index, _arr) => v === true).length === 1) {
            const shape = arr1.filter(([k, v], _index, _arr) => v === true)[0][0];
            setHeading(`All ${shape} items`)
          }
        } else if (arr1.some(([k, v]) => v === false) && arr2.filter(([k, v], _index, _arr) => v === true).length === 1) {
          const color = arr2.filter(([k, v], _index, _arr) => v === true)[0][0];
          setHeading(`Multiple ${color} items`)
          if (arr1.filter(([k, v], _index, _arr) => v === true).length === 1 && arr2.filter(([k, v], _index, _arr) => v === true).length === 1) {
            const color = arr2.filter(([k, v], _index, _arr) => v === true)[0][0];
            const shape = arr1.filter(([k, v], _index, _arr) => v === true)[0][0];
            setHeading(`${color} ${shape} item`)
          }
        } else if (arr2.some(([k, v]) => v === false) && arr1.filter(([k, v], _index, _arr) => v === true).length === 1) {
          const shape = arr1.filter(([k, v], _index, _arr) => v === true)[0][0];
          setHeading(`Multiple ${shape} items`)
          if (arr1.filter(([k, v], _index, _arr) => v === true).length === 1 && arr2.filter(([k, v], _index, _arr) => v === true).length === 1) {
            const color = arr2.filter(([k, v], _index, _arr) => v === true)[0][0];
            const shape = arr1.filter(([k, v], _index, _arr) => v === true)[0][0];
            setHeading(`${color} ${shape} item`)
          }
        } else if (arr1.filter(([k, v], _index, _arr) => v === true).length === 1 && arr2.filter(([k, v], _index, _arr) => v === true).length === 1) {
          const color = arr2.filter(([k, v], _index, _arr) => v === true)[0][0];
          const shape = arr1.filter(([k, v], _index, _arr) => v === true)[0][0];
          setHeading(`${color} ${shape} item`)
        }
      })
    })
  }

  useEffect(() => {
    filterCards()
  }, [shapesState, colorState])

  useEffect(() => {
    const items = document.getElementsByClassName('items')[0];
    let img = document.createElement('img');
    Data.data.map(({ color, name, svg }, index) => {
      items.innerHTML += `
      <div key=${index} class="${Styles.grid__item_box} ${color} ${name}">
      ${img.src = svg}
    </div>
      `
    })
  }, [])

  return (
    <main className={`${Styles.container}`}>
      <div>
        <h3 className="capitalize">filters</h3>
        <div className={`${Styles.box}`}>
          <p className={`${Styles.text} capitalize mb__10`}>shapes</p>
          <div className={`${Styles.flex} shapes-filter`}>
            {
              Object.entries(shapesState).map(([key, value], index, arr1) => (
                <ShapeCheckbox key={index} shape={key} isChecked={value} handleChange={setShapesState} />
              ))
            }
          </div>
        </div>
        <div className={`${Styles.box}`}>
          <p className={`${Styles.text} capitalize mb__10`}>colors</p>
          <div className={`${Styles.flex} color-filter`}>
            {
              Object.entries(colorState).map(([key, value], index, arr2) => (
                <ColorCheckbox key={index} color={key} isChecked={value} handleChange={setColorState} />
              ))
            }
          </div>
        </div>
      </div>
      <div>
        <h4>{heading}</h4>
        <div className={`${Styles.grid__item} items`}>
        </div>
      </div>
    </main>
  )
}

export default Shapes;