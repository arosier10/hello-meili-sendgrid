import { useState, useEffect } from 'react'
import { MeiliSearch } from 'meilisearch'
import './App.css'

const client = new MeiliSearch({
  host: import.meta.env.VITE_MEILI_HOST,
  apiKey: import.meta.env.VITE_MEILI_SEARCH_KEY
})

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (query) => {
    setSearchQuery(query)
    if (query.length < 2) {
      setSearchResults([])
      return
    }

    setLoading(true)
    try {
      const results = await client.index('products').search(query)
      setSearchResults(results.hits)
    } catch (error) {
      console.error('Search error:', error)
    }
    setLoading(false)
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Product Search</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {loading && <p className="loading">Loading...</p>}

      {selectedProduct ? (
        <div style={{ marginTop: '2rem' }}>
          <button 
            onClick={() => setSelectedProduct(null)}
            className="back-button"
          >
            Back to Search
          </button>
          <div className="product-detail">
            <h2>{selectedProduct.title}</h2>
            <p>{selectedProduct.description}</p>
            <p className="product-price">${selectedProduct.price}</p>
            {selectedProduct.image && (
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.title}
                className="product-image"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="product-grid">
          {searchResults.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="product-card"
              style={{ padding: '1rem' }}
            >
              {product.image && (
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="product-image"
                />
              )}
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
