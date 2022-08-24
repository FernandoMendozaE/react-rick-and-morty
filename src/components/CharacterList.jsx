import { useEffect, useState } from 'react'
import Character from './Character'

function NavPage({ page, setPage }) {
  return (
    <header className="d-flex justify-content-between align-items-center">
      <button
        className="btn btn-primary btn-sm"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Page {page === 1 ? page : page - 1}
      </button>
      <p className="pt-2 mt-1 fs-5 fw-bold">Page: {page}</p>
      <button
        className="btn btn-primary btn-sm"
        onClick={() => setPage(page + 1)}
      >
        Page {page + 1}
      </button>
    </header>
  )
}

function CharacterList() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function fechtData() {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      )
      const data = await response.json()
      setLoading(false)
      setCharacters(data.results)
    }

    fechtData()
  }, [page])

  return (
    <div className="container ">
      <NavPage page={page} setPage={setPage} />

      {loading ? (
        <h1 className="vh-100">Loading...</h1>
      ) : (
        <div className="row">
          {characters.map(character => (
            <div className="col-md-4" key={character.id}>
              <Character character={character} />
            </div>
          ))}
        </div>
      )}

      <NavPage page={page} setPage={setPage} />
    </div>
  )
}

export default CharacterList
