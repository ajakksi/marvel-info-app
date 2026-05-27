import useHttp from '../hooks/http.hook' 

const useMarvelService = () => {

    const {loading,request,error,clearError} = useHttp();

    const _apiBase = 'https://marvel-server-zeta.vercel.app/';
    const _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
    const _baseOffset = 0;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        const fullThumbnail = char.thumbnail.path + '.' + char.thumbnail.extension;
        const imageNotAvailable = fullThumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

        return {
            id:char.id,
            name: char.name,
            description: char.description,  
            thumbnail: fullThumbnail,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            thumbnailStyle: imageNotAvailable?{'objectFit':'contain'} : {'objectFit':'cover'},
            comics: char.comics.items
        }

    }

    return  {loading, error, clearError, getAllCharacters, getCharacter}
}

export default useMarvelService;