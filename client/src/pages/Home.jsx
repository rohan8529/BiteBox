import React, { useState } from 'react';
import Items from '../components/Items';
import Menu from '../components/Menu';

const Home = () => {
    const [items, setItems] = useState([]);

    const handleData = (data) => {
        setItems(data);
    };

    return (
        <div className="home p-4 lg:p-8 lg:w-4/5 mx-auto">
            <Menu sendData={handleData} />
            <Items items={items} />
        </div>
    );
};

export default Home;
