## Testing strategy selected
Client-side web applications testing (bypass testing): Projects that involve testing of client side code of a web application by designing test cases that bypass client-side validation and sending changed/corrupt input to the server.

## Designed testcases
All the designed test cases for various forms can be found in the json files located in [PostmanCollectionTest Folder](testingScripts/testing/PostmanCollectionTest). Each json file contains various testcases for a single form.

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


## Result images
All the images for all the variations tried can be found [here](all_images)
