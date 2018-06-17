var firstPage = document.querySelector(".firstPage");
var player = document.querySelector('.choosePlayerImg');
var monstr = document.querySelector('.chooseMonstrImg');
var InputName = document.querySelector('.player');
var answer = document.querySelector('.answerButton');
var numberPlayer = 0;
var numberMonstr = 0;
var namePlayer = "";
var nameMonstr = "";
var firstButton = document.querySelector('.firstButton');
var task = {};
var treatment = document.querySelector(".treatment");
var death = document.querySelector(".death");
var healthPl = 100;
var healthMn = 100;
var tempHealth = 0;
var raund = 0;
var plModel = document.createElement("img");
var plMonstr = document.createElement("img");
let ol = document.querySelector(".people");
let topMass = [];
for(var i=0 ; i<localStorage.length; i++){
    topMass.push(JSON.parse(localStorage.getItem(String(i))));
}
document.getElementById('soundForever').play();



firstButton.addEventListener('click',function(){
    document.getElementById('soundForever').play();
    firstPage.style.display = "none";
    document.querySelector(".choosePlayer").style.display = "block";
})


treatment.addEventListener('click', chooseTreatment);
death.addEventListener('click', chooseDeath);

function chooseTreatment(event) {
    if (event.target.tagName !== 'BUTTON') {
        return;
    }
    tempHealth = Number(event.target.id);
    setTimeout(function () {showTask()}, 500);
}
function chooseDeath(event) {
    if (event.target.tagName !== 'BUTTON') {
        return;
    }
    tempHealth = Number(event.target.id);
    setTimeout(function () {showTask()}, 500);
}

var massPlayer = [
    {src: 'img/g1.png'},
    {src: 'img/g2.png'},
    {src: 'img/g3.png'},
    {src: 'img/g4.png'},
    {src: 'img/g5.png'},
];
var massMonstr = [
    {src: 'img/m1.png'},
    {src: 'img/m2.png'},
    {src: 'img/m3.png'},
    {src: 'img/m4.png'},
    {src: 'img/m5.png'},
    {src: 'img/m6.png'},
    {src: 'img/m7.png'},
];
var massMonstrName={
    adjective: ["Ужасный", "Сопливый", "Трусливый", "Злобный", "Застенчивый", "Робкий"],
    noun:["огр", "гном", "гоблин", "эльф", "карлик", "хоббит", "троль"],
    name:["Теодор", "Макс", "Семён","Валера", "Вася", "Лёха"]
}
var massTasks = [
    ["1 + 83", "2+2*2", "107 - 8", "7 * 11", "15+11", "1*11"],
    ["a t c", "o s y r r", "l o l e h"],
    ["cat" , "dog"]
];
var massAns = [
    ["84", "6", "99", "77", "26", "11"],
    ["cat", "sorry", "hello"],
    [["кошка", "кот", "котик"],["собака", "пес", "пёс", "собачка", "песик", "пёсик"]]
];


var nextPlayer = document.querySelector('.next');
var prevPlayer = document.querySelector('.prev');
var nextMonstr = document.querySelector('.nextMonstr');
var prevMonstr = document.querySelector('.prevMonstr');
var choosePlayer = document.querySelector('.choosePlayerAll');
var chooseMonstr = document.querySelector('.chooseMonstrAll');

nextPlayer.addEventListener('click', nextPlayerChoose);
prevPlayer.addEventListener('click', prevPlayerChoose);
nextMonstr.addEventListener('click', nextMonstrChoose);
prevMonstr.addEventListener('click', prevMonstrChoose);
choosePlayer.addEventListener('focus', choosePlayerAll);
chooseMonstr.addEventListener('focus', chooseMonstrAll);
answer.addEventListener('click', getAnswer);

function randomName() {
    nameMonstr = "";
    var rand =Math.floor(Math.random() * (massMonstrName.adjective.length));
    nameMonstr+= massMonstrName.adjective[rand];
    rand =Math.floor(Math.random() * (massMonstrName.noun.length ));
    nameMonstr+=" "+ massMonstrName.noun[rand];
    rand =Math.floor(Math.random() * (massMonstrName.name.length));
    nameMonstr+=" "+ massMonstrName.name[rand];
    document.querySelector(".monstr").value = nameMonstr;
}
function choosePlayerAll() {
    if(InputName.value) {
        namePlayer = InputName.value;
        document.querySelector(".choosePlayer").style.display = "none";
        document.querySelector(".chooseMonstr").style.display = "block";
        randomName();
    }
}
function chooseMonstrAll() {
        document.querySelector(".chooseMonstr").style.display = "none";
        document.querySelector(".field").style.display = "block";

        plModel.src = player.src;
        plModel.style.width = 230 + 'px';
        plModel.style.height = 370 + 'px';
        plModel.style.marginLeft = '130px';
        plModel.style.marginTop = '150px';
        document.querySelector(".fieldPlayer").appendChild(plModel);

        plMonstr.src = monstr.src;
        plMonstr.style.width = 230 + 'px';
        plMonstr.style.height = 370 + 'px';
        plMonstr.style.marginRight = '130px';
        plMonstr.style.marginTop = '150px';
        document.querySelector(".fieldMonstr").appendChild(plMonstr);
    document.querySelector('.yourScore').innerHTML= healthPl + "";
    document.querySelector('.monstrScore').innerHTML= healthMn + "";
    setTimeout(function () {showStroke()}, 500)

}
function showStroke() {
    document.querySelector(".field").style.opacity = "0.5";
    document.querySelector(".stroke").style.display = "block";
}
function randomTask() {
    var task = {};
    var rand =Math.floor(Math.random() * (massTasks.length));
    task.type = rand;
    var rand2 =Math.floor(Math.random() * (massTasks[rand].length ));
    task.task = massTasks[rand][rand2];
    task.rand = rand;
    task.rand2 = rand2;
    task.answer = massAns[rand][rand2];
    return task;
}
function showTask() {
    document.querySelector(".stroke").style.display = "none";
    document.querySelector(".field").style.opacity = "0.5";
    document.querySelector(".raund").style.display = "block";
    task = randomTask();
    if(task.type === 0) {
        document.querySelector(".caption").innerHTML = "Реши пример и впеши ответ:" ;
        document.querySelector(".ask").innerHTML = task.task + "";
    }
    if(task.type === 1) {
        document.querySelector(".caption").innerHTML = "Собери из букв слово и впеши ответ:" ;
        document.querySelector(".ask").innerHTML = task.task + "";
    }if(task.type === 2) {
        document.querySelector(".caption").innerHTML = "Перевиди слово и впеши ответ:" ;
        document.querySelector(".ask").innerHTML = task.task + "";
    }
}
function getAnswer( ) {
    var str = document.querySelector('.answer').value;
    var bool = false;
    if (str) {
        if(task.rand === 2){
            for(var i=0; i< massAns[2][task.rand2].length; i++){
                if(str === massAns[2][task.rand2][i]){
                    bool = true;
                    break;
                }
            }
        }
            if (str === task.answer || bool === true) {
                if (tempHealth > 0) {
                    if (healthPl + tempHealth < 100) {
                        healthPl += tempHealth;
                    }
                    else {
                        healthPl = 100;
                    }
                }
                else {
                    if (healthMn + tempHealth > 0) {
                        healthMn += tempHealth;
                    }
                    else {
                        healthMn = 0;
                    }
                }
                document.querySelector(".raund").style.display = "none";
                document.querySelector(".resultBlock").style.display = "block";
                document.querySelector(".result").innerHTML = "Правильно";
                document.querySelector(".resultBlock").style.backgroundColor = "rgba(111, 200, 127, 0.9)"
                setTimeout(function () {
                    afterAnswer()
                }, 500);
            }
            else {
                if (tempHealth < 0) {
                    if (healthPl + tempHealth > 0) {
                        healthPl += tempHealth;
                        document.querySelector(".raund").style.display = "none";
                        document.querySelector(".resultBlock").style.display = "block";
                        document.querySelector(".result").innerHTML = "Неправильно";
                        document.querySelector(".resultBlock").style.backgroundColor = "red";
                        setTimeout(function () {
                            afterAnswer()
                        }, 500);
                    }
                    else {
                        healthPl = 0;
                        //конец игры
                        document.querySelector(".raund").style.display = "none";
                        document.querySelector(".resultBlock").style.display = "block";
                        document.querySelector(".result").innerHTML = "Неправильно";
                        document.querySelector(".resultBlock").style.backgroundColor = "red";
                        addRecord(raund);
                        setTimeout(function () {
                            theEnd()
                        }, 500);
                    }
                }
                else {
                    document.querySelector(".raund").style.display = "none";
                    document.querySelector(".resultBlock").style.display = "block";
                    document.querySelector(".result").innerHTML = "Неправильно";
                    document.querySelector(".resultBlock").style.backgroundColor = "red";
                    setTimeout(function () {
                        afterAnswer()
                    }, 500);

                }
            }
            bool = false;
    }
}

function compareNumeric(a, b) {
    if (a.perRes < b.perRes) return 1;
    if (a.perRes > b.perRes) return -1;
}
function addRecord(res) {
    topMass = [];
    let personObj = {name: namePlayer, perRes: res, place: localStorage.length};
    let person = JSON.stringify(personObj);
    let a = '' +personObj.place;
    localStorage.setItem(a, person);
    for(var i=0 ; i<localStorage.length; i++){
        topMass.push(JSON.parse(localStorage.getItem(String(i))));
    }
    topMass.sort(compareNumeric);
    if(topMass.length > 10){
        delete topMass[10];
        topMass.length--;
    }
    localStorage.clear();
    for(var i=0; i<topMass.length; i++){
        localStorage.setItem(String(i), JSON.stringify(topMass[i]));
    }

    localStorage.removeItem('10');
}
function theEnd() {
    let ol = document.querySelector(".people");
    document.querySelector(".resultBlock").style.display = "none";
    document.querySelector(".end").style.display = "block";
    document.querySelector(".endWords").innerHTML = "Победа над " +raund+ " монстрами";
    let lu = document.createElement('li');
    for (var i = 0; i < topMass.length; i++) {
        lu.innerHTML = '';
        lu.innerHTML = topMass[i].name + ' ' + topMass[i].perRes;
        ol.appendChild(lu.cloneNode(true));
    }
}
function afterAnswer() {
    tempHealth = 0;
    document.querySelector('.answer').value = "";
    document.querySelector('.yourScore').innerHTML= healthPl + "";
    document.querySelector('.monstrScore').innerHTML= healthMn + "";
    document.querySelector(".field").style.opacity = "1";
    document.querySelector(".resultBlock").style.display = "none";
    if (healthMn!==0){
        chooseMonstrAll();
    }
    if(healthMn === 0){
        document.querySelector(".field").style.display= "none";
        document.querySelector(".chooseMonstr").style.display = "block";
        healthMn = 100;
        raund++;
        plModel.remove();
        plMonstr.remove();
        randomName();
    }

}
function nextPlayerChoose() {
    numberPlayer++;
    if(numberPlayer % massPlayer.length === 0){
        numberPlayer = 0;
    }
    player.src = massPlayer[numberPlayer].src;
}
function prevPlayerChoose() {
    --numberPlayer;
    if(numberPlayer === -1){
        numberPlayer = massPlayer.length-1;
    }
    player.src = massPlayer[numberPlayer].src;
}
function nextMonstrChoose() {
    numberMonstr++;
    if(numberMonstr % massMonstr.length === 0){
        numberMonstr = 0;
    }
    monstr.src = massMonstr[numberMonstr].src;
    randomName();
}
function prevMonstrChoose() {
    --numberMonstr;
    if(numberMonstr === -1){
        numberMonstr = massMonstr.length-1;
    }
    monstr.src = massMonstr[numberMonstr].src;
    randomName();
}

