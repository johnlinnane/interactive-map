<?php


if(!isset($_POST['submit']))
{
	//This page should not be accessed directly. Need to submit the form.
	echo "error; you need to submit the form!";
}


//********************* DEFINE VARIABLES FROM FORM VALUES ******************

$type = $_POST['type'];
$title = $_POST['title'];
$description = $_POST['description'];
$sliderHidden = $_POST['sliderHidden'];
$coordHidden = $_POST['coordHidden'];
$name = $_POST['name'];
$visitor_email = $_POST['email'];

print_r($_POST);

//********************* DEFINE VARIABLES FOR FILE TRANSFER ******************


$target_dir = "uploads/"; // directory where the file is going
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]); // path of the file to be uploaded
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION)); // file extension of the file

//********************* FILE CHECKS ******************


if(isset($_POST["submit"])) {
  $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
  if($check !== false) {
      echo "File is an image - " . $check["mime"] . ".";
      $uploadOk = 1;
  } else {
      echo "File is not an image.";
      $uploadOk = 0;
  }
}


if (file_exists($target_file)) { // Check if file already exists
  echo "Sorry, file already exists.";
  $uploadOk = 0;
}


// if ($_FILES["fileToUpload"]["size"] > 500000) {  // Check file size
//   echo "Sorry, your file is too large.";
//   $uploadOk = 0;
// }


// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
  if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
      echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
  } else {
      echo "Sorry, there was an error uploading your file.";
  }
}


//********************* CHECK FORM IS FILLED OUT OK ******************


//Validate first
if(empty($name)||empty($visitor_email))
{
    echo "Name and email are mandatory!";
    exit;
}

if(IsInjected($visitor_email))
{
    echo "Bad email value!";
    exit;
}


//********************* COMPOSE EMAIL ******************


$email_from = 'info@travellercollection.com';
$email_subject = "Traveller Collection: New Site Submission";
$email_body = 
    "TYPE: $type\n".
    "TITLE: $title\n".
    "DESCRIPTION: $description\n".
    "ASSOCIATED TIME: $sliderHidden\n".
    "LOCATION: $coordHidden\n".
    "SUBMITTER'S NAME: $name.\n".
    "SUBMITTER'S EMAIL: $visitor_email.\n";


$to = "panisterfatheroy@gmail.com";
$headers = "From: $email_from \r\n";
$headers .= "Reply-To: $visitor_email \r\n";

mail($to,$email_subject,$email_body,$headers);

// ********************* OPEN THANK YOU PAGE  ******************

// header('Location: thank-you.html');

// ********************* JAVASCRIPT FORM VALIDATION FUNCTIONS ******************


// Function to validate against any email injection attempts
function IsInjected($str)
{
  $injections = array('(\n+)',
              '(\r+)',
              '(\t+)',
              '(%0A+)',
              '(%0D+)',
              '(%08+)',
              '(%09+)'
              );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
    {
    return true;
  }
  else
    {
    return false;
  }
}

?>
