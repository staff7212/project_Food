const postData = async (url, data) => {
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

//может быть другой синтаксис
// asyns function getResource(url) {
const getResource = async (url) => {
    let res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }//выброс ошибки в catch. И полное описание 

    return await res.json();
};


export {postData};
export {getResource};