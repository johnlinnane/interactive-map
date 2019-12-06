<?php


if(!isset($_POST['submit']))
{
	//This page should not be accessed directly. Need to submit the form.
	echo "error; you need to submit the form!";
}

$type = $_POST['type'];
$title = $_POST['title'];
$description = $_POST['description'];
$sliderHidden = $_POST['sliderHidden'];
$coordHidden = $_POST['coordHidden'];
$name = $_POST['name'];
$visitor_email = $_POST['email'];

print_r($_POST);

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

header('Location: thank-you.html');


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
