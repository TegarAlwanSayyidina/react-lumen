import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ShowInbound() {

  const [dataInbound, setInbound] = useState([])

  const navigate = useNavigate()



  const { id } = useParams()
  useEffect(() => {
    axios.get('http://localhost:8000/inbound-stuffs/data', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
      .then(res => {
        setInbound(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);



  let inboundById = []

  dataInbound.map(data => {
    if (data.stuff_id == id) {
      inboundById.push(data)
    }
  })

  console.log(inboundById);


  const imgURL = 'http://localhost:8000/proof/'
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-4">
        <div className="flex flex-wrap -mx-4 mt-20">
          {inboundById.length > 0 ? (
            inboundById.map((data, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  {data.proof_file && (
                    <img className="w-full h-48 object-cover" src={imgURL
                      + data.proof_file} alt={data.title} />
                  )}
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">Total: {data.total}</h2>
                    <p className="text-black">Date: {data.date}</p>
                    <p className="text-gray-700">{data.description}</p>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                      Go somewhere
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full p-4">
              <p>No data found for the specified ID.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
