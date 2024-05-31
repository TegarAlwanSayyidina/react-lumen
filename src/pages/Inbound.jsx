import React, { memo, useEffect, useState } from "react";
import Navbar from "../components/Navbar"; // Import komponen Navbar
import Table from "../components/Table"; // Import komponen Table
import axios from "axios"; // Import axios untuk melakukan request HTTP

export default function Stuffs() {
    // Array untuk header tabel
    const dataThParent = [
        "#",
        "Name",
        "Category",
        "Total Available",
        "Total Defec",
        "Action"
    ]

    // State untuk menyimpan data barang (stuffs)
    const [stuffs, setStuffs] = useState({});

    // Mengambil data dari API saat komponen di-mount
    useEffect(() => {
        axios.get('http://localhost:8000/stuffs', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token') // Mengambil token dari local storage
            }
        })
            .then(res => {
                setStuffs(res.data.data); // Menyimpan data yang diterima dari API ke dalam state
            })
            .catch(err => {
                console.log(err); // Menampilkan error jika request gagal
            })
    }, []);

    // Konfigurasi kolom dari database ke tabel
    const columnDatabase = {
        "name": null,
        "category": null,
        "stuff_stock": "total_available",
        "stuff_stock*": "total_defec",
    }

    // Konfigurasi tombol aksi yang akan ditampilkan pada tabel
    const buttons = [
        // "edit",
        'show',
        "delete",
        // "create",
        "createInbound"
    ]

    // Endpoints untuk operasi CRUD
    const endpoints = {
        "detail": "http://localhost:8000/stuffs/{id}",
        "delete": "http://localhost:8000/stuffs/delete/{id}",
        "update": "http://localhost:8000/stuffs/update/{id}",
        "store": "http://localhost:8000/stuffs/store",
        'edit': "http://localhost:8000/stuffs/edit"
    }

    // Kolom yang akan ditampilkan pada modal delete
    const columnDetailModalDelete = 'name';

    // Judul modal edit
    const judulModalEdit = 'Stuff';

    // Konfigurasi input data untuk form edit dan create
    const inputData = {
        // Jika tag input, typenya bisa text, number, email, dll.
        "name": {
            "type": "text",
            "options": null, // Tidak ada pilihan untuk input teks
        },
        "category": {
            "type": "select",
            "options": ['KLN', 'HTL', 'Sarpras/Teknisi'] // Pilihan untuk dropdown select
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