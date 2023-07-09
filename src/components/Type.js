import React from 'react'

import { capitalizeLetter } from '../utils'

export default function Type({ type }) {
  return (
    <div className={`type ${type}`} key={type}>
        <p>{capitalizeLetter(type)}</p>
    </div>
  )
}
