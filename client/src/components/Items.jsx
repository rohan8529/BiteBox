import React from 'react'
import ItemCard from './ItemCard'

const Items = ({items}) => {
    return (
        <div className="item-list grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => (
                <ItemCard key={item._id} item={item} />
            ))}
        </div>
    )
}

export default Items