"use client";

import { useEffect, useState } from "react";

const WeatherComponent = () => {
  // const [data, setData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          // `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`,
          `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`
          // `https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setWeatherData(jsonData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Current Weather</h1>
      {weatherData ? (
        <div>
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherComponent;

// Explications :

// useState et useEffect sont des hooks React utilisés pour gérer l'état et effectuer des effets de côté.
// useState(null) initialise weatherData comme étant null. Une fois les données météorologiques récupérées avec succès via fetch, setWeatherData est utilisé pour mettre à jour l'état avec les données obtenues.
// useEffect est utilisé pour exécuter fetchData lors du montage du composant (lorsque le composant est d'abord rendu).

// Dans l'exemple ci-dessus, les données JSON récupérées à partir de l'API OpenWeatherMap sont affichées, y compris la température et la description météorologique.

// 5. Exécuter votre application
// Assurez-vous que votre application Next.js est en cours d'exécution avec npm run dev dans votre terminal. Cela permet de voir les résultats du fetch dans votre navigateur lorsque vous accédez à la page où vous avez implémenté ce composant.

// Conclusion
// En suivant ces étapes, vous pouvez facilement implémenter un fetch API vers OpenWeatherMap dans votre application React Next.js pour récupérer et afficher les données météorologiques actuelles d'une ville spécifique. Assurez-vous de personnaliser l'URL de l'API en fonction de vos besoins, par exemple en changeant le paramètre q pour une ville différente ou en ajustant les unités de mesure avec le paramètre units selon vos préférences.
