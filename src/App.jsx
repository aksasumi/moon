import axios from 'axios'
import React, { useEffect, useState } from 'react'

function App() {
  const [city,setCity]=useState("")
  const [weatherData,setWeatherData]=useState({})
  const images=[
    {weather: "few clouds",img:"./few cloudes.avif"},
    {weather:"scattered clouds",img:"./scatterd cloud.avif"},
    {weather:"broken clouds",img:"./broken cloud.avif"},
    {weather:"overcast clouds",img:"./sky-covered-with-clouds.avif"},
    {weather:"clear sky",img:"./clear sky.jpg"},
    {weather:"haze",img:"./haze.avif"},
    {weather:"moderate rain",img:"./moderate rain.webp"},
  ]
 
async function getWeather(){
  if (city!=""){
  const res=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=969cb57c40a936e337383d174ed5d492`)
    console.log(res.data);
    setWeatherData(res.data)
}
else{
  alert("Empty location")
}
}
useEffect(()=>{
  async function getKochi(){
    const kochiRes=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=kochi&appid=969cb57c40a936e337383d174ed5d492`)
    setWeatherData(kochiRes.data)
  }
  getKochi()
},[])

  return (
    <>
      <div>
      <section className="vh-100">
      <div className="container py-5 h-100">

        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-4">

            <h3 className="mb-6 pb-5 fw-dark text-center fs-1">WEATHER</h3>

            <div className="input-group rounded mb-3">
              <input type="search" className="form-control rounded shadow" placeholder="City" onChange={(e)=>setCity(e.target.value)} />
                <button type="submit" className="btn btn-success mx-3 rounded shadow" onClick={getWeather}>search</button>
            </div>
        

        <div className="card text-black shadow" style={{borderRadius: "400px"}}>
          <div className="bg-img" style={{backgroundImage:"200px" }}>
            {
              images.map((e,index)=>(
                e.weather==(weatherData.weather && weatherData.weather[0].description)?<img src={e.img}
                className="card-img rounded" alt="weather"  />:<></>
              ))
               
            }
            <div className="mask" style={{backgroundImage:"200px"}}></div>
          </div>
          <div className="card-img-overlay text-dark p-5">
            <h4 className="mb-0">{weatherData.name},{weatherData.sys && weatherData.sys.country}</h4>
            <p className="display-2 my-3">{Math.round((weatherData.main && weatherData.main.temp-273.15)*100)/100}°C</p>
            <p className="mb-2">Feels Like: <strong>{Math.round((weatherData.main && weatherData.main.feels_like-273.15)*100)/100}°C</strong></p>
            <h5>{weatherData.weather && weatherData.weather[0].description}</h5>
          </div>
        </div>
        </div>
        </div>
      </div>
    </section>
  </div>
  </>
  )
}
export default App
