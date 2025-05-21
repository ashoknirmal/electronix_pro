import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import '../styles/Home.css'; // Adjust path if needed

const images = [
  'https://www.lg.com/np/images/plp-b2c/Healthy-Home-Solutions-Banner-Lineup-MWO-2020-Desktop.jpg',
  'https://static.vecteezy.com/system/resources/previews/036/314/557/non_2x/a-set-of-household-appliances-microwave-oven-washing-machine-refrigerator-fan-tv-coffee-laptop-air-conditioner-illustration-vector.jpg',
  'https://supplymaster.store/cdn/shop/collections/47454705_2220519048233191_4586327651043508224_o.jpg?v=1607833740&width=1296',
  'https://st2.depositphotos.com/1001877/6374/i/450/depositphotos_63745311-stock-photo-home-appliances-gas-cooker-tv.jpg',
  'https://www.lg.com/content/dam/lge/in/migration/lginvestorrelations/Images/lg-banne3.jpg'
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bestSellers, setBestSellers] = useState([]);
  const [deals, setDeals] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loadingBestSellers, setLoadingBestSellers] = useState(false);
  const [loadingDeals, setLoadingDeals] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      const ids = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
      if (ids.length) {
        try {
          const res = await axios.post('http://localhost:5000/api/products/by-ids', { ids });
          setRecentlyViewed(res.data);
        } catch (err) {
          console.error("Failed to fetch recently viewed products", err);
        }
      }
    };
    fetchRecentlyViewed();
  }, []);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoadingBestSellers(true);
        const res = await axios.get('http://localhost:5000/api/products?limit=10');
        setBestSellers(res.data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching best sellers:', error);
      } finally {
        setLoadingBestSellers(false);
      }
    };

    const fetchDeals = async () => {
      try {
        setLoadingDeals(true);
        const res = await axios.get('http://localhost:5000/api/products?dealOfDay=true');
        const dealsWithEndTime = res.data.slice(0, 5).map(deal => ({
          ...deal,
          endTime: Date.now() + (deal.timeLeft || 3600) * 1000
        }));
        setDeals(dealsWithEndTime);
      } catch (error) {
        console.error('Error fetching deals of the day:', error);
      } finally {
        setLoadingDeals(false);
      }
    };

    fetchBestSellers();
    fetchDeals();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDeals(prevDeals =>
        prevDeals.map(deal => {
          const timeLeftInSeconds = Math.max(0, Math.floor((deal.endTime - Date.now()) / 1000));
          return { ...deal, timeLeft: timeLeftInSeconds };
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <motion.div
        className="home"
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="home-contents transparent"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="scroll-text">Deals of the Day - Grab Them Fast!</div>
          <p className="left-align">
            Discover a wide range of premium home appliances designed to enhance your lifestyle.
          </p>
          <motion.button
            className="explore-button"
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate('/product')}
          >
            Explore Products
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Best Selling Products */}
      <section className="best-sellers">
        <motion.h2
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Best Selling Products
        </motion.h2>

        {loadingBestSellers ? (
          <p>Loading products...</p>
        ) : (
          <div className="scroll-container">
            {bestSellers.map((product, index) => (
              <motion.div
                key={product._id || product.id}
                className="product-card"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <img src={product.images?.[0]} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <p className="rating">⭐ {product.rating}</p>
                <p className="description">{product.description}</p>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Deals of the Day */}
      <section className="deals-of-the-day">
        <motion.h2
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Deals of the Day
        </motion.h2>

        <motion.button
          className="see-more-button"
          onClick={() => navigate("/product")}
          whileHover={{ scale: 1.1 }}
        >
          See More
        </motion.button>

        {loadingDeals ? (
          <p>Loading deals...</p>
        ) : (
          <div className="deals-slider">
            <div className="deals-track">
              {deals.map((deal, index) => (
                <motion.div
                  key={deal._id || deal.id}
                  className="deal-card"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="sale-badge">SALE {deal.discountPercentage}% OFF</div>
                  <img src={deal.images?.[0]} alt={deal.name} className="deal-image" />
                  <h3 className="deal-title">{deal.name}</h3>
                  <p className="deal-price">
                    ₹ {deal.price.toLocaleString()}
                    {deal.originalPrice && (
                      <span className="original-price">
                        ₹ {deal.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="save-tag">Save ₹ {deal.discountAmount}</span>
                  </p>
                  <div className="countdown-timer">
                    <p>Time Left: {formatTime(deal.timeLeft || 0)}</p>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="sold-bar"
                      style={{ width: `${(deal.sold / deal.totalUnits) * 100}%` }}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Recently Viewed Products */}
      <section className="recently-viewed">
        <h2>Recently Viewed Products</h2>
        <div className="scroll-container">
          {recentlyViewed.map((product) => (
            <div className="product-card" key={product._id}>
              <img src={product.images?.[0]} alt={product.name} />
              <h3>{product.name}</h3>
              <p>₹ {product.price}</p>
              <p>⭐ {product.rating}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Logos */}
      <div className="brand-logos">
        <h2>Brand Logos</h2>
      <div className="logo-track">
      <img src="https://www.eletimes.com/wp-content/uploads/2023/07/LG-Logo-2014.png" alt="Brand 1" className="brand-logo" />
      <img src="https://brandlogos.net/wp-content/uploads/2014/08/samsung-logo-preview.png" alt="Brand 2" className="brand-logo" />
      <img src="https://pngimg.com/d/apple_logo_PNG19689.png" alt="Brand 3" className="brand-logo" />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnEoWET3DpitE47sxNjJtBbeLoPsmpSQRoaA&s" alt="Brand 3" className="brand-logo" />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkGYOnvMXehjuNOyGtLuUortDy8mA51C_hlw&s" alt="Brand 3" className="brand-logo" />
      <img src="https://1000logos.net/wp-content/uploads/2022/12/Panasonic-logo.png" alt="Brand 3" className="brand-logo" />
      <img src="https://c0.klipartz.com/pngpicture/47/804/gratis-png-frigorifico-whirlpool-corporation-lavadoras-marca-logotipo-refrigerador.png" alt="Brand 4" className="brand-logo" />
      <img src="https://e7.pngegg.com/pngimages/587/586/png-clipart-logo-haier-brand-refrigerator-home-appliance-refrigerator-blue-electronics.png" alt="Brand 3" className="brand-logo" />
  </div>
</div>
    </div>
  );
};

export default Home;











// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import '../styles/Home.css'; // make sure this path matches your project structure

// const images = [
//   'https://www.lg.com/np/images/plp-b2c/Healthy-Home-Solutions-Banner-Lineup-MWO-2020-Desktop.jpg',
//   'https://static.vecteezy.com/system/resources/previews/036/314/557/non_2x/a-set-of-household-appliances-microwave-oven-washing-machine-refrigerator-fan-tv-coffee-laptop-air-conditioner-illustration-vector.jpg',
//   'https://supplymaster.store/cdn/shop/collections/47454705_2220519048233191_4586327651043508224_o.jpg?v=1607833740&width=1296',
//   'https://st2.depositphotos.com/1001877/6374/i/450/depositphotos_63745311-stock-photo-home-appliances-gas-cooker-tv.jpg',
//   'https://www.lg.com/content/dam/lge/in/migration/lginvestorrelations/Images/lg-banne3.jpg'
// ];

// const Home = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [bestSellers, setBestSellers] = useState([]);
//   const [deals, setDeals] = useState([]);
//   const [loadingBestSellers, setLoadingBestSellers] = useState(false);
//   const [loadingDeals, setLoadingDeals] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBestSellers = async () => {
//       try {
//         setLoadingBestSellers(true);
//         const res = await axios.get('http://localhost:5000/api/products?limit=10');
//         setBestSellers(res.data.slice(0, 10));
//       } catch (error) {
//         console.error('Error fetching best sellers:', error);
//       } finally {
//         setLoadingBestSellers(false);
//       }
//     };

//     const fetchDeals = async () => {
//       try {
//         setLoadingDeals(true);
//         const res = await axios.get('http://localhost:5000/api/products?dealOfDay=true');
//         const dealsWithEndTime = res.data.slice(0, 5).map(deal => ({
//           ...deal,
//           endTime: Date.now() + (deal.timeLeft || 3600) * 1000
//         }));
//         setDeals(dealsWithEndTime);
//       } catch (error) {
//         console.error('Error fetching deals of the day:', error);
//       } finally {
//         setLoadingDeals(false);
//       }
//     };

//     fetchBestSellers();
//     fetchDeals();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setDeals(prevDeals => 
//         prevDeals.map(deal => {
//           const timeLeftInSeconds = Math.max(0, Math.floor((deal.endTime - Date.now()) / 1000));
//           return { ...deal, timeLeft: timeLeftInSeconds };
//         })
//       );
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const formatTime = (seconds) => {
//     const h = Math.floor(seconds / 3600);
//     const m = Math.floor((seconds % 3600) / 60);
//     const s = seconds % 60;
//     return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
//   };

//   return (
//     <div>
//       {/* Hero Section */}
//       <motion.div 
//         className="home"
//         style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//       >
//         <motion.div 
//           className="home-contents transparent"
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//         >
//           <div className="scroll-text">Deals of the Day - Grab Them Fast!</div>
//           <p className="left-align">
//             Discover a wide range of premium home appliances designed to enhance your lifestyle.
//           </p>
//           <motion.button 
//             className="explore-button"
//             whileHover={{ scale: 1.1 }}
//             onClick={() => navigate('/product')}
//           >
//             Explore Products
//           </motion.button>
//         </motion.div>
//       </motion.div>

//       {/* Best Selling Products Section */}
//       <section className="best-sellers">
//         <motion.h2 
//           initial={{ x: -100, opacity: 0 }}
//           whileInView={{ x: 0, opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           Best Selling Products
//         </motion.h2>

//         {loadingBestSellers ? (
//           <p>Loading products...</p>
//         ) : (
//           <div className="scroll-container">
//             {bestSellers.map((product, index) => (
//               <motion.div 
//                 key={product._id || product.id}
//                 className="product-card"
//                 whileHover={{ scale: 1.05 }}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <img src={product.images?.[0]} alt={product.name} className="product-image" />
//                 <h3>{product.name}</h3>
//                 <p className="rating">⭐ {product.rating}</p>
//                 <p className="description">{product.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Deals of the Day Section */}
//       <section className="deals-of-the-day">
//         <motion.h2 
//           initial={{ x: 100, opacity: 0 }}
//           whileInView={{ x: 0, opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           Deals of the Day
//         </motion.h2>

//         <motion.button 
//           className="see-more-button"
//           onClick={() => navigate("/product")}
//           whileHover={{ scale: 1.1 }}
//         >
//           See More
//         </motion.button>

//         {loadingDeals ? (
//           <p>Loading deals...</p>
//         ) : (
//           <div className="deals-slider">
//             <div className="deals-track">
//               {deals.map((deal, index) => (
//                 <motion.div 
//                   key={deal._id || deal.id}
//                   className="deal-card"
//                   whileHover={{ scale: 1.05 }}
//                   initial={{ opacity: 0, y: 50 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <div className="sale-badge">SALE {deal.discountPercentage}% OFF</div>
//                   <img src={deal.images?.[0]} alt={deal.name} className="deal-image" />
//                   <h3 className="deal-title">{deal.name}</h3>
//                   <p className="deal-price">
//                     ₹ {deal.price.toLocaleString()}
//                     {deal.originalPrice && (
//                       <span className="original-price">
//                         ₹ {deal.originalPrice.toLocaleString()}
//                       </span>
//                     )}
//                     <span className="save-tag">Save ₹ {deal.discountAmount}</span>
//                   </p>
//                   <div className="countdown-timer">
//                     <p>Time Left: {formatTime(deal.timeLeft || 0)}</p>
//                   </div>
//                   <div className="progress-bar">
//                     <div
//                       className="sold-bar"
//                       style={{ width: `${(deal.sold / deal.totalUnits) * 100}%` }}
//                     ></div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Home;
