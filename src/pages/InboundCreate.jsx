import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function InboundCreate(){
    const [dataStuffs, setStuffs] = useState([])

    const [selectedFile, setSelectedFile] = useState(null);
    const onInputChange = (event) => {
        const { name, value } = event.target;
        setForms({ ...forms, [name]: value });
    };



    const [forms, setForms] = useState({
        stuff_id: '',
        total: '',
        date: '',
        proof_file: null
    })

    const navigate = useNavigate()
    const instance = axios.create(
        {
            baseURL: 'http://localhost:8000',
            headers: {
                'Authorization': 'Bearer'+ localStorage.getItem('access_token'),
            }
        }
    )

    const [error, setError] = useState([])

    useEffect(() => {
        instance.get('/stuffs', {
            headers: {
                'Authorization': 'Bearer'+ localStorage.getItem('access_token')
            }
        })

        .then(res => {
            setStuffs(res.data.data)
        })
        .catch(err => {
            if (err.response.status == 401) {
                navigate('/login?message=' + encodeURIComponent('anda belum login!'))
            }
        })
    }, [])

    const handleCreateInbound = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('stuff_id', forms.stuff_id)
        formData.append('total', forms.total);
        formData.append('date', forms.date);
        formData.append('proof_file', forms.proof_file);
        instance.post('/inbound-stuffs/store', formData)
            .then(res => {
                setTimeout(() => {
                    navigate('/inbound')
                }, 2000);

            })
            .catch(err => {
                console.log(err.response);
            })
    }

    return (
        <>
                <Navbar />
                <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16 mt-20">
                <h2 class="mb-4 text-xl font-bold text-white dark:text-black">Add a new Inbound Stuff Data</h2>
                <form action="#" onSubmit={handleCreateInbound}>
                    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div class="sm:col-span-2">
                            <label for="date" class="block mb-2 text-sm font-medium text-white dark:text-white">Date</label>
                            <input type="date" name="date" id="date" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={e => setForms({ ...forms, date: e.target.value })} />
                        </div>
                        <div>
                            <label for="stuff" class="block mb-2 text-sm font-medium text-white dark:text-white">Stuff</label>
                            <select id="stuff"  name="stuff_id" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={e => setForms({ ...forms, stuff_id: e.target.value })}>
                                <option hidden disabled selected>Select Stuff</option>
                                {
                                    dataStuffs.map((stuff, index) => (
                                        <option value={stuff.id}>{stuff.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <label for="total" class="block mb-2 text-sm font-medium text-white dark:text-white">Total Stuff</label>
                            <input type="number" name="total" id="total" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={e => setForms({ ...forms, total: e.target.value })} />
                        </div>
                        <div class="sm:col-span-2">
                            <label for="proff_file" class="block mb-2 text-sm font-medium text-white dark:text-white">Proff File</label>
                            <input type="file" name="proff_file" id="proff_file" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={e => setForms({ ...forms, proof_file: e.target.files[0] })} />
                        </div>
                    </div>
                    <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Add Inbound
                    </button>
                </form>
            </div>        </>

        
    );
}