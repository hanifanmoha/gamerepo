'use client'

import styles from './page.module.css'
import DigitInput, { DigitInputDataProps } from './components/DigitInput'

export default function Home() {
  const problem = 'ADA_DI_DIA'

  const digits1: DigitInputDataProps[] = 'AADA'.split('').map((c) => ({
    label: c,
  }))

  const digits2: DigitInputDataProps[] = 'DI'.split('').map((c) => ({
    label: c,
  }))

  const digits3: DigitInputDataProps[] = 'DIA'.split('').map((c) => ({
    label: c,
  }))

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.problem}>
          <div className={styles.problemCenter}>
            <DigitInput digits={digits1} />
            <DigitInput digits={digits2} />
            <hr style={{ margin: '24px 0' }} />
            <DigitInput digits={digits3} />
          </div>
        </div>
      </div>
    </main>
  )
}
