import React, { useEffect } from "react";
import { Link, useParams } from 'react-router-dom';

import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
//import { useParams } from "react-router";

export default function HomeScreen(props) {
  const {
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
      })
      );
  }, [dispatch, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    return `/pageNumber/${filterPage}`;
  };

  return (
    <div>
      <img className="homeimage" src="./images/banner.jpg" alt="banner" />;
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
        <div className="row center pagination" >
          {[...Array(pages).keys()].map(x => (
            <Link key={x + 1} to={getFilterUrl({page: x+1 })}>{x + 1}
            </Link>
          ))}
        </div>
        </>
      )}
    </div>
  );
}
