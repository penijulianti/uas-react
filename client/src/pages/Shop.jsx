import { useState } from "react";
import {TfiShoppingCartFull} from "react-icons/tfi";
import {BiCartAdd} from "react-icons/bi";
import {MdClose,MdRemoveShoppingCart} from "react-icons/md";



export default function Shop(){
    // const [products, setProducts] = useState(
    //     productsSample.reduce(
    //       (a, p) => [...a, { ...p, id: p.id + productsSample.length - 1 }],
    //       productsSample
    //     )
    //   );

    //   const filteredSortedProducts = products
    //   .sort((a, b) => {
    //     if (sortOrder === "asc") {
    //       return a[sortBy] < b[sortBy] ? -1 : 1;
    //     } else {
    //       return a[sortBy] > b[sortBy] ? -1 : 1;
    //     }
    //   })
    //   .filter(
    //     (product) =>
    //       product.name.toLowerCase().includes(keyword) &&
    //       product.price >= minPrice &&
    //       product.price <= maxPrice &&
    //       (category === "Semua" || product.category === category)
    //   );
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    // const [idSquence, setIdSequence] = useState(products.length);
    const [keyword, setKeyword] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [category, setCategory] = useState("Semua");
    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");


    return(
        <div className="h-full pt-5">
        <header className="flex items-center justify-between bg-rose-200 rounded-2xl gap-6 px-5 py-1">
            <label className="flex flex-col gap-2 text-sm">
          Cari:
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>
        <section>
          Harga:
          <label className="flex flex-col gap-2 text-sm">
            Minimal:
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Maksimal:
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value || Infinity)}
            />
          </label>
        </section>
        <label>
          Kategori:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Semua</option>
            <option>Key Ring</option>
            <option>Gel Pen</option>
            <option>T-Shirt</option>
          </select>
        </label>
        <section>
          Urutkan:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="id">Normal</option>
            <option value="name">Nama</option>
            <option value="price">Harga</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Naik</option>
            <option value="desc">Turun</option>
          </select>
        </section>
        <button 
        onClick={() => setIsCartOpen(true)}
        className="flex justify-center items-center w-10 h-10 bg-pink-200 rounded-2xl"
        >
          <TfiShoppingCartFull />
          {cart.reduce((a, p) => a + p.count, 0)}
        </button>
            </header>

 <main>
        {/* {filteredSortedProducts.length > 0
          ? filteredSortedProducts
              .filter(
                (_product, i) =>
                  i >= productsPerPage * page - productsPerPage &&
                  i < productsPerPage * page
              )
              .map((product, i) => (
                <Product
                  key={i}
                  {...product}
                  onAddToCart={() => {
                    if (cart.find((p) => p.id === product.id)) {
                      setCart(
                        cart.map((p) =>
                          p.id === product.id
                            ? {
                                ...p,
                                count: p.count + 1,
                              }
                            : p
                        )
                      );
                    } else {
                      setCart([...cart, { ...product, count: 1 }]);
                    }
                  }}
                  onEdit={() => setEditedProduct(product)}
                  onDelete={() => {
                    if (
                      confirm(
                        `Apakah Anda yakin ingin menghapus produk ini (${product.name})?`
                      )
                    ) {
                      setProducts(products.filter((p) => p.id !== product.id));
                    }
                  }}
                />
              ))
          : "Tidak ada produk ditemukan."} */}
            </main>

            {/* <footer>
        <label>
          Produk per halaman:
          <input
            type="number"
            value={productsPerPage}
            onChange={(e) => setProductsPerPage(parseInt(e.target.value))}
          />
        </label>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Sebelumnya
        </Button>
        {filteredSortedProducts
          .filter((_product, i) => i % productsPerPage === 0)
          .map((_product, i) => (
            <button
              key={i}
              className="page-number"
              onClick={() => setPage(i + 1)}
              disabled={i + 1 === page}
            >
              {i + 1}
            </button>
          ))}
        <Button
          onClick={() => setPage(page + 1)}
          disabled={
            page === Math.ceil(filteredSortedProducts.length / productsPerPage)
          }
        >
          Berikutnya
        </Button>
      </footer> */}

            {isCartOpen && (
        <div className="card dialog absolute bg-gray-100 flex flex-col gap-5 p-10 rounded-2xl top-1/2 left-1/2 min-w-[320px]">
          <button onClick={() => setIsCartOpen(false)}>
            <div className="flex justify-center items-center w-10 h-10 bg-pink-200 rounded-2xl" >
            <MdClose />
            </div>
          </button>
          <h1>Keranjang</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Jumlah</th>
                <th>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.nama}</td>
                  <td>{product.count.toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => {
                        if (product.count > 1) {
                          setCart(
                            cart.map((p) =>
                              p.id === product.id
                                ? { ...p, count: p.count - 1 }
                                : p
                            )
                          );
                        } else {
                          setCart(cart.filter((p) => p.id !== product.id));
                        }
                      }}
                      title="Kurangi"
                    >
                      <MdRemoveShoppingCart />
                    </button>
                    <button
                      onClick={() => {
                        setCart(
                          cart.map((p) =>
                            p.id === product.id
                              ? { ...p, count: p.count + 1 }
                              : p
                          )
                        );
                      }}
                      title="Tambah"
                    >
                      <BiCartAdd />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            Total bayar:{" "}
            {cart
              .reduce((a, p) => a + p.harga * p.count, 0)
              .toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              })}
          </div>
        </div>
      )}


        </div>
    )
}