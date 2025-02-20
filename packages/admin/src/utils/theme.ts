export const getInitTheme = () => {
  if (!('theme' in localStorage) || localStorage.theme === 'auto') {
    return 'auto'
  }
  return localStorage.theme === 'dark' ? 'dark' : 'light'
}

export const autoTheme = () => {
  const d = new Date().getHours()
  const night = d > 18 || d < 8
  return (night || window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'realDark' : 'light'
}


