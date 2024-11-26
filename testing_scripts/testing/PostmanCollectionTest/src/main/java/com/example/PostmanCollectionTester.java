package com.example;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import groovyjarjarantlr4.v4.parse.ANTLRParser.lexerCommandExpr_return;

import com.fasterxml.jackson.core.type.TypeReference;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class PostmanCollectionTester {

    public static void leave_gap(int gaps) {
        for (int i = 0; i < gaps; i++) {
            System.out.println();
        }
    }

    public static void printDashedLine(int dashes) {
        for (int i = 0; i < dashes; i++) {
            System.out.print("-");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        // Base URI for the API
        RestAssured.baseURI = "http://localhost:8000";

        // Test the token request
        testTokenRequest();
        leave_gap(6);

        // Test the user details request
        String accessToken = getAccessToken();
        leave_gap(2);
        testUserDetailsRequest(accessToken);
        leave_gap(6);

        // Test getting the team info of a user
        testGetUserTeamsForSport(accessToken);
        leave_gap(6);

        // Test the search by roll number
        testSearchPlayerByRollNumber();
        leave_gap(6);

        // Test the create team
        testCreateTeam(accessToken);
        leave_gap(6);

        // Test deleting the team
        testDeleteTeam(accessToken);
        leave_gap(6);

        // testing password Reset request
        testPasswordResetRequest();
        leave_gap(6);

        // testing get otp
        testGetOtp();
        leave_gap(6);

        // Scanner scanner = new Scanner(System.in);
        // // Prompt the user for the correct OTP
        // System.out.print("Enter the correct OTP for testing: ");
        // int correctOtp = scanner.nextInt();
        // scanner.close();
        // testOtpVerification(correctOtp);

        // Scanner scanner = new Scanner(System.in);
        // System.out.print("Enter the correct token: ");
        // String correctToken = scanner.nextLine(); // Prompt user for the correct
        // token
        // testConfirmPasswordReset(correctToken);
        // scanner.close(); // Close the scanner to avoid resource leaks
    }

    private static void testTokenRequest() {
        System.out.println("Testing Token Request...");
        String endpoint = "/api/token/";
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            // Specify the relative path to the JSON file
            Path filePath = Paths.get("src/main/java/com/example/token_request_scenarios.json");

            // Read scenarios from the JSON file
            JsonNode rootNode = objectMapper.readTree(Files.newInputStream(filePath));
            JsonNode scenarios = rootNode.get("scenarios");

            for (JsonNode scenario : scenarios) {
                String name = scenario.get("name").asText();
                String requestBody = scenario.get("requestBody").toString();

                System.out.println("Scenario: " + name);

                // Send request and get response
                Response response = RestAssured.given()
                        .header("Content-Type", "application/json")
                        .body(requestBody)
                        .post(endpoint);

                // Print response details
                System.out.println("Status Code: " + response.getStatusCode());
                System.out.println("Response: " + response.getBody().asString());
                printDashedLine(90);
                leave_gap(2);
            }
        } catch (IOException e) {
            System.err.println("Error reading JSON file: " + e.getMessage());
        }
    }

    private static String getAccessToken() {
        System.out.println("Getting Token...");
        String endpoint = "http://localhost:8000/api/token/"; // Full URL for the token endpoint
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            // Specify the relative path to the JSON file for access token credentials
            Path filePath = Paths.get("src/main/java/com/example/access_token_request.json");
            // System.out.println("File Path: " + filePath.toAbsolutePath()); // Debug file
            // location

            // Read and validate the JSON file
            JsonNode rootNode = objectMapper.readTree(Files.newInputStream(filePath));
            // System.out.println("Loaded JSON Content: " + rootNode.toString()); // Debug
            // JSON content

            // Construct request body dynamically
            String requestBody = objectMapper.writeValueAsString(rootNode);
            // System.out.println("Request Body: " + requestBody); // Debug request body

            // Send the POST request
            Response response = RestAssured.given()
                    .header("Content-Type", "application/json")
                    .body(requestBody)
                    .post(endpoint);

            // Check if the response is successful
            if (response.getStatusCode() == 200) {
                // Extract the "access" token from the JSON response
                String accessToken = response.jsonPath().getString("access");
                if (accessToken != null) {
                    System.out.println("Access token retrieved: " + accessToken);
                    return accessToken; // Return the token
                } else {
                    System.out.println("Access token not found in the response.");
                }
            } else {
                System.out.println("Failed to get the access token. Status Code: " + response.getStatusCode());
            }
        } catch (IOException e) {
            System.err.println("Error reading JSON file: " + e.getMessage());
        }

        // Return null if the token is not retrieved
        return null;
    }

    private static void testUserDetailsRequest(String accessToken) {

        // No email provides big error

        System.out.println("Testing User Details Request...");
        String endpoint = "http://localhost:8000/api/user/create/"; // Full URL for the endpoint
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            // Specify the relative path to the JSON file
            Path filePath = Paths.get("src/main/java/com/example/user_details_request.json");

            // Read and parse the JSON file
            JsonNode rootNode = objectMapper.readTree(Files.newInputStream(filePath));
            JsonNode testCases = rootNode.get("testCases");

            for (JsonNode testCase : testCases) {
                String scenario = testCase.get("scenario").asText();
                String email = testCase.get("email").asText();

                System.out.println("Scenario: " + scenario);

                // Send the GET request with the current email
                Response response = RestAssured.given()
                        .header("Authorization", "Bearer " + accessToken)
                        .header("Content-Type", "application/json")
                        .queryParam("email", email)
                        .get(endpoint);

                // Print response details
                System.out.println("Status Code: " + response.getStatusCode());
                System.out.println("Response: " + response.getBody().asString());
                printDashedLine(60);
            }
        } catch (IOException e) {
            System.err.println("Error reading JSON file: " + e.getMessage());
        }
    }

    private static void testGetUserTeamsForSport(String token) {

        // THIS ONE GIVES THE BIG ERROR
        // {
        // "scenario": "Missing Sport Name",
        // "params": {
        // "email": "ricky.ratnani@iiitb.ac.in"
        // }
        // }

        System.out.println("Testing: get_user_teams_for_sport...");
        String endpoint = "http://localhost:8000/api/team/";
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            // Specify the relative path to the JSON file
            Path filePath = Paths.get("src/main/java/com/example/get_user_teams_for_sport.json");

            // Read and parse the JSON file
            JsonNode rootNode = objectMapper.readTree(Files.newInputStream(filePath));
            JsonNode testCases = rootNode.get("testCases");

            for (JsonNode testCase : testCases) {
                String scenario = testCase.get("scenario").asText();
                JsonNode paramsNode = testCase.get("params");

                // Convert the params node to a Map
                Map<String, String> params = objectMapper.convertValue(paramsNode,
                        new TypeReference<Map<String, String>>() {
                        });

                System.out.println("Scenario: " + scenario);

                // Send the GET request with the query parameters
                Response response = RestAssured.given()
                        .header("Authorization", "Bearer " + token)
                        .queryParams(params)
                        .get(endpoint);

                // Print response details
                System.out.println("Status Code: " + response.getStatusCode());
                System.out.println("Response Body: " + response.getBody().asString());
                printDashedLine(60);
            }
        } catch (IOException e) {
            System.err.println("Error reading JSON file: " + e.getMessage());
        }
    }

    private static void testSearchPlayerByRollNumber() {
        System.out.println("Testing: search_player_by_rollnumber...");

        String endpoint = "http://localhost:8000/api/user/getuserbyroll/";
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            // Specify the relative path to the JSON file for test cases
            Path filePath = Paths.get("src/main/java/com/example/search_player_by_rollnumber.json");

            // Read and parse the JSON file
            JsonNode rootNode = objectMapper.readTree(Files.newInputStream(filePath));
            JsonNode testCases = rootNode.get("testCases");

            // Iterate through each test case in the JSON file
            for (JsonNode testCase : testCases) {
                String scenario = testCase.get("scenario").asText();
                String rollNum = testCase.get("rollNum").asText();

                System.out.println("Scenario: " + scenario);

                // Send the GET request with the roll number query parameter
                Response response = RestAssured.given()
                        .queryParam("rollNum", rollNum)
                        .get(endpoint);

                // Print response details
                System.out.println("Status Code: " + response.getStatusCode());
                System.out.println("Response Body: " + response.getBody().asString());
                printDashedLine(60);
            }
        } catch (IOException e) {
            System.err.println("Error reading JSON file: " + e.getMessage());
        }
    }

    private static void testCreateTeam(String token) {

        // THIS ONE GIVING BIG ERROR
        // {
        // "scenario": "Invalid Team Size",
        // "requestBody": {
        // "name": "blasters",
        // "sports": "Badminton-MS",
        // "members": [],
        // "team_size": -1,
        // "phoneNum": "9429525818"
        // }
        // }

        System.out.println("Testing: create_team...");

        String endpoint = "http://localhost:8000/api/team/";
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            // Specify the relative path to the JSON file for test cases
            Path filePath = Paths.get("src/main/java/com/example/create_team_scenarios.json");

            // Read and parse the JSON file
            JsonNode rootNode = objectMapper.readTree(Files.newInputStream(filePath));
            JsonNode testCases = rootNode.get("testCases");

            // Iterate through each test case in the JSON file
            for (JsonNode testCase : testCases) {
                String scenario = testCase.get("scenario").asText();
                JsonNode requestBodyNode = testCase.get("requestBody");
                String requestBody = objectMapper.writeValueAsString(requestBodyNode);

                System.out.println("Scenario: " + scenario);

                // Send the POST request with the request body
                Response response = RestAssured.given()
                        .header("Authorization", "Bearer " + token)
                        .header("Content-Type", "application/json")
                        .body(requestBody)
                        .post(endpoint);

                // Print response details
                System.out.println("Status Code: " + response.getStatusCode());
                System.out.println("Response Body: " + response.getBody().asString());
                printDashedLine(60);
            }
        } catch (IOException e) {
            System.err.println("Error reading JSON file: " + e.getMessage());
        }
    }

    private static void testDeleteTeam(String token) {
        System.out.println("Testing: delete_team...");

        String endpoint = "http://localhost:8000/api/team/";
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            // Specify the relative path to the JSON file for test cases
            Path filePath = Paths.get("src/main/java/com/example/delete_team_scenarios.json");

            // Read and parse the JSON file
            JsonNode rootNode = objectMapper.readTree(Files.newInputStream(filePath));
            JsonNode testCases = rootNode.get("testCases");

            // Iterate through each test case in the JSON file
            for (JsonNode testCase : testCases) {
                String scenario = testCase.get("scenario").asText();
                JsonNode requestBodyNode = testCase.get("requestBody");
                String requestBody = objectMapper.writeValueAsString(requestBodyNode);

                System.out.println("Scenario: " + scenario);

                // Send the DELETE request with the request body
                Response response = RestAssured.given()
                        .header("Authorization", "Bearer " + token)
                        .header("Content-Type", "application/json")
                        .body(requestBody)
                        .delete(endpoint);

                // Print response details
                System.out.println("Status Code: " + response.getStatusCode());
                System.out.println("Response Body: " + response.getBody().asString());
                printDashedLine(60);
            }
        } catch (IOException e) {
            System.err.println("Error reading JSON file: " + e.getMessage());
        }
    }

    private static void testPasswordResetRequest() {
        System.out.println("Testing: password_reset_request...");

        String endpoint = "http://localhost:8000/api/password_reset/";
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            // Specify the relative path to the JSON file for test cases
            Path filePath = Paths.get("src/main/java/com/example/password_reset_scenarios.json");

            // Read and parse the JSON file
            JsonNode rootNode = objectMapper.readTree(Files.newInputStream(filePath));
            JsonNode testCases = rootNode.get("testCases");

            // Iterate through each test case in the JSON file
            for (JsonNode testCase : testCases) {
                String scenario = testCase.get("scenario").asText();
                JsonNode requestBodyNode = testCase.get("requestBody");
                String requestBody = objectMapper.writeValueAsString(requestBodyNode);

                System.out.println("Scenario: " + scenario);

                // Send the POST request with the request body
                Response response = RestAssured.given()
                        .header("Content-Type", "application/json")
                        .body(requestBody)
                        .post(endpoint);

                // Print response details
                System.out.println("Status Code: " + response.getStatusCode());
                System.out.println("Response Body: " + response.getBody().asString());
                printDashedLine(60);
            }
        } catch (IOException e) {
            System.err.println("Error reading JSON file: " + e.getMessage());
        }
    }

    private static void testConfirmPasswordReset(String correctToken) {
        System.out.println("Testing: confirm_password_reset...");

        String endpoint = "http://localhost:8000/api/password_reset/confirm/";
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            // Specify the relative path to the JSON file for test cases
            Path filePath = Paths.get("src/main/java/com/example/confirm_password_reset_scenarios.json");

            // Read and parse the JSON file
            JsonNode rootNode = objectMapper.readTree(Files.newInputStream(filePath));
            JsonNode testCases = rootNode.get("testCases");

            // Iterate through each test case in the JSON file
            for (JsonNode testCase : testCases) {
                String scenario = testCase.get("scenario").asText();
                JsonNode requestBodyNode = testCase.get("requestBody");

                // Handle token substitution in request body
                String requestBody = objectMapper.writeValueAsString(requestBodyNode);
                requestBody = String.format(requestBody, correctToken);

                System.out.println("Scenario: " + scenario);

                // Send the POST request with the request body
                Response response = RestAssured.given()
                        .header("Content-Type", "application/json")
                        .body(requestBody)
                        .post(endpoint);

                // Print response details
                System.out.println("Status Code: " + response.getStatusCode());
                System.out.println("Response Body: " + response.getBody().asString());
                printDashedLine(60);
            }
        } catch (IOException e) {
            System.err.println("Error reading JSON file: " + e.getMessage());
        }
    }

    private static void testGetOtp() {
        System.out.println("Testing: get_otp...");

        String endpoint = "http://localhost:8000/api/user/create/";
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            // Specify the relative path to the JSON file for test cases
            Path filePath = Paths.get("src/main/java/com/example/get_otp_scenarios.json");

            // Read and parse the JSON file
            JsonNode rootNode = objectMapper.readTree(Files.newInputStream(filePath));
            JsonNode testCases = rootNode.get("testCases");

            // Iterate through each test case in the JSON file
            for (JsonNode testCase : testCases) {
                String scenario = testCase.get("scenario").asText();
                JsonNode requestBodyNode = testCase.get("requestBody");
                String requestBody = objectMapper.writeValueAsString(requestBodyNode);

                System.out.println("Scenario: " + scenario);

                // Send the POST request with the request body
                Response response = RestAssured.given()
                        .header("Content-Type", "application/json")
                        .body(requestBody)
                        .post(endpoint);

                // Print response details
                System.out.println("Status Code: " + response.getStatusCode());
                System.out.println("Response Body: " + response.getBody().asString());
                printDashedLine(60);
            }
        } catch (IOException e) {
            System.err.println("Error reading JSON file: " + e.getMessage());
        }
    }

    private static void testOtpVerification(int correctOtp) {
        System.out.println("Testing: otp_verification...");

        String endpoint = "http://localhost:8000/api/user/otp/verify/";
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            // Specify the relative path to the JSON file for test cases
            Path filePath = Paths.get("src/main/java/com/example/otp_verification_scenarios.json");

            // Read and parse the JSON file
            JsonNode rootNode = objectMapper.readTree(Files.newInputStream(filePath));
            JsonNode testCases = rootNode.get("testCases");

            // Iterate through each test case in the JSON file
            for (JsonNode testCase : testCases) {
                String scenario = testCase.get("scenario").asText();
                JsonNode requestBodyNode = testCase.get("requestBody");

                // Handle token substitution in request body
                String requestBody = objectMapper.writeValueAsString(requestBodyNode);
                requestBody = String.format(requestBody, correctOtp);

                System.out.println("Scenario: " + scenario);

                // Send the POST request with the request body
                Response response = RestAssured.given()
                        .header("Content-Type", "application/json")
                        .body(requestBody)
                        .post(endpoint);

                // Print response details
                System.out.println("Status Code: " + response.getStatusCode());
                System.out.println("Response Body: " + response.getBody().asString());
                printDashedLine(60);
            }
        } catch (IOException e) {
            System.err.println("Error reading JSON file: " + e.getMessage());
        }
    }

}

/*
 * MAIN GOAL :
 * 1)
 * test each unit seperately with all the possible input variations and all.
 * 
 * 2)
 * If the outcome depends on a sequence of requests then do a sequence and in
 * that wherever units can be tested with input ariations do that.
 */
