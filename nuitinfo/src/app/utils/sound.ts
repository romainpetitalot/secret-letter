var audios: any[] = []

const blablas: string[] = ["/assets/sounds/blabla.mp3"/*,"/assets/sounds/blabla2.mp3"*/]

export function playAudio(audioFile:string, loop:boolean){
    let audio = new Audio();
    audio.src = audioFile;
    audio.loop = loop;
    audio.load();
    audio.play();

    audios.push(audio);
    audio.onended = (event) => {
        let index:number = audios.indexOf(audio);
        audios.splice(index, 1);
    }
}

export function stopAllAudio() {
    let copy:any[] = audios;
    audios = [];
    copy.forEach((audio) => {audio.pause();});
}

export function randomBlabla() {
    playAudio(blablas[Math.floor(Math.random() * blablas.length)], false);
}