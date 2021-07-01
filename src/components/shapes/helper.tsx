export default function setTitle(shapes: [string, boolean][], colors: [string, boolean][], setHeading: React.Dispatch<React.SetStateAction<string>>) {
  if (shapes.every(([, v]) => v === true) && colors.every(([, v]) => v === true)) {
    setHeading("All Items");
  } else if ((shapes.every(([, v]) => v === true) && colors.some(([, v]) => v === false)) || (shapes.some(([, v]) => v === false) && colors.every(([, v]) => v === true))) {
    setHeading("Multiple items")
    if (shapes.every(([, v]) => v === true) && colors.filter(([, v], _index, _arr) => v === true).length === 1) {
      const color = colors.filter(([, v], _index, _arr) => v === true)[0][0];
      setHeading(`All ${color} items`)
    } else if (colors.every(([, v]) => v === true) && shapes.filter(([, v], _index, _arr) => v === true).length === 1) {
      const shape = shapes.filter(([, v], _index, _arr) => v === true)[0][0];
      setHeading(`All ${shape} items`)
    }
  } else if (shapes.some(([, v]) => v === false) && colors.filter(([, v], _index, _arr) => v === true).length === 1) {
    const color = colors.filter(([, v], _index, _arr) => v === true)[0][0];
    setHeading(`Multiple ${color} items`)
    if (shapes.filter(([, v], _index, _arr) => v === true).length === 1 && colors.filter(([, v], _index, _arr) => v === true).length === 1) {
      const color = colors.filter(([, v], _index, _arr) => v === true)[0][0];
      const shape = shapes.filter(([, v], _index, _arr) => v === true)[0][0];
      setHeading(`${color} ${shape} item`)
    }
  } else if (colors.some(([, v]) => v === false) && shapes.filter(([, v], _index, _arr) => v === true).length === 1) {
    const shape = shapes.filter(([, v], _index, _arr) => v === true)[0][0];
    setHeading(`Multiple ${shape} items`)
    if (shapes.filter(([, v], _index, _arr) => v === true).length === 1 && colors.filter(([, v], _index, _arr) => v === true).length === 1) {
      const color = colors.filter(([, v], _index, _arr) => v === true)[0][0];
      const shape = shapes.filter(([, v], _index, _arr) => v === true)[0][0];
      setHeading(`${color} ${shape} item`)
    }
  } else if (shapes.filter(([, v], _index, _arr) => v === true).length === 1 && colors.filter(([, v], _index, _arr) => v === true).length === 1) {
    const color = colors.filter(([, v], _index, _arr) => v === true)[0][0];
    const shape = shapes.filter(([, v], _index, _arr) => v === true)[0][0];
    setHeading(`${color} ${shape} item`)
  }
}