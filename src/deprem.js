const axios = require('axios');

async function sonDepremler(numberOfEarthquakes) {
    try {
        const response = await axios.get('https://api.orhanaydogdu.com.tr/deprem/kandilli/live');
        if (isNaN(sonDepremler)) throw new Error('sonDepremler parametresi sayı olmalıdır!');
        if (numberOfEarthquakes < 1) throw new Error('sonDepremler parametresi 1\'den küçük olamaz!');
        if (numberOfEarthquakes > response.data.result.length) throw new Error('API\'dan dönen deprem sayısından fazla bir değer girdiniz!');

        const depremler = response.data.result.slice(0, numberOfEarthquakes);

        const translatedDepremler = depremler.map(deprem => {
            return {
                "id": deprem._id,
                "date": deprem.date,
                "mag": deprem.mag,
                "depth": deprem.depth,
                "title": deprem.title,
                "location_properties": {
                    "closestCity": {
                        "name": deprem.location_properties.closestCity.name,
                        "distance": deprem.location_properties.closestCity.distance,
                        "population": deprem.location_properties.closestCity.population,
                    },
                    "epiCenter": {
                        "name": deprem.location_properties.epiCenter.name,
                        "cityCode": deprem.location_properties.epiCenter.distance,
                        "population": deprem.location_properties.epiCenter.population,
                    },
                    "closestCities": deprem.location_properties.closestCities.map(city => {
                        return {
                            "name": city.name,
                            "distance": city.distance,
                            "population": city.population,
                        };
                    }),
                    "airports": deprem.location_properties.airports.map(airport => {
                        return {
                            "name": airport.name,
                            "distance": airport.distance,
                        };
                    }),
                    "geoJson": {
                        "type": deprem.location_properties.geoJson.type,
                        "coordinates": deprem.location_properties.geoJson.coordinates
                    },
                },
                
            };
        });

        return translatedDepremler;
    } catch (error) {
        console.error('API çağrısında hata oluştu:', error);
        throw error;
    }
}

module.exports = {
    sonDepremler
};