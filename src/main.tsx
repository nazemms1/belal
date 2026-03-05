import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css'
import './index.css'
import App from './App.tsx'

const theme = createTheme({
  primaryColor: 'violet',
  fontFamily: "'Inter', system-ui, sans-serif",
  headings: { fontFamily: "'Space Grotesk', 'Inter', sans-serif", fontWeight: '700' },
  defaultRadius: 'md',
  colors: {
    dark: [
      '#f1f0ff',
      '#c8c4e0',
      '#9e98c4',
      '#756da8',
      '#4d4880',
      '#2e2a5c',
      '#1a1830',
      '#110f20',
      '#0c0c14',
      '#05050a',
    ],
    violet: [
      '#f5f0ff',
      '#e8d9ff',
      '#d0b3ff',
      '#b580ff',
      '#a855f7',
      '#9333ea',
      '#7c22ce',
      '#6817ad',
      '#55128e',
      '#420d6f',
    ],
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </StrictMode>,
)
