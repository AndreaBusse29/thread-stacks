"use client"

import React, { useState } from 'react';
import DataCard, { Item } from '../components/DataCard';
import Image from 'next/image'

const Home: React.FC = () => {
    const [items, setItems] = useState<Item[]>([
        { id: 1, dmcNumber: '505', numberOfSpoolsInStock: 2, needToReStock: false, hexColor: '#338362', name: 'Jade Green', isEditing: false },
        { id: 2, dmcNumber: '921', numberOfSpoolsInStock: 1, needToReStock: true, hexColor: '#c66218', name: 'Copper', isEditing: false },
        { id: 3, dmcNumber: '826', numberOfSpoolsInStock: 0, needToReStock: true, hexColor: '#6b9ebf', name: 'Blue Medium', isEditing: false },
    ])

    const saveItem = (updatedItem: Item) => {
        const updatedItems = items.map(item => {
            if (item.id === updatedItem.id) {
                updatedItem = {
                    ...updatedItem,
                }
                return updatedItem
            }
            return item
        })
        setItems(updatedItems)
    }

    const addItem = () => {
        const updatedItems = [
            {
                id: undefined,
                dmcNumber: undefined,
                numberOfSpoolsInStock: 0,
                needToReStock: false,
                hexColor: undefined,
                name: '',
                isEditing: true
            },
            ...items]
        setItems(updatedItems)
    }

    return (
        <>
            <div className="flex mx-10 my-4">
                <Image alt='The logo of the application. It is showing a stack of yarns in different colors.'
                       src={'/logo.png'} width={150} height={150}/>
                <h1 className='text-7xl text-justify my-auto font-semibold'>ThreadStacks</h1>
            </div>
            <div className="flex flex-wrap m-10">
                <div className="p-3 m-3 border border-indigo-400 rounded w-48 h-48 aspect-square" onClick={addItem}>
                    <div className="text-9xl text-gray-300 text-center mx-auto">+</div>
                </div>
                {items.map(item => (
                    <DataCard key={item.id} data={item} onSave={saveItem}/>
                ))}
            </div>
        </>
    );
};

export default Home;
