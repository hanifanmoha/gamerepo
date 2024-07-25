'use client'

import styles from './page.module.css'
import DigitInput from './components/DigitInput'
import { useMemo, useState } from 'react'

export interface IDigit {
  str: string
  c: string
  index: number
  value: number | null
}

function parseProblem(problemString: string): IDigit[][] {
  const strings = problemString.split('_')
  if (strings.length < 3) {
    return []
  }

  const problems: IDigit[][] = []

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

function isAllFilled(problem: IDigit[][]) {
  for (let digits of problem) {
    for (let digit of digits) {
      if (digit.value === null) {
        return false
      }
    }
  }
  return true
}

export default function Home() {
  const problemString = 'ADA_DI_DIA'

  const [problem, setProblem] = useState<IDigit[][]>(
    parseProblem(problemString)
  )

  const handleChange =
    (problemIndex: number) => (index: number, value: number | null) => {
      const newProblem = [...problem]
      newProblem[problemIndex][index].value = value
      setProblem(newProblem)
    }

  const isValid = useMemo<boolean[][]>(() => {
    const charValues: { [key: string]: number[] } = {}

    for (let digits of problem) {
      for (let digit of digits) {
        if (
          charValues[digit.c] &&
          digit.value !== null &&
          !charValues[digit.c].includes(digit.value)
        ) {
          charValues[digit.c].push(digit.value)
        } else if (digit.value !== null) {
          charValues[digit.c] = [digit.value]
        }
      }
    }

    return problem.map((digits) =>
      digits.map((p) => {
        if (p.value === null) return true
        if (charValues[p.c] && charValues[p.c].length === 1) return true
        return false
      })
    )
  }, [problem])

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.problem}>
          <div className={styles.problemCenter}>
            <DigitInput
              digits={problem[0]}
              onChange={handleChange(0)}
              isValid={isValid[0]}
            />
            <DigitInput
              digits={problem[1]}
              onChange={handleChange(1)}
              isValid={isValid[1]}
            />
            <hr style={{ margin: '24px 0' }} />
            <DigitInput
              digits={problem[2]}
              onChange={handleChange(2)}
              isValid={isValid[2]}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
