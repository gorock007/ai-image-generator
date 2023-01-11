
const onSubmit = (e) =>{
    e.preventDefault();

    //AFter submit
    document.querySelector('.text').textContent='';
    document.querySelector('#image').src = '';

    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;
    if(prompt === ''){
        alert('Please enter some prompt');
        return;
    }

    generateImageRequest(prompt, size);
}

const generateImageRequest = async (prompt, size) =>{
    try{
        showSpinner();

        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                size
            })
        });
        if(!response.ok){
            removeSpinner();
            throw new Error('Image could not be generated ')
        }

        const data = await response.json();

        const imageUrl = data.data;
        document.querySelector('#image').src = imageUrl;
        removeSpinner()
    }catch(e){
        document.querySelector('.text').textContent = error;
    }
}

const showSpinner = () =>{
    document.querySelector('.spinner').classList.add('show');
}
const removeSpinner = () =>{
    document.querySelector('.spinner').classList.remove('show');
}
document.querySelector('#form').addEventListener('submit', onSubmit);