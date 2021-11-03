import Image from 'next/image'
import { useState, useEffect } from 'react'
import ReactMapGl, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Geocode from 'react-geocode'

export default function EditorMap({ flur }) {
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [loading, setLoading] = useState(true)
    const [viewport, setViewport] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        width: '100%',
        height: '500px',
        zoom: 12
    });

    useEffect(() => {
        console.log('my +++', flur, process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY)
        // Get latitude & longitude from address.
        Geocode.fromAddress(flur.location).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location
              setLat(lat)
              setLng(lng)
              setViewport({ ...viewport, latitude: lat, longitude: lng })
              setLoading(false)
            },
            (error) => {
              console.error(error)
            }
          );
        }, [])

    Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY)

    if (loading) return false

    console.log(lat, lng, process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY)

    return (
        <ReactMapGl
          {...viewport}
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
          onViewportChange={(vp) => setViewport(vp)}
        >
          <Marker key={flur.id} latitude={lat} longitude={lng}>
            <Image 
                src='/images/pin.png' 
                width={30} 
                height={30} 
            />
          </Marker>
        </ReactMapGl>
      )
}
