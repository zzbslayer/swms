#include <SoftwareSerial.h>
SoftwareSerial BT(10, 11);
#define off 1
#define water 22
char val;
long timetag = 0;
long realtime;
int timeswitch = 1;

char result[3] = {'0', '0', '0'};
int cnt = 0;
bool resultFlag = false;
/*
    counter to distinguish which flower data it is
*/

char a = '0';
int flag = 0;
int penshui2 = 0;

void echo2() {
  delay(50);
  while (BT.available()) {
    Serial.write(BT.read());
  }
}

void openBT() {
  digitalWrite(9, HIGH);//给蓝牙Vcc高频输入，给蓝牙上电
  digitalWrite(8, LOW);
  delay(500);
}

void closeBT() {
  digitalWrite(9, LOW); //
  delay(3000);
}

void connectFlower(String password, String addr) {
  digitalWrite(8, HIGH);//给key脚高频输入，激活蓝牙模块的AT设置模式
  BT.println("AT+ORGL");//蓝牙恢复出厂设置
  delay(1500);
  //echo2();
  BT.println("AT+PSWD=" + password);
  //echo2();
  delay(500);
  BT.println("AT+ROLE=1");
  //echo2();
  delay(500);
  BT.println("AT+RMAAD");
  //echo2();
  delay(500);
  BT.println("AT+BIND=" + addr);
  //echo2();
  delay(500);
  digitalWrite(8, LOW); //给key脚低频输入，使蓝牙模块的退出AT设置模式
  delay(2000);
}

void setup() {
  Serial.begin(38400);
  Serial.println("BT is ready!");
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
  BT.begin(38400);
  pinMode(8, OUTPUT);//将key连在uno板的8号脚
  pinMode(9, OUTPUT);//将蓝牙Vcc连在uno板的8号脚
  pinMode(13, OUTPUT);//灯的vcc在13号引脚
  pinMode(12, OUTPUT);//灯的vcc在13号引脚
  digitalWrite(13, LOW);
  digitalWrite(12, LOW);
  openBT();

  Serial.println("BT is ready!");
}

void watering() {
  /*
    digitalWrite(water, HIGH);
    delay(10000);
    digitalWrite(water, LOW);
    delay(500);
  */
}

char readData() {
  char temp = ' ';
  for (int i = 0; i < 40; i++) {
    BT.read(); // read unnecessary data
  }
  long j = 0; // avoid connect failed
  switch (cnt) {
    case 0: {
        while (!(temp == '3' || temp == '2' || temp == '1')) {
          if (j > 1000000) {
            Serial.println("Connect failed");
            temp = '1'; // connect failed. do nothing
            break;
          }
          temp = BT.read();
          j++;
        }
        Serial.print("before break, temp = ");
        Serial.println(temp);
        break;
      }
    case 1: {
        while (!(temp == '6' || temp == '5' || temp == '4')) {
          if (j > 1000000) {
            Serial.println("Connect failed");
            temp = '4'; // connect failed. do nothing
            break;
          }
          temp = BT.read();
        }
        break;
        /*
          case 2:{
          while(!(temp == '9' || temp == '8' || temp == '7')){
            if (j > 1000000){
                Serial.println("Connect failed");
                temp = '7'; // connect failed. do nothing
                break;
              }
            temp = BT.read();
          }
          flag = 1;
          /*
             Important !

             if the car has gone around, flag should be set to zero


        */
      }
    default: {
        Serial.println("*******************");
        Serial.print("Error code: cnt=");
        Serial.println(cnt);
        Serial.println("*******************");
        break;
      }
  }

  Serial.println("*******************");
  Serial.print("cnt=");
  Serial.println(cnt);
  Serial.print("temp=");
  Serial.println(temp);
  Serial.println("*******************");
  cnt++;
  if (cnt == 2) { // 2 is the number of flower
    cnt = 0;
    resultFlag = true; // all data is loaded
  }
  return temp;
}

int connect() {
  Serial.println("##################");
  Serial.print("cnt=");
  Serial.println(cnt);
  Serial.print("flag=");
  Serial.println(flag);
  Serial.println("##################");
  switch (cnt) {
    case 0: {
        if (flag == 0) {
          openBT();
          connectFlower("1111", "98d3,61,fd48ef");
          closeBT();
          delay(2000);
          openBT();
          delay(10000);
          Serial.println("connect flower1");
        }
        break;
      }
    case 1: {
        if (flag == 0) {
          openBT();
          connectFlower("2222", "98d3,31,fd85f8");
          closeBT();
          delay(2000);
          openBT();
          delay(10000);
          Serial.println("connect flower2");
        }
        //flag = 1; // set flag = 1 when all data is loaded
        break;
      }
    /*
      case 2: {
        if (flag == 0) {
          openBT();
          flower3();
          closeBT();
          delay(2000);
          openBT();
          delay(10000);
          Serial.println("connect flower3");
        }
        //flag = 1; // set flag = 1 when all data is loaded
        break;
      }
    */
    default: {
        Serial.println("*******************");
        Serial.print("Error code: cnt=");
        Serial.println(cnt);
        Serial.println("*******************");
        return 1;
      }
  }
  return 0;
}

void printResult(char* a) {
  int len = 3;
  Serial.print("result[] = [");
  for (int i = 0; i < 3; i++) {
    Serial.print(result[i]);
    Serial.print(", ");
  }
  Serial.println("]");
}

void loop()
{
  if (flag == 1)
    return;
  connect();
  Serial.println("connect finished.");

  result[cnt] = readData();
  Serial.println("&&&&&&&&&&&&&&&&&&&&&");
  printResult(result);
  Serial.println(result[cnt]);
  Serial.print("resultFlag=");
  Serial.println(resultFlag);
  Serial.println("&&&&&&&&&&&&&&&&&&&&&");

  penshui2 = 0;

  //  switch (result[0]) {
  //    case '1': {
  //        Serial.println("flower1 stop watering");
  //        break;
  //      }
  //    case '2': {
  //        Serial.println("flower1 water once");
  //        watering();
  //        break;
  //      }
  //    case '3': {
  //        Serial.println("flower1 water twice");
  //        watering();
  //        watering();
  //        break;
  //      }
  //    default: {
  //        Serial.println("*******************");
  //        Serial.print("Error code: c=");
  //        Serial.println(c);
  //        Serial.println("*******************");
  //      }
  //  }
  //
  //  switch (result[1]) {
  //    case '4': {
  //        Serial.println("flower2 stop watering");
  //        break;
  //      }
  //    case '5': {
  //        Serial.println("flower2 water once");
  //        watering();
  //        break;
  //      }
  //    case '6': {
  //        Serial.println("flower2 water twice");
  //        watering();
  //        watering();
  //        break;
  //      }
  //    default: {
  //        Serial.println("*******************");
  //        Serial.print("Error code: c=");
  //        Serial.println(c);
  //        Serial.println("*******************");
  //      }
  //  }
  //  //  if (penshui2 == 0 && resultFlag) {
  //  //    switch (c) {
  //  //      /*
  //  //        flower1 : 0
  //  //      */
  //  //      case '1': {
  //  //          Serial.println("flower1 stop watering");
  //  //          break;
  //  //        }
  //  //      case '2': {
  //  //          Serial.println("flower1 water once");
  //  //          watering();
  //  //          break;
  //  //        }
  //  //      case '3': {
  //  //          Serial.println("flower1 water twice");
  //  //          watering();
  //  //          watering();
  //  //          break;
  //  //        }
  //  //      case '4': {
  //  //          Serial.println("flower2 stop watering");
  //  //          break;
  //  //        }
  //  //      case '5': {
  //  //          Serial.println("flower2 water once");
  //  //          watering();
  //  //          break;
  //  //        }
  //  //      case '6': {
  //  //          Serial.println("flower2 water twice");
  //  //          watering();
  //  //          watering();
  //  //          break;
  //  //        }
  //  //      case '7': {
  //  //          Serial.println("flower3 stop watering");
  //  //          break;
  //  //        }
  //  //      case '8': {
  //  //          Serial.println("flower3 water once");
  //  //          watering();
  //  //          break;
  //  //        }
  //  //      case '9': {
  //  //          Serial.println("flower3 water twice");
  //  //          watering();
  //  //          watering();
  //  //          break;
  //  //        }
  //  //      default: {
  //  //          Serial.println("*******************");
  //  //          Serial.print("Error code: c=");
  //  //          Serial.println(c);
  //  //          Serial.println("*******************");
  //  //        }
  //  //    }
  //  //  }
  delay(5000);
}
