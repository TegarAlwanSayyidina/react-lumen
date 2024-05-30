import React, { memo, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";

export default function Stuffs() {
    const dataThParent = [
        "#",
        "Name",
        "Category",
        "Total Available",
        "Total Defec",
        "Action"
    ]

    const [stuffs, setStuffs] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/stuffs', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                setStuffs(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const columnDatabase = {
        "name":null,
        "category":null,
        "stuff_stock" : "total_available",
        "stuff_stock*" : "total_defec",
    }

    const buttons = [
        // "edit",
        'show',
        "delete",
        // "create",
        "createInbound"
        
    ]

    const endpoints = {
        "detail" : "http://localhost:8000//stuffs/{id}",
        "delete" : "http://localhost:8000///stuffs/delete/{id}",
        "update" : "http://localhost:8000///stuffs/update/{id}",
        "store" : "http://localhost:8000///stuffs/store",
        'edit' : "http://localhost:8000///stuffs/edit"
    }

    const columnDetailModalDelete = 'name'

    const judulModalEdit = 'Stuff'

    const inputData = {
        // kalau tag input , typenya bisa text, number, email,
        "name" : {
            "type" : "text",
            "options" : null,
        },
        "category" : {
            "type" : "select",
            "options" : ['KLN','HTL','Sarpras/Teknisi']
        }
    }

    return (
        <>
    <Navbar />
    <div className="p-30 m-10 mt-5" style={{ margin: '350px' }}>
        <br />
        <div className="flex justify-center mt-5">
            <button className="">
            </button>
            <button className="">
            </button>
        </div>
        <Table
            dataTh={dataThParent}
            dataTd={stuffs}
            columnDb={columnDatabase}
            buttonData={buttons}
            endpoints={endpoints}
            columnDetail={columnDetailModalDelete}
            judulModalEdit={judulModalEdit}
            inputData={inputData}
        />
    </div>
</>

    )
}