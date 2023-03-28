import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { dataSelector, isLoadingSelector } from '@/store/public/selector'

import { fetchAllWorks } from '@/store/public/slice';
import WorksCard from '@/components/public/WorksCard';
import Navbar from '@/components/Navbar';

const works = () => {

  const dispatch = useDispatch();

  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [status, setStatus] = useState("");
  const data = useSelector(dataSelector);

  useEffect(() => {
    // getLocation();
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        const lat = position.coords.latitude;
        const lng = position.coords.longitude
        const string_lat = lat.toString();
        const string_lng = lng.toString();
        dispatch(fetchAllWorks({
          lat: string_lat,
          lng: string_lng
        }))
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }, [])


  return (
    <div>
      <div className="flex flex-col h-auto bg-[#f7f7f7]">
        <Navbar />

        {/* <div className="flex flex-row items-center bg-white px-32 py-5 border-t shadow-md">
        </div> */}

        <div className="flex flex-row h-full px-40 gap-x-20">
          <div className="flex flex-col gap-y-7 my-10 basis-[65%]">
            {
              data.map((item,key)=>(
                <WorksCard data={item} key={key}/>
              ))
            }
          </div>

          {/* <div className="flex flex-col h-96 my-10 p-10 bg-white basis-[35%]">

          </div> */}

        </div>
      </div>
    </div>
  )
}

export default works