import React from 'react'
import { Link } from 'react-router-dom'

interface RedirectMessage {
  style: React.CSSProperties
  link : string
  message : string
}

export function Redirect(props : RedirectMessage) {
  return (
    <div>
      <Link style={props.style} to={props.link}>{props.message}</Link>
    </div>
  )
}