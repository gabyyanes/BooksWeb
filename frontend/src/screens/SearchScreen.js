import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

export default function SearchScreen(props) {
    const {
        name = 'all', 
        genre = 'all', 
        order = 'newest', 
    } = useParams();
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products} = productList;

    const productGenreList = useSelector(state => state.productGenreList);
    const { 
        loading: loadingGenres, 
        error: errorGenres, 
        genres,
    } = productGenreList;
    useEffect(() => {
        dispatch(
            listProducts({ 
                name: name !== 'all' ? name: '',
                genre: genre !== 'all' ? genre: '',
                order,
            })
        );
    }, [genre, dispatch, name, order,]);
    
    const getFilterUrl = (filter) => {
        const filterGenre = filter.genre || genre;
        const filterName = filter.name || name;
        const sortOrder = filter.order || order;

        return `/search/genre/${filterGenre}/name/${filterName}/order/${sortOrder}`;
    };
    return (
        <div>
            <div className="row">
                {loading?(
                    <LoadingBox ></LoadingBox>
                ) :error? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <div>{products.length} Results</div>
                )}
                <div>
                    Sort by{' '}
                    <select
                        value={order}
                        onChange={(e) => {
                        props.history.push(getFilterUrl({ order: e.target.value }));
                        }}
                    >
                        <option value="newest">Newest Arrivals</option>
                        <option value="lowest">Price: Low to High</option>
                        <option value="highest">Price: High to Low</option>
                        <option value="toprated">Rating: High to Low</option>
                    </select>
                </div>
            </div>
            <div className="row top">
                <div className="col-1">
                    <h3>Genres</h3>
                    {loadingGenres ? (
                        <LoadingBox></LoadingBox>
                    ) : errorGenres ? (
                        <MessageBox variant="danger">{errorGenres}</MessageBox>
                    ) : (
                        <ul>
                        {genres.map((c) => (
                            <li key={c}>
                            <Link
                                className={c === genre ? 'active' : ''}
                                to={getFilterUrl({ genre: c })}
                            >
                                {c}
                            </Link>
                            </li>
                        ))}
                        </ul>
                    )}
                </div>
                <div className="col-3">
                    {loading?(
                        <LoadingBox ></LoadingBox>
                    ) :error? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <>
                            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                            <div className="row center">
                                {products.map((product) => (
                                    <Product key={product._id} product={product}></Product>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}