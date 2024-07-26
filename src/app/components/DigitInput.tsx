import React, { useRef } from 'react'
import { Form, Input, Row, Col, InputNumber, InputNumberProps } from 'antd'

import styles from './DigitInput.module.css'
import { IDigit } from '../page'

interface DigitInputProps {
  digits: IDigit[]
  onChange: (index: number, value: number | null) => void
  isCharValid: boolean[]
  isSumValid?: boolean[]
}

const DigitInput = ({
  digits,
  onChange,
  isCharValid,
  isSumValid,
}: DigitInputProps) => {
  const inputRefs = useRef<HTMLInputElement[]>([])

  const handleInputChange =
    (index: number): InputNumberProps['onChange'] =>
    (value) => {
      if (value !== null && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus()
      }
      onChange(index, value !== null ? parseInt(value.toString()) : null)
    }

  const setInputRef = (el: HTMLInputElement | null, index: number) => {
    if (el) {
      inputRefs.current[index] = el
    }
  }

  return (
    <div
      className={styles.container}
      style={{ display: 'flex', justifyContent: 'flex-end' }}
    >
      {digits.map((digit, index) => {
        let isValid = isCharValid[index]
        if (isSumValid) {
          isValid = isValid && isSumValid[index]
        }
        return (
          <Form.Item
            layout='vertical'
            label={digit.c}
            key={index}
            style={{ marginLeft: 12 }}
          >
            <InputNumber
              controls={false}
              placeholder={digit.c}
              maxLength={1}
              ref={(el) => setInputRef(el, index)}
              onChange={handleInputChange(index)}
              value={digit.value}
              status={isValid ? undefined : 'error'}
              // status='error'
              style={{
                width: 64,
                height: 64,
                fontSize: 32,
                textAlign: 'center',
              }}
            />
          </Form.Item>
        )
      })}
    </div>
  )
}

export default DigitInput
