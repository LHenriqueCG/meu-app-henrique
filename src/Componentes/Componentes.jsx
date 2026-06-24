function Titulo() {
  return (
    <h1>Vamos começar em 2026!</h1>
  )
}

function Hero() {
    return (
      <div className="hero">
        <img src={heroImg} className="base" width="170" height="179" alt="" />
        <img src={reactLogo} className="framework" alt="React logo" />
        <img src={viteLogo} className="vite" alt="Vite logo" />
      </div>
    )
}

export { Titulo, Hero }