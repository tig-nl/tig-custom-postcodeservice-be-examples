<?php

$client_id = 1177;
$secure_code = "9SRLYBCALURPE2B";

// Set URL to search for zipcode and city
if (isset($_GET['zipcodezone'])) {
    $zipcodezone = $_GET["zipcodezone"];
    $url ="https://postcode-be.tig.nl/api/be/postcode-find?zipcodezone=$zipcodezone";
}

// Set URL to search for street
if (isset($_GET['street']) && isset($_GET['zipcode']) && isset($_GET['city'])) {
    $street = $_GET["street"];
    $zipcode = $_GET["zipcode"];
    $city = $_GET["city"];
    $url = "https://postcode-be.tig.nl/api/be/street-find?zipcode=$zipcode&city=$city&street=$street";
}

$context = stream_context_create(array(
        'http' => array(
            'client_id'  => $client_id,
            'secure_code' => $secure_code
        )
    )
);

$file = file_get_contents($url, false, $context);

echo $file;
