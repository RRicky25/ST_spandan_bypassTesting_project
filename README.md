## Instructions for running test script
- First setup your spand backend with backend running at port 8000.
- Navigate to testingScripts > testing > PostmanCollectionTest where you can find the java maven project for testing.
- Add any extra scenarios that you want to test in the corresponding json files.
- run:
```
- mvn clean install
- mvn exec:java -Dexec.mainClass="com.example.PostmanCollectionTester"
```
- The above commands will send the requests based on all the variations provided in the json files and will print the responses of those requests which can then be observed and analysed.
