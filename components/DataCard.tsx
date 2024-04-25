import React, { useState } from 'react'
import {findColor} from '@/helpers/findColor'

interface DataCardProps {
    data: Item
    onSave: (data: Item) => void
    onDelete: (dataId: number) => void
}

export interface Item {
    id: number
    isEditing: boolean
    hexColor: string
    dmcNumber?: string
    name?: string
    numberOfSpoolsInStock?: number
    needToReStock?: boolean
}

const DataCard: React.FC<DataCardProps> = ({ data, onSave, onDelete }) => {
    const [formData, setFormData] = useState<Item>(data)
    const [colorCode, setColorCode] = useState<string>(data.hexColor)

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const color = findColor(event.target?.value, 'dmc', 'hexCode') ?? formData?.hexColor
        setFormData({
            ...formData,
            hexColor: color,
        })
        setColorCode(color)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        let color = data.hexColor

        if (name === 'dmcNumber') {
            color = findColor(value, 'dmc', 'hexCode') ?? formData?.hexColor
            setColorCode(color)
        }

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
            hexColor: color,
        })
    }

    const handleCancel = () => {
        const color = findColor(data.hexColor, 'dmc', 'hexCode') ?? formData?.hexColor
        setColorCode(color)

        onSave({
            ...data,
            hexColor: color,
            isEditing: false
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

    const handleDelete = () => {
        onDelete(data.id)
    }

    return data.isEditing ? (
        <div className="p-3 m-3 text-black border bg-indigo-50 rounded min-w-[320px] min-h-[200px]: w-48 h-48 flex flex-wrap">
            <div className="w-2/3">
                <div className="w-full flex my-1">
                    <label className="w-40 text-left">DMC Number: </label>
                    <input name="dmcNumber"
                           className="w-16 text-right text-black border border-gray-300"
                           value={formData.dmcNumber}
                           onChange={handleChange}
                           onInput={handleColorChange}
                    />
                </div>
                <div className="w-full flex my-1">
                    <label className="w-40 text-left">Spools In Stock: </label>
                    <input type="number"
                           name="numberOfSpoolsInStock"
                           className="w-16 text-black text-right border border-gray-300"
                           value={formData?.numberOfSpoolsInStock?.toString()}
                           onChange={handleChange}
                    />
                </div>
                <div className="w-full flex my-1">
                    <label className="w-40 text-left">Need to Restock: </label>
                    <input type="checkbox"
                           name="needToReStock"
                           className="w-16 text-black"
                           checked={formData.needToReStock}
                           onChange={handleChange}
                    />
                </div>
                <div className="w-full flex my-1">
                    <div className="w-40 text-left">Hex Color: <span>{formData.hexColor}</span></div>
                </div>
            </div>
            <div className="w-1/3 pl-2 pt-1">
                <div className="box-border w-24 h-24"
                     style={{backgroundColor: formData.hexColor ?? '#ffffff'}}>
                </div>
            </div>
            <div className="w-full my-2">
                <button className="border rounded-md py-1 px-3 mr-2 border-green-600 bg-green-600 text-white"
                        onClick={handleSave}
                >
                    Save
                </button>
                <button className="border rounded-md border-gray-400 py-1 px-3 mr-2"
                        onClick={() => handleCancel()}
                >
                    Cancel
                </button>
            </div>
        </div>
    ) : (
        <div className="p-3 m-3 text-black border bg-indigo-50 rounded min-w-[320px] min-h-[200px]: w-48 h-48 flex flex-wrap">
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
            <div className="w-1/3 pt-1.5">
                <div className="box-border w-24 h-24"
                     style={{backgroundColor: colorCode ?? 'white'}}>
                </div>
            </div>
            <div className="w-full my-2">
                <button className="border rounded-md py-1 px-3 mr-3 border-indigo-600 bg-indigo-600 text-white" onClick={() => handleEdit(true)}>Edit</button>
                <button className="border rounded-md py-1 px-3 mr-3 border-red-500 bg-red-500 text-white" onClick={() => handleDelete()}>Delete</button>
            </div>
        </div>
    )
}

export default DataCard;
