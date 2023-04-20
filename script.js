const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const btnRead = document.getElementById('btnRead');
const btnDelete = document.getElementById('btnDelete');
const message = document.getElementById('message');
const boxText = document.querySelector('.boxText');
const signos = document.querySelectorAll('.signos');

let recognition = new webkitSpeechRecognition();
recognition.lang='es-AR';
recognition.continuos= true;
recognition.interimResults=false;


recognition.onresult= (e)=>{
    const results = e.results;
    console.log(results);
    const frase = results[results.length - 1][0].transcript;
    boxText.value += " " + frase;
}

recognition.onend= (e)=>{
    message.innerHTML=  `<div class="alert alert-success mt-3" role="alert">
                           Fin de la Grabación
                        </div>`  
}

recognition.onerror= (e)=>{
    alert(e.error);
}

btnStart.addEventListener('click', ()=> {  
    recognition.start();
    message.innerHTML=  `<div class="alert alert-danger mt-3" role="alert">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-soundwave" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5zm-2 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm-6 1.5A.5.5 0 0 1 5 6v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm8 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm-10 1A.5.5 0 0 1 3 7v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5zm12 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5z"/>
    </svg>
    Grabando
    </div>`
});

btnStop.addEventListener('click', ()=> {
    recognition.abort();
});

btnRead.addEventListener('click', ()=>{
    leerTexto(boxText.value);
});

function leerTexto(boxText){
    const speech = new SpeechSynthesisUtterance();
    speech.text= boxText;
    speech.volume=1;
    speech.rate = 0.8;
    speech.pitch=1;

    window.speechSynthesis.speak(speech);


} 

//Borrar Texto 
btnDelete.addEventListener('click', ()=>{
    boxText.value="";
})

//Boton de los signos de puntuación
signos.forEach(function(boton){
    boton.addEventListener('click', function(){
        EscribirSigno(boton.value)
    });
})

function EscribirSigno(signo){
    if(signo === "Final"){
        boxText.value+= ".\n";
    }
    else{
        boxText.value+= signo;
    }
}



