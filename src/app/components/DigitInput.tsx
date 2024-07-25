import React, { useRef } from 'react'
import { Form, Input, Row, Col, InputNumber, InputNumberProps } from 'antd'

import styles from './DigitInput.module.css'
import { IProblem } from '../page'

interface DigitInputProps {
  digits: IProblem[]
  onChange: (index: number, value: number | null) => void
}

const DigitInput = ({ digits, onChange }: DigitInputProps) => {
  const inputRefs = useRef<HTMLInputElement[]>([])

  const handleInputChange =
    (index: number): InputNumberProps['onChange'] =>
    (value) => {
      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus()
      }
      onChange(index, value ? parseInt(value.toString()) : null)
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
