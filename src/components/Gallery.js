import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const GalleryStyles = styled.div`
  .gallery__grid {
    display: grid;
    gap: 2rem;
    grid-auto-flow: dense;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
    justify-content: center;
  }
  .gallery__title {
    font-size: 2rem;
    padding: 1rem;
    text-align: center;
  }

  .item {
    min-width: 200px;
    width: 260px;
    margin: auto;
    border: 3px solid var(--gray-1);
    padding: 1rem;
  }
  .item__btns {
    display: flex;
    justify-content: space-between;
    button {
      font-size: 1.125rem;
      background-color: var(--gray-1);
      padding: 0.2rem 0.5rem;
      height: 3rem;
      border-radius: 8px;
      font-weight: bolder;
    }
  }
  .item-img {
    width: 140px;
    height: 140px;
    margin: auto;
    margin-bottom: 1rem;
    img {
      object-fit: contain;
    }
  }
  .item-title {
    font-size: 1rem;
    height: 82px;
    text-align: center;
    margin-bottom: 1rem;
  }
  .item-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .item-rating {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    width: 60px;
  }
  .item__btnadd {
    border: 2px solid var(--red-1);
    color: var(--red-1);
  }
  .item-price {
    font-size: 2.5rem;
    color: var(--blue-1);
    text-align: center;
    margin-bottom: 1rem;
  }
  .item__btnbuy {
    border: 2px solid var(--red-1);
    background-color: var(--red-1) !important;
    color: var(--gray-1);
  }
  .item-start {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 1px solid yellow;
    svg {
      font-size: 1rem;
    }
  }
  .skeleton {
    margin-bottom: 1rem;
  }
`;

const SkeletonGallery = () => {
  const rows = Array(9)
    .fill()
    .map((item, index) => (
      <section key={index}>
        <article className="item">
          <div className="item-img">
            <Skeleton width={140} height={140} />
          </div>
          <h3 className="item-title">
            <Skeleton count={4} />
          </h3>
          <div className="item-info">
            <Skeleton width={160} height={20} />
            <Skeleton width={30} height={20} />
            <Skeleton width={22} height={22} circle={true} />
          </div>
          <Skeleton height={48} count={2} className="skeleton" />
        </article>
      </section>
    ));

  return (
    <SkeletonTheme baseColor="#f5f5f5" highlightColor="#ffffff">
      <div className="gallery__grid">{rows}</div>
    </SkeletonTheme>
  );
};

const Gallery = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = () => {
    axios
      .get('https://fakestoreapi.com/products/category/electronics/')
      .then(({ data }) => {
        setProducts(data);
        setLoading(false);
      });
  };
  // ローディングするためにあえて遅延させる
  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 5000);
  }, []);

  return (
    <GalleryStyles>
      <div className="gallery__grid">
        {isLoading ? (
          <SkeletonGallery />
        ) : (
          products.map((product) => {
            return (
              <section key={product.id}>
                <article className="item">
                  <div className="item-img">
                    <img src={product.image} alt="" />
                  </div>
                  <h3 className="item-title">{product.title}</h3>
                  <div className="item-info">
                    <span>{product.category}</span>
                    <div className="item-rating">
                      <span>{product.rating.rate}</span>
                      <span className="item-start">
                        <FaStar fill="yellow" />
                      </span>
                    </div>
                  </div>
                  <h3 className="item-price">${product.price}</h3>
                  <div className="item__btns">
                    <button className="item__btnadd">Add to card</button>
                    <button className="item__btnbuy">Buy now</button>
                  </div>
                </article>
              </section>
            );
          })
        )}
      </div>
    </GalleryStyles>
  );
};

export default Gallery;
