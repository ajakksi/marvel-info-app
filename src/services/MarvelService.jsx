class MarvelService {
    _apiBase = 'https://marvel-server-zeta.vercel.app/';
    _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';

    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();

    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        const fullThumbnail = char.thumbnail.path + '.' + char.thumbnail.extension;
        const imageNotAvailable = fullThumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
        
        return {
            name: char.name,
            description: char.description,  
            thumbnail: fullThumbnail,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            thumbnailStyle: imageNotAvailable?{'objectFit':'contain'} : {'objectFit':'cover'}
        }

    }
}

export default MarvelService;