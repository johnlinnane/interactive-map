<?php


$name = $_POST['name'];
$visitor_email = $_POST['email'];
$message = $_POST['message'];


$email_from = 'travellercollection@omeka.com';

$email_subject = "New Form submission";

$email_body = "You have received a new message from the user $name.\n".
                        "Here is the message:\n $message".


$to = "panisterfatheroy@gmail.com";
$headers = "From: $email_from \r\n";
$headers .= "Reply-To: $visitor_email \r\n";
mail($to,$email_subject,$email_body,$headers);          //Send the email!
header('Location: info.html');                     //done. redirect to thank-you page.



?>
