'use client'

import styles from './page.module.css'
import DigitInput from './components/DigitInput'
import { useState } from 'react'

export interface IProblem {
  str: string
  c: string
  index: number
  value: number | null
}

function parseProblem(problemString: string): IProblem[][] {
  const strings = problemString.split('_')
  if (strings.length < 3) {
    return []
  }

  const problems: IProblem[][] = []

  for (let str of strings) {
    problems.push(
      str.split('').map((c, index) => ({
        str: strings[0],
        c,
        index,
        value: null,
      }))
    )
  }
  return problems
}

export default function Home() {
  const problem = 'ADA_DI_DIA'

  const [state, setState] = useState<IProblem[][]>(parseProblem(problem))

  const handleChange =
    (problemIndex: number) => (index: number, value: number | null) => {
      const newState = { ...state }
      newState[problemIndex][index].value = value
      setState(newState)
    }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.problem}>
          <div className={styles.problemCenter}>
            <DigitInput digits={state[0]} onChange={handleChange(0)} />
            <DigitInput digits={state[1]} onChange={handleChange(1)} />
            <hr style={{ margin: '24px 0' }} />
            <DigitInput digits={state[2]} onChange={handleChange(2)} />
          </div>
        </div>
      </div>
    </main>
  )
}
