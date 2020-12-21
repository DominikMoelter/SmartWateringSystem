#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "DHT.h"

//declare methods
void sendRequest(String);
void readTemperature();
void readHumidity();
void readSoilMoisture();
void readWaterlevel();

//Wifi credentials
char ssid[] = "saufbuam"; //SSID of your Wi-Fi router
char pass[] = "ArschWG2020"; //Password of your Wi-Fi router

//Create HTTP client to send requests
HTTPClient http; //Declare an object of class HTTPClient

//server URL
String serverUrl = "https://zapfhahn.azurewebsites.net/index.php";
String requestUrl = "";

//sensor value variables
float humidity;
float temperature;
int soilmoistureAbsolut;
double soilmoisture;
int distance;
double waterlevel;

//DHT setup
#define DHTPIN 12
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

//Soil Moisture setup
const int soilmoistureMinimum = 400;
const int soilmoistureMaximum = 777;
const int soilmoistureRange = soilmoistureMaximum - soilmoistureMinimum;

//HC-SR04 setup
#define hcsrEchoPin 14
#define hcsrTriggerPin 16
const int waterlevelMinimum = 10;
const int waterlevelMaximum = 40;
const int waterlevelRange = waterlevelMaximum - waterlevelMinimum;

void setup() {
  Serial.begin(9600);
  delay(500);

  //WIFI SETUP
  Serial.println();
  Serial.println();
  Serial.print("Connecting to...");
  Serial.println(ssid);

  WiFi.begin(ssid, pass);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("Wi-Fi connected successfully");  

  sendRequest("lb");
  //TODO send calibration values

   //DHT SETUP
   dht.begin();
  
   //HC-SR04 SETUP
   pinMode(hcsrTriggerPin, OUTPUT);
   pinMode(hcsrEchoPin, INPUT);

}

void sendRequest(String sensortype) {
  //build the request url depening on sensor
  if(sensortype == "dht"){
    requestUrl = serverUrl + "?type=" + sensortype + "&temperature=" + temperature + "&humidity=" + humidity;
  }
  else if(sensortype == "sm"){
    requestUrl = serverUrl + "?type=" + sensortype + "&soilmoisture=" + soilmoisture;
  }
  else if(sensortype == "wl"){
    requestUrl = serverUrl + "?type=" + sensortype + "&waterlevel=" + waterlevel;
  }
  else if(sensortype == "mt"){
    requestUrl = serverUrl + "?type=" + sensortype + "&waterlevel=" + waterlevel;
  }
  else if(sensortype == "lb"){
    requestUrl = serverUrl + "?type=" + sensortype;
  }
  else{
    requestUrl = "invalid";
    Serial.println("Invalid sensortype!");
  }  

  if(requestUrl != "invalid"){
    Serial.print("Request-URL: ");
    Serial.println(requestUrl);
  }


/*
  //send data to webserver
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status   
    http.begin(requestUrl);  //Specify request destination
    int httpCode = http.GET();  //Send the request
     
    if (httpCode > 0) { //Check the returning code
    String payload = http.getString();   //Get the request response payload
    Serial.println(payload);                     //Print the response payload
    }
    http.end();   //Close connection
  }
  */
}

void readDHT(){
  humidity = dht.readHumidity();
  temperature = dht.readTemperature(); //Read temperature in Celsis, for Fahrenheit use 'dht.readTemperature(true);'

  // Check if any reads failed and exit early (to try again).
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  Serial.print(F("Humidity: "));
  Serial.print(humidity);
  Serial.print(F("%  Temperature: "));
  Serial.print(temperature);
  Serial.println(F("°C "));
}

void readHumidity(){
  humidity = dht.readHumidity();
  
  // Check if humidity read failed and exit early
  if (isnan(humidity)) {
    Serial.println(F("Failed to read humidity from DHT sensor!"));
    return;
  }

  Serial.print(F("Humidity: "));
  Serial.print(humidity);
  Serial.println(F("%"));
}

void readTemperature(){
  temperature = dht.readTemperature(); //Read temperature in Celsis, for Fahrenheit use 'dht.readTemperature(true);'

  // Check if temperature read failed and exit early
  if (isnan(temperature)) {
    Serial.println(F("Failed to read temperature from DHT sensor!"));
    return;
  }

  Serial.print(F("%  Temperature: "));
  Serial.print(temperature);
  Serial.println(F("°C "));
}

void readSoilMoisture(){
  soilmoistureAbsolut = analogRead(0);

  if(soilmoistureAbsolut < soilmoistureMinimum) {
    soilmoisture = 100;
  }
  else if(soilmoistureAbsolut > soilmoistureMaximum) {
    soilmoisture = 0;
  }
  else{
    soilmoisture = 100 - ((soilmoistureAbsolut - soilmoistureMinimum) * 100 / (soilmoistureRange));
  }

  Serial.print(F("Soilmoisture (absolut): "));
  Serial.println(soilmoistureAbsolut);
  Serial.print(F("Soilmoisture (relative): "));
  Serial.println(soilmoisture);
}

void readWaterlevel(){
  long duration; //duration of sound wave travel
  
  // Clears the trigPin condition
  digitalWrite(hcsrTriggerPin, LOW);
  delayMicroseconds(2);
  
  // Sets the trigPin HIGH (ACTIVE) for 10 microseconds
  digitalWrite(hcsrTriggerPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(hcsrTriggerPin, LOW);
  
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(hcsrEchoPin, HIGH);
  
  // Calculating the distance
  distance = duration * 0.034 / 2; // Speed of sound wave divided by 2 (go and back)

  //Calculating relative waterlevel
  if(distance < waterlevelMinimum){
    waterlevel = 0;
  }
  else if(distance > waterlevelMaximum){
    waterlevel = 100;
  }
  else{
    waterlevel = (distance - waterlevelMinimum) * 100 / (waterlevelRange);
  }
  
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");
  Serial.print("Waterlevel: ");
  Serial.print(waterlevel);
  Serial.println("%");
}

void loop() {
  delay(2000);
  readDHT();
  readSoilMoisture();
  readWaterlevel();
  sendRequest("dht");
  sendRequest("sm");
  sendRequest("wl");
}
