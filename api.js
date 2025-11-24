/**
 * Fetch Tekken 8 character move list from the TekkenDocs API.
 * 
 * @param {*} characterName - The name of the character.
 * @returns - Resolves with the character's full move list.
 */
function fetchCharacter(characterName) {

    const url = `https://tekkendocs.com/api/t8/${encodeURIComponent(characterName)}/framedata`

    return $.ajax({
        url: url,
        method: "GET",
        dataType: "json"
    }).catch(function (err) {
        console.error("Move data API error:", err);
    });
}

/**
 * Fetch the first relevant Tekken 8 character trailer from YouTube API.
 * 
 * @param {*} characterName - The character to search for.
 * @returns - Resolves with a YouTube video ID, or null if not found.
 */
function fetchYouTubeTrailer(characterName) {
    const API_KEY = "AIzaSyATIxakgreF9oL9yJpAGitqX4eme1tUUVQ";
    const query = encodeURIComponent(`"Tekken 8 ${characterName} trailer"`);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=1&key=${API_KEY}`;

    return $.ajax({
        url: url,
        method: "GET",
        dataType: "json"
    })
        .then(response => {
            const videoId = response.items[0].id.videoId;

            if (!videoId) {
                console.warn(`No YouTube trailer found for "${characterName}".`);
                return null;
            }

            return videoId;
        })
        .catch(err => {
            console.error("YouTube API error:", err);
            return null;
        });
}

/**
 * Load additional character info from a local JSON file.
 * 
 * @param {*} characterName - Name used to find matching entry in JSON file.
 * @returns - Returns bio, image path and other info about a character or null if not found.
 */
function fetchLocalCharacterInfo(characterName) {
    return $.ajax({
        url: "assets/charinfo.json",
        method: "GET",
        dataType: "json"
    })
        .then(info => {
            const lower = characterName.toLowerCase();

            const match = info.find(c =>
                c.characterName.toLowerCase().includes(lower)
            );

            if (!match) {
                console.warn(`No character info found for "${characterName}".`);
                return null;
            }

            return match;
        })
        .catch(err => {
            console.error("Error loading charinfo.json:", err);
            return null;
        });
}