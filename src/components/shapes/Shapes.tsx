import React, { useEffect, useState } from 'react';
import Styles from "./shapes.module.scss";
import Data from "../../shapes.json";

function Shapes(): JSX.Element {
  //console.log(Data);

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
          console.log(false);
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
          console.log(arr2.filter(([k, v], _index, _arr) => v === true))
          setHeading("All Items");
        } else if ((arr1.every(([k, v]) => v === true) && arr2.some(([k, v]) => v === false)) || (arr1.some(([k, v]) => v === false) && arr2.every(([k, v]) => v === true))) {
          console.log(arr2.filter(([k, v], _index, _arr) => v === true).length)
          setHeading("Multiple items")
          if (arr1.every(([k, v]) => v === true) && arr2.filter(([k, v], _index, _arr) => v === true).length === 1) {
            console.log(arr2.filter(([k, v], _index, _arr) => v === true)[0][0])
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
            setHeading(`${color} ${shape} items`)
          }
        } else if (arr2.some(([k, v]) => v === false) && arr1.filter(([k, v], _index, _arr) => v === true).length === 1) {
          const shape = arr1.filter(([k, v], _index, _arr) => v === true)[0][0];
          setHeading(`Multiple ${shape} items`)
          if (arr1.filter(([k, v], _index, _arr) => v === true).length === 1 && arr2.filter(([k, v], _index, _arr) => v === true).length === 1) {
            const color = arr2.filter(([k, v], _index, _arr) => v === true)[0][0];
            const shape = arr1.filter(([k, v], _index, _arr) => v === true)[0][0];
            setHeading(`${color} ${shape} items`)
          }
        } else if (arr1.filter(([k, v], _index, _arr) => v === true).length === 1 && arr2.filter(([k, v], _index, _arr) => v === true).length === 1) {
          const color = arr2.filter(([k, v], _index, _arr) => v === true)[0][0];
          const shape = arr1.filter(([k, v], _index, _arr) => v === true)[0][0];
          setHeading(`${color} ${shape} items`)
        }
      })
    })
  }

  // else if (arr1.some(([k, v]) => v === false) && arr2.filter(([k, v], _index, _arr) => v === true).length === 1) {
  //   const color = arr2.filter(([k, v], _index, _arr) => v === true)[0][0];
  //   setHeading(`Multiple ${color} items`)
  // } else if (arr2.some(([k, v]) => v === false) && arr1.filter(([k, v], _index, _arr) => v === true).length === 1) {
  //   const shape = arr1.filter(([k, v], _index, _arr) => v === true)[0][0];
  //   setHeading(`Multiple ${shape} items`)
  // }

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
            <label htmlFor="circle" className={`${Styles.checkbox} ${shapesState.circle ? 'selected' : 'unselected'}`}>
              circle<input type="checkbox" name="circle" id="circle"
                value="circle" checked={shapesState.circle} onChange={(e) => setShapesState(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.checked
                }))
                }
              />
            </label>
            <label htmlFor="oval" className={`${Styles.checkbox} ${shapesState.oval ? 'selected' : 'unselected'}`}>
              oval<input type="checkbox" name="oval" id="oval"
                value="oval" checked={shapesState.oval} onChange={(e) => setShapesState(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.checked
                }))
                }
              />
            </label>
            <label htmlFor="star" className={`${Styles.checkbox} ${shapesState.star ? 'selected' : 'unselected'}`}>
              star <input type="checkbox" name="star" id="star"
                value="star" checked={shapesState.star} onChange={(e) => setShapesState(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.checked
                }))
                }
              />
            </label>
            <label htmlFor="square" className={`${Styles.checkbox} ${shapesState.square ? 'selected' : 'unselected'}`}>
              square <input type="checkbox" name="square" id="square"
                value="square" checked={shapesState.square} onChange={(e) => setShapesState(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.checked
                }))
                }
              />
            </label>
            <label htmlFor="rectangle" className={`${Styles.checkbox} ${shapesState.rectangle ? 'selected' : 'unselected'}`}>
              rectangle <input type="checkbox" name="rectangle" id="rectangle"
                value="rectangle" checked={shapesState.rectangle} onChange={(e) => setShapesState(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.checked
                }))
                }
              />
            </label>
            <label htmlFor="triangle" className={`${Styles.checkbox} ${shapesState.triangle ? 'selected' : 'unselected'}`}>
              triangle <input type="checkbox" name="triangle" id="triangle"
                value="triangle" checked={shapesState.triangle} onChange={(e) => setShapesState(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.checked
                }))
                }
              />
            </label>
            <label htmlFor="pentagon" className={`${Styles.checkbox} ${shapesState.pentagon ? 'selected' : 'unselected'}`}>
              pentagon <input type="checkbox" name="pentagon" id="pentagon"
                value="pentagon" checked={shapesState.pentagon} onChange={(e) => setShapesState(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.checked
                }))
                }
              />
            </label>
          </div>
        </div>
        <div className={`${Styles.box}`}>
          <p className={`${Styles.text} capitalize mb__10`}>colors</p>
          <div className={`${Styles.flex} color-filter`}>
            <label htmlFor="blue" className={`${Styles.round} ${Styles.blue} ${colorState.blue ? 'highlighted' : 'unhighlighted'}`}>
              <input type="checkbox" name="blue" id="blue"
                value="blue" checked={colorState.blue} onChange={(e) => setColorState(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.checked
                }))}
              />
            </label>
            <label htmlFor="red" className={`${Styles.round} ${Styles.red} ${colorState.red ? 'highlighted' : 'unhighlighted'}`}>
              <input type="checkbox" name="red" id="red"
                value="red" checked={colorState.red} onChange={(e) => setColorState(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.checked
                }))}
              />
            </label>
            <label htmlFor="green" className={`${Styles.round} ${Styles.green} ${colorState.green ? 'highlighted' : 'unhighlighted'}`}>
              <input type="checkbox" name="green" id="green"
                value="green" checked={colorState.green} onChange={(e) => setColorState(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.checked
                }))}
              />
            </label>
            <label htmlFor="yellow" className={`${Styles.round} ${Styles.yellow} ${colorState.yellow ? 'highlighted' : 'unhighlighted'}`}>
              <input type="checkbox" name="yellow" id="yellow"
                value="yellow" checked={colorState.yellow} onChange={(e) => setColorState(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.checked
                }))}
              />
            </label>
            <label htmlFor="orange" className={`${Styles.round} ${Styles.orange} ${colorState.orange ? 'highlighted' : 'unhighlighted'}`}>
              <input type="checkbox" name="orange" id="orange"
                value="orange" checked={colorState.orange} onChange={(e) => setColorState(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.checked
                }))}
              />
            </label>
            <label htmlFor="grey" className={`${Styles.round} ${Styles.grey} ${colorState.grey ? 'highlighted' : 'unhighlighted'}`}>
              <input type="checkbox" name="grey" id="grey"
                value="grey" checked={colorState.grey} onChange={(e) => setColorState(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.checked
                }))}
              />
            </label>
            <label htmlFor="purple" className={`${Styles.round} ${Styles.purple} ${colorState.purple ? 'highlighted' : 'unhighlighted'}`}>
              <input type="checkbox" name="purple" id="purple"
                value="purple" checked={colorState.purple} onChange={(e) => setColorState(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.checked
                }))}
              />
            </label>
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