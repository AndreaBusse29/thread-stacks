import React, { useState } from 'react'

interface DataCardProps {
    data: Item
    onSave: (data: Item) => void
}

export interface Item {
    id?: number
    dmcNumber?: string
    name?: string
    numberOfSpoolsInStock?: number
    needToReStock?: boolean
    hexColor?: string
    isEditing: boolean
}

const DataCard: React.FC<DataCardProps> = ({ data, onSave }) => {
    const [formData, setFormData] = useState<Item>(data)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        })
    }

    const handleEdit = (isEditing: boolean) => {
        onSave({
            ...data,
            isEditing
        })
    }

    const handleSave = () => {
        onSave({
            ...formData,
            isEditing: false
        })
    }

    return data.isEditing ? (
        <div className="p-3 m-3 border border-indigo-400 rounded w-1/4 h-48 flex flex-wrap">
            <div className="w-2/3">
                <div className="w-full flex my-1">
                    <label className="w-40 text-left">DMC Number: </label>
                    <input name="dmcNumber"
                           className="w-20 text-right text-black"
                           value={formData.dmcNumber}
                           onChange={handleChange}
                    />
                </div>
                <div className="w-full flex my-1">
                    <label className="w-40 text-left">Spools In Stock: </label>
                    <input type="number"
                           name="numberOfSpoolsInStock"
                           className="w-20 text-black text-right"
                           value={formData?.numberOfSpoolsInStock?.toString()}
                           onChange={handleChange}
                    />
                </div>
                <div className="w-full flex my-1">
                    <label className="w-40 text-left">Need to Restock: </label>
                    <input type="checkbox"
                           name="needToReStock"
                           className="w-20 text-black text-right"
                           checked={formData.needToReStock}
                           onChange={handleChange}
                    />
                </div>
                <div className="w-full flex my-1">
                    <label className="w-40 text-left">Hex Color: </label>
                    <input name="hexColor"
                           className="w-20 text-black text-right"
                           value={formData.hexColor}
                           onChange={handleChange}
                    />
                </div>
            </div>
            <div className="w-1/3">
                <div className="box-border h-32 w-32 border-2 border-white"
                     style={{backgroundColor: data.hexColor ?? 'white'}}>
                </div>
            </div>
            <div className="w-full">
                <button className="border rounded-md py-1 px-3 mr-2 border-green-600 bg-green-600" onClick={handleSave}>Save</button>
                <button className="border rounded-md py-1 px-3 mr-2" onClick={() => handleEdit(false)}>Cancel</button>
            </div>
        </div>
    ) : (
        <div className="p-3 m-3 border border-indigo-400 rounded w-1/4 h-48 flex flex-wrap">
            <div className="w-2/3 pr-3">
                <div className="w-full flex justify-between my-1 pr-4">
                    <label>DMC Number: </label>
                    <span>{data.dmcNumber}</span>
                </div>
                <div className="w-full flex justify-between my-1 pr-4">
                    <label>Spools In Stock: </label>
                    <span>{data.numberOfSpoolsInStock}</span>
                </div>
                <div className="w-full flex justify-between my-1 pr-4">
                    <label>Need to Restock: </label>
                    <span>{data.needToReStock ? 'Yes' : 'No'}</span>
                </div>
                <div className="w-full flex justify-between my-1 pr-4">
                    <label>Hex Color: </label>
                    <span>{data.hexColor}</span>
                </div>
            </div>
            <div className="w-1/3">
                <div className="box-border h-32 w-32 border-2 border-white"
                     style={{backgroundColor: data.hexColor ?? 'white'}}>
                </div>
            </div>
            <div className="w-full my-1">
                <button className="border rounded-md py-1 px-3 mr-3 border-indigo-600 bg-indigo-600" onClick={() => handleEdit(true)}>Edit</button>
            </div>
        </div>
    )
}

export default DataCard;
