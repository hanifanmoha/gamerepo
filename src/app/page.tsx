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

  const isCharValid = useMemo<boolean[][]>(() => {
    const charValues: { [key: string]: number[] } = {}

    for (let digits of problem) {
      for (let digit of digits) {
        if (digit.value === null) {
          continue
        }
        if (charValues[digit.c] && !charValues[digit.c].includes(digit.value)) {
          charValues[digit.c].push(digit.value)
        } else if (!charValues[digit.c]) {
          charValues[digit.c] = [digit.value]
        }
      }
    }

    console.log(problem, charValues)

    return problem.map((digits) =>
      digits.map((d) => {
        if (d.value === null) return true
        if (charValues[d.c] && charValues[d.c].length === 1) return true
        return false
      })
    )
  }, [problem])

  const isSumValid = useMemo<boolean[]>(() => {
    if (!isAllFilled(problem)) {
      return problem[2].map((d) => true)
    }

    const digit1Str = problem[0].map((d) => d.value).join('')
    const digit2Str = problem[1].map((d) => d.value).join('')

    const sumInt = parseInt(digit1Str) + parseInt(digit2Str)

    const sumArr = (sumInt + '').split('').map((x) => parseInt(x))

    return problem[2].map((d, idx) => sumArr[idx] === d.value)
  }, [problem])

  const isSolved = useMemo<boolean>(() => {
    if (!isAllFilled(problem)) {
      return false
    }

    for (let row of isCharValid) {
      for (let col of row) {
        if (!col) {
          return false
        }
      }
    }

    for (let col of isSumValid) {
      if (!col) {
        return false
      }
    }

    return true
  }, [isCharValid, isSumValid])

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.problem}>
          <div className={styles.problemCenter}>
            <div>{isSolved && <p>You solved this problem!</p>}</div>
            <DigitInput
              digits={problem[0]}
              onChange={handleChange(0)}
              isCharValid={isCharValid[0]}
            />
            <DigitInput
              digits={problem[1]}
              onChange={handleChange(1)}
              isCharValid={isCharValid[1]}
            />
            <hr style={{ margin: '24px 0' }} />
            <DigitInput
              digits={problem[2]}
              onChange={handleChange(2)}
              isCharValid={isCharValid[2]}
              isSumValid={isSumValid}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
