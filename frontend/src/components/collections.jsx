import Navbar from "./navbar";
import { useState, useEffect } from "react";
import ProductCard from './productlist'
import '../styles/collections.css'
import Footer from "./footer";
import CartAlert from "./cartAlert";
import Papa from "papaparse";

function Collections() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedCategories, setSelectedCategories] = useState([]); // ["men", "women", "kids"]
  const [selectedTypes, setSelectedTypes] = useState([]); // ["topwear", "bottomwear", "winterwear"]
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 28;
  const getproducts = async () => {
    try {
      const response = await fetch('/products.csv');
      const csvData = await response.text();

      Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const res = results.data.map((row) => {
            let images = [];
            try {
              images = typeof row.images === 'string' ? JSON.parse(row.images) : (row.images || []);
            } catch {
              images = [];
            }
            return { ...row, images: Array.isArray(images) ? images : [] };
          });

          const allowedCategories = [
            'shirts', 'tshirts', 'jumpsuit', 'tops', 'jackets', 'skirts', 'sarees', 'kurtas', 'jeans'
          ];

          const filteredData = res.filter((row) => {
            if (!row.url) return false;
            return allowedCategories.some((category) =>
              row.url.toLowerCase().includes(category)
            );
          });
          setProducts(filteredData);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        }
      });
    }
    catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    getproducts();
  }, [])

  // Reset to page 1 when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, selectedTypes, sortBy])

  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState("");

  // Helper function to parse price from string
  const parsePrice = (priceString) => {
    if (!priceString) return 0;
    // Remove currency symbols, commas, and extract number
    const cleaned = priceString.replace(/[^\d.]/g, "");
    return parseFloat(cleaned) || 0;
  };

  // Helper function to determine product category (Men/Women/Kids)
  const getProductCategory = (product) => {
    const url = product.url?.toLowerCase() || "";
    const title = product.title?.toLowerCase() || "";
    const description = product.product_description?.toLowerCase() || "";

    // Check for "women" FIRST to avoid matching "men" substring in "women"
    if (url.includes("/women") || url.includes("-women") || url.includes("womens") || url.includes("/women-") ||
      title.includes("women") || title.includes("women's") ||
      description.includes("women") || description.includes("women's")) {
      return "women";
    }

    // Check for "kids" or "boys" before "men" to avoid any conflicts
    if (url.includes("/boys") || url.includes("/kids") || url.includes("-boys-") || url.includes("-kids-") ||
      url.includes("/boys-") || url.includes("/kids-") ||
      title.includes("boys") || title.includes("kids") ||
      description.includes("boys") || description.includes("kids")) {
      return "kids";
    }

    // Check for "men" (must come after checking "women" to avoid substring match)
    if (url.includes("/men") || url.includes("-men-") || url.includes("/men-") ||
      title.includes("men") || description.includes("men")) {
      return "men";
    }

    // Default based on URL patterns (typically women's items)
    if (url.includes("/saree") || url.includes("/sarees") || url.includes("/kurtas") || url.includes("/jumpsuit")) {
      return "women";
    }
    return null;
  };

  // Helper function to determine product type (Topwear/Bottomwear/Winterwear)
  const getProductType = (product) => {
    const url = product.url?.toLowerCase() || "";
    const types = [];

    // Topwear: shirts, tshirts, tops, saree-blouse, kurtas, jackets
    if (url.includes("shirt") || url.includes("tshirt") || url.includes("/tops") || url.includes("saree-blouse") || url.includes("kurtas") || url.includes("jacket")) {
      types.push("topwear");
    }

    // Bottomwear: jeans, skirts, sarees (but not saree-blouse)
    if (url.includes("jeans") || url.includes("skirt") || ((url.includes("/sarees") || url.includes("/saree")) && !url.includes("saree-blouse"))) {
      types.push("bottomwear");
    }

    // Winterwear: jackets
    if (url.includes("jacket")) {
      types.push("winterwear");
    }

    return types;
  };

  // Filter products based on search query, categories, and types
  const filteredProducts = products.filter((product) => {
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = (
        product.product_description?.toLowerCase().includes(query) ||
        product.title?.toLowerCase().includes(query) ||
        product.url?.toLowerCase().includes(query)
      );
      if (!matchesSearch) return false;
    }

    // Category filter (Men/Women/Kids)
    if (selectedCategories.length > 0) {
      const productCategory = getProductCategory(product);
      if (!productCategory || !selectedCategories.includes(productCategory)) {
        return false;
      }
    }

    // Type filter (Topwear/Bottomwear/Winterwear)
    if (selectedTypes.length > 0) {
      const productTypes = getProductType(product);
      const matchesType = selectedTypes.some(type => productTypes.includes(type));
      if (!matchesType) {
        return false;
      }
    }

    return true;
  });

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low-high":
        return parsePrice(a.final_price) - parsePrice(b.final_price);
      case "price-high-low":
        return parsePrice(b.final_price) - parsePrice(a.final_price);
      case "relevance":
      default:
        return 0; // Keep original order
    }
  });

  const handleAlert = (statusCode, message) => {
    setStatus(statusCode);
    setMsg(message);

    //Optional: auto-clear after 3s
    setTimeout(() => {
      setStatus(null);
      setMsg("");
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div className="home d-flex flex-column flex-md-row flex-fill">
          <CartAlert status={status} msg={msg} />
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="fs-5 mt-5 fw-semibold mb-0">FILTERS</p>
              {(selectedCategories.length > 0 || selectedTypes.length > 0) && (
                <button
                  className="btn btn-sm btn-outline-secondary mt-5"
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedTypes([]);
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>

            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <p className="mb-0 fw-semibold me-3">CATEGORIES</p>
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        id="categoryMen"
                        checked={selectedCategories.includes("men")}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([...selectedCategories, "men"]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(cat => cat !== "men"));
                          }
                        }}
                      />
                      <label className="form-check-label" htmlFor="categoryMen">Men</label>
                    </li>
                    <li className="list-group-item">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        id="categoryWomen"
                        checked={selectedCategories.includes("women")}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([...selectedCategories, "women"]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(cat => cat !== "women"));
                          }
                        }}
                      />
                      <label className="form-check-label" htmlFor="categoryWomen">Women</label>
                    </li>
                    <li className="list-group-item">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        id="categoryKids"
                        checked={selectedCategories.includes("kids")}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([...selectedCategories, "kids"]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(cat => cat !== "kids"));
                          }
                        }}
                      />
                      <label className="form-check-label" htmlFor="categoryKids">Kids</label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    <p className="mb-0 fw-semibold">TYPE</p>
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        id="typeTopwear"
                        checked={selectedTypes.includes("topwear")}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedTypes([...selectedTypes, "topwear"]);
                          } else {
                            setSelectedTypes(selectedTypes.filter(type => type !== "topwear"));
                          }
                        }}
                      />
                      <label className="form-check-label" htmlFor="typeTopwear">Topwear</label>
                    </li>
                    <li className="list-group-item">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        id="typeBottomwear"
                        checked={selectedTypes.includes("bottomwear")}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedTypes([...selectedTypes, "bottomwear"]);
                          } else {
                            setSelectedTypes(selectedTypes.filter(type => type !== "bottomwear"));
                          }
                        }}
                      />
                      <label className="form-check-label" htmlFor="typeBottomwear">Bottomwear</label>
                    </li>
                    <li className="list-group-item">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        id="typeWinterwear"
                        checked={selectedTypes.includes("winterwear")}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedTypes([...selectedTypes, "winterwear"]);
                          } else {
                            setSelectedTypes(selectedTypes.filter(type => type !== "winterwear"));
                          }
                        }}
                      />
                      <label className="form-check-label" htmlFor="typeWinterwear">Winterwear</label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-end justify-content-between px-3 mb-3">
              <div className="w-100 mb-3 mb-md-0">
                <div className="input-group my-2" style={{ maxWidth: '400px' }}>
                  <span className="input-group-text bg-white border-end-0">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ borderLeft: 'none' }}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 mt-5">
                <div className="dropdown mx-1">
                  <button className="btn btn-outline border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {sortBy === "relevance" && "Sort by"}
                    {sortBy === "price-low-high" && "Price: Low to High"}
                    {sortBy === "price-high-low" && "Price: High to Low"}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className={`dropdown-item ${sortBy === "relevance" ? "active" : ""}`}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setSortBy("relevance");
                        }}
                      >
                        Relevance
                      </a>
                    </li>
                    <li>
                      <a
                        className={`dropdown-item ${sortBy === "price-low-high" ? "active" : ""}`}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setSortBy("price-low-high");
                        }}
                      >
                        Price: Low to High
                      </a>
                    </li>
                    <li>
                      <a
                        className={`dropdown-item ${sortBy === "price-high-low" ? "active" : ""}`}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setSortBy("price-high-low");
                        }}
                      >
                        Price: High to Low
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {(searchQuery || selectedCategories.length > 0 || selectedTypes.length > 0) && (
              <div className="px-3 mb-3">
                <p className="text-muted mb-0">
                  {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} found
                  {searchQuery && ` for "${searchQuery}"`}
                  {(selectedCategories.length > 0 || selectedTypes.length > 0) && (
                    <span>
                      {" "}with filters:
                      {selectedCategories.length > 0 && ` ${selectedCategories.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(", ")}`}
                      {selectedTypes.length > 0 && ` ${selectedTypes.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(", ")}`}
                    </span>
                  )}
                </p>
              </div>
            )}
            <div className='container'>
              {sortedProducts.length > 0 ? (
                <>
                  {/* Calculate pagination */}
                  {(() => {
                    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
                    const startIndex = (currentPage - 1) * itemsPerPage;
                    const endIndex = startIndex + itemsPerPage;
                    const currentProducts = sortedProducts.slice(startIndex, endIndex);

                    return (
                      <>
                        <div className='row row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-lg-4 g-4'>
                          {currentProducts.map((product) => (
                            <div className='col' key={product.product_id}>
                              <ProductCard product={product} onAlert={handleAlert} />
                            </div>
                          ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                          <div className="d-flex justify-content-center align-items-center mt-5 mb-4">
                            <nav aria-label="Product pagination">
                              <ul className="pagination mb-0">
                                {/* Previous Button */}
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                  <button
                                    className="page-link"
                                    onClick={() => {
                                      if (currentPage > 1) {
                                        setCurrentPage(currentPage - 1);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                      }
                                    }}
                                    disabled={currentPage === 1}
                                  >
                                    Previous
                                  </button>
                                </li>

                                {/* Page Numbers */}
                                {(() => {
                                  const pages = [];
                                  const showEllipsis = totalPages > 7;

                                  if (!showEllipsis) {
                                    // Show all pages if 7 or fewer
                                    for (let i = 1; i <= totalPages; i++) {
                                      pages.push(i);
                                    }
                                  } else {
                                    // Show first page
                                    pages.push(1);

                                    if (currentPage <= 4) {
                                      // Near the start: show 1, 2, 3, 4, 5, ..., last
                                      for (let i = 2; i <= 5; i++) {
                                        pages.push(i);
                                      }
                                      pages.push('ellipsis-end');
                                      pages.push(totalPages);
                                    } else if (currentPage >= totalPages - 3) {
                                      // Near the end: show 1, ..., last-4, last-3, last-2, last-1, last
                                      pages.push('ellipsis-start');
                                      for (let i = totalPages - 4; i <= totalPages; i++) {
                                        pages.push(i);
                                      }
                                    } else {
                                      // In the middle: show 1, ..., current-1, current, current+1, ..., last
                                      pages.push('ellipsis-start');
                                      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                                        pages.push(i);
                                      }
                                      pages.push('ellipsis-end');
                                      pages.push(totalPages);
                                    }
                                  }

                                  return pages.map((pageNum, index) => {
                                    if (pageNum === 'ellipsis-start' || pageNum === 'ellipsis-end') {
                                      return (
                                        <li key={`ellipsis-${index}`} className="page-item disabled">
                                          <span className="page-link">...</span>
                                        </li>
                                      );
                                    }
                                    return (
                                      <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                                        <button
                                          className="page-link"
                                          onClick={() => {
                                            setCurrentPage(pageNum);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                          }}
                                        >
                                          {pageNum}
                                        </button>
                                      </li>
                                    );
                                  });
                                })()}

                                {/* Next Button */}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                  <button
                                    className="page-link"
                                    onClick={() => {
                                      if (currentPage < totalPages) {
                                        setCurrentPage(currentPage + 1);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                      }
                                    }}
                                    disabled={currentPage === totalPages}
                                  >
                                    Next
                                  </button>
                                </li>
                              </ul>
                            </nav>
                          </div>
                        )}

                        {/* Page Info */}
                        <div className="text-center text-muted mb-3">
                          <small>
                            Showing {startIndex + 1}-{Math.min(endIndex, sortedProducts.length)} of {sortedProducts.length} products
                          </small>
                        </div>
                      </>
                    );
                  })()}
                </>
              ) : (
                <div className="text-center py-5">
                  <p className="fs-5 text-muted">No products found matching your search.</p>
                  <button
                    className="btn btn-outline-secondary mt-2"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategories([]);
                      setSelectedTypes([]);
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Collections;