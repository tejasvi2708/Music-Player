let songs=[
    {songName:"Dil Ibadat",artist:"KK",duration:"529",filePath:"songs/Dil Ibadat.mp3" ,coverPath: "covers/tum_mile.webp"},
    {songName:"Raabta",artist:"xyz",duration:"404",filePath:"songs/Raabta.mp3" ,coverPath: "covers/agent vinod.webp"},
    {songName:"Raanjhanaa",artist:"Javed Ali",duration:"416",filePath:"songs/Raanjhanaa.mp3" ,coverPath: "covers/ranjhana.webp"},
    {songName:"Saibo",artist:"abc",duration:"315",filePath:"songs/Saibo.mp3" ,coverPath: "covers/shor in the city.webp"},
    {songName:"Tu Hi Haqiqat",artist:"Javed Ali",duration:"502",filePath:"songs/Tu Hi Haqiqat.mp3" ,coverPath: "covers/tum_mile.webp"},
    {songName:"Tum Se Hi",artist:"Mohit Chauhan",duration:"523",filePath:"songs/Tum Se Hi.mp3" ,coverPath: "covers/Jab-We-Met.webp"},
    {songName:"Zara Zara",artist:"Bobmbay Shri",duration:":58",filePath:"songs/Zara Zara.mp3" ,coverPath: "covers/rhtdm.jpg"},
]

const playBtn = document.getElementById('masterPlay');
const forwardBtn = document.getElementById('forward');
const backwardBtn = document.getElementById('backward');
const progressBar = document.getElementById('myProgressBar');
const songInfo = document.querySelector('.songInfo');
const songItems = document.querySelectorAll('.songItem');
let audioPlayer = new Audio("songs/Dil Ibadat.mp3" ); // Create an instance of the HTML5 audio element
let isPlaying = false;
let currentSongIndex = 0;

// Function to update song information
function updateSongInfo() {
    const currentSong = songs[currentSongIndex];
    songInfo.innerText = `${currentSong.songName} - ${currentSong.artist}`;
}
// Function to play or pause the song
playBtn.addEventListener('click',()=>{
    if(audioPlayer.paused || audioPlayer.currentTime<=0){
        audioPlayer.play();
        playBtn.classList.remove('fa-circle-play')
        playBtn.classList.add('fa-circle-pause')
    }
    else{
        audioPlayer.pause();
        playBtn.classList.remove('fa-circle-pause')
        playBtn.classList.add('fa-circle-play')
    }
})
//function to play next song
function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSongInfo();
    audioPlayer.src = songs[currentSongIndex].filePath;
    progressBar.value=0;
    audioPlayer.play();
    playBtn.classList.remove('fa-circle-play');
    playBtn.classList.add('fa-circle-pause');
}

// Function to play the previous song
function playPreviousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateSongInfo();
    audioPlayer.src = songs[currentSongIndex].filePath;
    progressBar.value=0;
    audioPlayer.play();
    playBtn.classList.remove('fa-circle-play');
    playBtn.classList.add('fa-circle-pause');
}
function handleProgressBarChange() {
    const progressPercentage = progressBar.value;
    const duration = audioPlayer.duration;
    const newTime = (progressPercentage / 100) * duration;
    audioPlayer.currentTime = newTime;
}
// Add click event listeners to each song item
songItems.forEach((songItem, index) => {
    songItem.addEventListener('click', () => {
        currentSongIndex = index;
        updateSongInfo();

        audioPlayer.src = songs[currentSongIndex].filePath;
        progressBar.value=0;

        audioPlayer.play();
        playBtn.classList.remove('fa-circle-play');
        playBtn.classList.add('fa-circle-pause');
        
    });
});


// Update progress bar according to the audio duration
audioPlayer.addEventListener('timeupdate', () => {

    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    
    const progressPercentage = (currentTime / duration) * 100;
    progressBar.value = progressPercentage;
   
});
// Add event listeners

forwardBtn.addEventListener('click', playNextSong);
backwardBtn.addEventListener('click', playPreviousSong);
progressBar.addEventListener('input', handleProgressBarChange);