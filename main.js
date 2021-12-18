song_1 = "";
song_2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftwrist = 0;
scoreRightwrist = 0;
Song_status = "";
Song2_status="";

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload() {
    song_1 = loadSound("Music.mp3");
    song_2 = loadSound("Music_2.mp3");
}

function draw() {
    image(video, 0, 0, 600, 500);
    Song_status = song_1.isPlaying();
    Song2_status = song_2.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftwrist>0.2){
        circle(leftWristX, leftWristY, 20);
    song_1.stop();
    if(Song2_status==false){
        song_2.play();
        document.getElementById("display_song").innerHTML = "Astronomia";
    }
    }
    if(scoreRightwrist>0.2){
        circle(rightWristX, rightWristY, 20);
    song_2.stop();
    if(Song_status==false){
        song_1.play();
        document.getElementById("display_song").innerHTML = "Harry Potter";
    }
    }
}

function modelLoaded(){
    console.log("poseNet is Initialized");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreRightwrist = results[0].pose.keypoints[10].score;
        scoreLeftwrist = results[0].pose.keypoints[9].score;
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        
        righttWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
}        