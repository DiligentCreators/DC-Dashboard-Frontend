// components/FormLayout.tsx

import React from 'react'

interface FormLayoutProps {
  children: React.ReactNode
}

function FormLayout({ children }: FormLayoutProps) {

  const style = "min-h-screen flex items-center justify-center bg-gray-50 px-4"
    return <div className={style}>{children}</div>
}

export default FormLayout
