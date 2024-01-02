import { BaseSyntheticEvent, useEffect, useState } from 'react'

const getRandomColor = () => {
  const possibleValues: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  const color = new Array(6).fill('').map(() => possibleValues[Math.floor(Math.random() * possibleValues.length)])
  return `#${color.join("")}`
}

enum Result {
  Correct,
  Wrong
}

export default function ColorBox() {
  const [color, setColor] = useState<string>("")
  const [options, setOptions] = useState<string[]>([])

  const [result, setIsResult] = useState<Result | undefined>(undefined)


  const generateColor = () => {
    const actualColor = getRandomColor()
    setOptions([actualColor, getRandomColor(), getRandomColor(), getRandomColor()].sort(() => 0.5 - Math.random()))
    setColor(actualColor)
  }

  useEffect(() => {
    generateColor();
  }, [])

  function handleAnswerClicked(e: BaseSyntheticEvent, answer: string) {
    if (answer === color) {
      setIsResult(Result.Correct);
      generateColor();
    } else {
      e.target.disabled = true;
      setIsResult(Result.Wrong);
    }
  }

  return (
    <div className='wrapper-flex'>
      {result === Result.Wrong && <div style={{ color: "red", fontSize: "1.5rem", fontStyle: "system-ui" }}> Wrong Answer </div>}
      {result === Result.Correct && <div style={{ color: "green", fontSize: "1.5rem", fontStyle: "system-ui" }}>Correct</div>}
      <div
        className='color-box'
        style={{
          backgroundColor: `${color}`,
        }}
      >
      </div>
      <span>
        {options.map((option) => (
          <button onClick={(e) => handleAnswerClicked(e, option)} key={option}>
            {option}
          </button>
        ))}
      </span>
    </div>
  )
}

