import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Pizza:React.FC = () => {
  const params = useParams();
  const [pizza, setPizza] = useState<{
    title:string;
    imageUrl:string
  }>({title:'', imageUrl:''});

  useEffect(() => {
    const pizzaFetch = async () => {
      const { data } = await axios.get(
        `https://627deaaeb75a25d3f3ae2170.mockapi.io/items/${params.id}`,
      );
      setPizza(data);
    };
    pizzaFetch();
  }, []);

  return (
    <div className="container">
      <h2 className="title">{pizza.title}</h2>
      <img className="img-center" src={pizza.imageUrl} alt="" />
      <Link className="button--center button button--outline button--add" to="/">
        {' '}
        На главную
      </Link>
    </div>
  );
};

export default Pizza;
