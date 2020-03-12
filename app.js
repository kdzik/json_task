let fetch = require('node-fetch');
let users1 = require('./users1.json');
let posts1 = require('./posts1.json');
let users2 = require('./users2.json');
let posts2 = require('./posts2.json');

let uniqueContainer;
let unique;
let closestContainer;
let countContainer;
let set = 0;


/**
 * @desc szuka duplikatow w tytulach
 * @param arr - talica tytułów 
 * @return array - zwraca tablice duplikatow
 */
function findDuplicates(arr) {                                      
    return arr.filter((item, index) => arr.indexOf(item) != index);
}

/**
 * @desc szuka najblizszego uzytkownika
 * @param arr - tablica uzytkownikow 
 * @param elem - uzytkownik do ktorego najbliszego szukamy
 * @return arrTemp - tablica 
 */
function findClosest(arr, elem) {                           
    let arrTemp = [...arr];
    for (let i = 0; i < arrTemp.length; i++) {
        if (arr[i].id == elem.id) {
            arrTemp.splice(i, 1);
        }
    }
    return arrTemp.reduce(
        (prev, curr) => {
            return Math.abs(prev.address.geo.lat - elem.address.geo.lat) + Math.abs(prev.address.geo.lng - elem.address.geo.lng) < Math.abs(curr.address.geo.lat - elem.address.geo.lat) + Math.abs(curr.address.geo.lng - elem.address.geo.lng) ? prev : curr;
        }
    );
}

/**
 * @desc lączy posty z użytkownikami
 * @param users 
 * @param posts 
 * @return users with posts
 */
function addPosts(users, posts) {                                 
    for (let i = 0; i < users.length; i++) {
        users[i].posts = posts.filter(post => post.userId == users[i].id);
    }
    return users;
}

/**
 * @desc pobiera dane z jsonplaceholder
 * @return uzytkownicy z postami
 */
async function call() {                                                
    let users;
    await fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let userId = data[0].id;
            users = data;
            return fetch("https://jsonplaceholder.typicode.com/posts");
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            users = addPosts(users, data);
        })
    return users;
}

/**
 * @desc zwraca tablice tytułow postów
 * @param arr - tablica uzytkownikow z postami
 */
function collectTitles(arr){
    let titles = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].posts.length; j++) {
            titles.push(arr[i].posts[j].title);
        }
    }
    return titles;
}

/**
 * @desc dodaje najblizszego uzytkownika do DOM
 * @param data 
 * @param user 
 */
function addClosest(data, user){
    let closest = findClosest(data, user);
    closestContainer = document.getElementById("closest");
    let closestP = document.createElement("p");
    closestP.innerHTML = "Najbliżej użytkownika: " + user.username + " mieszka: " + closest.username;
    closestContainer.appendChild(closestP);
}

/**
 * @desc liczy ile postow napisal uzytkownik i dodaje do DOM
 * @param user 
 */
function countPosts(user) {
    countContainer = document.getElementById("count__container");
    let elem = document.createElement("div");
    elem.innerHTML = user.username + " napisał(a) " + user.posts.length + " postów";
    countContainer.appendChild(elem);
}

/**
 * @desc sprawdza czy istnieja duplikaty i dodaje je do DOM
 * @param titles
 */
function checkUnique(titles){
    uniqueContainer = document.getElementById('unique__container');
    unique = document.createElement('div');
    unique.classList = "unique";
    let isUnique = document.createElement('p');
    let duplicates = [...new Set(findDuplicates(titles))];
    if (duplicates.length == 0) {
        isUnique.innerHTML = "Wszystkie tytuły postów są unikalne";
        unique.appendChild(isUnique);
    } else {
        isUnique.innerHTML = "Następujące tytuły nie są unikalne: ";
        unique.appendChild(isUnique);
        for (let i = 0; i < duplicates.length; i++) {
            let duplicate = document.createElement("p");
            duplicate.innerHTML = "- " + duplicates[i];
            duplicate.classList = "not__unique";
            unique.appendChild(duplicate);
        }
    }
    uniqueContainer.appendChild(unique);
}

/**
 * @desc uniwersalna funkcja do wykonania wszystkich operacji na danych
 * @param users 
 * @param posts 
 */
function checkSet(users, posts){
    let titles = [];
    users = addPosts(users, posts);
    for (let i = 0; i < users.length; i++) {
        countPosts(users[i]);
        addClosest(users, users[i]);
    }
    titles = collectTitles(users);
    checkUnique(titles);
}

/**
 * @desc zaleznie od opcji set wykonuje funkcje
 */
function setCall(){
    if (set == 0) {
        call()
            .then(data => {
                let titles = [];
                for (let i = 0; i < data.length; i++) {
                    countPosts(data[i]);
                    addClosest(data, data[i]);
                }
                titles = collectTitles(data);
                checkUnique(titles);
            })
            .catch(reason => console.log(reason.message))
    } else if (set == 1) {
        checkSet(users1, posts1);
    }
    else if(set == 2){
        checkSet(users2, posts2);
    }
}

window.addEventListener("load", function(event) {
    let set1 = document.getElementById("set1");
    let set2 = document.getElementById("set2");
    let set3 = document.getElementById("set3");
    set1.addEventListener("click", function(){
        set = 0;
        uniqueContainer.innerHTML = "";
        closestContainer.innerHTML = "";
        countContainer.innerHTML = "";
        setCall();
    });
    set2.addEventListener("click", function(){
        set = 1;
        uniqueContainer.innerHTML = "";
        closestContainer.innerHTML = "";
        countContainer.innerHTML = "";
        setCall();
    });
    set3.addEventListener("click", function(){
        set = 2;
        uniqueContainer.innerHTML = "";
        closestContainer.innerHTML = "";
        countContainer.innerHTML = "";
        setCall();
    });
    setCall();
});