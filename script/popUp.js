//popUp.js file by Ahmad - Gets the time value from api and displays it
//allows user to change the city from the default
//limited number of cities in api so if city is not recognized GMT is displayed
//updates every minute because of limited free requests from api this can lead to an inacurracy of up to a minute at most
window.onload = function() {
    appkey = "3216479e5d264ea08143b3a08d2fd967";
    //the spaces between paragraphs that will sometimes be displayed
    var spaces = document.getElementsByClassName("margin");
    //gets the stored city and if it doesnt exist it makes the city Edmonton
    chrome.storage.sync.get('city1', function(timezone1){
        if(timezone1.city1)
        {
            searchCity1.value = timezone1.city1;
            findTime1();
        }
        else
        {
            searchCity1.value = "America/Edmonton";
            findTime1();
        }
        
    });

    chrome.storage.sync.get('city2', function(timezone2){
        if(timezone2.city2)
        {
            searchCity2.value = timezone2.city2;
            findTime2();
        }  
        else
        {
            searchCity2.value = "Asia/Kolkata";
            findTime2();
        }
    });
    chrome.storage.sync.get('city3', function(timezone3){
        if(timezone3.city3)
        {
            searchCity3.value = timezone3.city3;
            findTime3();
        }
        else
        {
            searchCity3.value = "America/Los_Angeles";
            findTime3();
        }
        
    });
    //switches to the search page or the homepage
    edit.onclick = function() {
        if(edit.innerHTML == "Edit")
        {
            displayTime1.style.display = "none";
            displayTime2.style.display = "none";
            displayTime3.style.display = "none";
            timezone1.style.display = "none";
            timezone2.style.display = "none";
            timezone3.style.display = "none";
            searchCity1.style.display = "block";
            searchCity2.style.display = "block";
            searchCity3.style.display = "block";
            searchB1.style.display = "inline-block";
            searchB2.style.display = "inline-block";
            searchB3.style.display = "inline-block";
            info.style.display = "inline-block"
            info2.style.display = "inline-block";
            for(var i = 0; i < spaces.length; i++)
                spaces[i].style.display = "block";
            edit.innerHTML = "Done";
        }
        else
        {
            displayTime1.style.display = "block";
            displayTime2.style.display = "block";
            displayTime3.style.display = "block";
            timezone1.style.display = "block";
            timezone2.style.display = "block";
            timezone3.style.display = "block";
            searchCity1.style.display = "none";
            searchCity2.style.display = "none";
            searchCity3.style.display = "none";
            searchB1.style.display = "none";
            searchB2.style.display = "none";
            searchB3.style.display = "none";
            info.style.display = "none";
            info2.style.display = "none";
            for(var i = 0; i < spaces.length; i++)
                spaces[i].style.display = "none";
            edit.innerHTML = "Edit";
        }
        
        
    }
    //if user changes city it finds the new time and stores it in html tag
    searchB1.onclick = function() {
        findTime1();
    }
    
    searchB2.onclick = function() {
        findTime2();
    }

    searchB3.onclick = function() {
        findTime3();
    }
    
    
    
}
//displays the time that is found in the api
function apiResponse1(response) 
{
    let jsonObject = JSON.parse(response);
    //gives only hour and minute rather than h:m:s, also gets the name of the timezone/city
    document.getElementById("displayTime1").innerHTML = jsonObject.time_12.slice(0,5) + jsonObject.time_12.slice(8);
    timezone1.innerHTML = jsonObject.timezone;
}

function apiResponse2(response) 
{
    let jsonObject = JSON.parse(response);
    document.getElementById("displayTime2").innerHTML = jsonObject.time_12.slice(0,5) + jsonObject.time_12.slice(8);
    timezone2.innerHTML = jsonObject.timezone;
}

function apiResponse3(response) 
{
    let jsonObject = JSON.parse(response);
    document.getElementById("displayTime3").innerHTML = jsonObject.time_12.slice(0,5) + jsonObject.time_12.slice(8);
    timezone3.innerHTML = jsonObject.timezone;
}
//gets the time from api every minute
function findTime1()
{
    if(searchCity1.value === "") {

    }
    else 
    {
        let searchURL = "https://api.ipgeolocation.io/timezone?apiKey=" + appkey + "&tz=" + searchCity1.value;
        
        httpRequestAsync(searchURL, apiResponse1);
    }
    chrome.storage.sync.set({'city1' : searchCity1.value}, function(){});
    //runs this function every minute
    setTimeout(findTime1, 60000);
}

function findTime2()
{
    if(searchCity2.value === "") {

    }
    else 
    {
        let searchURL = "https://api.ipgeolocation.io/timezone?apiKey=" + appkey + "&tz=" + searchCity2.value;
        
        httpRequestAsync(searchURL, apiResponse2);
    }
    chrome.storage.sync.set({'city2' : searchCity2.value}, function(){});
    setTimeout(findTime2, 60000);
}

function findTime3()
{
    if(searchCity3.value === "") {

    }
    else 
    {
        let searchURL = "https://api.ipgeolocation.io/timezone?apiKey=" + appkey + "&tz=" + searchCity3.value;
        
        httpRequestAsync(searchURL, apiResponse3);
    }
    chrome.storage.sync.set({'city3' : searchCity3.value}, function(){});
    setTimeout(findTime3, 60000);
}

//get request function that checks status of page then calls apiResponse to change the time for the city
function httpRequestAsync(url, callback)
{
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if(httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

